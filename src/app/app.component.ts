import {Component, OnInit} from '@angular/core';
import {Task} from "./model/Task";
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/Category";

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

        this.dataHandler.searchTasks(
            this.selectedCategory,
            null,
            null,
            null
        ).subscribe(tasks => {
            this.tasks = tasks;
        });

    }

    private onUpdateTask (task: Task) {
        console.log(task);
    }

}
