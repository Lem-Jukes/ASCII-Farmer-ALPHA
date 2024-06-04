// Function to show a modal when a milestone is achieved
function showMilestoneModal(milestone) {
    const modal = document.getElementById("milestoneModal"); // Get the milestone modal element
    const modalContent = document.querySelector("#milestoneModal .modal-content p"); // Get the modal content paragraph element
    modalContent.textContent = `Congratulations! You have earned ${milestone} coins!`; // Set the modal content text
    modal.style.display = "block"; // Display the modal
}

// Function to show the instructions modal
function showInstructions() {
    const welcomeModal = document.getElementById("welcomeModal"); // Get the welcome modal element
    welcomeModal.style.display = "block"; // Display the welcome modal
}

// Function to show a modal when a milestone is achieved
function showMilestoneModal(milestone) {
    const modal = document.getElementById("milestoneModal"); // Get the milestone modal element
    const modalContent = document.querySelector("#milestoneModal .modal-content p"); // Get the modal content paragraph element
    modalContent.textContent = `Congratulations! You have earned ${milestone} coins!`; // Set the modal content text
    modal.style.display = "block"; // Display the modal
}