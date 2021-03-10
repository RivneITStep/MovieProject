import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgxSpinnerComponent, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import {ToastModule} from 'primeng/toast';
import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { RegisterComponent } from './register/register.component';
import { NoLoginGuard } from './guards/nologin.guard';
import { ActorsComponent } from './actors/actors.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ActorComponent } from './actor/actor.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import {RatingModule} from 'primeng/rating';
import {ButtonModule} from 'primeng/button';
import {Table, TableModule} from 'primeng/table';
import {Carousel, CarouselModule} from 'primeng/carousel';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ProfileComponent } from './profile/profile.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { CinemaComponent } from './cinema/cinema.component';
import { WatchComponent } from './watch/watch.component';


@NgModule({
  declarations: [											
    AppComponent,
    HomeComponent,
      HeaderComponent,
      LoginComponent,
      RegisterComponent,
      ActorsComponent,
      ActorComponent,
      MoviesComponent,
      MovieComponent,
      ProfileComponent,
      CinemaComponent,
      WatchComponent
   ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    ToastModule,
    TableModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    CommonModule,
    DialogModule,
    ConfirmDialogModule,
    HttpClientModule,
    ButtonModule,
    CarouselModule,
    RatingModule,
    ToggleButtonModule,
    NgxFileDropModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent, canActivate: [NoLoginGuard]},
      { path: 'register', component: RegisterComponent, canActivate: [NoLoginGuard]},
      { path: 'actors', component: ActorsComponent},
      { path: 'actors/:id', component: ActorComponent},
      { path: 'movies', component: MoviesComponent},
      { path: 'movies/:id', component: MovieComponent},
      { path: 'profile', component: ProfileComponent },
      { path: 'cinema', component: CinemaComponent },
      { path: 'cinema/:id', component: WatchComponent}
    ])
  ],
  providers: [
    MessageService,
    NgxSpinnerService,
    FilterService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
