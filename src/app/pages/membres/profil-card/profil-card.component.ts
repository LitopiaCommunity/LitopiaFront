import {Component, Input, OnInit} from '@angular/core';
import {UserEntity} from "../../../apis/litopia-api";

@Component({
  selector: 'app-profil-card',
  templateUrl: './profil-card.component.html',
  styleUrls: ['./profil-card.component.scss']
})
export class ProfilCardComponent implements OnInit {
  @Input() user?:UserEntity

  constructor() { }

  ngOnInit(): void {
  }

}
