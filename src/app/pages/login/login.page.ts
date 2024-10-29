import { User } from './../../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AppVersion } from '@ionic-native/app-version/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public logoLogin = '../assets/logo.png';
  public segmentSelected = 'login';
  public userLogin: User = {};
  public userRegister: User = {};

  public enableButton = true;

  public appVersionCode;


  public cadastroForm: FormGroup;
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toatsCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private appVersion: AppVersion

  ) {
    this.createFormLogin();
    this.createFormCadastro();
  }
  
  ngOnInit() {
    
  }
  
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.getAppVersion();
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }


  public segmentChanged(event: any) {
    this.segmentSelected = event.target.value;
    console.log(this.segmentSelected);
  }

  public getAppVersion() {
    this.appVersion.getVersionNumber()
    .then(
      (appVersion) => {
      this.appVersionCode = appVersion
    },
      (error)=> {
        console.log(`Ocorreu o erro = ${error}`);
        
    })
  }

  public createFormLogin() {
    this.loginForm = this.fb.group({
      email: ['',
        Validators.required,
        Validators.pattern('/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'),
      ],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])]
    })
  }

  public createFormCadastro() {
    this.cadastroForm = this.fb.group({
      nome: ['',
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ],
      email: ['',
        Validators.required,
        Validators.pattern('/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'),
      ],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ])]
    })
  }

  public async login() {
    await this.presenteLoading();
    try {
      await this.authService.login(this.loginForm.value);
      this.clearFormLogin();
      this.irParaHome();
    } catch (error) {
      this.presentToastError(error.message);
    } finally {
      this.loadingCtrl.dismiss();
      // console.log(this.loginForm.value);
      // this.clearFormLogin();
    }
  }

  public async cadastrarUsuario() {
    await this.presenteLoading();
    try {
      await this.authService.register(this.cadastroForm.value);
    } catch (error) {
      console.error(error);
      this.presentToastError(error.message);
    } finally {
      this.loadingCtrl.dismiss();
      window.location.reload();
      this.segmentSelected = 'login';
    }
  }

  private clearFormLogin() {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    })
  }
  private clearFormCadastro() {
    this.cadastroForm = this.fb.group({
      nome: '',
      email: '',
      password: ''
    })
  }

  // ERROR
  public async presentToastError(message: string) {
    const toast = await this.toatsCtrl.create({
      message,
      duration: 3000,
      color: 'success',
      animated: true
    })
    // this.clearFormCadastro();
    return toast.present();
    // this.segmentSelected = 'login';
  }
  // SUCCESS
  public async presenteToast() {
    const toast = await this.toatsCtrl.create({
      message: 'Usuário cadastrado com sucesso!',
      duration: 3000,
      color: 'success',
      animated: true
    })
    this.clearFormCadastro();
    return toast.present();
  }

  public async presenteLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Por favor, aguarde...'
    });
    return loading.present();
  }

  public irParaHome() {
    this.navCtrl.navigateForward('home');
  }

}
