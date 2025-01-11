interface Card {
    type: 'candle' | 'demon' | 'entity';
    id: number;
    name: string;
    dices: number[];
}

export type CardType = CandleCard | EntityCard | DemonCard;
export type EntityKindnessType = 'adorable' | 'horrible' | null;
export type EntityGendersType = 'fille' | 'garçon' | 'animal';

export interface EntityCard extends Card {
    kindness: EntityKindnessType;
    gender: EntityGendersType;
    description: string;
}

export interface CandleCard extends Card {
}

export interface DemonCard extends Card {
    description: string;
}