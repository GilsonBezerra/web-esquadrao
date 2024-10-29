import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalhesPage } from './pages/detalhes/detalhes.page';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { AuthService } from './services/auth.service';
import { MenuService } from './services/menu.service';
import { Menu } from './services/model/menu';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {


  public appPages = [
    // { title: 'Meus Agendamentos', url: '/agendamento', icon: 'home' },
  ];

  constructor(
    private authService: AuthService,
    private menuService: MenuService
  ) {
    
  }

  ngOnInit() {
    this.buscarListaMenus();
    
  }
  
  public logOff() {
    this.authService.logOut();
  }
  
  public buscarListaMenus() {
    this.menuService.getMenu()
    .subscribe(
      (data)=> {
        this.appPages = data;
        console.log('Iniciei o app trazendo os menus', this.appPages);

    },(error)=>{
    console.log('Um erro inesperado ocorreu!', error.message);
    
  })
    // let menuRecuperado = localStorage.getItem('menu');
    // this.appPages = JSON.parse(menuRecuperado);
  }

     

}
