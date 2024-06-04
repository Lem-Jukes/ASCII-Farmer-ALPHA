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
