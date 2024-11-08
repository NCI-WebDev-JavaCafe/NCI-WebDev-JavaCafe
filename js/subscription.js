
function calculatePrice(){
  
  const typeSelect = document.getElementById("type");
  const grindSelect = document.getElementById("grind");
  const roastSelect = document.getElementById("roast");
  const sizeSelect = document.getElementById("size");
  const frequencySelect = document.getElementById("frequency");
  const priceDisplay = document.getElementById('priceDisplay');

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

//calculate price when the pages load
calculatePrice();
