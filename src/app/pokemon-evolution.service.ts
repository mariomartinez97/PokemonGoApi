import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { PokemonEvolutions } from './pokemon-evolution';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class PokemonEvolutionService {
  private ApiUrl: string = 'https://pokeapi.co/api/v2/evolution-chain/';
  
  constructor(private http: Http) { }

  getPokemon(id: number): Promise<PokemonEvolutions> {
    return this.http.get(`${this.ApiUrl}${id}/`)
      .toPromise()
      .then(response => response.json().chain as PokemonEvolutions) 
      .catch();     
  }
}

