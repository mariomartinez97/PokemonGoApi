import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Pokemon } from './pokemon';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class PokemonEvolutionService {
  private ApiUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
  
  constructor(private http: Http) { }

  getPokemon(base: number, limit: number): Promise<Pokemon[]> {
    return this.http.get(`${this.ApiUrl}?offset=${base}&limit=${limit}`)
      .toPromise()
      .then(response => response.json().data as Pokemon[]) 
      .catch();     
  }
}
