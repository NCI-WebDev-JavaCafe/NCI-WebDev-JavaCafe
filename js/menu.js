
// wait for the page to be completed loaded
document.addEventListener('DOMContentLoaded', () => {
  
  // get all the elements with the attribute data-bs-toggle="modal", that is, all the <a> tags (links) that open the modal
  const imageLinks = document.querySelectorAll('[data-bs-toggle="modal"]');
  
  const modalImage = document.getElementById('modalImage');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  
  let imageUrls = [];
  let currentIndex = 0;

  // loop through each image link to get the URLs
  for (let i = 0; i < imageLinks.length; i++) {
    
    let currentLink = imageLinks[i];

    //get the <img> tag inside the <a> tag and get the src attribute (image urls)
    let imgSrc = currentLink.querySelector('img').src;
    imageUrls.push(imgSrc); // add each image URL to the array
      
    // add event listener for each image link
    currentLink.addEventListener('click', function() {
      modalImage.src = imgSrc; // Show the clicked image in the modal
      //update the current index  with the index of the current clicked image
      currentIndex = i;
    });
    
  }

  // event listener for the previous button
  prevButton.addEventListener('click', () => {
    // decrease current index to go to the previous image
    currentIndex -= 1;
    
    // if current index is less than 0, go to the last image
    if (currentIndex < 0) {
      currentIndex = imageUrls.length - 1;
    }
    
    // update the modal image src
    modalImage.src = imageUrls[currentIndex];
  });

  // event listener for the next button
  nextButton.addEventListener('click', () => {
    // increase current index to go to the next image
    currentIndex += 1;
    
    // if current index reaches the end, go bag to the first image
    if (currentIndex >= imageUrls.length) {
      currentIndex = 0;
    }
    
    // update the modal image src
    modalImage.src = imageUrls[currentIndex];
  });
});

