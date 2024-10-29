import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.page.html',
  styleUrls: ['./whatsapp.page.scss'],
})
export class WhatsappPage implements OnInit {

  public url = "https://api.whatsapp.com/send?phone=5511979661545&text=Olá,%20jow!";
  constructor() { }

  ngOnInit() {
  }

}
