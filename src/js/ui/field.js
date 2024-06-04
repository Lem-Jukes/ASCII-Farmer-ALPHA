// ui/field.js
import { getState } from '../state.js';
import { handlePlotClick } from '../handlers/plotHandlers.js';

function initializeField() {
    const field = document.getElementById('field');
    field.innerHTML = ''; // Clear existing content
    const state = getState();

    for (let i = 0; i < state.fieldSize; i++) {
        const plot = document.createElement('button');
        plot.classList.add('plotButton');
        plot.textContent = state.plots[i];
        plot.addEventListener('click', () => handlePlotClick(i));
        field.appendChild(plot);
    }
}

export { initializeField };
