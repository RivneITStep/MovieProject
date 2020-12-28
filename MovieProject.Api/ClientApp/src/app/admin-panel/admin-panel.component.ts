import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor() { }

  div1: boolean = false;
  div2: boolean = false;
  div3: boolean = false;

  moviePanelClick() {
    this.div1 = true;
    this.div2 = false;
    this.div3 = false
  }

  actorPanelClick(){
    this.div1 = false;
    this.div2 = true;
    this.div3 = false
  }

  userPanelClick(){
    this.div1 = false;
    this.div2 = false;
    this.div3 = true;
  }

  ngOnInit() {
  }

}
