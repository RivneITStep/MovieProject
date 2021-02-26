import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryModel } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  baseUrl = 'https://restcountries.eu/';

  constructor(private http: HttpClient) { }

  getCountries(){
      return this.http.get<CountryModel[]>(this.baseUrl + 'rest/v2/all');
  }

}
