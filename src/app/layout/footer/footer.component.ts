import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss', 'footers.component.theme.scss'],
})
export class FooterComponent {
  get currentYear() {
    return new Date().getFullYear();
  }
}
