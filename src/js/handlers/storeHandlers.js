// handlers/storeHandlers.js
import { getState, updateState } from '../state.js';
import { updateCurrencyDisplay } from '../ui/currency.js';

function buyPlot() {
    const state = getState();
    if (state.coins >= 10) {
        updateState({
            coins: state.coins - 10,
            fieldSize: state.fieldSize + 1,
            plots: [...state.plots, '~']
        });
        updateCurrencyDisplay();
        // Reinitialize the field to include the new plot
        initializeField();
    }
}

export { buyPlot };

// Function to add an item to a store section
function addStoreItem(sectionId, label, buttonText, price, onClickFunction) {
    // Get the section element by its ID where the item will be added
    const section = document.getElementById(sectionId);

    // Create a new div element to represent the store item
    const itemDiv = document.createElement('div');
    itemDiv.className = 'store-item'; // Set the class for styling

    // If a label is provided, create and append a label div to the item
    if (label) {
        const labelDiv = document.createElement('div');
        labelDiv.textContent = label + ":"; // Set the label text
        labelDiv.className = 'store-item-label'; // Set the class for styling
        itemDiv.appendChild(labelDiv); // Append the label div to the item div
    }

    // Create a button for the store item
    const button = document.createElement('button');
    button.textContent = buttonText; // Set the button text
    button.className = 'store-button'; // Set the class for styling
    button.onclick = onClickFunction; // Set the function to be called when the button is clicked

    // Create a div to display the price of the store item
    const priceDiv = document.createElement('div');
    priceDiv.textContent = price; // Set the price text
    priceDiv.className = 'store-item-price'; // Set the class for styling

    // Append the button and price divs to the item div
    itemDiv.appendChild(button);
    itemDiv.appendChild(priceDiv);

    // Append the complete item div to the store section
    section.appendChild(itemDiv);
}

// Function to add a seed purchase option based on a milestone
function addSeedPurchaseOption(milestone) {
    const itemsForSale = document.getElementById("items-for-sale"); // Get the "items-for-sale" section element
    // Calculate the price for the seeds based on the milestone (e.g., 5 seeds for 4c, 10 seeds for 8c)
    const price = (milestone / 10) * 0.8; 
    // Add a new store item for buying seeds with the calculated quantity and price
    addStoreItem("items-for-sale", "Seed", `${milestone / 10}x`, `${price}c`, () => buySeed(milestone / 10, price));
}

// Function to add a crop sale option based on a milestone
function addCropSaleOption(milestone) {
    const itemsForPurchase = document.getElementById("items-for-purchase"); // Get the "items-for-purchase" section element
    let quantity, price;

    // Determine the quantity and price based on the milestone
    switch (milestone) {
        case 10:
            quantity = 3;
            price = 7;
            break;
        case 25:
            quantity = 5;
            price = 13;
            break;
        case 500:
            quantity = 10;
            price = 25;
            break;
        case 1000:
            quantity = 25;
            price = 65;
            break;
        default:
            return; // Exit the function if the milestone does not match any case
    }

    // Add a new store item for selling crops with the determined quantity and price
    addStoreItem("items-for-purchase", "", `${quantity}x`, `${price}c`, () => sellCrop(quantity));
}

// Functions for buying items
// Function to buy water
function buyWater() {
    // Check if the water inventory is already full
    if (water >= maxWaterCapacity) {
        alert("Your water inventory is full!"); // Alert the user
        return; // Exit the function
    }
    
    // Check if the player has enough coins to buy water
    if (coins >= 1) {
        coins -= 1; // Deduct the cost of water (1 coin)
        water += 10; // Add 10 units of water
        // Ensure water does not exceed maximum capacity
        water = Math.min(water, maxWaterCapacity);
        waterRefills += 1; // Increment the water refill count
        updateCurrency(); // Update the currency display

        // Check if the player has refilled water 3 times to add the water upgrade button
        if (waterRefills === 3) {
            addWaterUpgradeButton();
        }
    } else {
        alert("Not enough coins!"); // Alert the user if not enough coins
    }
}

