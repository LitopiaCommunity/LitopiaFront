import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService, UserEntity } from '../../apis/litopia-api';
import { first, Observable } from 'rxjs';
import { SeoService } from '../../utils/seo.service';
import {
  getMnecraftFullSkin,
  getProfilePicture,
  getRole,
  getUserName,
} from '../../utils/user-default';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-profil',
  standalone: false,
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  memberObs!: Observable<UserEntity>;
  descriptionField: string = '';

  constructor(
    private route: ActivatedRoute,
    private seo: SeoService,
    private userService: UsersService,
    private md: MarkdownService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.memberObs = this.userService.usersControllerGetUserByNickname(id);
    this.memberObs.pipe(first()).subscribe((user) => {
      if (user) {
        void Promise.resolve(this.md.parse(user.candidature)).then(
          (parsedCandidature) => {
            this.descriptionField = parsedCandidature;
          },
        );
      }
    });

    this.seo.generateTags({
      title: 'Litopia - ' + id,
      description: 'Profile de ' + id + ' sur Litopia',
      image: 'https://mc-heads.net/head/' + id + '/100.png',
    });
  }

  protected readonly getUserName = getUserName;
  protected readonly getProfilePicture = getProfilePicture;
  protected readonly getMnecraftFullSkin = getMnecraftFullSkin;
  protected readonly getRole = getRole;
}
