import { Component, EventEmitter, Output, OutputEmitterRef } from '@angular/core';
import { ApiService } from '../api-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../shared/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  imports: [FormsModule, CommonModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {

  login: string = '';
  password: string = '';
  user?:User;

  constructor(private router: Router,private apiService: ApiService) {}

  ngOnInit() {
    let userId = null;
    userId = this.apiService.getUserFromToken();
    if(userId){
    this.apiService.getUser(userId).subscribe((c)=>{
      this.user = c;
    });
  }
  }
  connexion() {
    this.apiService.loginClient(this.login, this.password).subscribe({
      next: (response) => {
      const token = response.headers.get('Authorization')?.split(' ')[1];

        if (token) {
          this.apiService.setToken(token);
          this.user= response.body!;
          this.apiService.setLoginStatus(response.body!.id!);
          console.log('Login successful!');
          console.log(token);
        } else {
           alert('Login échoué. Aucun token reçu.');
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Information de connection invalide.');
      }
    });
  }

  deconnexion() {
    this.apiService.logout();
    this.user = undefined;
    }
}
