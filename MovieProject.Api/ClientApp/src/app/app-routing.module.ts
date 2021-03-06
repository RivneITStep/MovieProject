import { ActorsComponent } from './actors/actors.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActorpageComponent } from './actorpage/actorpage.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviepageComponent } from './moviepage/moviepage.component';
import { RegisterComponent } from './register/register.component';
import { NotLoginGuard } from './guards/notLogin.guard';
import { AdminGuard } from './guards/admin.guard';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TestComponent } from './test/test.component';
import { ActorManagerComponent } from './actor-manager/actor-manager.component';
import { UserComponent } from './user/user.component';
import { CinemaComponent } from './cinema/cinema.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'actors', component: ActorsComponent, pathMatch: 'full' },
  { path: 'actors/:id', component: ActorpageComponent, pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent, pathMatch: 'full' },
  { path: 'movies/:id', component: MoviepageComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full', canActivate: [NotLoginGuard] },
  { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [NotLoginGuard] },
  { path: 'test', component: TestComponent, pathMatch: 'full'},
  { path: 'admin-panel', component: ActorManagerComponent, pathMatch: 'full', canActivate: [AdminGuard] },
  { path: 'user/profile', component: UserComponent, pathMatch: 'full'},
  { path: 'movies/:id/watch', component: CinemaComponent, pathMatch: 'full'},
  { path: 'chat', component: ChatComponent, pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
