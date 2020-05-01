import { Card } from "../GameObjects/Card";
import { Player } from "../GameObjects/Player";
import { GameState } from "./GameState";
import { Action } from "../../Types/Action";

export class Hand {
    constructor(
        readonly cards:Card[]
        ) {}
    
    getPlayableFor(player:Player, gameState:GameState): Action[] {
        var actions: Action[] = [];
        for(var card of this.cards) {
            actions = actions.concat(card.getPlayableFor(player, gameState));
        }
        return actions;
    }

    static getHandFromCards(cards:Card[]) {
        return new Hand(cards);
    }
}