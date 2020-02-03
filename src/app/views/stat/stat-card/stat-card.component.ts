import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css']
})

// "presentational component": отображает полученные данные
// карточка для отображения статистики
export class StatCardComponent implements OnInit {

  @Input()
  completed = false;

  @Input()
  iconName: string;

  @Input()
  count1: any; // можно передавать любой тип для отображения (число, текст и пр.)

  @Input()
  countTotal: any;

  @Input()
  title: string;

  constructor() {
  }

  ngOnInit() {
  }

}
