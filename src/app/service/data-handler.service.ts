import {Injectable} from '@angular/core';
import {Task} from "../model/Task";
import {Observable} from "rxjs";
import {TaskDAOArray} from "../data/dao/impl/TaskDAOArray";
import {CategoryDAOArray} from "../data/dao/impl/CategoryDAOArray";
import {Category} from "../model/Category";
import {Priority} from "../model/Priority";

// класс реализовывает методы, которые нужны frontend'у, т.е. для удобной работы представлений
// напоминает паттер Фасад (Facade) - выдает только то, что нужно для функционала
// сервис не реализовывает напрямую интерфейсы DAO, а использует их реализации (в данном случае массивы)
// может использовать не все методы DAO, а только нужные

@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

    // релизации работы с данными с помощью массива
    // (можно подставлять любые релизации, в том числе с БД. Главное - соблюдать интерфейсы)
    private taskDAOArray = new TaskDAOArray();
    private categoryDAOArray = new CategoryDAOArray();

    constructor() {
    }

    getAllTasks(): Observable<Task[]> {
        return this.taskDAOArray.getAll();
    }

    getAllCategories(): Observable<Category[]> {
        return this.categoryDAOArray.getAll();
    }

    // поиск задач по параметрам
    searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
        return this.taskDAOArray.search(category, searchText, status, priority);
    }
}

