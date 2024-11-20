
// Wait for the entire DOM to load before running this script
document.addEventListener("DOMContentLoaded", function () {
  // Fetch the HTML content from 'footer.html' and insert it into the footer container
  fetch("./footer.html")
    .then(response => response.text()) // Convert the response to plain text (HTML content)
    .then(data => {
      // Insert the fetched HTML into the <div id="footer-container">
      document.getElementById("footer-container").innerHTML = data;
    });
});
