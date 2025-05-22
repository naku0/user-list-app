import {Component} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {}
