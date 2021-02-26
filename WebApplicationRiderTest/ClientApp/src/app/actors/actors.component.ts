import { Component, OnInit } from '@angular/core';
import { ActorModel } from '../models/actor.model';
import { ActorService } from '../services/actor.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {

  constructor(private actorService: ActorService) { }

  actors: ActorModel[] = [];
  allActors: ActorModel[] = [];
  filters: string[] = [];
  selectedCountry: string[] = [];
  search: string = '';

  onCheckboxChange(e){
    if(e.target.checked){
      this.selectedCountry.push(e.target.value);
      this.actors = this.allActors.filter(t => this.selectedCountry.includes(t.country));
    }else{
      this.selectedCountry.splice(this.selectedCountry.indexOf(e.target.value),1);
      this.actors = this.actors.filter(t => this.selectedCountry.includes(t.country));
    }
    if(this.actors.length === 0){
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
    this.actorService.getActors().subscribe(
      (data: ActorModel[]) => {
        this.allActors = data;
      }
    );
    this.actorService.getFilterList('country').subscribe(
      (data: string[]) => {
        this.filters = data;
      }
    );
    this.resetActors();
  }

}
