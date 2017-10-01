import { Component } from '@angular/core';

import { PokemonService } from './pokemon.service';
import { PokemonEvolutionService } from './pokemon-evolution.service';
import { ItemsService } from './items.service';

import { Pokemon } from './pokemon';
import { PokemonEvolutions } from './pokemon-evolution';
import { Item } from './items';


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
  items : Item [] = [];

  constructor(
    private pokemonService: PokemonService,
    private pokemonEvolutionService: PokemonEvolutionService,
    private itemsService: ItemsService
  ) { }

  ngOnInit() {
    
    console.log('AHHHHHHH');
    console.log(Math.floor(Math.random() * 6) + 2);
    
    
    this.loadMore();
    
  }

  loadMore() {
    console.log("is loading");
      this.test();
      this.getItems();
  }

  test(){
    for (let j = 6; j < 8; j++){
      this.pokemonEvolutionService.getPokemon(j)
      .then(b => {
        this.pokemonTest = b
          this.pokemons.push(this.pokemonTest);      
        console.log(this.pokemonTest);
        // console.log("Baby Polemons names");
        // console.log(this.babyPokemons);
        });   
      }     
    }

    addToBagPokemons(pokemon: PokemonEvolutions){
      if(!this.bag.some(y => y.species.name == pokemon.species.name)){
        //check if there is a min level or item to be able to evolve
        if(pokemon.evolves_to[0].evolution_details[0].min_level != null){
          pokemon.species.actualLevel = this.getRandomInt(1,pokemon.evolves_to[0].evolution_details[0].min_level);
          this.bag.push(pokemon);
          console.log(pokemon.species.name + "has been added");
          console.log(this.bag)
        }
        else{
          console.log("No min level")
          this.bag.push(pokemon);          
        }
        //console.log(this.bag[1].evolves_to[0].species.name);                     //read firt evolution name
        //console.log(this.bag[1].evolves_to[0].evolution_details[0].min_level);   //read first evolution min level
      }
      else{
         console.log ("This is on the bag");
         }

    }
  
  evolution(index){
    if(this.bag[index].evolves_to[0].evolution_details[0].min_level == this.bag[index].species.actualLevel){
      //Evolve
    }
    else{
      //Tell the user it needs more rare candy or a special item
    }
    
    console.log(this.pokemons);    
  }

  getItems(){
    this.itemsService.getItems(45,52)
    .then(res => {
      this.items = res
      console.log(this.items);
    });


  }

   getRandomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



}

