import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from '../core/api.service';
import { RegisterModel } from '../models/register.model';
import { ApiResult } from '../models/result.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private apiService: ApiService, private messageService: MessageService) { }

  confirm: string = null;
  user: RegisterModel = new RegisterModel();

  Register(){
    if(this.user.email == null || this.user.password == null){
      this.messageService.add({severity:'error', summary:'Notify', detail:'Some fields are empty'});
    }else if(this.confirm == null){
      this.messageService.add({severity:'error', summary:'Notify', detail:'Please confirm password'});
    }else if(this.user.password != this.confirm){
      this.messageService.add({severity:'error', summary:'Notify', detail:'Password is not matching'});
    }else{
      this.apiService.SignUp(this.user).subscribe(
        (data : ApiResult) => {
          if(data.status == 200){
            this.messageService.add({severity:'success', summary:'Notify', detail:'Registered'});
          }else{
            this.messageService.add({severity:'error', summary:'Notify', detail:'Server error'});
          }
        }
      );
    }
  }

  ngOnInit() {
  }

}
