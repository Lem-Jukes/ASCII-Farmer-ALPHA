// ui/field.js
import { getState } from '../state.js';
import { handlePlotClick } from '../handlers/plotHandlers.js';

// Function to Initialize the Field element at the begining of the game.
function initializeField() {
    const field = document.getElementById('field');
    field.innerHTML = ''; // Clear existing content
    const state = getState();

    for (let i = 0; i < state.plots; i++) {
        const plot = document.createElement('button');
        plot.classList.add('plotButton');
        plot.textContent = state.plots[i];
        plot.addEventListener('click', () => handlePlotClick(i));
        field.appendChild(plot);
    }
}

export { initializeField };

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
