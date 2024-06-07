//state.js
const gameState = {
    // Player Currency Values
    coins: 1500,
    seeds: 1,
    crops: 0,
    water: 10,

    // Field Information
     plots: 0,
     plotDisableCoefficient: 1.5, // Coefficient used to calculate plot disable time

    // Store Values
        // Items for Sale Values
        seedCost: 1,
        seedQuantity: 1,
        waterCost: 1,
        waterQuantity: 10,
        plotCost: 10,
        // Player Sellable Item Values
        cropPrice: 2,
        cropQuantity: 1,

    // Upgrade Values
        // Water Upgrade Values:
        waterCapacity: 10,
}

function getState() {
    return { ...gameState };
}

function updateState(updates) {
    Object.assign(gameState, updates);
}

function logGameState() {
    const gameState = getState();
    console.log('Game State:', gameState);
}

export { getState, updateState, logGameState };