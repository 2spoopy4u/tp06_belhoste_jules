import { Component, EventEmitter, Output, OutputEmitterRef } from '@angular/core';
import { ApiService } from '../api-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connexion',
  imports: [FormsModule, CommonModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  login: string = '';
  password: string = '';

  nom?: string = '';
  prenom?: string = '';
  cnx?:boolean = false;
  constructor(private apiService: ApiService) {
  }
  connexion() {
    this.apiService.loginClient(this.login, this.password).subscribe((c) => {
      this.nom = c.nom;
      this.prenom = c.prenom;
      this.cnx = true;
      this.apiService.setLoginStatus(c);
    });
  }
}
