import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  // Verifica se o usuário está logado. Se não estiver, joga ele de volta para a tela de login
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.getAuth()
        .onAuthStateChanged(user => {
          if (!user) {
            this.router.navigate(['login']);
          }
          resolve(user ? true : false)
        })

    })
  }
}




