import { GameState } from "../Classes/Other/GameState";

export interface Game {
    readonly clock:number;
    readonly gameStates:[ GameState ];
    readonly winner:string;
    readonly players:[ string ];
    run():boolean;
}