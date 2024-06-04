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