import { Component } from '@angular/core';

import { PokemonService } from './pokemon.service';
import { PokemonEvolutionService } from './pokemon-evolution.service';
import { ItemsService } from './items.service';

import { Pokemon, Sprites } from './pokemon';
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
  showI: boolean = false;
  showP: boolean = true;
  showB: boolean = false;
  bag: PokemonEvolutions[] = [];
  items : Item [] = [];
  bagItems: Item[] = [];
  testP :Pokemon;
  levelUp: string = "Need rare-cady to level up";
  canEvolve: boolean = false;
  pokemonDetailBool: boolean = false;
  sprite: Sprites;

   constructor(
    private pokemonService: PokemonService,
    private pokemonEvolutionService: PokemonEvolutionService,
    private itemsService: ItemsService
  ) { 

  }

  ngOnInit() {
    
    // console.log('AHHHHHHH');
    // console.log(Math.floor(Math.random() * 6) + 2);    
   
    this.loadMore();
  }

  loadMore() {
    // console.log("is loading");
      this.getPokemons();
      this.getItems();
  }

  getPokemons(){
    for (let j = 1; j < 79; j++){
      this.pokemonEvolutionService.getPokemon(j)
      .then(b => {
        this.pokemonTest = b
        this.pokemonTest.species.noEvolutionLevel = false;
          this.pokemons.push(this.pokemonTest);   
          // console.log(this.pokemons);
          this.pokemonInfo();
        });   
      } 
    
    }

    addToBagPokemons(pokemon: PokemonEvolutions){
    let deepCopy: PokemonEvolutions;
    // console.log(pokemon);
      if(!this.bag.some(y => y.species.name == pokemon.species.name)){
        //check if there is a min level or item to be able to evolve
        if(pokemon.species.number_of_Evolutions != 0){
          
          pokemon.species.actualLevel = this.getRandomInt(1,pokemon.evolves_to[0].evolution_details[0].min_level);
          deepCopy = JSON.parse(JSON.stringify(pokemon));
          this.bag.push(deepCopy);
          this.checkItemAdded();
          if(deepCopy.species.item1 != null){ 
            deepCopy.species.status = "Need " + deepCopy.species.item1 + " to evolve"; 
          }          
        }
        else if(pokemon.species.number_of_Evolutions == 0){
          // console.log("No min level")
          // console.log(pokemon.species.name + "has been added");
          pokemon.species.actualLevel = this.getRandomInt(1,10);
          pokemon.species.status = "No more evolutions";
          pokemon.species.noEvolutionLevel = true;
          deepCopy = JSON.parse(JSON.stringify(pokemon));
          this.bag.push(deepCopy);
          // console.log(deepCopy);
        }
      }
      else{
        //  console.log ("This is on the bag");
         }

    }
  
  checkEvolution(index){
      //Check if has evolutions
    if(this.bag[index].species.number_of_Evolutions == 1 || this.bag[index].species.number_of_Evolutions == 2){
      
      //Check if it evolves with and item or not ---> should be able to check just for item 1
      if(this.bag[index].species.item1 != null){
        // console.log("Correct check");
        let itemNeeded = this.bagItems.findIndex(x => x.name ==this.bag[index].species.item1);
        // console.log("item needed:");
        // console.log(itemNeeded);
        if(itemNeeded != -1 && this.bagItems[itemNeeded].quantity > 0){
            if(this.bag[index].species.current_pokemon == 2){
              this.bag[index].species.name = this.bag[index].evolves_to[0].species.name;
              this.bag[index].species.current_pokemon ++;
              this.bagItems[itemNeeded].quantity --;
              this.bag[index].species.status = "No more evolutions";
              this.bag[index].species.item1 = "";
            }
            else if(this.bag[index].species.current_pokemon == 1){
              this.bag[index].species.name = this.bag[index].evolves_to[0].species.name;
              this.bag[index].species.current_pokemon ++;
              this.bagItems[itemNeeded].quantity --;              
    
                if(this.bag[index].species.number_of_Evolutions == 2){
                  if(this.bag[index].evolves_to[0].evolves_to[0].evolution_details[0].min_level == null){
                    //Tell the user he needs a specific item for the second evolution
                    this.bag[index].species.item1 = this.bag[index].species.item2;
                    this.bag[index].species.status = "Need " + this.bag[index].species.item1 + " to evolve";
                  }
                  this.bag[index].evolves_to[0].evolution_details[0].min_level = this.bag[index].evolves_to[0].evolves_to[0].evolution_details[0].min_level; 
                  this.bag[index].evolves_to[0].species.name = this.bag[index].evolves_to[0].evolves_to[0].species.name;   
                  // console.log(this.bag[index]);
                }
                else{ 
                  this.bag[index].species.status = "No more evolutions"; 
                  this.bag[index].species.item1 = "";
              
                }
            }

        }
        else{ this.bag[index].species.status = "Need " + this.bag[index].species.item1 + " to evolve";}

      }
      //Check if its on the second evolution stop evolutions     RESOLVER .species.status;
      else if(this.bag[index].evolves_to[0].evolution_details[0].min_level <= this.bag[index].species.actualLevel
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
          this.bag[index].species.status = "Level up to evolve";

          if(this.bag[index].species.number_of_Evolutions == 2){
            if(this.bag[index].evolves_to[0].evolves_to[0].evolution_details[0].min_level == null){
              //Tell the user he needs a specific item for the second evolution
              this.bag[index].species.item1 = this.bag[index].species.item2;
              this.bag[index].species.status = "Need " + this.bag[index].species.item1 + " to evolve";
              
            }
            this.bag[index].evolves_to[0].evolution_details[0].min_level = this.bag[index].evolves_to[0].evolves_to[0].evolution_details[0].min_level; 
            this.bag[index].evolves_to[0].species.name = this.bag[index].evolves_to[0].evolves_to[0].species.name;   
            // console.log(this.bag[index]);
          }
          else{ this.bag[index].species.status = "No more evolutions"; }
      }        
    }
    else{
      // console.log("Cant evolve yet");
      //this.evolutionText = 'You need _____ item to evolve this pokemon';
      //Tell the user it needs more rare candy or a special item
    }        
    //console.log(this.pokemons);    
  }

  test(index: number){
    if(this.bag[index].species.number_of_Evolutions != 0){
      if(this.bag[index].evolves_to[0].evolution_details[0].min_level == this.bag[index].species.actualLevel){
        // console.log("Ready to evolve");
        // console.log(this.bag[index]);
        this.bag[index].species.status = 'Evolve';      
      }
      let i = this.bagItems.findIndex(x => x.name == 'rare-candy');
      // console.log(i);
      // console.log(this.bagItems[i].quantity);    
      
        if(this.bagItems[i].quantity > 0 ){
          this.bag[index].species.actualLevel ++;  
          this.bagItems[i].quantity --;
          if( this.bagItems[i].quantity == 0){ this.levelUp = "Need rare-candy to level up";}
        }
        else{
          this.levelUp = "Need rare-candy to level up";
        }           
      // console.log(this.bag[index].evolves_to[0].evolution_details[0].min_level);
      if(this.bag[index].evolves_to[0].evolution_details[0].min_level == this.bag[index].species.actualLevel){
        // console.log("Ready to evolve");
        this.bag[index].species.status = 'Evolve';            
        //this.bag[index].evolution_info.status = 'Evolve Pokemon';      
      }
    }
    else{
      this.bag[index].species.actualLevel ++;        
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
    this.itemsService.getItems(48,52)    
    .then(res => {
      res.forEach(item => {
        let contains1 = item.name.indexOf("candy")
        if(contains1 != -1){this.items.push(item);}         
      });
      //this.items = res      
      // console.log(this.items);
      this.updateItems();
    });
    this.itemsService.getItems(78,88)    
    .then(res => {
      res.forEach(item => {
        let contains = item.name.indexOf("stone")
        if(contains != -1){this.items.push(item);}        
      });
      this.updateItems();
    });
    
  }
  private updateItems(){
    this.items.forEach(element => {
      element.quantity = 1;      
      // console.log(element);
    });
    this.items.sort(function(a,b){
      var nameA = a.url.toLowerCase;
      var nameB = b.url.toLowerCase;
      if (nameA < nameB) //sort string ascending
      return -1 
    });    
  }

  private pokemonInfo(){
    let counter: number = 0;  
    let deepCopy: string;      
    this.pokemons.forEach(element => {
      element.species.status = 'Level up to evolve';
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
      // else if(element.evolves_to[0].evolution_details == null){
      //   element.species.number_of_Evolutions = 0;
      // }
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
      /// CHECK TO SOLVE API PROBLEM -> SHOULD TEST ON PIKACHU
      if(element.species.number_of_Evolutions == 2 && element.evolves_to[0].evolution_details[0].min_level == null){
        element.species.item1 = element.species.item2;
      }  
      ///
      
    });    
  }
   getRandomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  pokemonDetails(pokemon: string){

    this.pokemonService.getPokemon(pokemon)
    .then (resp => {
      this.testP = resp;
      // console.log("THIS IS THE SPRITE");
      // this.pokemonDetailBool = true;
    });
    this.pokemonService.getSprite(pokemon)
    .then(r => {
      this.sprite = r;
      // console.log(this.sprite.front_default)
      this.toggleMenu(4);      
    });

  }

  addItem(item: Item){
    // console.log(this.items);
    let deepCopy: Item;    
    if(!this.bagItems.some(y => y.name == item.name)){           
        deepCopy = JSON.parse(JSON.stringify(item));
        this.bagItems.push(deepCopy);        
        if(deepCopy.name == 'rare-candy'){
          this.levelUp = 'Level Up';
        }
      }
      else{
        let index = this.bagItems.findIndex(x => x.name == item.name)    
        this.bagItems[index].quantity ++;
        if(this.bagItems[index].name == 'rare-candy'){
          this.levelUp = "Level Up";
        }
        // console.log(this.bagItems)
      }
      let i = this.bagItems.findIndex(x => x.name == 'rare-candy');
      if(this.bagItems[i] != null && this.bagItems[i].quantity < 0 ){
        this.levelUp = "Level Up";
        // console.log(this.bagItems[i]);
      }
    }
    removePokemon(index: number){
      this.bag.splice(index,1);
    }
    removeItem(index: number){
      this.bagItems.splice(index,1);
    }
    toggleMenu(index: number){
      // console.log("Check");
      // console.log(index);
    
      if(index == 1){        
        this.showP = false;
        this.showI = false;
        this.showB = true;
        this.pokemonDetailBool = false;        
      }
      else if(index == 2){
        this.showP = true;
        this.showI = false;
        this.showB = false;
        this.pokemonDetailBool = false;
        
      }
      else if(index == 3){
        this.showP = false;
        this.showI = true;
        this.showB = false;
        this.pokemonDetailBool = false;
        
      }
      else if(index ==4){
        this.showB = false;
        this.showI = false;
        this.showP = false;
        this.pokemonDetailBool = true;
      }

    }
    
    

}
