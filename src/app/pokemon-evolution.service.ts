import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Pokemon } from './pokemon';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class PokemonEvolutionService {
  private ApiUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
  
  constructor(private http: Http) { }

  getPokemon(base: number, limit: number) {
    return this.http.get(`${this.ApiUrl}?offset=${base}&limit=${limit}`)
      .toPromise()
      .then(response => response.json().data as Pokemon[]);      
  }
}
