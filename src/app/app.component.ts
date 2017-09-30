import { Component } from '@angular/core';

import { PokemonService } from './pokemon.service';
import { PokemonEvolutionService } from './pokemon-evolution.service';

import { Pokemon } from './pokemon';
import { PokemonEvolutions } from './pokemon-evolution';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pokemon: Pokemon[] = [];
  pokemonTest: PokemonEvolutions;  
  pokemons: PokemonEvolutions[] = [];


  isLoading: boolean = false;
  error: boolean = false;
  babyPokemons: string[] = [];
  links : string[] = [];
  showP: boolean = true;
  showB: boolean = false;
  bag: PokemonEvolutions[] = [];

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
      this.test();
  }

  test(){
    for (let j = 4; j < 8; j++){
      this.pokemonEvolutionService.getPokemon(j)
      .then(b => {
        this.pokemonTest = b
          this.pokemons.push(this.pokemonTest);      
        // console.log(this.pokemonTest);
        // console.log("Baby Polemons names");
        // console.log(this.babyPokemons);
        });   
      }     
    }

    addToBag(pokemon: PokemonEvolutions){
      if(!this.bag.some(y => y.species.name == pokemon.species.name)){
        this.bag.push(pokemon);
        console.log(pokemon.species.name + "has been added");
        console.log(this.bag)
        console.log(this.bag[1].evolves_to[0].species.name);                     //read firt evolution name
        console.log(this.bag[1].evolves_to[0].evolution_details[0].min_level);   //read first evolution min level
      }
      else{
         console.log ("This is on the bag");
         }

    }
  
  evolution(){
    // if(this.showP == true){
    //   this.showP = false;
    //   this.showB = true;
    // }
    // if(this.showB == true){
    //   this.showB = false;
    //   this.showP = true;
    // }
    console.log(this.pokemons);    
  }



}

