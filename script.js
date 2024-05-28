// Player Currency Values
let coins = 15;
let seeds = 1;
let water = 10;
let crops = 0;

// Field Information
let plots = 0;

// Store Information
let plotCost = 10; // Initial cost for a plot

let waterRefills = 0;
let waterUpgradeCost = 50;
let maxWaterCapacity = 10; // Initial max water capacity

//Save & Load State Functions
function saveGame() {
    try {
        const gameState = {
            coins: coins,
            seeds: seeds,
            water: water,
            crops: crops,
            plots: plots,
            plotCost: plotCost,
            waterRefills: waterRefills,
            waterUpgradeCost: waterUpgradeCost,
            maxWaterCapacity: maxWaterCapacity,
            expandedClickPurchased: expandedClickPurchased,
            expandedClickEnabled: expandedClickEnabled
        };
        localStorage.setItem('asciiFarmerSave', JSON.stringify(gameState));
        console.log("Game saved successfully.");
    } catch (error) {
        console.error("Error saving game:", error);
    }
}

function loadGame() {
    try {
        const savedState = localStorage.getItem('asciiFarmerSave');
        if (savedState) {
            const gameState = JSON.parse(savedState);
            coins = gameState.coins;
            seeds = gameState.seeds;
            water = gameState.water;
            crops = gameState.crops;
            plots = gameState.plots;
            plotCost = gameState.plotCost;
            waterRefills = gameState.waterRefills;
            waterUpgradeCost = gameState.waterUpgradeCost;
            maxWaterCapacity = gameState.maxWaterCapacity;
            expandedClickPurchased = gameState.expandedClickPurchased;
            expandedClickEnabled = gameState.expandedClickEnabled;
            console.log("Game loaded successfully.");
        } else {
            console.log("No saved game found.");
        }
    } catch (error) {
        console.error("Error loading game:", error);
    }
}

function resetGame() {
    if (confirm("Are you sure you want to reset the game? This will clear all your progress.")) {
        try {
            localStorage.removeItem('asciiFarmerSave');
            console.log("Game reset successfully.");
            location.reload(); // Reload the page to reset the game
        } catch (error) {
            console.error("Error resetting game:", error);
        }
    }
}


// Upgrade information
let expandedClickPurchased = false;
let expandedClickEnabled = false;

// Store Functions & Initialization
function initializeStore() {
    // Clear any existing items to prevent duplicates
    document.getElementById('items-for-sale').innerHTML = '<h5>For Sale</h5>';
    document.getElementById('items-for-purchase').innerHTML = '<h5>Crop Market</h5>';

    // Items for sale
    addStoreItem("items-for-sale", "Water", "10x", "1c", buyWater);
    addStoreItem("items-for-sale", "Seed", "1x", "1c", buySeed);

    // Items for purchase
    addStoreItem("items-for-purchase", "", "1x", "2c", () => sellCrop(1));
    addStoreItem("items-for-purchase", "", "3x", "7c", () => sellCrop(3));
    addStoreItem("items-for-purchase", "", "5x", "15c", () => sellCrop(5));

    // Field expansion
    updateBuyPlotButton();
}

function addStoreItem(sectionId, label, buttonText, price, onClickFunction) {
    const section = document.getElementById(sectionId);
    const itemDiv = document.createElement('div');
    itemDiv.className = 'store-item';

    if (label) {
        const labelDiv = document.createElement('div');
        labelDiv.textContent = label + ":";
        labelDiv.className = 'store-item-label';
        itemDiv.appendChild(labelDiv);
    }

    const button = document.createElement('button');
    button.textContent = buttonText;
    button.className = 'store-button';
    button.onclick = onClickFunction;

    const priceDiv = document.createElement('div');
    priceDiv.textContent = price;
    priceDiv.className = 'store-item-price';

    itemDiv.appendChild(button);
    itemDiv.appendChild(priceDiv);

    section.appendChild(itemDiv);
}

function updateBuyPlotButton() {
    const button = document.getElementById('buy-plot-button');
    button.textContent = `Buy Plot: ${Math.round(plotCost)}c`;
}

// Functions for buying items
function buyWater() {
    if (water >= maxWaterCapacity) {
        alert("Your water inventory is full!");
        return;
    }
    
    if (coins >= 1) {
        coins -= 1;
        water += 10;
        water = Math.min(water, maxWaterCapacity); // Cap water at max capacity
        waterRefills += 1;
        updateCurrency();

        if (waterRefills === 3) {
            addWaterUpgradeButton();
        }
    } else {
        alert("Not enough coins!");
    }
}

