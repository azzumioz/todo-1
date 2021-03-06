import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";
import {MatDialog} from "@angular/material";
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {OperType} from "../../dialog/OperType";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    @Input()
     categories: Category[];

    // категории с кол-вом активных задач для каждой из них
    @Input('categoryMap')
    set setCategoryMap(categoryMap: Map<Category, number>) {
        this.selectedCategoryMap = categoryMap;
    }

// кол-во невыполненных задач всего
    @Input()
    uncompletedTotal: number;

    @Output()
    selectCategory = new EventEmitter<Category>();

    @Output()
    deleteCategory = new EventEmitter<Category>();

    @Output()
    updateCategory = new EventEmitter<Category>();

    @Output()
    addCategory = new EventEmitter<string>();

    // поиск категории
    @Output()
    searchCategory = new EventEmitter<string>(); // передаем строку для поиска

    @Input()
    selectedCategory: Category;

    // для отображения иконки редактирования при наведении на категорию
     indexMouseMove: number;
     searchCategoryTitle: string; // текущее значение для поиска категорий

     selectedCategoryMap: Map<Category, number>; // список всех категорий и кол-во активных задач

     isMobile: boolean;
     isTablet: boolean;

    constructor(
        private dataHandler: DataHandlerService,
        private dialog: MatDialog,
        private deviceService: DeviceDetectorService // для определения типа устройства
    ) {
        this.isMobile = deviceService.isMobile();
        this.isTablet = deviceService.isTablet();
    }

    ngOnInit() {
        //this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    }

    showTasksByCategory(category: Category): void {

        if (this.selectedCategory === category) {
            return;
        }

        this.selectedCategory = category; // сохраняем выбранную категорию
        // вызываем внешний обработчик и передаем туда выбранную категорию
        this.selectCategory.emit(this.selectedCategory);

    }

    // сохраняет индекс записи категории, над который в данный момент проходит мышка (и там отображается иконка редактирования)
     showEditIcon(index: number) {
        this.indexMouseMove = index;

    }

    // диалоговое окно для редактирования категории
     openEditDialog(category: Category) {

        // открытие диалогового окна
        const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
            data: [category.title, 'Редактирование категории', OperType.EDIT],
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'delete') {
                this.deleteCategory.emit(category);
                return;
            }

            if (typeof (result) === 'string') { // нажали сохранить
                category.title = result as string;

                this.updateCategory.emit(category); // вызываем внешний обработчик
                return;
            }

        });


    }

    // диалоговое окно для добавления категории
     openAddDialog() {

        const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
            data: ['', 'Добавление категории', OperType.ADD],
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.addCategory.emit(result as string); // вызываем внешний обработчик
            }
        });
    }

    // поиск категории
     search() {
        if (this.searchCategoryTitle == null) {
            return;
        }
        this.searchCategory.emit(this.searchCategoryTitle);
    }

}
