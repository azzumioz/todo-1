import {Injectable} from '@angular/core';
import * as introJs from 'intro.js/intro';

@Injectable({
  providedIn: 'root'
})

// класс для работы с intro (выделение областей страницы и их описание)
export class IntroService {

  // для сохранения в localStorage (хранилище браузера, нежелательно там хранить чувствительные данные)
  private static INTRO_VIEWED_KEY = 'intro-viewed'; // ключ
  private static INTRO_VIEWED_VALUE = 'done'; // значение


  private introJS = introJs(); // объект по работе с intro

  constructor() {
  }

  // показать интро (справку) с подсветкой элементов
  public startIntroJS(checkViewed: boolean) {

    // если ранее пользователь уже посмотрел интро - больше не показывать
    if (checkViewed === true && localStorage.getItem(IntroService.INTRO_VIEWED_KEY) === IntroService.INTRO_VIEWED_VALUE) {
      return;
    }

    this.introJS.setOptions(
        {
          nextLabel: 'след. >',
          prevLabel: '< пред.',
          doneLabel: 'Выход',
          skipLabel: 'Выход',
          exitOnEsc: true,
          exitOnOverlayClick: false
        });

    this.introJS.start();

    // при закрытии - записываем информацию об этом, чтобы в след. раз не открывать intro еще раз
    this.introJS.onexit(_ => localStorage.setItem(IntroService.INTRO_VIEWED_KEY, IntroService.INTRO_VIEWED_VALUE));

  }

}