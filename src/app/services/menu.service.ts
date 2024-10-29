import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Menu } from './model/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private baseUrl = environment.serviceURL;
  private menuCollection: AngularFirestoreCollection<Menu>;

  constructor( 
    private http: HttpClient,
    private afs: AngularFirestore
    ) { 
      this.menuCollection = this.afs.collection<Menu>('Menu');
      
    }

  // Spring
  // public getMenu(): Observable<Menu[]> {
  //   return this.http.get<Menu[]>(`${this.baseUrl}/v1/menu`)
  //   .pipe(
  //     map( res => res)
  //   )
  // }

  //Firebase
  public getMenu() {
    return this.menuCollection.snapshotChanges()
    .pipe(
      map( action => {
        return action.map( res => {
          const data = res.payload.doc.data();
          const id = res.payload.doc.id;

          return { id, ...data};
        })
      })
    )
  }


}
