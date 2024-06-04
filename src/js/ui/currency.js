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
