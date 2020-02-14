import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SettingsDialogComponent} from "../../dialog/settings-dialog/settings-dialog.component";
import {MatDialog} from "@angular/material";
import {IntroService} from "../../service/intro.service";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

    @Input()
    categoryName: string;

    @Input()
     showStat: boolean;

    @Output()
    toggleStat = new EventEmitter<boolean>(); // показать/скрыть статистику

    @Output()
    toggleMenu = new EventEmitter(); // показать/скрыть меню

    isMobile: boolean;

    constructor(
        private dialog: MatDialog,
        private introService: IntroService,
        private deviceDetector: DeviceDetectorService
    ) {
        this.isMobile = deviceDetector.isMobile();
    }

    ngOnInit() {
    }

     onToggleStat() {
        this.toggleStat.emit(!this.showStat); // вкл/выкл статистику
    }

    // окно настроек
     showSettings() {
        const dialogRef = this.dialog.open(SettingsDialogComponent,
            {
                autoFocus: false,
                width: '500px'
            });

        // никаких действий не требуется после закрытия окна

    }

     showIntroHelp() {
        this.introService.startIntroJS(false);
    }

     onToggleMenu() {
        this.toggleMenu.emit(); // показать/скрыть меню
    }


}