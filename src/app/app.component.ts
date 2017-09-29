import { Component } from '@angular/core';

import { PokemonService } from './pokemon.service';
import { PokemonEvolutionService } from './pokemon-evolution.service';

import { Pokemon } from './pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pokemon: Pokemon[] = [];
  pokemonTest: Pokemon[] = [];  
  isLoading: boolean = false;
  error: boolean = false;

  constructor(
    private pokemonService: PokemonService,
    private pokemonEvolutionService: PokemonEvolutionService    
  ) { }

  ngOnInit() {
    
    console.log('AHHHHHHH');
    this.loadMore();
    
  }

  loadMore() {
    console.log("is loading");
    this.isLoading = true;

    this.pokemonService.getPokemon(this.pokemon.length, 151)
      .then(pokemon => {
        pokemon = pokemon.map(p => {
          return p;
        });
        this.pokemon = this.pokemon.concat(pokemon);
        this.isLoading = false;
        this.error = false;
        console.log(this.pokemon);
      })
      .catch(() => {
        this.error = true;
        this.isLoading = false;
        console.log("ERROR");
      });      
      
      this.test();
  }

  test(){
    this.pokemonEvolutionService.getPokemon(this.pokemon.length,9)
    .then(a => {
      this.pokemonTest = a
    });
     
  }
  
}
