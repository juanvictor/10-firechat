import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
// import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Mensaje } from '../interface/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];

  public usuario: any = {};

  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe( user => {
      console.log('Estado del usuario: ', user);

      if ( !user ) {
        return;
      }

      this.usuario.nombre = user.displayName;
      this.usuario.uid    = user.uid;
    });
  }

  login( proveedor: string ) {
    if ( proveedor === 'google') {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } else {
      this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }
  }

  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc')
                                                                            .limit(5));

    return this.itemsCollection.valueChanges()
            .pipe(
              map( (mensajes: Mensaje[]) => {
                console.log(mensajes);

                this.chats = [];

                for ( const mensaje of mensajes ) {
                  this.chats.unshift( mensaje );
                }

                // this.chats = mensajes;

                return this.chats;
              })
            );
  }

  agregarMensaje( texto: string ) {
    const mensaje: Mensaje = {
      nombre: 'Demo',
      mensaje: texto,
      fecha: new Date().getTime()
    };

    return this.itemsCollection.add( mensaje );
  }
}
