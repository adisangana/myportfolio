// Function to switch sections dynamically
function showSection(sectionId) {
    const sections = document.querySelectorAll('.hero-content');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.add('active');
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
            section.classList.remove('active');
        }
    });
}

// Function to toggle content visibility when "Run" button is clicked
function runSkillsScript(sectionId) {
    const content = document.getElementById(`${sectionId}-content`);
    if (content) { // Check if the element exists
        content.classList.toggle('hidden'); // Toggle visibility
    } else {
        console.error(`Element with id "${sectionId}-content" not found.`);
    }
}

// Initialize with Home section as active
document.addEventListener("DOMContentLoaded", function() {
    showSection('home'); // Start with Home section active
});
