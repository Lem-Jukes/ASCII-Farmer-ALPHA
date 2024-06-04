// ui/store.js
// Store Functions & Initialization
// Function to initialize the store with items and sections
function initializeStore() {
    // Clear previous store items by resetting the inner HTML of relevant sections
    const itemsForSale = document.getElementById("items-for-sale");
    const itemsForPurchase = document.getElementById("items-for-purchase");
    const fieldExpansion = document.getElementById("field-expansion");

    // Set up the store sections with labels
    itemsForSale.innerHTML = '<div class="store-section" id="for-sale-label">For Sale:</div>';
    itemsForPurchase.innerHTML = '<div class="store-section" id="for-purchase-label">Crop Market:</div>';
    fieldExpansion.innerHTML = '<div class="store-section" id="field-expansion-label">Growing Plot:</div><button id="buy-plot-button" class="store-button-large" onclick="buyPlot()">Buy Plot: 10c</button>';

    // Add initial items for sale in the store
    addStoreItem("items-for-sale", "Water", "10x", "1c", buyWater); // Water item for sale
    addStoreItem("items-for-sale", "Seed", "1x", "1c", () => buySeed()); // Seed item for sale

    // Add initial items for purchase in the store (selling crops)
    addStoreItem("items-for-purchase", "", "1x", "2c", () => sellCrop(1)); // Sell 1 crop for 2 coins

    // Initialize the buy plot button with the current cost
    updateBuyPlotButton();

    // Check and update store items based on existing seed and crop milestones
    checkSeedMilestones();
    checkCropMilestones();

    // Initialize upgrades if expanded click feature is purchased
    if (expandedClickPurchased) {
        initializeUpgradesContainer(); // Set up the upgrades container

        // Add water upgrade button if the player has refilled water at least 3 times
        if (waterRefills >= 3) {
            addWaterUpgradeButton();
        }

        // Add expanded click upgrade button if the player owns at least 3 plots
        if (plots >= 3) {
            addExpandedClickUpgradeMk1Button();
        }

        // Add expanded click toggle button if the expanded click feature is purchased
        if (expandedClickPurchased) {
            addExpandedClickToggle();
        }
    }

    // Update the currency display to reflect the current game state
    updateCurrency();
}

// Functions to Initialize Sections of the Store
// Function to initialize the Upgrades section of the store
function initializeUpgradesSection() {
    // Check if the Upgrades section already exists
    if (!document.getElementById('upgrades-section')) {
        // Get the store element where sections are added
        const store = document.getElementById('store');

        // Create a new div element to represent the Upgrades section
        const upgradeSection = document.createElement('div');
        upgradeSection.className = 'store-section'; // Set the class for styling
        upgradeSection.id = 'upgrades-section'; // Set the ID for the section

        // Create a div element for the section title
        const upgradeTitle = document.createElement('div');
        upgradeTitle.textContent = 'Upgrades:'; // Set the title text

        // Append the title div to the Upgrades section
        upgradeSection.appendChild(upgradeTitle);

        // Insert the Upgrades section at the top of the store (before the first child)
        store.insertBefore(upgradeSection, store.firstChild);
    }
}

// Function to add Water Upgrade button
function addWaterUpgradeButton() {
    // Ensure the Upgrades section is initialized
    initializeUpgradesSection();
    const upgradeSection = document.getElementById('upgrades-section');

    // Check if the Water Upgrade button already exists to avoid duplicates
    if (upgradeSection.querySelector('.water-upgrade-button')) return;

    // Create a button for the Water Upgrade
    const upgradeButton = document.createElement('button');
    upgradeButton.textContent = `Water Upgrade: ${waterUpgradeCost}c`; // Set the button text with the upgrade cost
    upgradeButton.className = 'store-button water-upgrade-button'; // Set the class for styling
    upgradeButton.onclick = buyWaterUpgrade; // Set the function to be called when the button is clicked

    // Append the Water Upgrade button to the Upgrades section
    upgradeSection.appendChild(upgradeButton);
}

// Function to add Expanded Click Upgrade button
function addExpandedClickUpgradeMk1Button() {
    // Check if the expanded click upgrade is already purchased
    if (expandedClickPurchased) return;

    // Ensure the Upgrades section is initialized
    initializeUpgradesSection();
    const upgradeSection = document.getElementById('upgrades-section');

    // Check if the Expanded Click Upgrade button already exists to avoid duplicates
    if (upgradeSection.querySelector('.expanded-click-upgrade-button')) return;

    // Create a button for the Expanded Click Upgrade Mk.1
    const upgradeButton = document.createElement('button');
    upgradeButton.textContent = `Expanded Click Mk.1: 100c`; // Set the button text with the upgrade cost
    upgradeButton.className = 'store-button expanded-click-upgrade-button'; // Set the class for styling
    upgradeButton.onclick = buyExpandedClickUpgradeMk1; // Set the function to be called when the button is clicked

    // Append the Expanded Click Upgrade button to the Upgrades section
    upgradeSection.appendChild(upgradeButton);
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

// Milestones Functions
// Function to check if any coin milestones have been achieved
function checkMilestones() {
    const milestones = [100, 500, 1000, 5000, 10000]; // Define coin milestones
    for (const milestone of milestones) {
        // Check if the total coins earned is greater than or equal to the milestone and the milestone hasn't been achieved yet
        if (totalCoinsEarned >= milestone && !milestonesAchieved.includes(milestone)) {
            showMilestoneModal(milestone); // Show a modal to the player for the achieved milestone
            milestonesAchieved.push(milestone); // Mark the milestone as achieved
            break; // Ensure only one milestone modal is shown at a time
        }
    }
}

// Function to check if any crop milestones have been achieved
function checkCropMilestones() {
    const cropMilestones = [10, 25, 500, 1000]; // Define crop milestones
    for (const milestone of cropMilestones) {
        // Check if the total crops sold is greater than or equal to the milestone and the milestone hasn't been achieved yet
        if (cropsSold >= milestone && !milestonesAchieved.includes(`crops-${milestone}`)) {
            addCropSaleOption(milestone); // Add a new crop sale option for the achieved milestone
            milestonesAchieved.push(`crops-${milestone}`); // Mark the milestone as achieved
        }
    }
}

// Function to update the Water Upgrade button display
function updateUpgradeButton() {
    const upgradeButton = document.querySelector('#upgrades-section .store-button'); // Get the first upgrade button in the Upgrades section
    if (upgradeButton) {
        upgradeButton.textContent = `Water Upgrade: ${waterUpgradeCost}c`; // Update the button text with the current water upgrade cost
    }
}

// Function to update the Buy Plot button display
function updateBuyPlotButton() {
    const button = document.getElementById('buy-plot-button'); // Get the Buy Plot button element
    button.textContent = `Buy Plot: ${Math.round(plotCost)}c`; // Update the button text with the current plot cost
}

// Function to check if any seed milestones have been achieved
function checkSeedMilestones() {
    const seedMilestones = [50, 100, 250]; // Define seed milestones
    for (const milestone of seedMilestones) {
        // Check if the total seeds bought is greater than or equal to the milestone and the milestone hasn't been achieved yet
        if (seedsBought >= milestone && !milestonesAchieved.includes(`seeds-${milestone}`)) {
            addSeedPurchaseOption(milestone); // Add a new seed purchase option for the achieved milestone
            milestonesAchieved.push(`seeds-${milestone}`); // Mark the milestone as achieved
        }
    }
}
