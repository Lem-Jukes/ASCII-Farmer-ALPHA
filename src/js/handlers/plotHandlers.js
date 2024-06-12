import { getState, updateState } from '../state.js';
import { updateCurrencyBar } from '../ui/currency.js';

function handlePlotClick(plot) {
    const gameState = getState();
    const plotState = plot.textContent; // Get the current state of the clicked plot
    const plotIndex = Array.from(document.getElementById('field').children).indexOf(plot); // Get the index of the clicked plot

    switch (plotState) {
        case '~': // Untilled
            // Tilling the plot requires no cost
            plot.textContent = '=';
            break;
        case '=': // Tilled
            if (gameState.seeds >= 1) {
                plot.textContent = '.';
                updateState({ seeds: gameState.seeds - 1 }); // Planting a seed costs 1 seed
            } else {
                alert("Not enough seeds!");
            }
            break;
        case '.': // Planted
            if (gameState.water >= 1) {
                plot.textContent = '/';
                updateState({ water: gameState.water - 1 }); // Watering the planted seed costs 1 water
            } else {
                alert("Not enough water!");
            }
            break;
        case '/': // Growing1
            if (gameState.water >= 1) {
                plot.textContent = '|';
                updateState({ water: gameState.water - 1 }); // Watering the growing crop costs 1 water
            } else {
                alert("Not enough water!");
            }
            break;
        case '|': // Growing2
            if (gameState.water >= 1) {
                plot.textContent = '\\';
                updateState({ water: gameState.water - 1 }); // Watering the growing crop costs 1 water
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
            updateState({ crops: gameState.crops + 1 }); // Increment the number of harvested crops
            plot.disabled = true; // Disable the button temporarily

            // Calculate the disabled time based on the number of plots
            const baseTime = 3000;
            const initialDisableCoefficient = 1
            const numPlots = document.getElementById('field').childElementCount;
            
            const coefficientIncrease = Math.floor(numPlots / 5) * 0.5;
            console.log(coefficientIncrease);
            const plotDisableCoefficient = initialDisableCoefficient + coefficientIncrease;
            
            const disabledTime = baseTime * plotDisableCoefficient;
            console.log(disabledTime);
            
            // Re-enable the button after the calculated disabled time
            setTimeout(() => {
                plot.disabled = false;
            }, disabledTime);
            break;
        default:
            break;
    }

    updateCurrencyBar(); // Update the currency display after any changes
}

export { handlePlotClick };
