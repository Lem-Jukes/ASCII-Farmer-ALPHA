// handlers/storeHandlers.js

import { getState, updateState } from "../state.js";
import { updateCurrencyBar } from "../ui/currency.js";
import { updateField } from "../ui/field.js";

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
    
    // Check if the player's water is already at capacity
    if (gameState.water >= gameState.waterCapacity) {
        console.log("Water is already at capacity. You cannot purchase more water.");
        return;
    }

    // Check if the player has enough coins to buy water
    if (gameState.coins >= gameState.waterCost) {
        // Calculate the new water level, ensuring it does not exceed the water capacity
        const newWaterLevel = Math.min(gameState.water + 10, gameState.waterCapacity);
        
        updateState({
            coins: gameState.coins - gameState.waterCost,
            water: newWaterLevel
        });
        
        updateCurrencyBar();
    } else {
        console.log("Not enough coins to buy water");
    }
}

function buyPlot() {
    const gameState = getState();
    let plotCost = gameState.plotCost;
    const plots = gameState.plots;

    if (plots >= 10) {
        plotCost = Math.ceil(plotCost * 1.1);
    }

    if (gameState.coins >= plotCost && plots < 100) {
        updateState({
            coins: gameState.coins - plotCost,
            plots: gameState.plots + 1,
            plotCost: plotCost // Update plotCost in the state
        });
        updateCurrencyBar();
        updateField();
    } else if (gameState.coins < plotCost) {
        console.log("Not enough coins to buy a plot");
    } else if (plots >= 100) {
        console.log("Field is full, cannot buy more plots");
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

