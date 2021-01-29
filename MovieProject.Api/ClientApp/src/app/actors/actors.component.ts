import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActorService } from './../services/actor-service/actor.service';
import { Component, OnInit } from '@angular/core';
import { PaginationControlsComponent } from 'ngx-pagination';
import { ActorModel } from '../models/actor/actor.model';
import { SelectItem, SelectItemGroup } from 'primeng/api';
import { ActorFilterModel } from '../models/actor/actor-filter.model';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {

  constructor(private actorService: ActorService, private router: Router) { }

  thisUrl: string;
  actors: ActorModel[] = [];
  count: number;
  page: number = 1;

  //Filtering data
  filterModel: ActorFilterModel = new ActorFilterModel();
  search: string;
  filters: string[] = [];
  selectedFilters: string[] = [];

  searchActor(){
    if(this.search.length == 0){
      this.resetActors();
    }else{
      this.actors = this.actors.filter(
        t => {
          let temp = t.name.toLocaleLowerCase() + ' ' + t.surname.toLocaleLowerCase() + ' ' + t.country.toLocaleLowerCase();
          return temp.includes(this.search.toLocaleLowerCase());
        }
      );
    }
  }

  selectFilter(filter: string){
    this.selectedFilters.push(filter);
    this.filters.splice(this.filters.indexOf(filter),1);
    if(this.selectedFilters.length > 1){
      this.resetActors();
      let temp = this.actors.filter(s => this.selectedFilters.includes(s.country));
      this.actors = this.actors.concat(temp);
    }else{
      this.actors = this.actors.filter(s => this.selectedFilters.includes(s.country));
    }
    
    
    if(this.selectedFilters.length == 0){
      this.resetActors();
    }
  }

  removeFilter(filter: string){
    this.selectedFilters.splice(this.selectedFilters.indexOf(filter),1);
    this.filters.push(filter);
    this.actors = this.actors.filter(s => this.selectedFilters.includes(s.country));
    if(this.selectedFilters.length == 0){
      this.resetActors();
    }
  }

  resetActors(){
    this.actorService.getActors().subscribe(
      (data: ActorModel[]) => {
        this.actors = data;
      }
    );
  }

  ngOnInit() {
    this.thisUrl = this.router.url;
    this.actorService.getActors().subscribe(
      (data: ActorModel[]) => {
        this.actors = data;
      }
    );
    
    this.actorService.getFilterList('country').subscribe(
      (data: string[]) => {
        this.filters = data;
      }
    );

    
  }

}
