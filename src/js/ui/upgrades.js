//src/js/ui/upgrades.js

function initializeUpgradesTitle() {
    // Store Title as a Button
    const upgradesTitle = document.createElement('section');
    upgradesTitle.classList.add('container-title');
    upgradesTitle.setAttribute('aria-label', 'Upgrades Container Title');
    upgradesTitle.textContent = 'Upgrades';

    const mainDiv = document.querySelector('main');
    if (mainDiv) {
        mainDiv.appendChild(upgradesTitle);
    } else {
        console.error('Main div not found');
    }
}

function initializeUpgrades() {

    // Store Section
    const upgrades = document.createElement('section');
    upgrades.classList.add('upgrades-container');
    upgrades.id = 'upgrades';
    upgrades.setAttribute('aria-label', 'Upgrades');

    // Upgrades Section
    const upgradesSection = document.createElement('section');
    upgradesSection.classList.add('upgrades-section');
    upgradesSection.id = 'upgrades-section';
    upgradesSection.setAttribute('aria-label', 'Upgrades Section');

    // Upgrades Section Title
    const upgradesTitle = document.createElement('h3');
    upgradesTitle.classList.add('upgrades-section-title');
    upgradesTitle.textContent = '*first upgrade section*';
    upgradesTitle.setAttribute('aria-label', 'Upgrades Section Title');
    upgradesSection.appendChild(upgradesTitle);

    // Add the Upgrades section to the store or main window
    const mainDiv = document.querySelector('main'); // Assuming 'main' is the main container
    if (mainDiv) {
        mainDiv.appendChild(upgradesSection);
    } else {
        console.error('Main div not found');
    }
}

export { initializeUpgradesTitle, 
         initializeUpgrades, }

