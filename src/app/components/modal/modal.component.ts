import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  public title;
  public mensage;
  public confirmButtonLabel;
  public cancelButtonLabel;
  public type;
  public insert;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {    
    this.type = this.navParams.get('type');
    this.insert = this.navParams.get('insert');
    
    this.title = this.navParams.get('title');
    this.mensage = this.navParams.get('message');
    this.confirmButtonLabel = this.navParams.get('confirm') ? this.navParams.get('confirm') : this.confirmButtonLabel = 'Sim';
    this.cancelButtonLabel = this.navParams.get('cancel') ? this.navParams.get('cancel') : this.cancelButtonLabel = 'Não';
    // this.confirmButtonLabel = this.navParams.get('confirm') ? this.navParams.get('confirm') : this.confirmButtonLabel = 'Sim';
    // this.confirmButtonLabel = this.navParams.get('cancel') ? this.navParams.get('cancel') : this.cancelButtonLabel = 'Não';
    console.log(`Testando o valor da variável type ${this.type}`);
    
  }

  public closed() {
    this.modalCtrl.dismiss();
  }

}
