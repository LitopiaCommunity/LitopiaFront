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

  getRole(){
    switch (this.user?.role){
      case "ghost":
        return "👻 Ghost";
      case "candidate":
        return "📋 Candidat";
      case "pre-accepted":
        return "🗳️ Pre-Accepted";
      case "pretopien":
        return "🌟 Pretopien";
      case "litopien":
        return "🏅 Litopien";
      case "active-litopien":
        return "🔥 Litopien Actif";
      case "inactive-litopien":
        return "🛌 Litopien Inactif";
      case "ban":
        return "🚫 Bani";
      case "refuse":
        return "❌ Refusé";
      case "litogod":
        return "👼 Litodieux";
      case "unique-god":
        return "🔱 Unique Dieux";
      default:
        return "❓ Unknown Role";
    }
  }
}
