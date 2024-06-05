// main.js
import { initializeCurrencyBar, updateCurrencyBar } from './ui/currency.js'
import { initializeStore } from './ui/store.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeCurrencyBar();
    initializeStore();
});