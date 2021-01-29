import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { MenuItem } from 'primeng/api';
import { ActorModel } from '../models/actor/actor.model';
import { CountryModel } from '../models/country.model';
import { ApiResult } from '../models/result.model';
import { ActorService } from '../services/actor-service/actor.service';
import { CountryService } from '../services/country-service/country.service';

@Component({
  selector: 'app-actor-manager',
  templateUrl: './actor-manager.component.html',
  styleUrls: ['./actor-manager.component.css']
})
export class ActorManagerComponent implements OnInit {

  constructor(private notifier: NotifierService, private actorService: ActorService, private countryService: CountryService) { }

  actors: ActorModel[] = [];
  countries: CountryModel[] = [];
  selectedCountry: CountryModel = new CountryModel();
  selectedActor: ActorModel = new ActorModel();
  displayModal: boolean = false;



  showDialog(id: number) {
    this.displayModal = true;
    this.actorService.getActor(id).subscribe(
      (data: ActorModel) => {
        this.selectedActor = data;
      }
    );
  }

  editActor() {
    if (this.selectedCountry != null) {
      this.selectedActor.country = this.selectedCountry.name;
    }
    this.actorService.editActor(this.selectedActor).subscribe(
      (data: ApiResult) => {
        if (data.status == 200) {
          this.actorService.getActors().subscribe(
            (data: ActorModel[]) => {
              this.actors = data;
            }
          );
          this.notifier.notify('success', 'Edited');
        } else {
          this.notifier.notify('error', 'Server error');
        }
      }
    );
  }

  deleteActor(id: number) {
    this.actorService.deleteActor(id).subscribe(
      (data: ApiResult) => {
        if (data.status == 200) {
          this.actorService.getActors().subscribe(
            (data: ActorModel[]) => {
              this.actors = data;
            }
          );
          this.notifier.notify('success', 'Deleted');
        } else {
          this.notifier.notify('error', 'Server error');
        }
      }
    );

  }

  ngOnInit() {
    this.countryService.getCountries().subscribe(
      (data: CountryModel[]) => {
        this.countries = data;
      }
    );
    this.actorService.getActors().subscribe(
      (data: ActorModel[]) => {
        this.actors = data;
      }
    );
  }

}
