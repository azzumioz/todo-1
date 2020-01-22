import {Observable} from "rxjs";

export interface CommonDAO<T> {

    add(T): Observable<T>;

    get(id: number): Observable<T>;

    delete(id: number): Observable<T>;

    update(T): Observable<T>;

    getAll(): Observable<T>[];

}
