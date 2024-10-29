import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Promocional } from './model/promocional';

@Injectable({
  providedIn: 'root'
})
export class PromocionalService {

  private baseUrl = environment.serviceURL;
  private promoCollection: AngularFirestoreCollection<Promocional>;

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore
  ) {
    this.promoCollection = this.afs.collection<Promocional>('Promocional');
   }

   public getPromoInfo() {
    return this.promoCollection.snapshotChanges()
    .pipe(
      map(action => {
        return action.map( res => {
          const data = res.payload.doc.data();
          const id = res.payload.doc.id;

          return { id, ...data};
        })
      })

      )
   }


}
