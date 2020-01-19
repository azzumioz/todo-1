import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../data/TestData";
import {Task} from "../model/Task";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

    taskSubject = new BehaviorSubject<Task[]>(TestData.tasks);
    categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);

    constructor() {
    }

    // getCategoies(): Category[] {
    //     return TestData.categories;
    // }

    fillTasks() {
        this.taskSubject.next(TestData.tasks);
    }

    fillTasksByCategory(category: Category) {
        const tasks = TestData.tasks.filter(task => task.category === category);
        this.taskSubject.next(tasks);
    }

}

