import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {OperType} from "../OperType";

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})

// создание/редактирование категории
export class EditCategoryDialogComponent implements OnInit {

  constructor(
      private dialogRef: MatDialogRef<EditCategoryDialogComponent>, // для работы с текущим диалог. окном
      @Inject(MAT_DIALOG_DATA) private data: [string, string, OperType], // данные, которые передали в диалоговое окно
      private dialog: MatDialog // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
  ) {
  }

   dialogTitle: string; // текст для диалогового окна
   categoryTitle: string; // текст для названия категории (при реактировании или добавлении)
   operType: OperType; // тип операции

  ngOnInit() {

    // получаем переданные в диалоговое окно данные
    this.categoryTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];

  }

  // нажали ОК
   onConfirm() {
    this.dialogRef.close(this.categoryTitle);
  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
   onCancel() {
    this.dialogRef.close(false);
  }

  // нажали Удалить
   delete() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить категорию: "${this.categoryTitle}"? (сами задачи не удаляются)`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete'); // нажали удалить
      }
    });


  }

   canDelete(): boolean {
    return this.operType === OperType.EDIT;
  }

}