import { ActorsComponent } from './actors/actors.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActorpageComponent } from './actorpage/actorpage.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviepageComponent } from './moviepage/moviepage.component';
import { RegisterComponent } from './register/register.component';
import { NotLoginGuard } from './guards/notLogin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'actors', component: ActorsComponent, pathMatch: 'full' },
  { path: 'actors/:id', component: ActorpageComponent, pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent, pathMatch: 'full' },
  { path: 'movies/:id', component: MoviepageComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
