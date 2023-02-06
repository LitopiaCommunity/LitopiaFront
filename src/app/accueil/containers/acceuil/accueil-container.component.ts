import { Component} from '@angular/core';
import {upFadeInAnimation} from "../../animations/up-fade-in.animation";
import {SeoService} from "../../../common/services/seo/seo.service";

@Component({
  selector: 'container-acceuil',
  templateUrl: './accueil-container.component.html',
  styleUrls: ['./accueil-container.component.scss'],
  animations:[upFadeInAnimation]
})
export class AccueilContainer {
  appearSet=new Set<string>();

  constructor(private seo: SeoService) {
    this.seo.generateTags({
      title: 'Litopia - Accueil',
      description: 'Litopia serveur UHC vanialla en 1.19 sur minecraft.',
      //image: 'https://litopia.fr/uneimageàmettre'
    });
  }

  appear(appearName:string){
    this.appearSet.add(appearName)
  }

  isAppear(appearName:string){
    return this.appearSet.has(appearName)
  }

}
