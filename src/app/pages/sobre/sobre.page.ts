import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
})
export class SobrePage implements OnInit {

  public appVersionCode;
  public appName = "Barberia Piloto";

  constructor(private appVersion : AppVersion) { 
    this.getAppVersion();

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // this.menuCtrl.enable(false);
    this.getAppVersion();
  }

  public getAppVersion() {
    this.appVersion.getVersionNumber()
    .then(
      (data) => {
      this.appVersionCode = data
      console.log(`A versão do app é`, this.appVersionCode);
      
    },
      (error)=> {
        console.log(`Ocorreu o erro = ${error}`);
        
    })
  }

}
