import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import compression from 'compression';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';
import { environment } from './src/environments/environment';

const DEFAULT_SSR_ALLOWED_HOSTS = [
  'localhost',
  '127.0.0.1',
  '[::1]',
  'litopia.fr',
  '*.litopia.fr',
];

function getConfiguredAllowedHosts(): readonly string[] {
  const envAllowedHosts =
    process.env['NG_ALLOWED_HOSTS']
      ?.split(',')
      .map((host) => host.trim())
      .filter((host) => host.length > 0) ?? [];

  return [...new Set([...DEFAULT_SSR_ALLOWED_HOSTS, ...envAllowedHosts])];
}

function getFirstHeaderValue(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value?.split(',', 1)[0]?.trim();
}

function getRequestUrl(req: express.Request): string {
  const protocol =
    getFirstHeaderValue(req.headers['x-forwarded-proto']) ?? req.protocol;
  const host =
    getFirstHeaderValue(req.headers['x-forwarded-host']) ??
    req.get('host') ??
    'localhost';

  return `${protocol}://${host}${req.originalUrl}`;
}

function getRuntimeConfigPayload(): string {
  return JSON.stringify({
    apiBasePath: process.env['API_BASE_PATH'] || environment.apiBasePath,
    blueMapUrl: process.env['BLUE_MAP_URL'] || environment.blueMapUrl,
  }).replace(/</g, '\\u003c');
}

function injectRuntimeConfig(html: string): string {
  const runtimeConfigScript = `<script>window.__LITOPIA_RUNTIME_CONFIG__=${getRuntimeConfigPayload()};</script>`;

  return html.includes('</head>')
    ? html.replace('</head>', `${runtimeConfigScript}</head>`)
    : `${runtimeConfigScript}${html}`;
}

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine({
    allowedHosts: getConfiguredAllowedHosts(),
  });

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);
  server.use(compression());

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: false,
    }),
  );

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { baseUrl } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: getRequestUrl(req),
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html: string) => res.send(injectRuntimeConfig(html)))
      .catch((err: unknown) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
