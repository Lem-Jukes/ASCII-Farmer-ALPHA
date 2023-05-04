// Variables 
    // Inventory Variables
        // Currency Variables
            //  Primary Coin Variable
        // Tool Variables
            // Current Tool Variable
        // Seed Variables
            // Current Selected Seed Type Variable
            // Seed Stock Variables
                // seedType1 count variable
                // seedType2 count variable
                // seedType3 count variable
        // Crop Variables
            // Crop Stock Variables
                // cropType1 count variable
                // cropType2 count variable
                // cropType3 count variable
    // Store Variables
        // Seed Store Variables
            // seedType1 Price Variable
            // seedType2 price variable
            // seedType3 price variable
        // Crop Store Variables
            // cropType1 price variable
            // cropType2 price variable
            // cropType3 price variable
    // Field Variables
        // Field Container Variables
        var fieldContainerCount = 1;
        // Field Table Variables
        var numRows = 1;
        var numCols = 1;
        // Field Pricing Varialbes
            // Field creation cost variable
            // Field expansion cost variable

// Functions
    // General Functions
        // Display Functions
            // Inventory & Store Display Update Functions
                // Currency Display Updaters
                    // Primary Coin Display Update
                // Tool Display Updaters
                    // Current Tool Selection Display Update
                // Seed Display Updaters
                    // Current Seed Type Selection Display Update
                    // Seed Stock Display Updaters
                        // currentSeedType count updater
                        // seedType1 count updater
                        // seedType2 count updater
                        // seedType3 count updater
                // Crop Display Updaters
                    // cropType1 count updater
                    // cropType2 count updater
                    // cropType3 count updater
            // Field Display Update Functions
    // Inventory Functions
        // Currency Functions
            // Check Item Cost
            // Check New Field Cost
            // Update New Field Cost
            // Check Field Expansion Cost
            // Update Field Expansion Cost
        // Tool Functions
            // Change Tool
                // Disable the selected tool button
                // Enable all other tool buttons
        // Seed Functions
            // Change seed type
                // Disable the selected seed type button
                // Enable all other buttons
        // Crop Functions
            // Actually we dont have any crop functions yet but it felt wrong to leave them out
    // Store Functions
        // Seed Store Functions
            // Buy seedType1
                // 1x = 1 primary coin
                // 5x = 4.5 primary coins
            // Buy seedType2
                // 1x = 2 primary coin
                // 5x = 9 primary coins
            // Buy seedType3
                // 1x = 3 primary coin
                // 5x = 13.5 primary coins
        // Crop Store Functions
            // Sell cropType1 
                // 1x = between 2 and 4 primary coins
                // 10x = Between 20 and 40 primary coins    
            // Sell cropType2
                // 1x = between 3 and 5 primary coins
                // 10x = Between 30 and 50 primary coins  
            // Sell cropType3
                // 1x = between 4 and 6 primary coins
                // 10x = Between 40 and 60 primary coins  
    // Field Functions
        // Field Creation
        function createField() {
            // Create the new field container
            var newFieldContainer = document.createElement("div");
            newFieldContainer.id = "FieldContainer" + fieldContainerCount;
            newFieldContainer.innerHTML = "<span>Field #: " + fieldContainerCount + "</span>";
            newFieldContainer.rows = 1;
            newFieldContainer.cols = 1;

            // Create the Expand Field Button
            var expandFieldButton = document.createElement("button");
            expandFieldButton.id = "expandFieldButton" + fieldContainerCount;
            expandFieldButton.innerHTML = "Expand Field";
            expandFieldButton.onclick = function() { expandField(newFieldContainer.id); };
            newFieldContainer.appendChild(expandFieldButton);

            // Create field table
            var fieldTable = "";
            for (var i = 0; i < 1; i++) {
            fieldTable += "<tr id='fieldTableRow" + i + newFieldContainer.id + "'>";
            for (var j = 0; j < 1; j++) {
                var ftbuttonId = "fieldButton" + i + j + newFieldContainer.id;
                fieldTable += "<td id='fieldTableCell" + i + j + newFieldContainer.id + "'><button id='" + ftbuttonId + "' onclick='fieldTileClickResponder(\"" + ftbuttonId + "\")'>state1</button></td>";
            }
            fieldTable += "</tr>";
            }
            var fieldTableElement = document.createElement("table");
            fieldTableElement.id = "fieldTable" + fieldContainerCount;
            fieldTableElement.innerHTML = fieldTable;
            newFieldContainer.appendChild(fieldTableElement);

            // Add the new field to the page
            document.getElementById("fieldDisplay").appendChild(newFieldContainer);

            // Update the Field Container Counter  
            fieldContainerCount++;
        }

        // Field Expansion
        function expandField(fieldContainerId) {
            // Get the field container element
            var fieldContainer = document.getElementById(fieldContainerId);

            // Generate the new Field Size
            fieldContainer.rows++;
            fieldContainer.cols++;

            // Update the field table
            var fieldTable = "";
            for (var i = 0; i < fieldContainer.rows; i++) {
            fieldTable += "<tr id='fieldTableRow" + i + fieldContainerId + "'>";
            for (var j = 0; j < fieldContainer.cols; j++) {
                var ftbuttonId = "fieldButton" + i + j + fieldContainerId;
                fieldTable += "<td id='fieldTableCell" + i + j + fieldContainerId + "'><button id='" + ftbuttonId + "' onclick='fieldTileClickResponder(\"" + ftbuttonId + "\")'>state1</button></td>";
            }
            fieldTable += "</tr>";
            }
            document.getElementById("fieldTable" + fieldContainerId.substring(14)).innerHTML = fieldTable;
        }

    // Field Tile Functions
        // Click Response function
        let currentState = 0;
        function fieldTileClickResponder(ftbuttonId) {
            const ftButton = document.querySelector('#' + ftbuttonId);
            const states = ['State 1', 'State 2', 'State 3'];

            ftButton.textContent = states[currentState];
            currentState = (currentState + 1) % states.length;
            console.log("You clicked this field tile: ", ftbuttonId);
            console.log("This Tile's current state is: ", currentState)
        }
            // Check field tile state
            // Check current selected tool

// ---- Testing Area ----


