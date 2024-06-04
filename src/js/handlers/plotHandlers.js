// handlers/plotHandlers.js
import { getState, updateState } from '../state.js';
import { initializeField } from '../ui/field.js';

function handlePlotClick(index) {
    const state = getState();
    if (state.plots[index] === 'untouched') {
        state.plots[index] = 'tilled';
        updateState({ plots: state.plots });
        initializeField();
    }
    // Add additional plot state transitions as needed
}

export { handlePlotClick };


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