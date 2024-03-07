import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExerciceComponent } from './exercice/exercice.component';
import { FormulaireComponent } from './@candidat/components/formulaire/formulaire.component';
import { ListeTachesComponent } from './@candidat/components/liste-taches/liste-taches.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ExerciceComponent,
    FormulaireComponent,
    ListeTachesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
