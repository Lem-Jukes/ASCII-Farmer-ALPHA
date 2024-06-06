// handlers/storeHandlers.js

import { getState, updateState } from "../state.js";
import { updateCurrencyBar } from "../ui/currency.js";

// Purchasing Handlers
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

function buyPlot() {
    const gameState = getState();
    const plotCost = gameState.plotCost;

    if (gameState.coins >= plotCost) {
        updateState({
            coins: gameState.coins - plotCost,
            plots: gameState.plots + 1
        });
        updateCurrencyBar();
    } else {
        console.log("Not enough coins to buy a plot");
    }
}


// Sale Handlers

function sellCrops() {
    const gameState = getState();
    if (gameState.crops > 0) {
        updateState({
            coins: gameState.coins + gameState.cropPrice,
            crops: gameState.crops - 1
        });
        updateCurrencyBar();  // Refresh the UI to reflect updated currency values
    } else {
        console.log("No crops available to sell");  // Log a message if no crops are available
    }
}

export { buySeed, buyWater, buyPlot, sellCrops };

