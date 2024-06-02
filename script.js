// Variables
    // Player Currency Values
    let coins = 15;
    let seeds = 1;
    let water = 10;
    let crops = 1;

    // Field Information
    let plots = 0;
    let plotDisableCoefficient = 1.5;

    // Store Information
    let plotCost = 10; // Initial cost for a plot

    let waterRefills = 0;
    let waterUpgradeCost = 50;
    let maxWaterCapacity = 10; // Initial max water capacity

    let fertilizerUpgradeCost = 150;
    

    let totalCoinsEarned = 0;
    let milestonesAchieved = [];
    let cropsSold = 0;
    let seedsBought = 0;

    // Upgrade information
    let expandedClickPurchased = false;
    let expandedClickEnabled = false;

// Saving & Loading Utilities
// Function to save the game state
function saveGame() {
    // Create an object to store the current state of the game
    const gameState = {
        coins, // Current amount of coins the player has
        seeds, // Current amount of seeds the player has
        water, // Current amount of water available for farming
        crops, // Current amount of crops the player has grown
        plots, // Current number of plots the player owns
        plotCost, // Cost to purchase a new plot
        waterRefills, // Number of times the player has refilled water
        waterUpgradeCost, // Cost to upgrade water capacity
        maxWaterCapacity, // Maximum amount of water the player can store
        totalCoinsEarned, // Total coins earned by the player throughout the game
        milestonesAchieved, // Milestones the player has achieved
        cropsSold, // Total number of crops sold by the player
        seedsBought, // Total number of seeds bought by the player
        expandedClickPurchased, // Indicates if the expanded click upgrade is purchased
        expandedClickEnabled, // Indicates if the expanded click feature is enabled
        field: document.getElementById("field").innerHTML, // HTML content of the field element
    };

    // Save the gameState object as a JSON string in the local storage
    localStorage.setItem('asciiFarmerSave', JSON.stringify(gameState));
    
    // Log the saved game state to the console for debugging purposes
    console.log("Game saved:", gameState);
}

// Function to load the game state
function loadGame() {
    // Retrieve the saved game state from local storage and parse it as a JSON object
    const savedGame = JSON.parse(localStorage.getItem('asciiFarmerSave'));

    // Check if there is a saved game to load
    if (savedGame) {
        // Restore the game variables from the saved game state
        coins = savedGame.coins; // Restore the number of coins
        seeds = savedGame.seeds; // Restore the number of seeds
        water = savedGame.water; // Restore the amount of water
        crops = savedGame.crops; // Restore the number of crops
        plots = savedGame.plots; // Restore the number of plots
        plotCost = savedGame.plotCost; // Restore the cost of purchasing a new plot
        waterRefills = savedGame.waterRefills; // Restore the number of water refills
        waterUpgradeCost = savedGame.waterUpgradeCost; // Restore the cost to upgrade water capacity
        maxWaterCapacity = savedGame.maxWaterCapacity; // Restore the maximum water capacity
        totalCoinsEarned = savedGame.totalCoinsEarned; // Restore the total coins earned
        milestonesAchieved = savedGame.milestonesAchieved; // Restore the milestones achieved
        cropsSold = savedGame.cropsSold; // Restore the total number of crops sold
        seedsBought = savedGame.seedsBought; // Restore the total number of seeds bought
        expandedClickPurchased = savedGame.expandedClickPurchased; // Restore the expanded click purchase status
        expandedClickEnabled = savedGame.expandedClickEnabled; // Restore the expanded click enabled status
        document.getElementById("field").innerHTML = savedGame.field; // Restore the HTML content of the field element

        // Update the currency display to reflect the loaded game state
        updateCurrency();

        // Reinitialize the store with the loaded game state
        initializeStore();

        // Log the loaded game state to the console for debugging purposes
        console.log("Game loaded:", savedGame);
    } else {
        // Log a message to the console if no saved game is found
        console.log("No saved game found.");
    }
}

// Function to reset the game with confirmation
function resetGame() {
    // Prompt the user for confirmation to reset the game
    if (confirm("Are you sure you want to reset the game? This will delete all your progress.")) {
        // If the user confirms, remove the saved game data from local storage
        localStorage.removeItem('asciiFarmerSave');
        
        // Log a message to the console indicating that the game has been reset and save data deleted
        console.log("Game reset: save data deleted.");
        
        // Reload the page to reset the game state
        location.reload();
    } else {
        // If the user cancels, log a message to the console indicating that the reset was cancelled
        console.log("Game reset cancelled.");
    }
}

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
                // Check if the Fertilizer Upgrade button already exists to avoid duplicates
            if (upgradeSection.querySelector('.fertilizer-upgrade-button')) return;
                addFertilizerUpgradeButton;
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

