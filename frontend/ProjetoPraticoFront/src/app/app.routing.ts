import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContentsComponent } from './contents/contents.component';
import { MateriaComponent } from './materia/materia.component';
import { VisaomateriaComponent } from './visaomateria/visaomateria.component';
import { ContentsUploadComponent } from './contents-upload/contents-upload.component';
const APP_ROUTES: Routes = [
        {path: 'materia', component: MateriaComponent},
        {path: 'visaomateria/:id/:nome', component: VisaomateriaComponent},
        {path: 'contents/:id/:nome', component: ContentsComponent},
        {path: 'contents-upload/:id/:key', component: ContentsUploadComponent},
        {path: '', component: HomeComponent}

];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(APP_ROUTES);