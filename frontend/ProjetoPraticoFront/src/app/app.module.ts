import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.routing';

import { MateriaComponent } from './materia/materia.component';
import { VisaomateriaComponent } from './visaomateria/visaomateria.component';
import { HomeComponent } from './home/home.component';
import { CrudComponent } from './componentes/crud/crud.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ContentsComponent } from './contents/contents.component';
import { ContentsUploadComponent } from './contents-upload/contents-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    MateriaComponent,
    VisaomateriaComponent,
    HomeComponent,
    CrudComponent,
    ContentsComponent,
    ContentsUploadComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    routing,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }





