import {Component} from '@angular/core';
import {AuthenticationService} from "../../../auth/services/authentication.service";
import {MinecraftApiService} from "../../../apis/minecraft-api/minecraft-api.service";
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {lastValueFrom, map, switchMap, take, throttleTime} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SimpleMinecaftAccount} from "../../../apis/minecraft-api/model/simpleMinecaftAccount";
import {MinecraftUsersService} from "../../../apis/litopia-api";
import {uuidConverter} from "../../../utils/uuid-converter";

@Component({
  selector: 'app-nous-rejoindre-form',
  templateUrl: './nous-rejoindre-form.component.html',
  styleUrls: ['./nous-rejoindre-form.component.scss']
})
export class NousRejoindreFormComponent {

  candidatureForm:FormGroup;

  style:{[klass: string]: any;}|null=null;

  constructor(public authService : AuthenticationService, private mcApiService:MinecraftApiService,private http: HttpClient,private minecraftUserService:MinecraftUsersService) {
    this.candidatureForm = new FormGroup({
      minecraftUsername: new FormControl('', [
        Validators.required, Validators.minLength(3),
        Validators.maxLength(16)
      ], [
        this.minecraftAsyncValidator()
      ]),
      candidature: new FormControl('', [Validators.required, Validators.minLength(1024), Validators.maxLength(4096)]),
      conditions: new FormControl(false, [Validators.required])
    });

    this.candidatureForm.controls['minecraftUsername'].valueChanges.pipe(
      throttleTime(200, undefined, {leading: true, trailing: true}),
      switchMap((name:string)=>{
        return this.imageUrlToBase64(`https://mc-heads.net/head/${name}/left`)
      }),
      map((base64:string)=>{
        return {
          backgroundImage:"url(data:image/png;;base64,"+base64+")",
        }
      })
    ).subscribe(style=>{
      this.style = style;
    })
  }

  hasError(controlName:string, errorName:string){
    return this.candidatureForm.controls[controlName].hasError(errorName);
  }

  minecraftAsyncValidator():AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      try {
        const val = await lastValueFrom(this.mcApiService.getUUIDFomUser$Response(control.value))
        if (val){
          const mcUser = <SimpleMinecaftAccount>val;
          try{
            const uuid = uuidConverter(mcUser.id);
            await lastValueFrom(this.minecraftUserService.minecraftUsersControllerIsMinecraftUserExist(uuid));
            return {takenUsername: true};
          }catch (e){
            console.log(e)
            return null;
          }
        }
        return {invalidMinecraftUsername:true};
      }catch (e) {
        return {invalidMinecraftUsername:true};
      }
    }
  }

  imageUrlToBase64(urL: string) {
    return this.http.get(urL, {
      observe: 'body',
      responseType: 'arraybuffer',
    })
      .pipe(
        take(1),
        map((arrayBuffer) =>
          btoa(
            Array.from(new Uint8Array(arrayBuffer))
              .map((b) => String.fromCharCode(b))
              .join('')
          )
        ),
      )
  }
}