// Function to buy seeds
function buySeed(quantity = 1, price = 1) {
    // Check if the player has enough coins to buy the seeds
    if (coins >= price) {
        coins -= price; // Deduct the cost of the seeds
        seeds += quantity; // Add the specified quantity of seeds
        seedsBought += quantity; // Increment the total seeds bought count
        updateCurrency(); // Update the currency display
        checkSeedMilestones(); // Check and update seed milestones
    } else {
        alert("Not enough coins!"); // Alert the user if not enough coins
    }
}

// Function to buy a plot of land
function buyPlot() {
    // Check if the player has enough coins and if the number of plots is less than 100
    if (coins >= plotCost && plots < 100) {
        coins -= plotCost; // Deduct the cost of the plot
        plots += 1; // Increment the number of plots

        // Increase the plot cost by 1.1x if the number of plots exceeds 10
        if (plots > 10) {
            plotCost *= 1.1;
        }
        updateField(); // Update the field display
        updateCurrency(); // Update the currency display
        updateBuyPlotButton(); // Update the buy plot button with the new cost

        // Check if the player has 3 plots to add the expanded click upgrade button
        if (plots === 3) {
            addExpandedClickUpgradeMk1Button();
        }
    } else {
        alert("Not enough coins or field is full!"); // Alert the user if not enough coins or plots are at maximum
    }
}

// Function to purchase a water upgrade
function buyWaterUpgrade() {
    // Check if the player has enough coins to buy the water upgrade
    if (coins >= waterUpgradeCost) {
        coins -= waterUpgradeCost; // Deduct the cost of the water upgrade from the player's coins
        maxWaterCapacity += 10; // Increase the maximum water capacity by 10 units
        waterUpgradeCost += 25; // Increase the cost for the next water upgrade by 5 coins
        updateCurrency(); // Update the currency display to reflect the new coin count
        updateUpgradeButton(); // Update the upgrade button to reflect the new cost
    } else {
        alert("Not enough coins!"); // Alert the player if they don't have enough coins
    }
}

// Function to purchase the Expanded Click Mk.1 upgrade
function buyExpandedClickUpgradeMk1() {
    // Check if the player has enough coins to buy the Expanded Click Mk.1 upgrade
    if (coins >= 100) {
        coins -= 100; // Deduct the cost of the upgrade from the player's coins
        expandedClickPurchased = true; // Set the expandedClickPurchased flag to true
        updateCurrency(); // Update the currency display to reflect the new coin count
        // Remove the upgrade button from the Upgrades section after purchase
        document.querySelector('#upgrades-section .store-button:last-child').remove();
        addExpandedClickToggle(); // Add the toggle switch for the Expanded Click feature
    } else {
        alert("Not enough coins!"); // Alert the player if they don't have enough coins
    }
}

// Function to handle coin earnings
function addCoins(amount) {
    // Increase the player's coin count by the specified amount
    coins += amount;
    
    // Increase the total coins earned by the player by the specified amount
    totalCoinsEarned += amount;
    
    // Check if any milestones have been reached with the new total coins earned
    checkMilestones();
    
    // Update the currency display to reflect the new coin count
    updateCurrency();
}

// Function for selling crops
function sellCrop(quantity) {
    let price;

    // Determine the price based on the quantity of crops being sold
    switch (quantity) {
        case 1:
            price = 2; // Price for selling 1 crop
            break;
        case 3:
            price = 7; // Price for selling 3 crops
            break;
        case 5:
            price = 15; // Price for selling 5 crops
            break;
        default:
            price = quantity * 2; // Default price calculation for other quantities
            break;
    }

    // Check if the player has enough crops to sell
    if (crops >= quantity) {
        crops -= quantity; // Deduct the sold quantity from the player's crops
        cropsSold += quantity; // Increment the total crops sold by the sold quantity
        addCoins(price); // Add the earned coins to the player's total
        checkCropMilestones(); // Check if any crop milestones have been achieved
    } else {
        alert("Not enough crops!"); // Alert the player if they don't have enough crops
    }
}