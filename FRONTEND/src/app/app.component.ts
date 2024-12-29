import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { CommonModule } from '@angular/common';
import { ApiService } from './api-service.service';
import { Subscription } from 'rxjs';
import { User } from './shared/model/user';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  authUserId?: string;
  private loginStatusSubscription: Subscription;
  constructor(private router: Router,  private backendReader: ApiService) { }
  title = 'TP06_Belhoste_Jules';

  goToUserProfile($event: MouseEvent) {
    $event.preventDefault();
    this.router.navigate(['/update'], { queryParams: { id: this.authUserId! } });
  }
  ngOnInit() {

    const tokenUser = this.backendReader.getUserFromToken();
    if (tokenUser) {
      console.log("token", tokenUser)
      this.backendReader.setLoginStatus(tokenUser);
    }

    this.loginStatusSubscription = this.backendReader.loginStatus$.subscribe(status => {
      this.authUserId = status;
      console.log("status ", status);
      if (!this.authUserId) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }
}
