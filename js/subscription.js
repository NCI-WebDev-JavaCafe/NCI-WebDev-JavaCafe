
//wait for the page to be fully loaded
document.addEventListener("DOMContentLoaded", function() {

  //elements
  const typeSelect = document.getElementById("type");
  const grindSelect = document.getElementById("grind");
  const roastSelect = document.getElementById("roast");
  const sizeSelect = document.getElementById("size");
  const frequencySelect = document.getElementById("frequency");
  const priceDisplay = document.getElementById("priceDisplay");
  const subscriptionForm = document.getElementById("subscriptionForm");
  
  function calculatePrice(){
    
    let price = 0;

    // increment price according to the size
    switch (sizeSelect.value) {
      case "250g":
        price += 10;
        break;
      
      case "500g":
        price += 18;
        break;

      case "1kg":
        price += 32;
        break;
    }

    // increment price according to the type
    switch (typeSelect.value) {
      case "ethiopia":
        price += 3;
        break;
        
      case "colombia":
      case "brazil":
        price += 2;
        break;
      
      case "guatemala":
      case "kenya":
        price += 1;
        break;
    }

    /*
      add discount according to the frequency:
      every week: no discount
      every 2 weeks: 5% discount
      every month: 10% discount
    */
    if (frequencySelect.value == "every-2-weeks") {
      price *= 0.95;
    } else if (frequencySelect.value == "every-month") {
      price *= 0.90;
    }

    priceDisplay.textContent = price.toFixed(2);

  }

  function submitForm(event) {
    // Prevent form submission
    event.preventDefault();

    // Show the confirmation modal
    var confirmationModal = new bootstrap.Modal(document.getElementById("confirmationModal"));
    confirmationModal.show();

    // If user clicks "Submit" in confirmation modal, show the "Thank You" modal
    document.getElementById("confirmSubmit").onclick = function() {
        
      confirmationModal.hide(); // Hide confirmation modal
      var thankYouModal = new bootstrap.Modal(document.getElementById("thankYouModal"));
      thankYouModal.show(); // Show thank you modal

      // Clear the fields
      typeSelect.value = "";
      grindSelect.value = "";
      roastSelect.value = "";
      sizeSelect.value = "";
      frequencySelect.value = "";

      //calculate price
      calculatePrice();

    };
  }

  //----------------- DISCOUNT MODAL -----------------------
  const discountModal = new bootstrap.Modal(document.getElementById("discountModal"));
  let hasShownModal = false; // ensure modal only shows once

  //show discount modal after 7 seconds the page is loaded
  setTimeout(function() {

    if (hasShownModal == false) {
      discountModal.show();
      hasShownModal = true;
    }

  }, 7000);

  // discount form submission
  const discountForm = document.getElementById("discountForm");
  const discountModalBody = document.getElementById("discountModalBody");

  discountForm.addEventListener("submit", (event) => {
    
    event.preventDefault();
    const emailDiscount = document.getElementById("emailDiscount").value;

    // replace the form with a success message
    discountModalBody.innerHTML = `<p>Thank you! A discount link has been sent to <strong>${emailDiscount}</strong>.</p>`;
    
  });

  typeSelect.addEventListener("change", calculatePrice);
  grindSelect.addEventListener("change", calculatePrice);
  roastSelect.addEventListener("change", calculatePrice);
  sizeSelect.addEventListener("change", calculatePrice);
  frequencySelect.addEventListener("change", calculatePrice);

  subscriptionForm.addEventListener("submit", submitForm);

});
