// state.js
const gameState = {
    coins: 15,
    seeds: 1,
    water: 10,
    crops: 0,
    fieldSize: 100,
    waterCapacity: 10,
    cropGrowthRate: 1.0,
    purchasedUpgrades: [],
    plots: Array(100).fill('untouched'),
};

function getState() {
    return { ...gameState };
}

function updateState(updates) {
    Object.assign(gameState, updates);
}

export { getState, updateState };
