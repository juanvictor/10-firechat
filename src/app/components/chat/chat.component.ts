import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensaje = '';

  constructor(
    public cs: ChatService
  ) {
    this.cs.cargarMensajes()
      .subscribe();
  }

  ngOnInit(): void {
  }

  enviar_mensaje() {
    console.log(this.mensaje);

    if ( this.mensaje.length === 0) {
      return;
    }

    this.cs.agregarMensaje( this.mensaje )
      .then( () => this.mensaje = '' )
      .catch( (err) => console.error('Error al enviar', err) );
  }

}
