import { HttpClient } from '@angular/common/http';
import * as signalR from '@microsoft/signalr';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MessageModel } from 'src/app/models/requests/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private connection: any = new signalR.HubConnectionBuilder().withUrl("http://localhost:5000/chatsocket")   // mapping to the chathub as in startup.cs
    .configureLogging(signalR.LogLevel.Information)
    .build();
  readonly POST_URL = "http://localhost:5000/api/chat/send"

  private receivedMessageObject: MessageModel = new MessageModel();
  private sharedObj = new Subject<MessageModel>();

  constructor(private http: HttpClient) {
    this.connection.onclose(async () => {
      await this.start();
    });
    this.connection.on("ReceiveOne", (user, message) => { this.mapReceivedMessage(user, message); });
    this.start();
  }


  // Strart the connection
  public async start() {
    try {
      await this.connection.start();
      console.log("connected");
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    }
  }

  private mapReceivedMessage(user: string, message: string): void {
    this.receivedMessageObject.user = user;
    this.receivedMessageObject.message = message;
    this.sharedObj.next(this.receivedMessageObject);
  }

  /* ****************************** Public Mehods **************************************** */

  // Calls the controller method
  public broadcastMessage(msgDto: any) {
    this.http.post(this.POST_URL, msgDto).subscribe(data => console.log(data));
    // this.connection.invoke("SendMessage1", msgDto.user, msgDto.msgText).catch(err => console.error(err));    // This can invoke the server method named as "SendMethod1" directly.
  }

  public retrieveMappedObject(): Observable<MessageModel> {
    return this.sharedObj.asObservable();
  }


}
