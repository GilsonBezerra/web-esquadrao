import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Agendamento } from 'src/app/interfaces/agendamento';
import { Servico } from 'src/app/interfaces/servico';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { AuthService } from 'src/app/services/auth.service';
import { Profissional } from 'src/app/services/model/profissional';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
})
export class AgendamentoPage implements OnInit {
  public agendamentoForm: FormGroup;
  public agendamento: Agendamento;
  public loading: any;
  private servicoCollection: AngularFirestoreCollection<Servico>;
  public servico: Servico;
  private profissionais: Profissional;
  public formaPagamento = [];

  public preco;
  public profissional;
  public userId;
  public show = false;

  constructor(
    private fb: FormBuilder,
    private agendamentoService: AgendamentoService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private afa: AngularFireAuth,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {
    this.getUid();  
    this.createFormLogin();
    this.buscarTodosOsServicos();
    this.buscarFormaPagamento();
    // this.buscarTodosOsProfissionais();
  }

  public getUid() {
    return this.afa.currentUser
    .then((data) => {
      this.userId = data.uid;
      this.agendamentoForm.controls['userId'].setValue(this.userId);
      console.log(`UserID ${this.userId}`);
      
    })
  }

  public createFormLogin() {
    this.agendamentoForm = this.fb.group({
      userId: [''],
      data: ['', Validators.required],
      profissional: ['', Validators.required],
      servico: ['', Validators.required],
      formaPagamento: ['', Validators.required],
    });
  }

  private clearForm() {
    this.agendamentoForm = this.fb.group({
      profissional: '',
    })
  }

  public async criarNovoAgendamento() {
    await this.presenteLoading();

    if (this.agendamento) {
      this.agendamento.criadoEm = new Date().getTime();
    } else {
      try {
        await this.agendamentoService.postAgendamento(this.agendamentoForm.value);
        this.loadingCtrl.dismiss();
        this.irParaHome();
      } catch (error) {
        this.toastAddAgendamento('Erro ao tentar realizar agendamento...');
        this.loadingCtrl.dismiss();
      }
    }
  }

  public setUserId(userId) {
    return this.userId = userId;
  }

  public irParaHome() {
    this.navCtrl.navigateForward(['home']);
  }

  public async toastAddAgendamento(message: string) {
    const toast = await this.toastCtrl.create({
      duration: 3000,
    });
    return toast.present();
  }

  public async presenteLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Realizando agendamento...',
    });
    return this.loading.present();
  }

  public buscarFormaPagamento() {
    this.agendamentoService.getFormaPagamento()
    .subscribe(
      (data: any) => {
        this.formaPagamento = data;
        console.log('Formas de pagamento ==========>', this.formaPagamento);
        
      },
      (error)=> {
        console.log(error);
        
      }
    )
  }

  public getServicoById(servico: Servico) {
    console.log('O Serviço escolhido foi ========>', servico.nome);
    console.log('O Serviço escolhido foi ========>', servico.preco);
    console.log('O Serviço escolhido foi ========>', servico.profissional);

    this.preco = servico.preco;
    this.profissional = servico.profissional;
  }

  public buscarTodosOsServicos() {
    this.agendamentoService.getServico().subscribe(
      (data: any) => {
        this.servico = data;
        console.log('Serviços', this.servico);
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  public buscarTodosOsProfissionais() {
    this.agendamentoService.getProfissionais().subscribe(
      (data: any) => {
        this.profissionais = data;
        console.log('Profissionais', this.profissionais);
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }
}
