import {Category} from '../model/Category';
import {Priority} from '../model/Priority';
import {Task} from '../model/Task';

export class TestData {

    static categories: Category[] = [
        {id: 1, title: 'Работа'},
        {id: 2, title: 'Семья'},
        {id: 3, title: 'Учеба'},
        {id: 4, title: 'Отдых'},
        {id: 5, title: 'Спорт'},
        {id: 6, title: 'Еда'},
        {id: 7, title: 'Финансы'},
        {id: 8, title: 'Гаджеты'},
        {id: 9, title: 'Здоровье'},
        {id: 10, title: 'Автомобиль'},
        {id: 11, title: 'Ремонт'},
    ];

    static priorities: Priority[] = [
        {id: 1, title: 'Низкий', color: '#e5e5e5'},
        {id: 2, title: 'Средний', color: '#85D1B2'},
        {id: 3, title: 'Высокий', color: '#F1828D'},
        {id: 4, title: 'Срочно', color: '#F1128D'}
    ];


    static tasks: Task[] = [
        {
            id: 1,
            title: 'Выполнить ремонт',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[9],
            date: new Date('2020-04-10')
        },

        {
            id: 2,
            title: 'Подготовить отчет',
            priority: TestData.priorities[0],
            completed: false,
            category: TestData.categories[0],
            date: new Date('2020-04-11')
        },

        {
            id: 3,
            title: 'Починить кран',
            priority: TestData.priorities[2],
            completed: true,
            category: TestData.categories[1]
        },

        {
            id: 4,
            title: 'Сходить на лыжах',
            priority: TestData.priorities[1],
            completed: false,
            category: TestData.categories[1],
            date: new Date('2020-01-17')
        },
        {
            id: 5,
            title: 'Закончить курс',
            completed: false,
            category: TestData.categories[2]
        },
        {
            id: 6,
            title: 'Подготовить план обучения',
            priority: TestData.priorities[1],
            completed: true,
            category: TestData.categories[2],
            date: new Date('2020-01-11')
        },

        {
            id: 7,
            title: 'Купить билеты',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[3]
        },
        {
            id: 8,
            title: 'Заказать пиццу',
            completed: false,
            category: TestData.categories[5]
        },
        {
            id: 9,
            title: 'Продлить абонемент в бассейн',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[4],
            date: new Date('2020-01-12')
        },
        {
            id: 10,
            title: 'Купить лыжи',
            priority: TestData.priorities[0],
            completed: true,
            category: TestData.categories[4]
        },

        {
            id: 11,
            title: 'Подготовить данные для отчета',
            completed: false
        },

        {
            id: 12,
            title: 'Записаться на курс',
            priority: TestData.priorities[1],
            completed: false,
            category: TestData.categories[2]
        },
        {
            id: 13,
            title: 'Купить продукты',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[5],
            date: new Date('2020-01-10')
        },

        {
            id: 14,
            title: 'Провести собрание',
            completed: true,
            category: TestData.categories[0]
        },

        {
            id: 15,
            title: 'Сдать экзамен',
            priority: TestData.priorities[2],
            completed: true
        },


        {
            id: 16,
            title: 'Положить деньги на депозит',
            priority: TestData.priorities[3],
            completed: false,
            category: TestData.categories[6]
        },

        {
            id: 17,
            title: 'Отдать долг',
            priority: TestData.priorities[2],
            completed: false,
            category: TestData.categories[6]
        },

        {
            id: 18,
            title: 'Посетить терапевта',
            priority: TestData.priorities[3],
            completed: false,
            category: TestData.categories[8],
            date: new Date('2020-02-11')

        },

        {
            id: 19,
            title: 'Обновить ПО',
            priority: TestData.priorities[0],
            completed: false,
            category: TestData.categories[7],
            date: new Date('2020-01-18')

        },

        {
            id: 20,
            title: 'Участие в соревнованиях',
            priority: TestData.priorities[0],
            completed: false,
            category: TestData.categories[4],
            date: new Date('2020-03-17')

        }

    ];

}
