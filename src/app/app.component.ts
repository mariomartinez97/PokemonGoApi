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
  bagItems: Item[] = [];
  testP :Pokemon;

  
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
      this.getPokemons();
      this.getItems();
  }

  getPokemons(){
    for (let j = 22; j < 28; j++){
      this.pokemonEvolutionService.getPokemon(j)
      .then(b => {
        this.pokemonTest = b
          this.pokemons.push(this.pokemonTest);   
          console.log(this.pokemons);
          this.pokemonInfo();
        // console.log(this.pokemonTest);
        // console.log("Baby Polemons names");
        // console.log(this.babyPokemons);
        });   
      }     

    // this.pokemonEvolutionService.getPokemon(19)
    // .then(b => {
    //   this.pokemonTest = b
    //     this.pokemons.push(this.pokemonTest);   
    //     if(this.pokemonTest.evolves_to[0].evolution_details[0].evolves_to == null){
    //     console.log("Should be null");
    //     }
    //     else{
    //       console.log("didnt work");
    //       console.log(this.pokemonTest.evolves_to[0].evolution_details[0]);
    //     }
    //   // console.log("Baby Polemons names");
    //   // console.log(this.babyPokemons);
    //   });   
    }

    addToBagPokemons(pokemon: PokemonEvolutions){
    let deepCopy: PokemonEvolutions ;
  
      if(!this.bag.some(y => y.species.name == pokemon.species.name)){
        //check if there is a min level or item to be able to evolve
        if(pokemon.species.number_of_Evolutions != null){
          
          pokemon.species.actualLevel = this.getRandomInt(1,pokemon.evolves_to[0].evolution_details[0].min_level);
          deepCopy = JSON.parse(JSON.stringify(pokemon));
          this.bag.push(deepCopy);
          this.checkItemAdded();
          console.log(pokemon.species.name + "has been added");
          console.log(deepCopy);
          // console.log(this.bag)
          // x = JSON.parse(JSON.stringify(que quiero copiar)) deep copy
        }
        else{
          console.log("No min level")
          this.bag.push(pokemon);          
        }
      }
      else{
         console.log ("This is on the bag");
         }

    }
  
  checkEvolution(index){
      //Check if has evolutions
    if(this.bag[index].species.number_of_Evolutions == 1 || this.bag[index].species.number_of_Evolutions == 2){
      
      //Check if it evolves with and item or not ---> should be able to check just for item 1



      //Check if its on the second evolution stop evolutions     RESOLVER .species.status;
      if(this.bag[index].evolves_to[0].evolution_details[0].min_level <= this.bag[index].species.actualLevel
        && this.bag[index].species.current_pokemon == 2){
          //Evolve
          this.bag[index].species.name = this.bag[index].evolves_to[0].species.name;
          this.bag[index].species.current_pokemon ++;
          this.bag[index].species.status = "No more evolutions";
          //tell the user no more evolutions .species.status                         
      }
      //Check if its on the first evolution going to the second one     RESOLVER .species.status;
      else if(this.bag[index].evolves_to[0].evolution_details[0].min_level <= this.bag[index].species.actualLevel
      && this.bag[index].species.current_pokemon == 1){
          //Evolve
          this.bag[index].species.name = this.bag[index].evolves_to[0].species.name;
          this.bag[index].species.current_pokemon ++;

          if(this.bag[index].species.number_of_Evolutions == 2){
            if(this.bag[index].evolves_to[0].evolves_to[0].evolution_details[0].min_level == null){
              //Tell the user he needs a specific item for the second evolution
              this.bag[index].species.item1 = this.bag[index].species.item2;
            }
            this.bag[index].evolves_to[0].evolution_details[0].min_level = this.bag[index].evolves_to[0].evolves_to[0].evolution_details[0].min_level; 
            this.bag[index].evolves_to[0].species.name = this.bag[index].evolves_to[0].evolves_to[0].species.name;   
            console.log(this.bag[index]);
          }
          else{ this.bag[index].species.status = "No more evolutions"; }
      }
        
    }
    else{
      console.log("Cant evolve yet");
      //this.evolutionText = 'You need _____ item to evolve this pokemon';
      //Tell the user it needs more rare candy or a special item
    }        
    //console.log(this.pokemons);    
  }

  test(index: number){
    
    if(this.bag[index].evolves_to[0].evolution_details[0].min_level == this.bag[index].species.actualLevel){
      console.log("Ready to evolve");
      console.log(this.bag[index]);
      this.bag[index].species.status = 'Evolve';      
    }
    this.bag[index].species.actualLevel ++;
    // console.log(this.bag[index].evolves_to[0].evolution_details[0].min_level);
    if(this.bag[index].evolves_to[0].evolution_details[0].min_level == this.bag[index].species.actualLevel){
      console.log("Ready to evolve");
      this.bag[index].species.status = 'Evolve';            
      //this.bag[index].evolution_info.status = 'Evolve Pokemon';      
    }
  }

  checkItemAdded(){
    let index: number = this.bag.length - 1;
    if(this.bag[index].evolves_to[0].evolution_details[0].min_level == this.bag[index].species.actualLevel){
      this.bag[index].species.status = 'Evolve';
    }
    if(this.bag[index].evolves_to[0].evolution_details[0].min_level == null){
      this.bag[index].species.status = 'Evolve';
    }
  }

  getItems(){
    this.itemsService.getItems(45,52)    
    .then(res => {
      this.items = res      
      // console.log(this.items);
      this.updateItems();
    });
  }
  private updateItems(){
    this.items.forEach(element => {
      element.quantity = 1;      
      // console.log(element);
    });
  }

  private pokemonInfo(){
    let counter: number = 0;  
    let deepCopy: string;  
    this.pokemons.forEach(element => {
      element.species.status = 'Need more candy to evolve';
      element.species.current_pokemon = 1;
      if(element.evolves_to[0] == null){
        element.species.number_of_Evolutions = 0;
        // element.evolution_info.status = 'No more evolutions'
      }
      else if(element.evolves_to[0].evolves_to[0] != null){
        
        element.species.number_of_Evolutions = 2;

        if(element.evolves_to[0].evolves_to[0].evolution_details[0].min_level == null){
          //element.species.item2 = element.evolves_to[0].evolves_to[0].evolution_details[0].item.name;
          if(element.evolves_to[0].evolves_to[0].evolution_details[0].item != null)
          deepCopy = JSON.parse(JSON.stringify(element.evolves_to[0].evolves_to[0].evolution_details[0].item.name));
          element.species.item2 = deepCopy;
        }
      }
      else if(element.evolves_to[0].evolution_details[0] != null){
        // element.evolves_to.evolves_to[0];
        element.species.number_of_Evolutions = 1; 

        if(element.evolves_to[0].evolution_details[0].min_level == null){
          if(element.evolves_to[0].evolution_details[0].item != null){
            deepCopy = JSON.parse(JSON.stringify(element.evolves_to[0].evolution_details[0].item.name))
            element.species.item1 = deepCopy;        
          }
        }              
      }     
    });    
    
  }
   getRandomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  pokemonDetails(pokemon: string){
    this.pokemonService.getPokemon(pokemon)
    .then (resp => {
      this.testP = resp;
      console.log(this.testP);
    });

  }

  addItem(item: Item){
    let deepCopy: Item;    
    if(!this.bagItems.some(y => y.name == item.name)){           
        deepCopy = JSON.parse(JSON.stringify(item));
        this.bagItems.push(deepCopy);        
      }
      else{
        let index = this.bagItems.findIndex(x => x.name == item.name)    
        this.bagItems[index].quantity ++;
        console.log(this.bagItems)
      }
    }

}
