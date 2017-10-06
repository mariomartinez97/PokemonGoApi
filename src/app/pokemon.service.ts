import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Pokemon, Sprites } from './pokemon';


@Injectable()
export class PokemonService {
  private ApiUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
  
  constructor(private http: Http) { }

  getPokemon(pokemonName: string) {
    return this.http.get(`${this.ApiUrl}${pokemonName}`)
    .toPromise()
    .then(response => response.json() as Pokemon) 
    .catch(); 
  }
  getSprite(pokemonName: string) {
    return this.http.get(`${this.ApiUrl}${pokemonName}`)
    .toPromise()
    .then(response => response.json().sprites as Sprites) 
    .catch(); 
  }
}
