// Pagination on Blog Page
document.addEventListener("DOMContentLoaded", function() {
    const postsPerPage = 3;
    const posts = document.querySelectorAll('.blog-post');
    const paginationContainer = document.getElementById('unique-pagination');
    const totalPages = Math.ceil(posts.length / postsPerPage);

    let currentPage = 1;

    // Function to show posts for the current page
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

    // Function to create pagination buttons
    function createPagination() {
        paginationContainer.innerHTML = '';

        // Previous button
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

        // Page buttons
        for (let i = 1; i <= totalPages; i++) {
            // Create a new function for each iteration that captures the current value of i
            (function(page) {
                const pageButton = document.createElement('button');
                pageButton.textContent = page;
                pageButton.classList.add('btn', 'btn-secondary', 'me-2');
                pageButton.disabled = page === currentPage;
                pageButton.addEventListener('click', () => {
                    currentPage = page;
                    updatePagination();
                    showPostsForPage(currentPage);
                });
                paginationContainer.appendChild(pageButton);
            })(i);
        }

        // Next button
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

    // Function to update the pagination buttons
    function updatePagination() {
        createPagination();
    }

    // Initialize pagination
    showPostsForPage(currentPage);
    createPagination();
});

// Read More Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Loop through all blog posts
    document.querySelectorAll('.blog-post').forEach(function(post) {
        const postText = post.querySelector('.post-text');
        const readMoreButton = post.querySelector('.btn.btn-primary');
        const fullText = postText.innerHTML;
        const truncatedText = fullText.substring(0, 100);

        // Set the truncated text and store the full text
        postText.innerHTML = truncatedText;
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

//Back to top button on blog page, code from: https://mdbootstrap.com/docs/standard/extended/back-to-top/
//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
    document.body.scrollTop > 15 ||
    document.documentElement.scrollTop > 15
    ) {
    mybutton.style.display = "block";
    } else {
    mybutton.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}