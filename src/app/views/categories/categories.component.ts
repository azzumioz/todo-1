import {Component, Input, OnInit} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    @Input()
    private categories: Category[];

    private selectedCategory: Category;

    constructor(private dataHandler: DataHandlerService) {
    }

    ngOnInit() {
        //this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    }

    showTasksByCategory(category: Category) {
        //     this.selectedCategory = category;
        //     this.dataHandler.fillTasksByCategory(category);
    }
}
