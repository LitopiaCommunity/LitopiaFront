import {Component, Input} from '@angular/core';
import {UserEntity} from "../../../apis/litopia-api";
import {getProfilePicture, getRole, getUserName} from "../../../utils/user-default";

@Component({
  selector: 'app-profil-card',
  templateUrl: './profil-card.component.html',
  styleUrls: ['./profil-card.component.scss','./profil-card.theme.component.scss']
})
export class ProfilCardComponent  {
  @Input() user?:UserEntity
  protected readonly getRole = getRole;
  protected readonly getUserName = getUserName;
  protected readonly getProfilePicture = getProfilePicture;
}
