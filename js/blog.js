
// Pagination on Blog Page
document.addEventListener("DOMContentLoaded", function() {
    const postsPerPage = 3;
    const posts = document.querySelectorAll('.blog-post');
    const paginationContainer = document.getElementById('unique-pagination');
    const totalPages = Math.ceil(posts.length / postsPerPage);

    let currentPage = 1;

    function showPostsForPage(page) {
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;

        posts.forEach((post, index) => {
            if (index >= start && index < end) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }

    function createPagination() {
        paginationContainer.innerHTML = '';

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.classList.add('btn', 'btn-secondary', 'me-2');
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
                showPostsForPage(currentPage);
            }
        });
        paginationContainer.appendChild(prevButton);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.add('btn', 'btn-secondary', 'me-2');
            pageButton.disabled = i === currentPage;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                updatePagination();
                showPostsForPage(currentPage);
            });
            paginationContainer.appendChild(pageButton);
        }

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.classList.add('btn', 'btn-secondary', 'me-2');
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                updatePagination();
                showPostsForPage(currentPage);
            }
        });
        paginationContainer.appendChild(nextButton);
    }

    function updatePagination() {
        createPagination();
    }

    showPostsForPage(currentPage);
    createPagination();
});

// Read More Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Loop through all blog posts
    document.querySelectorAll('.blog-post').forEach(function(post) {
      const postText = post.querySelector('.post-text');
      const readMoreButton = post.querySelector('.btn.btn-primary');
    
      // Store the full text in a data attribute for later use
      const fullText = postText.innerHTML;  // Using innerHTML to preserve the formatting
      const truncatedText = fullText.substring(0, 100);
    
      // Set the truncated text and store the full text
      postText.innerHTML = truncatedText;  // Use innerHTML instead of innerText to keep formatting
      postText.setAttribute('data-full-text', fullText);
      postText.setAttribute('data-truncated-text', truncatedText);
    
      // Check if text is longer than 100 characters
      if (fullText.length > 100) {
        // Show "Read more" button only if the text is longer than 100 characters
        readMoreButton.style.display = 'inline-block';
    
        // Add event listener for the "Read more" button
        readMoreButton.addEventListener('click', function(event) {
          event.preventDefault();
    
          // Toggle between showing full text and truncated text
          if (postText.innerHTML === truncatedText) {
            postText.innerHTML = fullText;
            readMoreButton.innerText = 'Read less';
          } else {
            postText.innerHTML = truncatedText;
            readMoreButton.innerText = 'Read more';
          }
        });
      } else {
        // If the text is not long enough, hide the "Read more" button
        readMoreButton.style.display = 'none';
      }
    });
  });
  
  


