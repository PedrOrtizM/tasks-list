import { Component } from '@angular/core';
import { LoadingService } from './core/services/loading/loading-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(public readonly loading: LoadingService ){ }
}
