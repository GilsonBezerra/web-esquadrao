import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Agendamento } from '../interfaces/agendamento';
import { Servico } from '../interfaces/servico';
import { AuthService } from './auth.service';
import { Profissional } from './model/profissional';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private url = environment.endPoint;
  private baseUrl = environment.serviceURL;
  private agendamentoCollection: AngularFirestoreCollection<Agendamento>;
  private servicoCollection: AngularFirestoreCollection<Servico>;
  private formaPagamentoCollection: AngularFirestoreCollection;
  private agendamento: Agendamento;


  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
    private authService: AuthService
  ) { 
    this.agendamentoCollection = this.afs.collection<Agendamento>('Agendamento');
    this.servicoCollection = this.afs.collection<Servico>('Servico');
    this.formaPagamentoCollection = this.afs.collection('Pagamento');
  }

  public getAgendamentos() {
    // return this.http.get<Agendamento[]>(`${this.url}/agendamento`);
    return this.agendamentoCollection.snapshotChanges()
    .pipe(
      map( actions => {
          return actions.map( a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;

              return { id, ...data };
          })
      })
    )
  }

  // SpringBoot
  // public getServico(): Observable<Servico[]> {
  //   return this.http.get<Servico[]>(`${this.baseUrl}/v1/servicos`)
  //   .pipe(
  //     map(res => res)
  //   )
  // }

  // FireBase
  public getServico() {
    return this.servicoCollection.snapshotChanges()
    .pipe(
      map( actions => {
        return actions.map( s => {
          const data = s.payload.doc.data();
          const id = s.payload.doc.id;

          return { id, ...data};
        })
      })
    )
  }

  public getProfissionais(): Observable<Profissional[]> {
    return this.http.get<Profissional[]>(`${this.baseUrl}/v1/profissionais`)
    .pipe(
      map(res => res)
    )
  }

  public postServico(servico: Servico) {
    return this.servicoCollection.add(servico);
  }

  public getFormaPagamento() {
    return this.formaPagamentoCollection.snapshotChanges()
    .pipe(
      map( actions => {
        return actions.map(f => {
          const data = f.payload.doc.data();
          const id = f.payload.doc.id;

          return { id, ...data};
        })
      })
    )
  }


  public getAgendamentoById(id: string) {

  }

  public postAgendamento(agendamento: Agendamento){
    const headers = new HttpHeaders({
      'Content-type' : 'Application/json'
    })
    // this.agendamento.userId = this.authService.getAuth().currentUser
    // return this.http.post(`${this.url}/agendamento`, agendamento, {headers});
    return this.agendamentoCollection.add(agendamento);
  }

  public deleteAgendamento(id: string) {
    // return this.http.delete(`${this.url}/agendamento/${id}`);
    return this.agendamentoCollection.doc(id).delete();
  }

  public alterarAgendamento(id: string, agendamento: Agendamento) {
    return this.agendamentoCollection.doc<Agendamento>(id).update(agendamento);
  }

}
