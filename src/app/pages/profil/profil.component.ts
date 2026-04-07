import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { UsersService, UserEntity } from '../../apis/litopia-api';
import { first, Observable } from 'rxjs';
import { FooterComponent } from '../../layout/footer/footer.component';
import { PageHeaderComponent } from '../../layout/page-header/page-header.component';
import { SeoService } from '../../utils/seo.service';
import {
  getMnecraftFullSkin,
  getProfilePicture,
  getRole,
  getUserName,
} from '../../utils/user-default';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    MatTooltipModule,
    PageHeaderComponent,
  ],
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
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.memberObs = this.userService.usersControllerGetUserByNickname(id);
    this.memberObs.pipe(first()).subscribe((user) => {
      if (user?.candidature) {
        void this.renderCandidature(user.candidature);
      }
    });

    this.seo.generateTags({
      title: 'Litopia - ' + id,
      description: 'Profile de ' + id + ' sur Litopia',
      image: 'https://mc-heads.net/head/' + id + '/100.png',
    });
  }

  private async renderCandidature(candidature: string) {
    try {
      const { marked } = await import('marked');
      this.descriptionField = await marked.parse(candidature);
    } catch (_error) {
      this.descriptionField = candidature;
    }
  }

  protected readonly getUserName = getUserName;
  protected readonly getProfilePicture = getProfilePicture;
  protected readonly getMnecraftFullSkin = getMnecraftFullSkin;
  protected readonly getRole = getRole;
}
