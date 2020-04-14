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
      .subscribe( (mensajes: any[]) => {
        console.log(mensajes);
      });
  }

  ngOnInit(): void {
  }

  enviar_mensaje() {
    console.log(this.mensaje);
  }

}
