import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';

export interface RuntimeConfig {
  apiBasePath: string;
  blueMapUrl: string;
}

type RuntimeConfigWindow = Window & {
  __LITOPIA_RUNTIME_CONFIG__?: Partial<RuntimeConfig>;
};

@Injectable({ providedIn: 'root' })
export class RuntimeConfigService {
  private config: RuntimeConfig = {
    apiBasePath: environment.apiBasePath,
    blueMapUrl: environment.blueMapUrl,
  };

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  load(): Promise<void> {
    if (isPlatformServer(this.platformId)) {
      const env = (
        globalThis as { process?: { env?: Record<string, string | undefined> } }
      ).process?.env;
      this.config.apiBasePath =
        env?.['API_BASE_PATH'] || environment.apiBasePath;
      this.config.blueMapUrl = env?.['BLUE_MAP_URL'] || environment.blueMapUrl;
      return Promise.resolve();
    }

    const inlineConfig = this.getInlineRuntimeConfig();

    if (inlineConfig) {
      this.applyConfig(inlineConfig);
      return Promise.resolve();
    }

    return firstValueFrom(
      this.http.get<Partial<RuntimeConfig>>('/runtime-config.json'),
    )
      .then((cfg) => {
        this.applyConfig(cfg);
      })
      .catch(() => {});
  }

  private getInlineRuntimeConfig(): Partial<RuntimeConfig> | null {
    if (typeof window === 'undefined') {
      return null;
    }

    return (window as RuntimeConfigWindow).__LITOPIA_RUNTIME_CONFIG__ ?? null;
  }

  private applyConfig(cfg?: Partial<RuntimeConfig> | null) {
    if (cfg?.apiBasePath) {
      this.config.apiBasePath = cfg.apiBasePath;
    }

    if (cfg?.blueMapUrl) {
      this.config.blueMapUrl = cfg.blueMapUrl;
    }
  }

  get apiBasePath(): string {
    return this.config.apiBasePath;
  }

  get blueMapUrl(): string {
    return this.config.blueMapUrl;
  }
}
