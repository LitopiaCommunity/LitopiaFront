import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-header[title][img][imgAlt]',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Input() title!:string;
  @Input() img!:string;
  @Input() imgAlt!:string;
  @Input() profilePicture!:string;
  @Input() compact=false;

  constructor() { }

  ngOnInit(): void {
  }

}
