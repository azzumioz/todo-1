import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  @Input()
  categoryName: string;

  @Input()
  private showStat: boolean;

  @Output()
  toggleStat = new EventEmitter<boolean>(); // показать/скрыть статистику

  constructor() {
  }

  ngOnInit() {
  }

  private onToggleStat() {
    this.toggleStat.emit(!this.showStat); // вкл/выкл статистику
  }

}