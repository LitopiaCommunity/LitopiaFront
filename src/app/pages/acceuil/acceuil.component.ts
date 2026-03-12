import { Component, OnInit } from '@angular/core';
import {upFadeInAnimation} from "../../animations/up-fade-in.animation";
import {SeoService} from "../../utils/seo.service";

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss'],
  animations:[upFadeInAnimation]
})
export class AcceuilComponent implements OnInit {
  appearSet=new Set<string>();

  constructor(private seo: SeoService) {
    this.seo.generateTags({
      title: 'Litopia - L\'Ultime Saison (2016-2026)',
      description: 'Litopia célèbre 10 ans d\'aventure. Ultime Saison v26.2, carte éternelle. Serveur UHC Vanilla privé. Zéro reset.',
      //image: 'https://litopia.fr/uneimageàmettre'
    });
  }

  ngOnInit(): void {
  }

  appear(appearName:string){
    this.appearSet.add(appearName)
  }

  isAppear(appearName:string){
    return this.appearSet.has(appearName)
  }

}
