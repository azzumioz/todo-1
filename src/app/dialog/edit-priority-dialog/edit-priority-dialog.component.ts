import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {OperType} from "../OperType";

@Component({
    selector: 'app-edit-priority-dialog',
    templateUrl: './edit-priority-dialog.component.html',
    styleUrls: ['./edit-priority-dialog.component.css']
})

// создание/редактирование категории
export class EditPriorityDialogComponent implements OnInit {

    dialogTitle: string; // текст для диалогового окна
    priorityTitle: string; // текст для названия приоритета (при реактировании или добавлении)
    operType: OperType;

    constructor(
        private dialogRef: MatDialogRef<EditPriorityDialogComponent>, // // для возможности работы с текущим диалог. окном
        @Inject(MAT_DIALOG_DATA) private data: [string, string, OperType], // данные, которые передали в диалоговое окно
        private dialog: MatDialog // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
    ) {
    }

    ngOnInit() {
        this.priorityTitle = this.data[0];
        this.dialogTitle = this.data[1];
        this.operType = this.data[2];

    }

    // нажали ОК
    onConfirm(): void {
        this.dialogRef.close(this.priorityTitle);
    }

    // нажали отмену (ничего не сохраняем и закрываем окно)
    onCancel(): void {
        this.dialogRef.close(false);
    }

    // нажали Удалить
    delete(): void {

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '500px',
            data: {
                dialogTitle: 'Подтвердите действие',
                message: `Вы действительно хотите удалить приоритет: "${this.priorityTitle}"? (в задачи проставится '')`
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
        return this.operType == OperType.EDIT;
    }
}