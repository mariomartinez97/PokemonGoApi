export class PokemonEvolutions{
    evolution_details: EvolutionDetail;
    evolves_to: EvolvesTo;
    species: Species;
}
export class EvolutionDetail {
    min_level: number;            
    item?: any;
    held_item?: any;
}
    
export class EvolutionDetail2 {
    min_level: number;
    item?: any;           
    held_item?: any;
}
    
export class Species {
    name: string;
    actualLevel: number;
}
    
export class EvolvesTo2 {
    evolution_details: EvolutionDetail2[];
    evolves_to: any[];
    is_baby: boolean;
    species: Species;
}
    
export class Species2 {
    name: string;
}
    
export class EvolvesTo {
    evolution_details: EvolutionDetail[];
    evolves_to: EvolvesTo2[];
    is_baby: boolean;
    species: Species2;
}
    
export class Species3 {
    name: string;
}
    
export class Chain {
    evolution_details: any[];
    evolves_to: EvolvesTo[];
    is_baby: boolean;
    species: Species3;
}
    
export class RootObject {
    baby_trigger_item?: any;
    id: number;
    chain: Chain;
}
    
    