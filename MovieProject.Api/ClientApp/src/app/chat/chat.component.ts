import { Component, OnInit } from '@angular/core';
import { MessageModel } from '../models/requests/message.model';
import { ChatService } from '../services/chat-service/chat.service';
import { UserService } from '../services/user-service/user.service';
import jwt_decode from "jwt-decode";
import { UserModel } from '../models/user.model';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService, private userService: UserService, private apiService: ApiService) {
    this.isLoggedIn = this.apiService.isLoggedIn();
   }

  ngOnInit(): void {
    this.chatService.retrieveMappedObject().subscribe((receivedObj: MessageModel) => { this.addToInbox(receivedObj); });  // calls the service method to get the new messages sent
  }

  msgDto: MessageModel = new MessageModel();
  msgInboxArray: MessageModel[] = [];

  isLoggedIn: boolean;
  isChatHidden: boolean = false;

  send(): void {
    var token = localStorage.getItem('token');
    this.msgDto.user = (jwt_decode(token) as UserModel).email;
    
    if (this.msgDto) {
      if (this.msgDto.user.length == 0 || this.msgDto.user.length == 0) {
        window.alert("Both fields are required.");
        return;
      } else {
        this.chatService.broadcastMessage(this.msgDto);                   // Send the message via a service
      }
    }
  }

  addToInbox(obj: MessageModel) {
    let newObj = new MessageModel();
    newObj.user = obj.user;
    newObj.message = obj.message;
    this.msgInboxArray.push(newObj);

  }

  hideChat(){
    document.getElementById("chat").hidden = true;
    this.isChatHidden = true;
  }

  showChat(){
    document.getElementById("chat").hidden = false;
    this.isChatHidden = false;
  }
}
