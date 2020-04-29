import { GameState } from "../ZwangClasses/GameState";

export interface Game {
    readonly clock:number;
    readonly gameStates:[ GameState ];
    readonly winner:string;
    readonly players:[ string ];
    run():boolean;
}