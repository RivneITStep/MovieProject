import { AotSummaryResolver } from '@angular/compiler';
import { Component } from '@angular/core';
import AOS from 'aos';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  public constructor(private spinner: NgxSpinnerService){ }

  ngOnInit(){
    AOS.init();
  }
}