function buySeed() {
    if (coins >= 1) {
        coins -= 1;
        seeds += 1;
        updateCurrency();
    } else {
        alert("Not enough coins!");
    }
}

function buyPlot() {
    if (coins >= plotCost && plots < 100) { // Cap the number of plots at 100
        coins -= plotCost;
        plots += 1;
        if (plots > 10) { // Increase the cost by 1.1x only after the 10th plot
            plotCost *= 1.1;
        }
        updateField();
        updateCurrency();
        updateBuyPlotButton();

        if (plots === 3) {
            addExpandedClickUpgradeMk1Button();
        }
    } else {
        alert("Not enough coins or field is full!");
    }
}

// Function to initialize the Upgrades section
function initializeUpgradesSection() {
    if (!document.getElementById('upgrades-section')) {
        const store = document.getElementById('store');
        const upgradeSection = document.createElement('div');
        upgradeSection.className = 'store-section';
        upgradeSection.id = 'upgrades-section';

        const upgradeTitle = document.createElement('h5');
        upgradeTitle.textContent = 'Upgrades';
        upgradeSection.appendChild(upgradeTitle);

        store.insertBefore(upgradeSection, store.firstChild); // Insert at the top
    }
}

// Function to add Water Upgrade button
function addWaterUpgradeButton() {
    initializeUpgradesSection();
    const upgradeSection = document.getElementById('upgrades-section');

    const upgradeButton = document.createElement('button');
    upgradeButton.textContent = `Water Upgrade: ${waterUpgradeCost}c`;
    upgradeButton.className = 'store-button';
    upgradeButton.onclick = buyWaterUpgrade;
    upgradeSection.appendChild(upgradeButton);
}

// Function to add Expanded Click Upgrade button
function addExpandedClickUpgradeMk1Button() {
    initializeUpgradesSection();
    const upgradeSection = document.getElementById('upgrades-section');

    const upgradeButton = document.createElement('button');
    upgradeButton.textContent = `Expanded Click Mk.1: 100c`;
    upgradeButton.className = 'store-button';
    upgradeButton.onclick = buyExpandedClickUpgradeMk1;
    upgradeSection.appendChild(upgradeButton);
}

// Functions for buying upgrades
function buyWaterUpgrade() {
    if (coins >= waterUpgradeCost) {
        coins -= waterUpgradeCost;
        maxWaterCapacity += 10;
        waterUpgradeCost += 5;
        updateCurrency();
        updateUpgradeButton();
    } else {
        alert("Not enough coins!");
    }
}

function updateUpgradeButton() {
    const upgradeButton = document.querySelector('#upgrades-section .store-button');
    if (upgradeButton) {
        upgradeButton.textContent = `Water Upgrade: ${waterUpgradeCost}c`;
    }
}

function buyExpandedClickUpgradeMk1() {
    if (coins >= 100) {
        coins -= 100;
        expandedClickPurchased = true;
        updateCurrency();
        document.querySelector('#upgrades-section .store-button:last-child').remove(); // Remove the upgrade button after purchase
        addExpandedClickToggle();
    } else {
        alert("Not enough coins!");
    }
}

// Function to add Expanded Click toggle switch
function addExpandedClickToggle() {
    const container = document.createElement('div');
    container.className = 'upgrades-container';

    const title = document.createElement('h2');
    title.className = 'upgrades-title';
    title.textContent = 'Upgrades';
    container.appendChild(title);

    const upgradeItem = document.createElement('div');
    upgradeItem.className = 'upgrade-item';

    const label = document.createElement('label');
    label.className = 'upgrade-label';
    label.textContent = 'Expanded Click Mk.1';
    upgradeItem.appendChild(label);

    const toggle = document.createElement('input');
    toggle.type = 'checkbox';
    toggle.className = 'upgrade-toggle';
    toggle.checked = expandedClickEnabled;
    toggle.onchange = () => {
        expandedClickEnabled = toggle.checked;
        if (expandedClickEnabled) {
            alert("The Expanded Click Mk.1 is NOT a smart tool and will not track inventory stock levels. Users are encouraged to maintain stock levels manually.");
        }
    };
    upgradeItem.appendChild(toggle);

    container.appendChild(upgradeItem);

    const fieldContainer = document.querySelector('.field-container');
    fieldContainer.parentNode.insertBefore(container, fieldContainer.nextSibling);
}

// Function for selling crops
function sellCrop(quantity) {
    let price;
    switch (quantity) {
        case 1:
            price = 2;
            break;
        case 3:
            price = 7;
            break;
        case 5:
            price = 15;
            break;
        default:
            return;
    }

    if (crops >= quantity) {
        coins += price;
        crops -= quantity;
        updateCurrency();
    } else {
        alert("Not enough crops!");
    }
}

