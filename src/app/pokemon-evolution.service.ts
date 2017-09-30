import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { PokemonEvolutions } from './pokemon-evolution';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class PokemonEvolutionService {
  private ApiUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
  
  constructor(private http: Http) { }

  getPokemon(url: string): Promise<PokemonEvolutions> {
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().chain as PokemonEvolutions) 
      .catch();     
  }
}

