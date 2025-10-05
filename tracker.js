/**
 * @file tracker.js
 * @description A simple script to capture and log user page views and click events.
 * This is designed to be a drop-in solution for any webpage.
 */

// Use an Immediately Invoked Function Expression (IIFE) to avoid polluting the global scope.
(function() {
    
    /**
     * A centralized function to format and log event data to the console.
     * @param {string} eventType - The name of the event (e.g., 'pageView', 'click').
     * @param {object} eventData - An object containing details specific to the event.
     */
    function logEvent(eventType, eventData) {
        // Create the base log object with common properties.
        const logObject = {
            event: eventType,
            timestamp: new Date().toISOString(),
            // Merge the specific event data into the log object.
            ...eventData
        };
        
        // Print the formatted object to the console.
        console.log('User Activity:', logObject);
    }

    /**
     * --- 1. TRACKING PAGE VIEWS ---
     * This code executes as soon as the script is loaded into the page,
     * effectively capturing a "page view" event.
     */
    logEvent('pageView', {
        // Get the full URL of the current page.
        url: window.location.href,
        // Get the title of the document.
        title: document.title
    });

    /**
     * --- 2. TRACKING CLICK EVENTS ---
     * An event listener is attached to the entire document to capture all clicks.
     * This uses a technique called "event delegation".
     * @param {MouseEvent} event - The click event object provided by the browser.
     */
    document.addEventListener('click', (event) => {
        // Get the element that was actually clicked.
        const targetElement = event.target;

        // We don't want to log clicks on the main body or html tags themselves.
        if (targetElement === document.body || targetElement === document.documentElement) {
            return;
        }

        // Gather details about the clicked element.
        const elementDetails = {
            tag: targetElement.tagName,
            id: targetElement.id || 'N/A', // Use 'N/A' if the element has no ID.
            classes: targetElement.className || 'N/A', // Use 'N/A' if the element has no classes.
            // Get a snippet of the text to provide context. Trim whitespace and limit to 50 characters.
            text: (targetElement.textContent || '').trim().substring(0, 50)
        };

        // Log the click event with the collected details.
        logEvent('click', elementDetails);
        
    // The 'true' argument makes this listener fire in the "capture" phase,
    // ensuring it runs before other click listeners can potentially stop the event.
    }, true); 

    // A confirmation message to show that the tracking script has been successfully loaded.
    console.log("--- User activity tracker.js has been loaded and is active. ---");

})();