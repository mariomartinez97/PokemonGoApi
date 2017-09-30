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
  isLoading: boolean = false;
  error: boolean = false;
  babyPokemons: string[] = [];
  links : string[]=[];

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
    // this.isLoading = true;

    // this.pokemonService.getPokemon(this.pokemon.length, 151)
    //   .then(pokemon => {
    //     pokemon = pokemon.map(p => {
    //       return p;
    //     });
    //     this.pokemon = this.pokemon.concat(pokemon);
    //     this.isLoading = false;
    //     this.error = false;
    //     console.log(this.pokemon);
    //   })
    //   .catch(() => {
    //     this.error = true;
    //     this.isLoading = false;
    //     console.log("ERROR");
    //   });      
      
      this.test();
  }

//1-78 llamadas


//   test(){
//     var i = 1;   
//     var base = 'https://pokeapi.co/api/v2/evolution-chain/';
//     while(i < 3) { 
//       var link = base + i 
//       console.log(link);
//       this.pokemonEvolutionService.getPokemon(link)
//       .then(a => {
//         this.pokemonTest = a
//         this.babyPokemons.push(this.pokemonTest.species.name);
//         console.log(this.pokemonTest);        
//         i++;
//       });        
//     }  
//   }
// }
test(){
    var base = 'https://pokeapi.co/api/v2/evolution-chain/1/';
    var base1 = 'https://pokeapi.co/api/v2/evolution-chain/2/';
    var base2 = 'https://pokeapi.co/api/v2/evolution-chain/3/';
    var base3 = 'https://pokeapi.co/api/v2/evolution-chain/4/';
    var base4 = 'https://pokeapi.co/api/v2/evolution-chain/5/';
    var base5 = 'https://pokeapi.co/api/v2/evolution-chain/6/';
  
    this.links.push(base);    
    this.links.push(base1);    
    this.links.push(base2);    
    this.links.push(base3);    
    this.links.push(base4);    
    this.links.push(base5);    

  for (let j = 0; j < this.links.length; j++){
    console.log(this.links[j]);
    this.pokemonEvolutionService.getPokemon(this.links[j])
    .then(b => {
      this.pokemonTest = b
        this.babyPokemons.push(this.pokemonTest.species.name);      
      console.log(this.pokemonTest);
      });   
    }     
  }
}

