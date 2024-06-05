// handlers/storeHandlers.js

import { getState, updateState } from "../state.js";
import { updateCurrencyBar } from "../ui/currency.js";

function buySeed() {
    const gameState = getState();
    if (gameState.coins >= gameState.seedCost) {
        updateState({
            coins: gameState.coins - gameState.seedCost,
            seeds: gameState.seeds + 1
        });
        updateCurrencyBar();
    } else {
        console.log("Not enough coins to buy seeds");
    }
}

function buyWater() {
    const gameState = getState();
    if (gameState.coins >= gameState.waterCost) {
        updateState({
            coins: gameState.coins - gameState.waterCost,
            water: gameState.water + 1
        });
        updateCurrencyBar();
    } else {
        console.log("Not enough coins to buy water");
    }
}

export { buySeed, buyWater };
