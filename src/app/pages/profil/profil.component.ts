import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UsersService, UserEntity} from '../../apis/litopia-api';
import {Observable} from 'rxjs';
import {SeoService} from "../../utils/seo.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  memberObs!: Observable<UserEntity>;

  constructor(
    private route: ActivatedRoute,
    private seo: SeoService,
    private userService: UsersService
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.memberObs = this.userService.usersControllerGetUserByNickname(id);


    this.seo.generateTags({
      title: 'Litopia - '+id,
      description: 'Profile de '+id+' sur Litopia',
      //get image from user
      image:'https://mc-heads.net/head/'+id+'/100.png'
    });
  }
}
