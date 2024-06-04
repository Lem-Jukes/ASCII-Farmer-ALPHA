// ui/currency.js
import { getState } from '../state.js';

function updateCurrencyDisplay() {
    const state = getState();
    document.getElementById('coins').textContent = state.coins;
    document.getElementById('seeds').textContent = state.seeds;
    document.getElementById('water').textContent = state.water;
    document.getElementById('crops').textContent = state.crops;
}

export { updateCurrencyDisplay };

// Function to update the currency display
function updateCurrency() {
    // Update the displayed number of coins, rounding down to the nearest integer
    document.getElementById('coins').innerText = Math.floor(coins);
    // Update the displayed number of seeds, rounding down to the nearest integer
    document.getElementById('seeds').innerText = Math.floor(seeds);
    // Update the displayed amount of water and maximum water capacity, rounding down the water amount
    document.getElementById('water').innerText = `${Math.floor(water)}/${maxWaterCapacity}`;
    // Update the displayed number of crops, rounding down to the nearest integer
    document.getElementById('crops').innerText = Math.floor(crops);
    // Save the current game state
    saveGame();
}