import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { NotifierModule } from 'angular-notifier';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { ActorsComponent } from './actors/actors.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActorService } from './services/actor-service/actor.service';
import { RouterModule } from '@angular/router';
import { ActorpageComponent } from './actorpage/actorpage.component';
import { FooterComponent } from './footer/footer.component';
import { NgxPaginationModule, PaginationControlsComponent} from 'ngx-pagination';
import { NzRateModule } from 'ng-zorro-antd/rate';

@NgModule({
  declarations: [						
    AppComponent,
      HomeComponent,
      RegisterComponent,
      HeaderComponent,
      ActorsComponent,
      ActorpageComponent,
      FooterComponent
   ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    BrowserModule.withServerTransition({ appId : 'ng-cli-universal' }),
    NotifierModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
