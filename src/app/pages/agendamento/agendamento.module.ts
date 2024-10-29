import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendamentoPageRoutingModule } from './agendamento-routing.module';

import { AgendamentoPage } from './agendamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AgendamentoPageRoutingModule
  ],
  declarations: [AgendamentoPage]
})
export class AgendamentoPageModule {}