// Function to update currency display
function updateCurrency() {
    document.getElementById('coins').innerText = Math.floor(coins);
    document.getElementById('seeds').innerText = Math.floor(seeds);
    document.getElementById('water').innerText = `${Math.floor(water)}/${maxWaterCapacity}`;
    document.getElementById('crops').innerText = Math.floor(crops);
    saveGame(); 
}

// Function to update field display
function updateField() {
    const fieldElement = document.getElementById('field');
    fieldElement.innerHTML = '';
    for (let i = 0; i < plots; i++) {
        const plot = document.createElement('button');
        plot.textContent = '~'; // Untilled
        plot.className = 'plotButton';
        plot.addEventListener('click', () => handlePlotClick(plot));
        fieldElement.appendChild(plot);
    }
    saveGame();
}

// Function to handle plot click
function handlePlotClick(plot) {
    const plotState = plot.textContent;
    const plotIndex = Array.from(document.getElementById('field').children).indexOf(plot);

    switch (plotState) {
        case '~': // Untilled
            // Tilling requires no cost
            plot.textContent = '=';
            break;
        case '=': // Tilled
            if (seeds >= 1) {
                plot.textContent = '.';
                seeds -= 1;
            } else {
                alert("Not enough seeds!");
            }
            break;
        case '.': // Planted
            if (water >= 1) {
                plot.textContent = '/';
                water -= 1;
            } else {
                alert("Not enough water!");
            }
            break;
        case '/': // Growing1
            if (water >= 1) {
                plot.textContent = '|';
                water -= 1;
            } else {
                alert("Not enough water!");
            }
            break;
        case '|': // Growing2
            if (water >= 1) {
                plot.textContent = '\\';
                water -= 1;
            } else {
                alert("Not enough water!");
            }
            break;
        case '\\': // Growing3
            // Growing3 to Grown requires no cost
            plot.textContent = '¥';
            break;
        case '¥': // Grown
            // Harvesting requires a click
            plot.textContent = '~'; // Reset plot to Untilled state
            crops += 1;
            plot.disabled = true; // Disable the button

            // Calculate disabled time based on the number of plots
            const numPlots = document.getElementById('field').childElementCount;
            const disabledTime = 3000 * Math.pow(1.5, Math.floor(numPlots / 3));

            setTimeout(() => {
                plot.disabled = false; // Re-enable the button after the calculated time
            }, disabledTime);
            break;
        default:
            break;
    }

    // Apply expanded click effect if the upgrade has been purchased and enabled
    if (expandedClickPurchased && expandedClickEnabled) {
        affectAdjacentPlots(plotIndex);
    }

    updateCurrency();
}

function affectAdjacentPlots(index) {
    const field = document.getElementById('field');
    const plots = Array.from(field.children);

    // Affect the left plot
    if (index % 10 !== 0) { // Not on the left edge
        const leftPlot = plots[index - 1];
        handleAdjacentPlotClick(leftPlot);
    }

    // Affect the right plot
    if (index % 10 !== 9) { // Not on the right edge
        const rightPlot = plots[index + 1];
        handleAdjacentPlotClick(rightPlot);
    }
}

function handleAdjacentPlotClick(plot) {
    const plotState = plot.textContent;

    switch (plotState) {
        case '~':
            plot.textContent = '=';
            break;
        case '=':
            if (seeds >= 1) {
                plot.textContent = '.';
                seeds -= 1;
            }
            break;
        case '.':
            if (water >= 1) {
                plot.textContent = '/';
                water -= 1;
            }
            break;
        case '/':
            if (water >= 1) {
                plot.textContent = '|';
                water -= 1;
            }
            break;
        case '|':
            if (water >= 1) {
                plot.textContent = '\\';
                water -= 1;
            }
            break;
        case '\\':
            plot.textContent = '¥';
            break;
        case '¥':
            plot.textContent = '~';
            crops += 1;
            plot.disabled = true;
            const numPlots = document.getElementById('field').childElementCount;
            const disabledTime = 3000 * Math.pow(1.5, Math.floor(numPlots / 3));

            setTimeout(() => {
                plot.disabled = false;
            }, disabledTime);
            break;
        default:
            break;
    }
    updateCurrency();
}

// Initialize the game
updateCurrency();
updateField();
document.addEventListener("DOMContentLoaded", function() {
    loadGame();
    initializeStore();
    updateCurrency();
    updateField();
    //Opening Modal
    // Get the modal
    const modal = document.getElementById("welcomeModal");

    // Get the <span> element that closes the modal
    const span = document.getElementById("closeModal");

    // When the page loads, open the modal
    window.onload = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

});

