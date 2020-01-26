import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from '../../model/Task';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
      private dialogRef: MatDialogRef<EditTaskDialogComponent>, // для возможности работы с текущим диалог. окном
      @Inject(MAT_DIALOG_DATA) private data: [Task, string], // данные, которые передали в диалоговое окно
      private dataHandler: DataHandlerService, // ссылка на сервис для работы с данными
      private dialog: MatDialog, // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления

  ) { }

  private dialogTitle: string; // заголовок окна
  private task: Task; // задача для редактирования/создания

  ngOnInit() {
    this.task = this.data[0]; // задача для редактирования/создания
    this.dialogTitle = this.data[1]; // текст для диалогового окна
  }

}
