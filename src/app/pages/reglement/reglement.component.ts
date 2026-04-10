import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { PageHeaderComponent } from '../../layout/page-header/page-header.component';
import { SeoService } from '../../utils/seo.service';

@Component({
  selector: 'app-reglement',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    FooterComponent,
    PageHeaderComponent,
  ],
  templateUrl: './reglement.component.html',
  styleUrls: ['./reglement.component.scss'],
})
export class ReglementComponent implements OnInit {
  constructor(private seo: SeoService) {
    this.seo.generateTags({
      title: 'Litopia - Nous rejoindre reglement',
      description: 'venez rejoindre le server de litopia youpi',
      //image: 'https://litopia.fr/uneimageàmettre'
    });
  }

  ngOnInit(): void {}
}
