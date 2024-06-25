import {Component, Input} from '@angular/core';
import {UserEntity} from "../../../apis/litopia-api";

@Component({
  selector: 'app-profil-card',
  templateUrl: './profil-card.component.html',
  styleUrls: ['./profil-card.component.scss','./profil-card.theme.component.scss']
})
export class ProfilCardComponent  {
  @Input() user?:UserEntity

  getUserName(){
    return this.user?.minecraftUser?.minecraftNickname || this.user?.discordNickname || 'Inconnu'
  }

  getProfilePicture(){
    return this.user?.minecraftUser?.minecraftUUID ?
      `https://mc-heads.net/head/${this.user.minecraftUser.minecraftUUID}/left` :
      this.user?.discordAvatar ? `https://cdn.discordapp.com/avatars/${this.user?.discordID}/${this.user?.discordAvatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'
  }
}
