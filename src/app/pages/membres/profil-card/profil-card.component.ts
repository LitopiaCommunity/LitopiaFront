import { DatePipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserEntity } from '../../../apis/litopia-api';
import {
  getProfilePicture,
  getRole,
  getUserName,
} from '../../../utils/user-default';

@Component({
  selector: 'app-profil-card',
  standalone: true,
  imports: [RouterLink, NgClass, DatePipe],
  templateUrl: './profil-card.component.html',
  styleUrls: [
    './profil-card.component.scss',
    './profil-card.theme.component.scss',
  ],
})
export class ProfilCardComponent {
  @Input() user?: UserEntity;
  protected readonly getRole = getRole;
  protected readonly getUserName = getUserName;
  protected readonly getProfilePicture = getProfilePicture;
}
