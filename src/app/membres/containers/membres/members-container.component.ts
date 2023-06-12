import { Component, OnInit } from '@angular/core';
import {SeoService} from "../../../common/services/seo/seo.service";

@Component({
  selector: 'app-membres',
  templateUrl: './members-container.component.html',
  styleUrls: ['./members-container.component.scss']
})
export class MembersContainer implements OnInit {

  constructor(private seo:SeoService) {
    this.seo.generateTags({
      title: 'Litopia - Membres',
      description: 'Retrouvez la liste des membres de Litopia',
      //image: 'https://litopia.fr/uneimageàmettre'
    });
  }

  ngOnInit(): void {
  }

}
