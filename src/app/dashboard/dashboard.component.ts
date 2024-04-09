import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../core/services/session/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private readonly sessionService: SessionService,
    private readonly router: Router
  ) { }

  public logout(): void {
    this.sessionService.logout();
    this.router.navigate(['/']);
  }
}
