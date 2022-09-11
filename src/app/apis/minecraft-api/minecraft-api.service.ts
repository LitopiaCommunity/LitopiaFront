import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {filter, map} from "rxjs";
import {StrictHttpResponse} from "./strict-httpresponse";
import {SimpleMinecaftAccount} from "./model/simpleMinecaftAccount";

@Injectable({
  providedIn: 'root'
})
export class MinecraftApiService {

  constructor(private http:HttpClient) { }

  static readonly API_URL = '/proxy/mcapi';
  static readonly GET_UUID_FROM_USER_PATH = '/users/profiles/minecraft/';

  getUUIDFomUser$Response(username: string) {
    return this.http.get(MinecraftApiService.API_URL + MinecraftApiService.GET_UUID_FROM_USER_PATH + username);
  }

  getUUIDFomUser(username: string) {
    return this.getUUIDFomUser$Response(username).pipe(
      filter((r:any)=>r instanceof HttpResponse),
      map((r:HttpResponse<SimpleMinecaftAccount>)=>{
        return r as StrictHttpResponse<SimpleMinecaftAccount>;
      }),
      map((r: StrictHttpResponse<SimpleMinecaftAccount>) => r.body as SimpleMinecaftAccount)
    )
  }

}
