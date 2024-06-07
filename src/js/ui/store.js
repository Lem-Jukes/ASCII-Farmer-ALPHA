// ./ui/store.js
import { getState } from "../state.js";
import { buySeed, buyWater, buyPlot, sellCrops } from "../handlers/storeHandlers.js";

function initializeStoreTitle() {
    // Store Title as a Button
    const storeTitleButton = document.createElement('button');
    storeTitleButton.classList.add('section-title');
    storeTitleButton.id = 'store-title-button';
    storeTitleButton.setAttribute('aria-label', 'Store Title Button');
    storeTitleButton.textContent = 'The Store';
    storeTitleButton.onclick = toggleStoreVisibility;

    const mainDiv = document.querySelector('main');
    if (mainDiv) {
        mainDiv.appendChild(storeTitleButton);
    } else {
        console.error('Main div not found');
    }
}

function toggleStoreVisibility() {
    const store = document.getElementById('store');
    if (store) {
        store.classList.toggle('open');
        store.classList.contains('open') ? fadeIn(store) : fadeOut(store);
    }
}

function fadeIn(element) {
    element.style.display = 'block';
    element.style.opacity = 0;
    element.style.transition = 'opacity 0.5s';
    setTimeout(() => {
        element.style.opacity = 1;
    }, 10);
}

function fadeOut(element) {
    element.style.opacity = 0;
    element.style.transition = 'opacity 0.5s';
    setTimeout(() => {
        element.style.display = 'none';
    }, 500);
}

