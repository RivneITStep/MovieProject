import { AotSummaryResolver } from '@angular/compiler';
import { Component } from '@angular/core';
import AOS from 'aos';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService } from 'primeng/api';
import { ApiService } from './core/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  isAdmin: boolean;

  public constructor(private spinner: NgxSpinnerService, private apiService: ApiService){ }

  ngOnInit(){
    AOS.init();
    this.isAdmin = this.apiService.isAdmin();
  }
}
