// main.js
import { initializeField } from './ui/field.js';
import { updateCurrencyDisplay } from './ui/currency.js';
import { renderUpgrades } from './ui/upgrades.js';
import { buyPlot } from './handlers/storeHandlers.js';
import { showModal } from './handlers/modalHandlers.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeField();
    updateCurrencyDisplay();
    renderUpgrades();

    document.getElementById('buy-plot-button').addEventListener('click', buyPlot);
    document.getElementById('instructions-button').addEventListener('click', () => showModal('welcomeModal'));
});
