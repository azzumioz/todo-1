import {Component, OnInit} from '@angular/core';
import {Task} from "./model/Task";
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/Category";
import {Observable} from "rxjs";
import {Priority} from "./model/Priority";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styles: []
})
export class AppComponent implements OnInit {
    title = 'Todo';
    tasks: Task[];
    categories: Category[];
    priorities: Priority[];

    private selectedCategory: Category = null;

    // поиск
    private searchTaskText = ''; // текущее значение для поиска задач
    private searchCategoryText = ''; // текущее значение для поиска категорий

    // фильтрация
    private priorityFilter: Priority;
    private statusFilter: boolean;

    constructor(
        private dataHandler: DataHandlerService, // фасад для работы с данными
    ) {
    }

    ngOnInit(): void {
        this.dataHandler.getAllPriorities().subscribe(categories => this.priorities = categories);
        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
        this.onSelectCategory(null);
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
            this.onSearchCategory(this.searchCategoryText);
        });
    }

    // обновлении категории
    private onUpdateCategory(category: Category) {
        this.dataHandler.updateCategory(category).subscribe(() => {
            this.onSearchCategory(this.searchCategoryText);
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

    // фильтрация задач по приоритету
    private onFilterTasksByPriority(priority: Priority) {
        this.priorityFilter = priority;
        this.updateTasks();
    }


    private updateTasks() {
        this.dataHandler.searchTasks(
            this.selectedCategory,
            this.searchTaskText,
            this.statusFilter,
            this.priorityFilter
        ).subscribe((tasks: Task[]) => {
            this.tasks = tasks;
        });
    }

    // добавление задачи
    private onAddTask(task: Task) {
        this.dataHandler.addTask(task).subscribe(result => {
            this.updateTasks();
        });

    }

    // добавление категории
    private onAddCategory(title: string) {
        this.dataHandler.addCategory(title).subscribe(() => this.updateCategories());
    }

    private updateCategories() {
        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    }

    // поиск категории
    private onSearchCategory(title: string) {
        this.searchCategoryText = title;
        this.dataHandler.searchCategories(title).subscribe(categories => {
            this.categories = categories;
        });
    }

}
