import { getState } from "../state.js";

function initializeStore(){
    const state = getState();

    // Store Title
    const storeTitle = document.createElement('h2');
    storeTitle.classList.add('section-title');
    storeTitle.id = 'store-title';
    storeTitle.setAttribute('aria-label', 'Store Title Element');
    storeTitle.textContent = 'The Store';

    const store = document.createElement('section');
    store.classList.add('store');
    store.id = 'store';
    store.setAttribute('aria-label', 'The Store');

    // Items for Sale Section
    const itemsForSaleSection = document.createElement('section');
    itemsForSaleSection.classList.add('store-section');
    itemsForSaleSection.id = 'items-for-sale';
    itemsForSaleSection.setAttribute('aria-label', 'Items for Sale Section');

    const itemsForSaleTitle = document.createElement('h3');
    itemsForSaleTitle.classList.add('section-title');
    itemsForSaleTitle.textContent = 'Items for Sale';
    itemsForSaleSection.appendChild(itemsForSaleTitle);

    // Seed Buy Button
    const buySeedsButton = document.createElement('button');
    buySeedsButton.classList.add('store-button');
    buySeedsButton.textContent = `Buy Seeds - ${state.seedCost} coins`;
    buySeedsButton.onclick = () => {
        // Add buy seeds functionality here
    };
    itemsForSaleSection.appendChild(buySeedsButton);

    // Water Refill Buy Button
    const buyWaterButton = document.createElement('button');
    buyWaterButton.classList.add('store-button');
    buyWaterButton.textContent = `Buy Water - ${state.waterCost} coins`;
    buyWaterButton.onclick = () => {
        // Add buy water functionality here
    };
    itemsForSaleSection.appendChild(buyWaterButton);

    // Player Sellable Items Section
    const playerSellableItems = document.createElement('section');
    playerSellableItems.classList.add('store-section');
    playerSellableItems.id = 'player-sellable-items';
    playerSellableItems.setAttribute('aria-label', 'Player Sellable Items Section');

    const playerSellableItemsTitle = document.createElement('h3');
    playerSellableItemsTitle.classList.add('section-title');
    playerSellableItemsTitle.textContent = 'Sell Items';
    playerSellableItems.appendChild(playerSellableItemsTitle);

    // Crop Price Button
    const sellCropsButton = document.createElement('button');
    sellCropsButton.classList.add('store-button');
    sellCropsButton.textContent = `Sell Crops - ${state.cropPrice} coins`;
    sellCropsButton.onclick = () => {
        // Add sell crops functionality here
    };
    playerSellableItems.appendChild(sellCropsButton);

    // Append sections to store
    store.appendChild(itemsForSaleSection);
    store.appendChild(playerSellableItems);

    // Append store title and store to the main div
    const mainDiv = document.querySelector('main');
    if (mainDiv) {
        mainDiv.appendChild(storeTitle);
        mainDiv.appendChild(store);
    } else {
        console.error('Main div not found');
    }
}

export { initializeStore };
