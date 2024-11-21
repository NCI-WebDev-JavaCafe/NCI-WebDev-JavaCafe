
/* adapted from:
   https://www.quora.com/How-do-you-make-the-navigation-bar-in-all-your-pages-without-having-to-rewrite-the-code-in-each-page-separately-JavaScript-HTML-CSS-and-development
   https://stackoverflow.com/questions/6964503/using-javascript-to-highlight-current-page-in-navbar
   https://gabrieleromanato.name/javascript-how-to-highlight-the-current-page-in-a-navigation-menu */

// Wait for the entire DOM to load before running this script
document.addEventListener("DOMContentLoaded", function () {

  // Fetch the HTML content from 'navbar.html' and insert it into the navbar container
  fetch("./navbar.html")
    .then(response => response.text()) // Convert the response to plain text (HTML content)
    .then(data => {

      // Insert the fetched HTML into the <div id="navbar-container">
      document.getElementById("navbar-container").innerHTML = data;

      // Determine the current page's path for setting the 'active' class on the correct link
      const currentPath = window.location.pathname.split("/").pop(); // Get the last part of the path
      // window.location.pathname gives the full path (e.g., '/about.html');
      // split("/") breaks it into an array of segments, and pop() gets the last segment (e.g., 'about.html').

      // Select all navbar links and loop over them to find a match with the current page
      document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
        
        // For each link, get only the filename part of the href attribute (e.g., 'about.html')
        const linkPath = link.getAttribute("href").split("/").pop(); // Get last part of href
        
        // Compare the link's filename with the current page's filename
        if (linkPath === currentPath) {
          // If they match, add the 'active' class to highlight this link
          link.classList.add("active");
        } else {
          // If they don’t match, ensure 'active' is removed in case it was previously added
          link.classList.remove("active");
        }
      });
    });
});
