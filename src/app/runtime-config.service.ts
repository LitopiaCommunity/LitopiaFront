import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {isPlatformServer} from '@angular/common';
import {firstValueFrom} from 'rxjs';
import {environment} from '../environments/environment';

export interface RuntimeConfig {
  apiBasePath: string;
}

@Injectable({providedIn: 'root'})
export class RuntimeConfigService {
  private config: RuntimeConfig = {
    apiBasePath: environment.apiBasePath
  };

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  load(): Promise<void> {
    if (isPlatformServer(this.platformId)) {
      const env = (typeof process !== 'undefined' ? process.env : {}) as Record<string, string | undefined>;
      this.config.apiBasePath = env['API_BASE_PATH'] || environment.apiBasePath;
      return Promise.resolve();
    }

    return firstValueFrom(this.http.get<Partial<RuntimeConfig>>('/runtime-config.json'))
      .then((cfg) => {
        if (cfg?.apiBasePath) {
          this.config.apiBasePath = cfg.apiBasePath;
        }
      })
      .catch(() => {});
  }

  get apiBasePath(): string {
    return this.config.apiBasePath;
  }
}
