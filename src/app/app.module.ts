import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CategoriesComponent} from './views/categories/categories.component';
import {TasksComponent} from './views/tasks/tasks.component';
import {
    MatButtonModule, MatCheckboxModule, MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatOptionModule,
    MatPaginatorModule, MatSelectModule,
    MatSortModule,
    MatTableModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EditTaskDialogComponent} from './dialog/edit-task-dialog/edit-task-dialog.component';
import {FormsModule} from "@angular/forms";
import {ConfirmDialogComponent} from './dialog/confirm-dialog/confirm-dialog.component';
import {TaskDatePipe} from './pipe/task-date.pipe';
import {registerLocaleData} from "@angular/common";
import localeRu from "@angular/common/locales/ru";
import { EditCategoryDialogComponent } from './dialog/edit-category-dialog/edit-category-dialog.component';
import { FooterComponent } from './views/footer/footer.component';
import { AboutDialogComponent } from './dialog/about/about-dialog.component';
import { HeaderComponent } from './views/header/header.component';
import { StatComponent } from './views/stat/stat.component'

registerLocaleData(localeRu);

@NgModule({
    declarations: [
        AppComponent,
        CategoriesComponent,
        TasksComponent,
        EditTaskDialogComponent,
        ConfirmDialogComponent,
        TaskDatePipe,
        EditCategoryDialogComponent,
        FooterComponent,
        AboutDialogComponent,
        HeaderComponent,
        StatComponent
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
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule
    ],
    providers: [],
    entryComponents: [
        EditTaskDialogComponent,
        ConfirmDialogComponent,
        EditCategoryDialogComponent,
        AboutDialogComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
