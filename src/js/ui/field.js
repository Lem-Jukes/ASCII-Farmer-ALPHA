// ./ui/field.js
import { getState } from "../state.js";

function initializeFieldTitle() {
    // Store Title as a Button
    const fieldTitleButton = document.createElement('button');
    fieldTitleButton.classList.add('section-title');
    fieldTitleButton.id = 'field-title-button';
    fieldTitleButton.setAttribute('aria-label', 'Field Title Button');
    fieldTitleButton.textContent = 'The Field';
    fieldTitleButton.onclick = toggleFieldVisibility;

    const mainDiv = document.querySelector('main');
    if (mainDiv) {
        mainDiv.appendChild(fieldTitleButton);
    } else {
        console.error('Main div not found');
    }
}

function toggleFieldVisibility() {
    const store = document.getElementById('field');
    if (store) {
        store.classList.toggle('open');
        store.classList.contains('open') ? fadeIn(store) : fadeOut(store);
    }
}

function fadeIn(element) {
    element.style.display = 'block';
    element.style.opacity = 0;
    element.style.transition = 'opacity 0.5s';
    setTimeout(() => {
        element.style.opacity = 1;
    }, 10);
}

function fadeOut(element) {
    element.style.opacity = 0;
    element.style.transition = 'opacity 0.5s';
    setTimeout(() => {
        element.style.display = 'none';
    }, 500);
}

function initializeField(){
    // Retrieve the gameState
    const gameState = getState();

    // Store Section
    const store = document.createElement('section');
    store.classList.add('field');
    store.id = 'field';
    store.setAttribute('aria-label', 'The Field');
}

function updateField(){
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


export { initializeFieldTitle, initializeField, updateField }