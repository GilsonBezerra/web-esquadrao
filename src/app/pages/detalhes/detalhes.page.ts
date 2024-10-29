import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Agendamento } from 'src/app/interfaces/agendamento';
import { AgendamentoService } from 'src/app/services/agendamento.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {

  public agendamento;
  public profissional;
  public preco;
  public data;
  public servico;
  public pagamento;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private agendamentoService: AgendamentoService,
    private loading: LoadingController,
    private alertCtrl: AlertController
  ) {
    if( this.router.getCurrentNavigation() !== undefined ) {
      const data = this.router.getCurrentNavigation();
      this.agendamento = data.extras.state.agendamento;

      console.log('Resultado de state vindo da home', this.agendamento);

      this.profissional = this.agendamento.profissional;
      this.preco = this.agendamento.servico.preco;
      this.data = this.agendamento.data;
      this.servico = this.agendamento.servico.nome;
      this.pagamento = this.agendamento.formaPagamento;
      
    }
   }

  ngOnInit() {
  }

  public removeAgendamento(id: string) {
    this.presentLoading();
    this.agendamentoService.deleteAgendamento(id);
          this.loading.dismiss();
          this.toastDelete(id);
          this.voltarPraHome();
  }

  private async alertDeleteAgendamento(id: string){
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message:
          `<hr>
            <p>
              Tem certeza que deseja excluir este agendamento?
            </p>  
          <hr>`,
      backdropDismiss: false,
      cssClass: 'alert-style',
      buttons: [{
        text: 'Cancelar', role: 'cancel', handler: () => {
          this.close();
        }
      },
      {
        text: 'Excluir', handler: () => {
          this.removeAgendamento(id)

        }
      }]
    });
    return alert.present();

  }

  /**
   * Função que fecha o alert / modal
   */
   public close() {
    this.alertCtrl.dismiss();
  }

  public async toastDelete(id: string) {
    const toast = await this.toastCtrl.create({
      message: `O agendamento de número ${id} foi excluído com sucesso!`,
      duration: 3000
    });
     toast.present();    
  }

  public voltarPraHome() {
    this.navCtrl.navigateBack('home');
  }

  public async presentLoading() {
    const loading = await this.loading.create({
      message: 'Removendo agendamento...',
      duration: 2000
      
    })
    return loading.present();
  }

}
