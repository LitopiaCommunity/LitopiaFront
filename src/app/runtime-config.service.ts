import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {isPlatformServer} from '@angular/common';
import {firstValueFrom} from 'rxjs';
import {environment} from '../environments/environment';

export interface RuntimeConfig {
  apiBasePath: string;
  blueMapUrl: string;
}

@Injectable({providedIn: 'root'})
export class RuntimeConfigService {
  private config: RuntimeConfig = {
    apiBasePath: environment.apiBasePath,
    blueMapUrl: environment.blueMapUrl
  };

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  load(): Promise<void> {
    if (isPlatformServer(this.platformId)) {
      const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
      this.config.apiBasePath = env?.['API_BASE_PATH'] || environment.apiBasePath;
      this.config.blueMapUrl = env?.['BLUE_MAP_URL'] || environment.blueMapUrl;
      return Promise.resolve();
    }

    return firstValueFrom(this.http.get<Partial<RuntimeConfig>>('/runtime-config.json'))
      .then((cfg) => {
        if (cfg?.apiBasePath) {
          this.config.apiBasePath = cfg.apiBasePath;
        }
        if (cfg?.blueMapUrl) {
          this.config.blueMapUrl = cfg.blueMapUrl;
        }
      })
      .catch(() => {});
  }

  get apiBasePath(): string {
    return this.config.apiBasePath;
  }

  get blueMapUrl(): string {
    return this.config.blueMapUrl;
  }
}
