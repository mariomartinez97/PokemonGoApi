import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';

import { AppMaterialModule } from './app-material.module';


import { PokemonService } from './pokemon.service';
import { PokemonEvolutionService } from './pokemon-evolution.service';
import { ItemsService } from './items.service';


import 'hammerjs';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpModule,
    AppMaterialModule
  ],
  providers: [
    PokemonService,
    PokemonEvolutionService,
    ItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
