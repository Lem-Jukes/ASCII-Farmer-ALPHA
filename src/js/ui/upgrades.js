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