import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
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
import { DemoNgZorroAntdModule } from "./ng-zorro-antd.module";
import { MoviesComponent } from './movies/movies.component';
import { MoviepageComponent } from './moviepage/moviepage.component';
import { ApiService } from './core/api.service';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TestComponent } from './test/test.component';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';           
import {TabViewModule} from 'primeng/tabview';
import {ActorManagerComponent} from './actor-manager/actor-manager.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {SplitButtonModule} from 'primeng/splitbutton';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DataViewModule} from 'primeng/dataview';
import {CardModule} from 'primeng/card';
import {ListboxModule} from 'primeng/listbox';
import {CarouselModule} from 'primeng/carousel';
import {MatPaginatorModule} from '@angular/material/paginator';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {TagModule} from 'primeng/tag';
import {ChipModule} from 'primeng/chip';
import { UserComponent } from './user/user.component';

const notifierOptions: NotifierOptions = {
  position: {horizontal: { position: 'right' }, vertical: { position: 'bottom' }}
};

@NgModule({
  declarations: [																
    AppComponent,
      HomeComponent,
      RegisterComponent,
      HeaderComponent,
      ActorsComponent,
      ActorpageComponent,
      FooterComponent,
      MoviesComponent,
      MoviepageComponent,
      LoginComponent,
      AdminPanelComponent,
      TestComponent,
      ActorManagerComponent,
      UserComponent
   ],
  imports: [
    DemoNgZorroAntdModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    BrowserModule.withServerTransition({ appId : 'ng-cli-universal' }),
    NotifierModule.withConfig(notifierOptions),
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    AccordionModule,
    TabViewModule,
    TableModule,
    ButtonModule,
    SplitButtonModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    DataViewModule,
    CardModule,
    ListboxModule,
    CarouselModule,
    MatPaginatorModule,
    VirtualScrollerModule,
    TagModule,
    ChipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
