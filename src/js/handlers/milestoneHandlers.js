// ./handlers/milestoneHandlers.js

import { getState, updateState } from "../state.js"
import { getStoreValues, addBulkSeedButton, addBulkCropSaleButton } from "../ui/store.js";
import { initializeUpgradesTitle, initializeUpgrades } from "../ui/upgrades.js";

const milestoneValues =  {
    totalCoinsEarned: [100, 500, 1000, 5000],
    cropsSold: [50, 100, 500],
    seedsBought: [50, 100, 250, 500, 1000, 2500],
    waterRefillsPurchased: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 1000],
}

function getMilestoneValues() {
    return { ...milestoneValues}
}

function trackMilestones() {
    const gameState = getState();

    for (const [key, milestones] of Object.entries(milestoneValues)) {
        for (const milestone of milestones) {
            if (gameState[key] >= milestone && !gameState.milestonesAchieved.includes(`${key}-${milestone}`)) {
                gameState.milestonesAchieved.push(`${key}-${milestone}`);
                console.log(`Milestone achieved: ${key} - ${milestone}`);

                // Milestone Upgrade Unlock Logic

                if (key === 'waterRefillsPurchased' && milestone === milestoneValues.waterRefillsPurchased[0]) {
                    //console.log('First water refill milestone achieved!');
                    initializeUpgradesTitle();
                    initializeUpgrades();
                }
            }
        }
    }
}

// Milestone Bulk Unlock Logic

function updateSeedsBought(amount) {
    const gameState = getState();
    const newSeedsBought = gameState.seedsBought + amount;
    updateState({ seedsBought: newSeedsBought });
    checkSeedsBoughtMilestones();
}

function checkSeedsBoughtMilestones() {
    const gameState = getState();
    const achievedSeedsBoughtMilestones = [];
    const storeValues = getStoreValues();

    for (const milestone of milestoneValues.seedsBought) {
        if (gameState.seedsBought >= milestone && !gameState.milestonesAchieved.includes(`seedsBought-${milestone}`)) {
            gameState.milestonesAchieved.push(`seedsBought-${milestone}`);
            achievedSeedsBoughtMilestones.push(milestone);
            console.log(`Seeds Bought Milestone achieved: ${milestone}`);
            const buyBulkSeedsText = `${Math.floor(milestone * 0.1)}x`;
            const buyBulkSeedsCostText = `${Math.floor(milestone * 0.1 * storeValues.seedBulkCostCoefficient)} coins`;
            addBulkSeedButton(buyBulkSeedsText, buyBulkSeedsCostText);
        }
    }

    //console.log('Achieved Seeds Bought Milestones:', achievedSeedsBoughtMilestones);
    return achievedSeedsBoughtMilestones;
    
}

function updateCropsSold(amount) {
    const gameState = getState();
    const newCropsSold = gameState.cropsSold + amount;
    updateState({ cropsSold: newCropsSold });
    checkCropsSoldMilestones();
}

function checkCropsSoldMilestones() {
    const gameState = getState();
    const achievedCropsSoldMilestones = [];
    const storeValues = getStoreValues();

    for (const milestone of milestoneValues.cropsSold) {
        if (gameState.cropsSold >= milestone && !gameState.milestonesAchieved.includes(`cropsSold-${milestone}`)) {
            gameState.milestonesAchieved.push(`cropsSold-${milestone}`);
            achievedCropsSoldMilestones.push(milestone);
            console.log(`Crops Sold Milestone achieved: ${milestone}`);
            const sellBulkCropsText = `${Math.floor(milestone * 0.1)}x`;
            const sellBulkCropsCostText = `${Math.floor(milestone * 0.1 * storeValues.cropBulkPriceCoefficient)} coins`;
            addBulkCropSaleButton(sellBulkCropsText, sellBulkCropsCostText);
        }
    }

    //console.log('Achieved Crops Sold Milestones:', achievedCropsSoldMilestones);
    return achievedCropsSoldMilestones;
}

function updateCoinsEarned(amount) {
    const gameState = getState();
    const newCoinsEarned = gameState.totalCoinsEarned + amount;
    updateState({ totalCoinsEarned: newCoinsEarned });
    //checkTotalCoinsEarnedMilesontes Goes here
}

//function to be built: checkTotalCoinsEarnedMilestones

function updateWaterRefills(amount) {
    const gameState = getState();
    const newWaterRefils = gameState.waterRefillsPurchased + amount;
    updateState({ waterRefillsPurchased: newWaterRefils });
    //checkWaterRefills Goes here
}

export { trackMilestones, 
         getMilestoneValues, 
         updateSeedsBought, 
         checkSeedsBoughtMilestones, 
         updateCropsSold, 
         checkCropsSoldMilestones, 
         updateCoinsEarned,
         updateWaterRefills,

        }
