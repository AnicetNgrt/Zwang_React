import { DisplacementCardType } from "../Classes/CardTypeImplementations/DisplacementCardType"
import { Patterns } from "./Patterns"


export const DisplacementCardTypes: {[key:string]:()=>DisplacementCardType} = {
    "SmallRivers": () => {return new DisplacementCardType({
        weight:0,
        name:"Small Rivers",
        picturePath:null,
        maxTurn:999,
        maxGame:999,
        fullCircle:false,
        displacements: [{
            cost:1,
            pattern:Patterns.smallRivers
        }]
    })},
    "Knight": () => {return new DisplacementCardType({
        weight:8,
        name:"Knight",
        picturePath:null,
        maxTurn:2,
        maxGame:999,
        fullCircle:false,
        displacements: [{
            cost:1,
            pattern:Patterns.knightEast
        },
        {
            cost:1,
            pattern:Patterns.knightWest
        }]
    })},
    "Clockmaker": () => {return new DisplacementCardType({
        weight:7,
        name:"Clockmaker",
        picturePath:null,
        maxTurn:2,
        maxGame:999,
        fullCircle:false,
        displacements: [{
            cost:1,
            pattern:Patterns.clockmakerEast
        },
        {
            cost:1,
            pattern:Patterns.clockmakerWest
        }]
    })}
}