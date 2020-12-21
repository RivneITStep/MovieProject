import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorModel } from '../Models/actor.model';
import { ActorService } from '../services/actor-service/actor.service';

@Component({
  selector: 'app-actorpage',
  templateUrl: './actorpage.component.html',
  styleUrls: ['./actorpage.component.css']
})
export class ActorpageComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute, private actorService: ActorService ) { 
    this.id = activateRoute.snapshot.params['id'];
  }

  id: number;
  thisUrl: string;
  actor: ActorModel;

  ngOnInit() {
  }

}
