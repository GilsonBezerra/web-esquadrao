import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Agendamento } from 'src/app/interfaces/agendamento';
import { Servico } from 'src/app/interfaces/servico';
import { Type } from 'src/app/interfaces/type';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { Promocional } from 'src/app/services/model/promocional';
import { PromocionalService } from 'src/app/services/promocional.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public usuario;
  public email;

  public type: Type;
  public title;
  public message;
  public confirm;
  public cancel;

  public agendamentoMessage = 'Você possui agendamentos';
  public agendamentoMessageVazio = 'Você não possui agendamentos';
  public dataPromo: Promocional;
  public show: Boolean;
  public agendamentos: Agendamento[];
  public servicos: Servico[];
  public agendamentoSubscription: Subscription;
  public servicosSubscription: Subscription;
  public bodyAgendamento: Agendamento;
  public usuarioLogado;

  public isAdmin = false; // Definir no serviço 

  constructor(
    private authService: AuthService,
    private afa: AngularFireAuth,
    private modalCtrl: ModalController,
    private agendamentoService: AgendamentoService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private router: Router,
    private menuService: MenuService,
    private promoService: PromocionalService
  ) { }

  ngOnInit() {
    // this.buscarTodosAgendamentos();
    // this.buscarTodosOsServicos();
    this.getUid();
    this.buscarDadosPromo();
    this.buscarItemsMenu();
  }

  ionViewWillEnter() {
    this.buscarTodosAgendamentos();
  }

  public buscarItemsMenu() {
    this.menuService.getMenu()
      .subscribe(
        (res) => {
          console.log('Resultado da busca de menus', res);
          let menu = JSON.stringify(res);
          localStorage.setItem('menu', menu);

        }
      )
  }

  public buscarDadosPromo() {
    this.promoService.getPromoInfo()
      .subscribe(
        (data: any) => {
          this.dataPromo = data;
          this.show = data[0].show
          this.confirm = data[0].confirm
          this.cancel = data[0].cancel
          this.message = data[0].message
          this.title = data[0].title
          this.type = data[0].type
          if (this.show) {
            this.callGeneralModal();
          }
        },
        (onFailure) => {
          console.log('Erro ao carregar os dados', onFailure);

        })
  }

  public getUid() {
    return this.afa.currentUser
      .then((data) => {
        this.usuarioLogado = data.uid;
        console.log(`usuarioLogado ${this.usuarioLogado}`);

      })
  }

  public buscarTodosAgendamentos() {
    this.agendamentoSubscription = this.agendamentoService.getAgendamentos()
      .subscribe(
        (data) => {
          if (!this.isAdmin) {
            let agendamentosCliente = data.filter(item => item.userId === this.usuarioLogado);
            this.agendamentos = agendamentosCliente.sort((a, b) => a.data >= b.data ? -1 : 1);
            console.log('Agendamentos encontrados em nome do cliente', agendamentosCliente, 'usuario logado', this.usuarioLogado);
          } else {
            this.agendamentos = data;
          }
        },
        (error) => {
          this.toastError(error);

        }
      )
  }

  public buscarTodosOsServicos() {
    this.servicosSubscription = this.agendamentoService.getServico()
      .subscribe(
        (data: any) => {
          this.servicos = data;
          console.log('Retorno dos servicos', this.servicos);
        },
        (error) => {
          this.toastError(error);
        }
      )
  }

  public async callGeneralModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        title: this.title,
        message: this.message,
        confirm: this.confirm,
        cancel: this.cancel,
        type: this.type
      }
    });
    modal.present();
  }

  public addNovoAgendamento() {
    this.navCtrl.navigateForward('agendamento');
  }



  public irParaDetalhes(agendamento: Agendamento) {
    this.router.navigate(['/detalhes'], {
      state: { agendamento: agendamento },
      // replaceUrl: true
    });
    console.log('Resultado do state saindo da home', agendamento);

  }

  ngOnDestroy(): void {
    this.agendamentoSubscription.unsubscribe();
  }

  public async toastError(error: string) {
    const toastError = await this.toastCtrl.create({
      message: error,
      duration: 5000
    });
    return toastError.present();
  }


}