function initializeStore() {
    // Retrieve the gameState
    const gameState = getState();

    // Store Section
    const store = document.createElement('section');
    store.classList.add('store');
    store.id = 'store';
    store.setAttribute('aria-label', 'The Store');

    // Items for Sale Section
    const itemsForSaleSection = document.createElement('section');
    itemsForSaleSection.classList.add('store-section');
    itemsForSaleSection.id = 'items-for-sale';
    itemsForSaleSection.setAttribute('aria-label', 'Items for Sale Section');

    // Items for Sale Section Title
    const itemsForSaleTitle = document.createElement('h3');
    itemsForSaleTitle.classList.add('store-section-title');
    itemsForSaleTitle.textContent = 'Items for Sale';
    itemsForSaleTitle.setAttribute('aria-label', 'Items for Sale Section Title');
    itemsForSaleSection.appendChild(itemsForSaleTitle);

    // Seed Purchasing
    // Seed Item Title
    const buySeedsTitle = document.createElement('span');
    buySeedsTitle.classList.add('item-title');
    buySeedsTitle.textContent = 'Buy Seeds';
    buySeedsTitle.setAttribute('aria-label', 'Buy Seeds Title');
    itemsForSaleSection.appendChild(buySeedsTitle);

    // Seed Button
    const buySeedsButton = document.createElement('button');
    buySeedsButton.classList.add('store-button');
    buySeedsButton.textContent = `${gameState.seedQuantity}x`;
    buySeedsButton.onclick = buySeed;
    itemsForSaleSection.appendChild(buySeedsButton);

    // Seed Cost Title
    const buySeedsCost = document.createElement('span');
    buySeedsCost.classList.add('item-price');
    buySeedsCost.textContent = `${gameState.seedCost} coin(s)`;
    itemsForSaleSection.appendChild(buySeedsCost);

    // Water Refill Purchasing
        // Water Item Title
        const buyWaterTitle = document.createElement('span');
        buyWaterTitle.classList.add('item-title');
        buyWaterTitle.textContent = 'Buy Water';
        buyWaterTitle.setAttribute('aria-label', 'Buy Water Title');
        itemsForSaleSection.appendChild(buyWaterTitle);

        // Water Button
        const buyWaterButton = document.createElement('button');
        buyWaterButton.classList.add('store-button');
        buyWaterButton.textContent = `${gameState.waterQuantity}x`;
        buyWaterButton.onclick = buyWater;
        itemsForSaleSection.appendChild(buyWaterButton);

        // Water Cost Title
        const buyWaterCost = document.createElement('span');
        buyWaterCost.classList.add('item-price');
        buyWaterCost.textContent = `${gameState.waterCost} coin(s)`;
        itemsForSaleSection.appendChild(buyWaterCost);

    // Player Sellable Items Section
    const playerSellableItems = document.createElement('section');
    playerSellableItems.classList.add('store-section');
    playerSellableItems.id = 'player-sellable-items';
    playerSellableItems.setAttribute('aria-label', 'Player Sellable Items Section');

    // Player Sellable Items Section Title
    const playerSellableItemsTitle = document.createElement('h3');
    playerSellableItemsTitle.classList.add('store-section-title');
    playerSellableItemsTitle.textContent = 'Sell Items';
    playerSellableItemsTitle.setAttribute('aria-label', 'Player Sellable Items Section Title');
    playerSellableItems.appendChild(playerSellableItemsTitle);

    // Crop Selling
        // Crop Item Title
        const sellCropsTitle = document.createElement('span');
        sellCropsTitle.classList.add('item-title');
        sellCropsTitle.textContent = 'Sell Crops';
        sellCropsTitle.setAttribute('aria-label', 'Sell Crops Title');
        playerSellableItems.appendChild(sellCropsTitle);

        // Crop Button
        const sellCropsButton = document.createElement('button');
        sellCropsButton.classList.add('store-button');
        sellCropsButton.textContent = `${gameState.cropQuantity}x`;
        sellCropsButton.onclick = sellCrops;
        playerSellableItems.appendChild(sellCropsButton);

        // Crop Price Title
        const sellCropsCost = document.createElement('span');
        sellCropsCost.classList.add('item-price');
        sellCropsCost.textContent = `${gameState.cropPrice} coins`;
        playerSellableItems.appendChild(sellCropsCost);

    // Field Expansion Section
    const fieldExpansionSection = document.createElement('section');
    fieldExpansionSection.classList.add('store-section');
    fieldExpansionSection.id = 'field-expansion-section';
    fieldExpansionSection.setAttribute('aria-label', 'Field Expansion Section');

    // Field Expansion Section Title
    const fieldExpansionTitle = document.createElement('h3');
    fieldExpansionTitle.classList.add('store-section-title');
    fieldExpansionTitle.textContent = 'Field Expansion';
    fieldExpansionTitle.setAttribute('aria-label', 'Field Expansion Section Title');
    fieldExpansionSection.appendChild(fieldExpansionTitle);

    // Plot Purchasing
        // Plot Item Title
        const buyPlotTitle = document.createElement('span');
        buyPlotTitle.classList.add('item-title');
        buyPlotTitle.textContent = 'Buy Plot';
        buyPlotTitle.setAttribute('aria-label', 'Buy Plot Title');
        fieldExpansionSection.appendChild(buyPlotTitle);

        // Buy Plot Button
        const buyPlotButton = document.createElement('button');
        buyPlotButton.classList.add('store-button');
        buyPlotButton.textContent = `1x`;
        buyPlotButton.onclick = buyPlot;
        fieldExpansionSection.appendChild(buyPlotButton);

        // Plot Cost Title
        const buyPlotCost = document.createElement('span');
        buyPlotCost.classList.add('item-price');
        buyPlotCost.setAttribute('id', 'plot-cost');
        buyPlotCost.textContent = `${getState().plotCost} coin(s)`;
        fieldExpansionSection.appendChild(buyPlotCost);

    // Append sections to store
    store.appendChild(itemsForSaleSection);
    store.appendChild(playerSellableItems);
    store.appendChild(fieldExpansionSection);
    store.style.display = 'none'; // Initially hidden

    // Append store to the main div
    const mainDiv = document.querySelector('main');
    if (mainDiv) {
        mainDiv.appendChild(store);
    } else {
        console.error('Main div not found');
    }
}

export { initializeStore, initializeStoreTitle };
