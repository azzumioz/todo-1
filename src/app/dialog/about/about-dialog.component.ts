import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.css']
})

// диалоговое окно-описание программы
export class AboutDialogComponent implements OnInit {

  private dialogTitle: string;
  private message: string;

  constructor(
      private dialogRef: MatDialogRef<AboutDialogComponent>, // для работы с текущим диалог. окном
      @Inject(MAT_DIALOG_DATA) private data: { dialogTitle: string, message: string } // данные, которые передали в диалоговое окно
  ) {
    // текст для диалогового окна
    this.dialogTitle = data.dialogTitle; // заголовок
    this.message = data.message; // сообщение
  }


  ngOnInit() {
  }


  // нажали ОК
  private onConfirm(): void {
    this.dialogRef.close(true);
  }

}