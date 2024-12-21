import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { MenuModule } from 'primeng/menu';


@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];
    logoutDialog:boolean=false;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    checked: boolean = false;

    constructor(public layoutService: LayoutService,
        private router: Router
        ) { 
            this.items = [
                {
                    label: 'Profile',
                    items: [
                        {
                            label: 'Setting',
                            icon: 'pi pi-cog'
                        },
                        {
                            label: 'Logout',
                            icon: 'pi pi-power-off',
                            command: () => {
                                this.logOut();
                            }
                        }
                    ]
                }
            ];
        }

    set theme(val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            theme: val,
        }));
    }
    get theme(): string {
        return this.layoutService.config().theme;
    }

    set colorScheme(val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            colorScheme: val,
        }));
    }
    get colorScheme(): string {
        return this.layoutService.config().colorScheme;
    }


    changeTheme(theme: string, colorScheme: string) {
        this.theme = theme;
        this.colorScheme = colorScheme;
    }

    isDark:boolean=false;

    changeThemeButton(){
        if(!this.isDark){
            this.changeTheme('lara-dark-indigo', 'dark');
            this.isDark=true;
        }else{
            this.changeTheme('lara-light-indigo', 'light');
            this.isDark=false;
        }
    }

    logOut(){
        this.logoutDialog=true;
    }
    confirmLogout(){
        this.logoutDialog=false;
        this.router.navigate(['/auth/logout']);
    }
}
