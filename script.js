// Player Currency Values
let coins = 15;
let seeds = 1;
let water = 10;
let crops = 1;

// Field Information
let plots = 0;

// Store Information
let plotCost = 10; // Initial cost for a plot

let waterRefills = 0;
let waterUpgradeCost = 50;
let maxWaterCapacity = 10; // Initial max water capacity

let totalCoinsEarned = 0;
let milestonesAchieved = [];
let cropsSold = 0;
let seedsBought = 0;

// Upgrade information
let expandedClickPurchased = false;
let expandedClickEnabled = false;

// Store Functions & Initialization
function initializeStore() {
    // Clear previous store items
    const itemsForSale = document.getElementById("items-for-sale");
    const itemsForPurchase = document.getElementById("items-for-purchase");
    const fieldExpansion = document.getElementById("field-expansion");
    itemsForSale.innerHTML = '<div class="store-section" id="for-sale-label">For Sale:</div>';
    itemsForPurchase.innerHTML = '<div class="store-section" id="for-purchase-label">Crop Market:</div>';
    fieldExpansion.innerHTML = '<div class="store-section" id="field-expansion-label">Growing Plot:</div><button id="buy-plot-button" class="store-button-large" onclick="buyPlot()">Buy Plot: 10c</button>';

    // Initial Items for sale
    addStoreItem("items-for-sale", "Water", "10x", "1c", buyWater);
    addStoreItem("items-for-sale", "Seed", "1x", "1c", () => buySeed());

    // Initial Items for purchase
    addStoreItem("items-for-purchase", "", "1x", "2c", () => sellCrop(1));

    // Field expansion
    updateBuyPlotButton();

    // Check for existing milestones
    checkSeedMilestones();
    checkCropMilestones();

    if (expandedClickPurchased) {
        initializeUpgradesContainer();
        if (waterRefills >= 3) {
            addWaterUpgradeButton();
        }
        if (plots >= 3) {
            addExpandedClickUpgradeMk1Button();
        }
        if (expandedClickPurchased) {
            addExpandedClickToggle();
        }
    }

    updateCurrency();
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

function buySeed(quantity = 1, price = 1) {
    if (coins >= price) {
        coins -= price;
        seeds += quantity;
        seedsBought += quantity;
        updateCurrency();
        checkSeedMilestones();
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

// Function to initialize the Upgrades section of the store
function initializeUpgradesSection() {
    if (!document.getElementById('upgrades-section')) {
        const store = document.getElementById('store');
        const upgradeSection = document.createElement('div');
        upgradeSection.className = 'store-section';
        upgradeSection.id = 'upgrades-section';

        const upgradeTitle = document.createElement('div');
        upgradeTitle.textContent = 'Upgrades:';
        upgradeSection.appendChild(upgradeTitle);

        store.insertBefore(upgradeSection, store.firstChild); // Insert at the top
    }
}

// Function to initialize the Upgrades container
function initializeUpgradesContainer() {
    if (!document.getElementById('upgrades-container')) {
        const container = document.createElement('div');
        container.id = 'upgrades-container';
        container.className = 'upgrades-container';

        const title = document.createElement('h2');
        title.className = 'upgrades-title';
        title.textContent = 'Upgrades';
        container.appendChild(title);

        const fieldContainer = document.querySelector('.field-container');
        fieldContainer.parentNode.insertBefore(container, fieldContainer.nextSibling);
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

// Function to add Expanded Click toggle switch
function addExpandedClickToggle() {
    initializeUpgradesContainer();
    const upgradeSection = document.getElementById('upgrades-container');

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

    upgradeSection.appendChild(upgradeItem);
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

// Function to handle coin earnings and check for milestones
function addCoins(amount) {
    coins += amount;
    totalCoinsEarned += amount;
    checkMilestones();
    updateCurrency();
}

function checkMilestones() {
    const milestones = [100, 500, 1000, 5000, 10000];
    for (const milestone of milestones) {
        if (totalCoinsEarned >= milestone && !milestonesAchieved.includes(milestone)) {
            showMilestoneModal(milestone);
            milestonesAchieved.push(milestone);
            break; // Ensures only one milestone modal is shown at a time
        }
    }
}

function showMilestoneModal(milestone) {
    const modal = document.getElementById("milestoneModal");
    const modalContent = document.querySelector("#milestoneModal .modal-content p");
    modalContent.textContent = `Congratulations! You have earned ${milestone} coins!`;
    modal.style.display = "block";

    // Add an event listener to close the modal
    modal.querySelector(".close").addEventListener("click", function() {
        modal.style.display = "none";
    });
}

function checkSeedMilestones() {
    const seedMilestones = [50, 100, 250];
    for (const milestone of seedMilestones) {
        if (seedsBought >= milestone && !milestonesAchieved.includes(`seeds-${milestone}`)) {
            addSeedPurchaseOption(milestone);
            milestonesAchieved.push(`seeds-${milestone}`);
        }
    }
}

function addSeedPurchaseOption(milestone) {
    const itemsForSale = document.getElementById("items-for-sale");
    const price = (milestone / 10) * .8; // Example pricing strategy: 5 seeds for 4c, 10 seeds for 8c, etc.
    addStoreItem("items-for-sale", "Seed", `${milestone / 10}x`, `${price}c`, () => buySeed(milestone / 10, price));
}

function checkCropMilestones() {
    const cropMilestones = [10, 25, 500, 1000];
    for (const milestone of cropMilestones) {
        if (cropsSold >= milestone && !milestonesAchieved.includes(`crops-${milestone}`)) {
            addCropSaleOption(milestone);
            milestonesAchieved.push(`crops-${milestone}`);
        }
    }
}

function addCropSaleOption(milestone) {
    const itemsForPurchase = document.getElementById("items-for-purchase");
    let quantity, price;

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
            return;
    }

    addStoreItem("items-for-purchase", "", `${quantity}x`, `${price}c`, () => sellCrop(quantity));
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
            price = quantity * 2; // Default price for other quantities
            break;
    }

    if (crops >= quantity) {
        crops -= quantity;
        cropsSold += quantity;
        addCoins(price);
        checkCropMilestones();
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
        if (!leftPlot.disabled) {
            handleAdjacentPlotClick(leftPlot);
        }
    }

    // Affect the right plot
    if (index % 10 !== 9) { // Not on the right edge
        const rightPlot = plots[index + 1];
        if (!rightPlot.disabled) {
            handleAdjacentPlotClick(rightPlot);
        }
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
    document.addEventListener("DOMContentLoaded", function() {
        initializeStore();
        updateCurrency();
        updateField();

        // Get the modals
        const welcomeModal = document.getElementById("welcomeModal");
        const milestoneModal = document.getElementById("milestoneModal");
        const closeModal = document.getElementById("closeModal");
        const closeMilestoneModal = document.getElementById("closeMilestoneModal");

        // When the user clicks on <span> (x), close the modal
        closeModal.onclick = function() {
            welcomeModal.style.display = "none";
        }

        // When the user clicks on <span> (x), close the milestone modal
        closeMilestoneModal.onclick = function() {
            milestoneModal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modals, close them
        window.onclick = function(event) {
            if (event.target == welcomeModal) {
                welcomeModal.style.display = "none";
            } else if (event.target == milestoneModal) {
                milestoneModal.style.display = "none";
            }
        }

        if (expandedClickPurchased) {
            initializeUpgradesContainer();
            if (waterRefills >= 3) {
                addWaterUpgradeButton();
            }
            if (plots >= 3) {
                addExpandedClickUpgradeMk1Button();
            }
            if (expandedClickPurchased) {
                addExpandedClickToggle();
            }
        }
    });

    function showInstructions() {
        const welcomeModal = document.getElementById("welcomeModal");
        welcomeModal.style.display = "block";
    }