import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Item } from './items';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class ItemsService {
  private ApiUrl: string = 'https://pokeapi.co/api/v2/item/';
  
  constructor(private http: Http) { }

  getItems(base: number, limit: number): Promise<Item[]> {
    return this.http.get(`${this.ApiUrl}?offset=${base}&limit=${limit}/`)
      .toPromise()
      .then(response => response.json().results as Item[]) 
      .catch();     
  }
}