// Functions to adding & buying Upgrade Purchase Tokens to the store 
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

// Function to add Fertilizer Upgrade button
function addFertilizerUpgradeButton() {
    // Ensure the Upgrades section is initialized
    initializeUpgradesSection();
    const upgradeSection = document.getElementById('upgrades-section');

    // Check if the Fertilizer Upgrade button already exists to avoid duplicates
    if (upgradeSection.querySelector('.fertilizer-upgrade-button')) return;

    // Create a button for the Fertilizer Upgrade
    const upgradeButton = document.createElement('button');
    upgradeButton.textContent = `Fertilizer Upgrade: ${fertilizerUpgradeCostUpgradeCost}c`; // Set the button text with the upgrade cost
    upgradeButton.className = 'store-button fertilizer-upgrade-button'; // Set the class for styling
    upgradeButton.onclick = buyFertilizerUpgrade; // Set the function to be called when the button is clicked

    // Append the Water Upgrade button to the Upgrades section
    upgradeSection.appendChild(upgradeButton);
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

// Function to purchase a Fertilizer upgrade
function buyFertilizerUpgrade() {
    // Check if the player has enough coins to buy the fertilizer upgrade
    if (coins >= fertilizerUpgradeCost) {
        coins -= fertilizerUpgradeCost; // Deduct the cost of the fertilizer upgrade from the player's coins
        plotDisableCoefficient -= .1; // Decrease the Plot Dissable Coefficient by .1
        fertilizerUpgradeCost += 5; // Increase the cost for the next fertilizer upgrade by 5 coins
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

// Upgrades Container Functions
// Function to initialize the Upgrades container
function initializeUpgradesContainer() {
    // Check if the Upgrades container already exists
    if (!document.getElementById('upgrades-container')) {
        // Create a new div element to represent the Upgrades container
        const container = document.createElement('div');
        container.id = 'upgrades-container'; // Set the ID for the container
        container.className = 'upgrades-container'; // Set the class for styling

        // Create a heading element for the Upgrades title
        const title = document.createElement('h2');
        title.className = 'upgrades-title'; // Set the class for styling
        title.textContent = 'Upgrades'; // Set the title text

        // Append the title to the Upgrades container
        container.appendChild(title);

        // Find the field container element in the document
        const fieldContainer = document.querySelector('.field-container');

        // Insert the Upgrades container after the field container
        fieldContainer.parentNode.insertBefore(container, fieldContainer.nextSibling);
    }
}

// Upgrade UI & Control Functions
// Function to add Expanded Click toggle switch
function addExpandedClickToggle() {
    // Ensure the Upgrades container is initialized
    initializeUpgradesContainer();
    const upgradeSection = document.getElementById('upgrades-container');

    // Check if the toggle already exists to avoid duplicates
    if (upgradeSection.querySelector('.expanded-click-toggle-item')) return;

    // Create a new div element to represent the toggle switch item
    const upgradeItem = document.createElement('div');
    upgradeItem.className = 'upgrade-item expanded-click-toggle-item'; // Set the class for styling

    // Create a label for the toggle switch
    const label = document.createElement('label');
    label.className = 'upgrade-label'; // Set the class for styling
    label.textContent = 'Expanded Click Mk.1'; // Set the label text
    upgradeItem.appendChild(label); // Append the label to the toggle item

    // Create the toggle switch input element
    const toggle = document.createElement('input');
    toggle.type = 'checkbox'; // Set the input type to checkbox
    toggle.className = 'upgrade-toggle'; // Set the class for styling
    toggle.checked = expandedClickEnabled; // Set the initial checked state based on the current setting
    toggle.onchange = () => {
        expandedClickEnabled = toggle.checked; // Update the expandedClickEnabled state when the toggle is changed
        // Alert the user about the manual stock level maintenance requirement if the toggle is enabled
        if (expandedClickEnabled) {
            alert("The Expanded Click Mk.1 is NOT a smart tool and will not track inventory stock levels. Users are encouraged to maintain stock levels manually.");
        }
    };
    upgradeItem.appendChild(toggle); // Append the toggle switch to the toggle item

    // Append the complete toggle item to the Upgrades section
    upgradeSection.appendChild(upgradeItem);
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

// Function to show a modal when a milestone is achieved
function showMilestoneModal(milestone) {
    const modal = document.getElementById("milestoneModal"); // Get the milestone modal element
    const modalContent = document.querySelector("#milestoneModal .modal-content p"); // Get the modal content paragraph element
    modalContent.textContent = `Congratulations! You have earned ${milestone} coins!`; // Set the modal content text
    modal.style.display = "block"; // Display the modal
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

// Updater Functions
// Function to update the currency display
function updateCurrency() {
    // Update the displayed number of coins, rounding down to the nearest integer
    document.getElementById('coins').innerText = Math.floor(coins);
    // Update the displayed number of seeds, rounding down to the nearest integer
    document.getElementById('seeds').innerText = Math.floor(seeds);
    // Update the displayed amount of water and maximum water capacity, rounding down the water amount
    document.getElementById('water').innerText = `${Math.floor(water)}/${maxWaterCapacity}`;
    // Update the displayed number of crops, rounding down to the nearest integer
    document.getElementById('crops').innerText = Math.floor(crops);
    // Save the current game state
    saveGame();
}

// Function to update the field display
function updateField() {
    const fieldElement = document.getElementById('field'); // Get the field element
    fieldElement.innerHTML = ''; // Clear the field element's content

    // Create and append plot buttons for the number of plots owned by the player
    for (let i = 0; i < plots; i++) {
        const plot = document.createElement('button');
        plot.textContent = '~'; // Set the initial text for the plot button (untilled)
        plot.className = 'plotButton'; // Set the class for styling the plot button
        plot.addEventListener('click', () => handlePlotClick(plot)); // Add a click event listener to handle plot interactions
        fieldElement.appendChild(plot); // Append the plot button to the field element
    }
}

// Function to update the Buy Plot button display
function updateBuyPlotButton() {
    const button = document.getElementById('buy-plot-button'); // Get the Buy Plot button element
    button.textContent = `Buy Plot: ${Math.round(plotCost)}c`; // Update the button text with the current plot cost
}

// Function to update the Water Upgrade button display
function updateUpgradeButton() {
    const upgradeButton = document.querySelector('#upgrades-section .store-button'); // Get the first upgrade button in the Upgrades section
    if (upgradeButton) {
        upgradeButton.textContent = `Water Upgrade: ${waterUpgradeCost}c`; // Update the button text with the current water upgrade cost
    }
}

// Plot Functions

// Function to handle plot click
function handlePlotClick(plot) {
    const plotState = plot.textContent; // Get the current state of the clicked plot
    const plotIndex = Array.from(document.getElementById('field').children).indexOf(plot); // Get the index of the clicked plot

    switch (plotState) {
        case '~': // Untilled
            // Tilling the plot requires no cost
            plot.textContent = '=';
            break;
        case '=': // Tilled
            if (seeds >= 1) {
                plot.textContent = '.';
                seeds -= 1; // Planting a seed costs 1 seed
            } else {
                alert("Not enough seeds!");
            }
            break;
        case '.': // Planted
            if (water >= 1) {
                plot.textContent = '/';
                water -= 1; // Watering the planted seed costs 1 water
            } else {
                alert("Not enough water!");
            }
            break;
        case '/': // Growing1
            if (water >= 1) {
                plot.textContent = '|';
                water -= 1; // Watering the growing crop costs 1 water
            } else {
                alert("Not enough water!");
            }
            break;
        case '|': // Growing2
            if (water >= 1) {
                plot.textContent = '\\';
                water -= 1; // Watering the growing crop costs 1 water
            } else {
                alert("Not enough water!");
            }
            break;
        case '\\': // Growing3
            // Final growth stage requires no additional cost
            plot.textContent = '¥';
            break;
        case '¥': // Grown
            // Harvesting the crop
            plot.textContent = '~'; // Reset plot to Untilled state
            crops += 1; // Increment the number of harvested crops
            plot.disabled = true; // Disable the button temporarily

            // Calculate the disabled time based on the number of plots
            const numPlots = document.getElementById('field').childElementCount;
            const disabledTime = 3000 * Math.pow(plotDisableCoefficient, Math.floor(numPlots / 3));

            // Re-enable the button after the calculated disabled time
            setTimeout(() => {
                plot.disabled = false;
            }, disabledTime);
            break;
        default:
            break;
    }

    // Apply expanded click effect if the upgrade has been purchased and enabled
    if (expandedClickPurchased && expandedClickEnabled) {
        affectAdjacentPlots(plotIndex);
    }

    updateCurrency(); // Update the currency display after any changes
}

// Function to affect adjacent plots if expanded click is enabled
function affectAdjacentPlots(index) {
    const field = document.getElementById('field');
    const plots = Array.from(field.children);

    // Affect the left plot if it exists and is not on the left edge
    if (index % 10 !== 0) {
        const leftPlot = plots[index - 1];
        if (!leftPlot.disabled) {
            handleAdjacentPlotClick(leftPlot);
        }
    }

    // Affect the right plot if it exists and is not on the right edge
    if (index % 10 !== 9) {
        const rightPlot = plots[index + 1];
        if (!rightPlot.disabled) {
            handleAdjacentPlotClick(rightPlot);
        }
    }
}

// Function to handle click on adjacent plots
function handleAdjacentPlotClick(plot) {
    const plotState = plot.textContent;

    switch (plotState) {
        case '~': // Untilled
            plot.textContent = '=';
            break;
        case '=': // Tilled
            if (seeds >= 1) {
                plot.textContent = '.';
                seeds -= 1; // Planting a seed costs 1 seed
            }
            break;
        case '.': // Planted
            if (water >= 1) {
                plot.textContent = '/';
                water -= 1; // Watering the planted seed costs 1 water
            }
            break;
        case '/': // Growing1
            if (water >= 1) {
                plot.textContent = '|';
                water -= 1; // Watering the growing crop costs 1 water
            }
            break;
        case '|': // Growing2
            if (water >= 1) {
                plot.textContent = '\\';
                water -= 1; // Watering the growing crop costs 1 water
            }
            break;
        case '\\': // Growing3
            plot.textContent = '¥';
            break;
        case '¥': // Grown
            plot.textContent = '~'; // Reset plot to Untilled state
            crops += 1; // Increment the number of harvested crops
            plot.disabled = true; // Disable the button temporarily

            // Calculate the disabled time based on the number of plots
            const numPlots = document.getElementById('field').childElementCount;
            const disabledTime = 3000 * Math.pow(1.5, Math.floor(numPlots / 3));

            // Re-enable the button after the calculated disabled time
            setTimeout(() => {
                plot.disabled = false;
            }, disabledTime);
            break;
        default:
            break;
    }

    updateCurrency(); // Update the currency display after any changes
}

// Initialize the game
document.addEventListener("DOMContentLoaded", function() {
    // Check if there is a saved game state and load it
    if (localStorage.getItem('asciiFarmerSave')) {
        loadGame();
    }
    // Initialize the store items
    initializeStore();
    // Update the currency display
    updateCurrency();
    // Update the field display
    updateField();

    // Get the modal elements
    const welcomeModal = document.getElementById("welcomeModal");
    const milestoneModal = document.getElementById("milestoneModal");
    const closeModal = document.getElementById("closeModal");
    const closeMilestoneModal = document.getElementById("closeMilestoneModal");

    // When the user clicks on the close button (x) in the welcome modal, close the modal
    closeModal.onclick = function() {
        welcomeModal.style.display = "none";
    }

    // When the user clicks on the close button (x) in the milestone modal, close the modal
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

    // Initialize upgrades if the expanded click feature has been purchased
    if (expandedClickPurchased) {
        initializeUpgradesContainer(); // Initialize the upgrades container

        // Add the water upgrade button if the player has refilled water at least 3 times
        if (waterRefills >= 3) {
            addWaterUpgradeButton();
        }

        // Add the expanded click upgrade button if the player owns at least 3 plots
        if (plots >= 3) {
            addExpandedClickUpgradeMk1Button();
        }

        // Add the expanded click toggle if the feature has been purchased
        if (expandedClickPurchased) {
            addExpandedClickToggle();
        }
    }
    
    // Show the welcome modal on first load
    if (!localStorage.getItem("hasVisitedBefore")) {
        welcomeModal.style.display = "block"; // Display the welcome modal
        localStorage.setItem("hasVisitedBefore", "true"); // Mark that the user has visited before
    }
});

// Function to show the instructions modal
function showInstructions() {
    const welcomeModal = document.getElementById("welcomeModal"); // Get the welcome modal element
    welcomeModal.style.display = "block"; // Display the welcome modal
}
