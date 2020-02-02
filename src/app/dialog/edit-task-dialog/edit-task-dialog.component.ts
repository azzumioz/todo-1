import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {Task} from '../../model/Task';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {OperType} from "../OperType";

@Component({
    selector: 'app-edit-task-dialog',
    templateUrl: './edit-task-dialog.component.html',
    styleUrls: ['./edit-task-dialog.component.css']
})

// редактирование/создание задачи
export class EditTaskDialogComponent implements OnInit {

    private categories: Category[];
    private priorities: Priority[];
    private operType: OperType;

    private dialogTitle: string; // заголовок окна
    private task: Task; // задача для редактирования/создания
    // чтобы изменения не сказывались на самой задаче и можно было отменить изменения
    private tmpTitle: string;
    private tmpCategory: Category;
    private tmpPriority: Priority;
    private tmpDate: Date;

    // сохраняем все значения в отдельные переменные

    constructor(
        private dialogRef: MatDialogRef<EditTaskDialogComponent>, // // для возможности работы с текущим диалог. окном
        @Inject(MAT_DIALOG_DATA) private data: [Task, string, OperType], // данные, которые передали в диалоговое окно
        private dataHandler: DataHandlerService, // ссылка на сервис для работы с данными
        private dialog: MatDialog, // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
    ) {
    }

    ngOnInit() {
        this.task = this.data[0]; // задача для редактирования/создания
        this.dialogTitle = this.data[1]; // текст для диалогового окна
        this.operType = this.data[2]; // тип операции

        // инициализация начальных значений (записывам в отдельные переменные
        // чтобы можно было отменить изменения, а то будут сразу записываться в задачу)
        this.tmpTitle = this.task.title;
        this.tmpCategory = this.task.category;
        this.tmpPriority = this.task.priority;
        this.tmpDate = this.task.date;

        this.dataHandler.getAllCategories().subscribe(items => this.categories = items);
        this.dataHandler.getAllPriorities().subscribe(items => this.priorities = items);

    }

// нажали ОК
    private onConfirm(): void {
        // считываем все значения для сохранения в поля задачи
        this.task.title = this.tmpTitle;
        this.task.category = this.tmpCategory;
        this.task.priority = this.tmpPriority;
        this.task.date = this.tmpDate;


// передаем добавленную/измененную задачу в обработчик
// что с ним будут делать - уже на задача этого компонента
        this.dialogRef.close(this.task);

    }

// нажали отмену (ничего не сохраняем и закрываем окно)
    private onCancel(): void {
        this.dialogRef.close(null);
    }

    // нажали Удалить
    private delete() {

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '500px',
            data: {
                dialogTitle: 'Подтвердите действие',
                message: `Вы действительно хотите удалить задачу: "${this.task.title}"?`
            },
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dialogRef.close('delete'); // нажали удалить
            }
        });
    }

    // нажали Выполнить (завершить) задачу
    private complete() {
        this.dialogRef.close('complete');
    }

    // делаем статус задачи "незавершенным" (активируем)
    private activate() {
        this.dialogRef.close('activate');
    }

    private canDelete() : boolean {
        return this.operType === OperType.EDIT;
    }

    private canActivateDesactivate(): boolean {
    return this.operType === OperType.EDIT;
}


}