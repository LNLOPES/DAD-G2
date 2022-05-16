import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { MateriaComponent } from './materia/materia.component';
import { VisaomateriaComponent } from './visaomateria/visaomateria.component';
const APP_ROUTES: Routes = [
        {path: 'materia', component: MateriaComponent},
        {path: 'visaomateria', component: VisaomateriaComponent},
        {path: '', component: HomeComponent}

];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(APP_ROUTES);