import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async onSubmit() {
    try {
      await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      // Redirecionar após login
      this.router.navigate(['/home']); // Altere para a rota correta
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']); // Altere para a rota de cadastro
  }
}

