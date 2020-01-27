import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})

// диалоговое окно подтверждения действия
export class ConfirmDialogComponent implements OnInit {
  private dialogTitle: string;
  private message: string;

  constructor(
      private dialogRef: MatDialogRef<ConfirmDialogComponent>, // для работы с текущим диалог. окном
      @Inject(MAT_DIALOG_DATA) private data: { dialogTitle: string, message: string } // данные, которые передали в диалоговое окно
  ) {
    this.dialogTitle = data.dialogTitle; // заголовок
    this.message = data.message; // сообщение
  }

  ngOnInit() {
  }

  // нажали ОК
  private onConfirm(): void {
    this.dialogRef.close(true);
  }

  // нажали отмену
  private onCancel(): void {
    this.dialogRef.close(false);
  }
}
