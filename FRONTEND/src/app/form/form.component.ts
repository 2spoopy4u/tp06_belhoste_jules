import { Component } from '@angular/core';
import { User } from '../shared/model/user';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
user: User = new User();
pwdCheck:string="";
constructor(private router: Router,private backendReader: ApiService) {}

checkAndSubmit($event: SubmitEvent) {
  let error = false;
  if (hasNumber(this.user.nom)) {
      alert("Le nom ne doit pas contenir de nombre")
      error = true;
  }
  if (hasNumber(this.user.prenom)) {
      alert("Le prénom ne doit pas contenir de nombre")
      error = true;

  }
  if (!this.user.mail ||this.user.mail.indexOf('@') < 0) {
      alert("Votre mail doit contenir un @")
      error = true;

  }
  if (this.pwdCheck != this.user.password) {
      alert("Veuillez entrer deux fois le même mot de passe")
      error = true;

  }
  if (error) {
    return;
  }
  console.log("add")
  this.backendReader.addUser(this.user).subscribe();
  alert("Vous avez créer un compte. \nVous allez être redirigé sur la page de connexion")

  this.router.navigate(['/connexion']);

}

}
function hasNumber(myString:string | undefined) {
  if(myString){
  return /\d/.test(myString);
  }
  return false;
}