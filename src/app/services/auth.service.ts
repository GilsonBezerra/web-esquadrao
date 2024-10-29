import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loading: any;

  constructor(
    private afa: AngularFireAuth,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController

  ) { }

    public login(user: User){
      return this.afa.signInWithEmailAndPassword(user.email, user.password);
    }

    public register(user: User){
      return this.afa.createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        this.presenteToast();
      })
    }

    public getAuth(){
      return this.afa;

    }

    public logOut() {
      return this.afa.signOut()
      .then(() => {
        this.irParaLogin();
      })
    }

    public irParaLogin() {
      this.navCtrl.navigateBack('login');
    }

    public async presentToastError(message: string) {
    const toast = await this.toastCtrl.create({
      message: 'Erro inesperado! Tente novamente mais tarde...',
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
    const toast = await this.toastCtrl.create({
      message: 'Usuário cadastrado com sucesso!',
      duration: 3000,
      color: 'success',
      animated: true
    })
    // this.clearFormCadastro();
    return toast.present();
    // this.segmentSelected = 'login';
  }

  public async presenteLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }

}
