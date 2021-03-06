import { CardType, CardTypeData } from "../../Interfaces/CardType";
import { Player } from "../GameObjects/Player";
import { GameState } from "../GameObjects/GameState";
import { Action } from "../Other/Action";
import { Hidable } from "../../Interfaces/Hidable";
import { ModifierObjects, ModifierConclusion, getFailedConclusion } from "../Other/Modifier";

export class FlickeringCardType implements CardType, Hidable {
    readonly shown: boolean = false;

    constructor(
        readonly data:CardTypeData
    ) {}

    play(gameState: GameState, actionIndex: number, player: Player, objects: ModifierObjects): ModifierConclusion {
        if (this.data.actions.length <= actionIndex || actionIndex < 0) return getFailedConclusion("action index is incorrect");
        const action: Action = this.data.actions[actionIndex];
        return action.play(gameState, player, objects);
    }
}