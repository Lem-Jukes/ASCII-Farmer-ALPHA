// Player Currency Values
let coins = 1500;
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

// Upgrade information
let expandedClickPurchased = false;
let expandedClickEnabled = false;


// Store Functions & Initialization
document.addEventListener("DOMContentLoaded", function() {
    initializeStore();
});

function initializeStore() {
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
            addWaterUpgradeSection();
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
            addExpandedClickUpgradeSection();
        }
    } else {
        alert("Not enough coins or field is full!");
    }
}

// Functions that handle adding sections to the game window
function addUpgradesSection() {
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

// Functions that add Store Upgrade Buttons
function addWaterUpgradeSection() {
    const store = document.getElementById('store');
    const upgradeSection = document.createElement('div');
    upgradeSection.className = 'store-section';
    upgradeSection.id = 'upgrades-section';

    const upgradeTitle = document.createElement('h5');
    upgradeTitle.textContent = 'Upgrades';
    upgradeSection.appendChild(upgradeTitle);

    const upgradeButton = document.createElement('button');
    upgradeButton.textContent = `Water Upgrade: ${waterUpgradeCost}c`;
    upgradeButton.className = 'store-button';
    upgradeButton.onclick = buyWaterUpgrade;
    upgradeSection.appendChild(upgradeButton);

    store.insertBefore(upgradeSection, store.firstChild); // Insert at the top
}

function addExpandedClickUpgradeSection() {
    const store = document.getElementById('store');
    const upgradeSection = document.createElement('div');
    upgradeSection.className = 'store-section';
    upgradeSection.id = 'expanded-click-section';

    const upgradeTitle = document.createElement('h5');
    upgradeTitle.textContent = 'Upgrades';
    upgradeSection.appendChild(upgradeTitle);

    const upgradeButton = document.createElement('button');
    upgradeButton.textContent = `Expanded Click Mk.1: 100c`;
    upgradeButton.className = 'store-button';
    upgradeButton.onclick = buyExpandedClickUpgrade;
    upgradeSection.appendChild(upgradeButton);

    store.insertBefore(upgradeSection, store.firstChild); // Insert at the top
}

// Functions for Buying Upgrades
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

function buyExpandedClickUpgrade() {
    if (coins >= 100) {
        coins -= 100;
        expandedClickPurchased = true;
        updateCurrency();
        document.getElementById('expanded-click-section').remove(); // Remove the upgrade button after purchase
        addUpgradesSection(); // Add the new section with the toggle switch
    } else {
        alert("Not enough coins!");
    }
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
    document.getElementById('water').innerText = Math.floor(water);
    document.getElementById('crops').innerText = Math.floor(crops);
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
