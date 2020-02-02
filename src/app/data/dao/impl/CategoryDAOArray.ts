import {CategoryDAO} from "../interface/CategoryDAO";
import {Observable, of} from "rxjs";
import {Category} from "../../../model/Category";
import {TestData} from "../../TestData";

export class CategoryDAOArray implements CategoryDAO {

    add(category: Category): Observable<Category> {
        // если id пустой - генерируем его
        if (category.id === null || category.id === 0) {
            category.id = this.getLastIdCategory();
        }
        TestData.categories.push(category);
        return of(category);
    }

    // находит последний id (чтобы потом вставить новую запись с id, увеличенным на 1) - в реальной БД это происходит автоматически
    private getLastIdCategory(): number {
        return Math.max.apply(Math, TestData.categories.map(c => c.id)) + 1;
    }


    delete(id: number): Observable<Category> {
        // перед удалением - нужно в задачах занулить все ссылки на удаленное значение
        // в реальной БД сама обновляет все ссылки (cascade update) - здесь нам приходится делать это вручную (т.к. вместо БД - массив)
        TestData.tasks.forEach(task => {
            if (task.category && task.category.id === id) {
                task.category = null;
            }
        });

        const tmpCategory = TestData.categories.find(t => t.id === id); // удаляем по id
        TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1);

        return of(tmpCategory);

    }

    get(id: number): Observable<Category> {
        return undefined;
    }

    getAll(): Observable<Category[]> {
        return of(TestData.categories);
    }

    search(title: string): Observable<Category>[] {
        return undefined;
    }

    update(category: Category): Observable<Category> {
        const tmpCategory = TestData.categories.find(t => t.id === category.id); // обновляем по id
        TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, category);

        return of(tmpCategory);
    }

}
