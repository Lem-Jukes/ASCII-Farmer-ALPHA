// main.js
import { initializeCurrencyBar, updateCurrencyBar } from './ui/currency.js'
import { initializeStore, initializeStoreTitle } from './ui/store.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeCurrencyBar();
    initializeStoreTitle();
    initializeStore();
});