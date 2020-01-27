import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CategoriesComponent} from './views/categories/categories.component';
import {TasksComponent} from './views/tasks/tasks.component';
import {
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule,
    MatPaginatorModule, MatSelectModule,
    MatSortModule,
    MatTableModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { EditTaskDialogComponent } from './dialog/edit-task-dialog/edit-task-dialog.component';
import {FormsModule} from "@angular/forms";
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        CategoriesComponent,
        TasksComponent,
        EditTaskDialogComponent,
        ConfirmDialogComponent
    ],
    imports: [
        BrowserModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatOptionModule,
        MatSelectModule
    ],
    providers: [],
    entryComponents: [
        EditTaskDialogComponent,
        ConfirmDialogComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
