import { Component } from '@angular/core';
import { User } from '../shared/model/user';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-user-form',
  imports: [FormsModule],
  templateUrl: './update-user-form.component.html',
  styleUrl: './update-user-form.component.css'
})
export class UpdateUserFormComponent {
user: User = new User();
pwdCheck:string="";
constructor(private route: ActivatedRoute, private backendReader: ApiService) {}
ngOnInit() {
  let userId = null;
  this.route.queryParamMap.subscribe(params => {
    userId = params.get('id');  
  });
  if(userId){
  this.backendReader.getUser(userId).subscribe((c)=>{
    this.user = c;
  });
}
}
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
  this.backendReader.updateUser(this.user).subscribe();
  alert("Mise à jour réussie");
}

}
function hasNumber(myString:string | undefined) {
  if(myString){
  return /\d/.test(myString);
  }
  return false;

}
