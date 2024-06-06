// ui/currency.js
import { getState } from "../state.js";

function initializeCurrencyBar(){ 
    // Create the currency bar container
    const currencyBar = document.createElement('section')
    currencyBar.classList.add('currency-bar');
    currencyBar.id = 'currency-bar';
    currencyBar.setAttribute('aria-label', 'Currency Bar');

    const gameState = getState(); // Retrieves the initial player currency values
    const currencyItems = [
        { label: 'Coins', id: 'coins', value: gameState.coins, ariaLabel: 'Player coins' },
        { label: 'Seeds', id: 'seeds', value: gameState.seeds, ariaLabel: 'Player seeds' },
        { label: 'Water', id: 'water', value: gameState.water, ariaLabel: 'Current water' },
        { label: 'Water<br>Capacity', id: 'water-capacity', value: gameState.waterCapacity, ariaLabel: 'Water capacity' },
        { label: 'Crops', id: 'crops', value: gameState.crops, ariaLabel: 'Player crops' }
    ];

    currencyItems.forEach(item => {
        const currencyItem = document.createElement('div');
        currencyItem.classList.add('currency-item');
        currencyItem.innerHTML = `${item.label}: <span id="${item.id}" aria-label="${item.ariaLabel}">${item.value}</span>`;
        currencyBar.appendChild(currencyItem);
    });

    const htmlMain = document.querySelector('main');
    htmlMain.insertBefore(currencyBar, htmlMain.firstChild)
}

function updateCurrencyBar() {
    const gameState = getState();

    // Update the currency values in the UI
    document.getElementById('coins').innerText = gameState.coins;
    document.getElementById('seeds').innerText = gameState.seeds;
    document.getElementById('crops').innerText = gameState.crops;
    document.getElementById('water').innerText = gameState.water;
    document.getElementById('water-capacity').innerText = gameState.waterCapacity;
}

export { initializeCurrencyBar, updateCurrencyBar };