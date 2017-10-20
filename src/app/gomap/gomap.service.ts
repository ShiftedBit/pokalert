import { Injectable } from '@angular/core';
import { IGomapResponse } from './gomap.types';

@Injectable()
export class GoMapService {
    getPokemonByCoordinates(): IGomapResponse {
        return {
            id: 6,
            name: 'Glumanda'
        }
    }
}