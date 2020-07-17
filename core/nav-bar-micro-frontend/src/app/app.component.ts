import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public items = new Array();

  constructor() { }

  ngOnInit() {
  }

  public onClickHome(): void {}

  public onClickPlaylistItem(item: any): void {}

}
