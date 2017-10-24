import { Injectable } from '@angular/core';
import { IGomapResponse } from './gomap.types';
import { Http, Response } from '@angular/http';

@Injectable()
export class GoMapService {

    constructor(protected http: Http) {

    }

    //getPokemonByCoordinates(): IGomapResponse {
        //return this.http.get('https://mapdata2.gomap.eu/mnew.php')
        //.map((res:Response) => res.json());
    //}
}