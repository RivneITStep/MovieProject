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
import { ActorManagerComponent } from './actor-manager/actor-manager.component';
import { FilmManagerComponent } from './film-manager/film-manager.component';
import { NewsManagerComponent } from './news-manager/news-manager.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'actors', component: ActorsComponent, pathMatch: 'full' },
  { path: 'actors/:id', component: ActorpageComponent, pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent, pathMatch: 'full' },
  { path: 'movies/:id', component: MoviepageComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full', canActivate: [NotLoginGuard] },
  { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [NotLoginGuard] },
  { path: 'admin-panel', component: AdminPanelComponent, pathMatch: 'full' },
  { path: 'admin-panel/actor-manager', component: ActorManagerComponent, pathMatch: 'full' },
  { path: 'admin-panel/film-manager', component: FilmManagerComponent, pathMatch: 'full' },
  { path: 'admin-panel/news-manager', component: NewsManagerComponent, pathMatch: 'full' },
  { path: 'test', component: TestComponent, pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
