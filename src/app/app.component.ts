import {Component, OnInit} from '@angular/core';
import {Task} from "./model/Task";
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/Category";
import {Observable} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styles: []
})
export class AppComponent implements OnInit {
    title = 'Todo';
    tasks: Task[];
    categories: Category[];

    private selectedCategory: Category = null;

    // поиск
    private searchTaskText = ''; // текущее значение для поиска задач

    // фильтрация
    private statusFilter: boolean;

    constructor(
        private dataHandler: DataHandlerService, // фасад для работы с данными
    ) {
    }

    ngOnInit(): void {
        this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    }

    // изменение категории
    private onSelectCategory(category: Category) {
        this.selectedCategory = category;
        this.updateTasks();
    }

    // удаление категории
    private onDeleteCategory(category: Category) {
        this.dataHandler.deleteCategory(category.id).subscribe(cat => {
            this.selectedCategory = null; // открываем категорию "Все"
            this.onSelectCategory(this.selectedCategory);
        });
    }

    // обновлении категории
    private onUpdateCategory(category: Category) {
        this.dataHandler.updateCategory(category).subscribe(() => {
            this.onSelectCategory(this.selectedCategory);
        });
    }

    // обновление задачи
    private onUpdateTask(task: Task) {
        this.dataHandler.updateTask(task).subscribe(cat => {
            this.updateTasks()
        });

    }

    // удаление задачи
    private onDeleteTask(task: Task) {
        this.dataHandler.deleteTask(task.id).subscribe(cat => {
            this.updateTasks()
        });
    }

    // поиск задач
    private onSearchTasks(searchString: string) {
        this.searchTaskText = searchString;
        this.updateTasks();
    }

    // фильтрация задач по статусу (все, решенные, нерешенные)
    private onFilterTasksByStatus(status: boolean) {
        this.statusFilter = status;
        this.updateTasks();
    }

    private updateTasks() {
        this.dataHandler.searchTasks(
            this.selectedCategory,
            this.searchTaskText,
            this.statusFilter,
            null
        ).subscribe((tasks: Task[]) => {
            this.tasks = tasks;
        });
    }

}
