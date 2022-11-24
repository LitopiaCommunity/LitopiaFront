import { Component, OnInit } from '@angular/core';
import {SeoService} from "../../utils/seo.service";
import {UserEntity, UsersService} from "../../apis/litopia-api";
import {Observable} from "rxjs";

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.scss']
})
export class MembresComponent implements OnInit {

  membersObs:Observable<UserEntity[]>
  adminObs:Observable<UserEntity[]>

  constructor(private seo:SeoService, public userService:UsersService) {
    this.seo.generateTags({
      title: 'Litopia - Membres',
      description: 'Retrouvez la liste des membres de Litopia',
      //image: 'https://litopia.fr/uneimageàmettre'
    });
    this.membersObs = this.userService.usersControllerGetUserByRoles(['pretopien','litopien','active-litopien']);
    this.adminObs = this.userService.usersControllerGetUserByRoles(['litogod','unique-god'])
  }

  ngOnInit(): void {
  }

}
