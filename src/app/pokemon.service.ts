import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PokemonService {
  private ApiUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
  
  constructor(private http: Http) { }

  getPokemon(base: number, limit: number) {
    return this.http.get(`${this.ApiUrl}?offset=${base}&limit=${limit}`)
      .toPromise()
      .then(response => response.json().results)
      .then(items => items.map((item, idx) => {
        const id: number = idx + base + 1;
        return {
          name: item.name,
          id
        };
      }));
  }
}
