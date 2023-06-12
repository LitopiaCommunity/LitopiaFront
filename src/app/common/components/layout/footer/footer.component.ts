import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss','footers.component.theme.scss']
})
export class FooterComponent {

  get currentYear(){
    return new Date().getFullYear()
  }

}
