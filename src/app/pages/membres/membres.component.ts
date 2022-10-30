import { Component, OnInit } from '@angular/core';
import {SeoService} from "../../utils/seo.service";
import {UsersService} from "../../apis/litopia-api";

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.scss']
})
export class MembresComponent implements OnInit {

  constructor(private seo:SeoService, private userService:UsersService) {
    this.seo.generateTags({
      title: 'Litopia - Membres',
      description: 'Retrouvez la liste des membres de Litopia',
      //image: 'https://litopia.fr/uneimageàmettre'
    });
  }

  ngOnInit(): void {
  }

  getMember(){
    return this.userService.usersControllerGetAllUser()
  }

}
