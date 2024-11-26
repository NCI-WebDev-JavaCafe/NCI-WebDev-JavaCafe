// Wait for the entire DOM to load before running this script
document.addEventListener("DOMContentLoaded", function () {
  // Fetch the HTML content from 'footer.html' and insert it into the footer container
  fetch("./footer.html")
    .then(function(response) {
      return response.text(); // Convert the response to plain text
    })
    .then(function(data) {
      document.getElementById("footer-container").innerHTML = data;
    })
    .catch(function(error) { // Error handling
      console.error("Error fetching footer content:", error);
    });
});