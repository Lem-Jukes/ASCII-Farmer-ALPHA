// state.js
const gameState = {
    //Player Currency Values
    coins: 15, // Initial number of Coins the player starts with.
    seeds: 1,  // Initial number of Seeds the player starts with.
    water: 10, // Initial number of Water the player starts with.
    crops: 0,  // Initial number of Crops the player starts with.

    // Field Information
    plots: 0,           // Initial number of plots the player owns
    plotDisableCoefficient: 1.5, // Coefficient used to calculate plot disable time

    // Store Information
    plotCost: 10,       // Initial cost for purchasing a new plot
    waterUpgradeCost: 50, // Initial cost to upgrade the water capacity

    // Game Progress & Milestone Information
    milestonesAchieved: [], // Array to store the milestones the player has achieved
    totalCoinsEarned: 0,// Total number of coins the player has earned throughout the game
    cropsSold: 0,        // Total number of crops sold by the player
    seedsBought: 0,      // Total number of seeds bought by the player
    waterRefills: 0,    // Number of times the player has refilled water

    // Upgrade Information
    // Expanded Click Information
    expandedClickPurchased: false, // Flag indicating whether the expanded click upgrade has been purchased
    expandedClickEnabled: false,   // Flag indicating whether the expanded click upgrade is enabled
    // Water Capacity Information
    maxWaterCapacity: 10, // Initial maximum water capacity

};

function getState() {
    return { ...gameState };
}

function updateState(updates) {
    Object.assign(gameState, updates);
}

export { getState, updateState };
