// Wait for the entire DOM to load before running this script
document.addEventListener("DOMContentLoaded", function () {

  // Fetch the HTML content from 'navbar.html' and insert it into the navbar container
  fetch("./navbar.html")
    .then(function(response) {
      return response.text();
    })
    .then(function(data) {
      document.getElementById("navbar-container").innerHTML = data;

      // Determine the current page's path for setting the 'active' class on the correct link
      var currentPath = window.location.pathname.split("/").pop();

      // Select all navbar links and loop over them to find a match with the current page
      var navLinks = document.querySelectorAll(".navbar-nav .nav-link");
      navLinks.forEach(function(link) {
        
        // For each link, get only the filename part of the href attribute
        var linkPath = link.getAttribute("href").split("/").pop(); 
        
        // Compare the link's filename with the current page's filename
        if (linkPath === currentPath) {
          // If they match, add the 'active' class to highlight this link
          link.classList.add("active");
        } else {
          // If they don’t match, ensure 'active' is removed in case it was previously added
          link.classList.remove("active");
        }
      });
    })
    .catch(function(error) { // Error handling for fetch
      console.error("Error fetching navbar content:", error);
    });
});