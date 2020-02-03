import {Component, OnInit} from '@angular/core';
import {Task} from "./model/Task";
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/Category";
import {Observable, zip} from "rxjs";
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

    // статистика
    private totalTasksCountInCategory: number;
    private completedCountInCategory: number;
    private uncompletedCountInCategory: number;
    private uncompletedTotalTasksCount: number;

    // показать/скрыть статистику
    private showStat = true;

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
        this.updateTasksAndStat();

    }

    // удаление категории
    private onDeleteCategory(category: Category) {
        this.dataHandler.deleteCategory(category.id).subscribe(cat => {
            this.selectedCategory = null; // открываем категорию "Все"
            this.onSearchCategory(null);
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
            this.updateTasksAndStat();
        });

    }

    // удаление задачи
    private onDeleteTask(task: Task) {
        this.dataHandler.deleteTask(task.id).subscribe(cat => {
            this.updateTasksAndStat();
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
            this.updateTasksAndStat();
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

    // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
    private updateTasksAndStat() {

        this.updateTasks(); // обновить список задач

        // обновить переменные для статистики
        this.updateStat();

    }

    // обновить статистику
    private updateStat() {
        zip(
            this.dataHandler.getTotalCountInCategory(this.selectedCategory),
            this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
            this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
            this.dataHandler.getUncompletedTotalCount())

            .subscribe(array => {
                this.totalTasksCountInCategory = array[0];
                this.completedCountInCategory = array[1];
                this.uncompletedCountInCategory = array[2];
                this.uncompletedTotalTasksCount = array[3]; // нужно для категории Все
            });
    }

    // показать-скрыть статистику
    private toggleStat(showStat: boolean) {
        this.showStat = showStat;
    }


}
