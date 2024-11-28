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
        prevButton.addEventListener('click', debounce(() => {
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
                showPostsForPage(currentPage);
                window.scrollTo(0, 0);  // Scroll to the top
            }
        }));
        paginationContainer.appendChild(prevButton);

        // Page buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.add('btn', 'btn-secondary', 'me-2');
            pageButton.disabled = i === currentPage;
            pageButton.addEventListener('click', debounce(() => {
                currentPage = i;
                updatePagination();
                showPostsForPage(currentPage);
                window.scrollTo(0, 0);  // Scroll to the top
            }));
            paginationContainer.appendChild(pageButton);
        }

        // Next button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.classList.add('btn', 'btn-secondary', 'me-2');
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', debounce(() => {
            if (currentPage < totalPages) {
                currentPage++;
                updatePagination();
                showPostsForPage(currentPage);
                window.scrollTo(0, 0);  // Scroll to the top
            }
        }));
        paginationContainer.appendChild(nextButton);
    }

    // Debounce function to prevent rapid clicks
    let debounceTimeout;
    function debounce(callback) {
        return function() {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(callback, 300);
        };
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

// Webshare API to share the blog post, code from: https://web.dev/patterns/web-apps/share?hl=en#html
// Function to handle share button functionality
function shareButton(buttonElement) {
    const button = buttonElement;
    
    // Get the current page URL 
    const currentUrl = window.location.href;
    
    // Share functionality when the button is clicked
    button.addEventListener('click', async () => {
        const title = document.title;
        const text = document.title;
        const url = currentUrl; 

        // Feature detection to see if the Web Share API is supported.
        if ('share' in navigator) {
            try {
                await navigator.share({
                    url,
                    text,
                    title,
                });
                return;
            } catch (err) {
                // If the user cancels, an `AbortError` is thrown.
                if (err.name !== "AbortError") {
                    console.error(err.name, err.message);
                } else {
                    return; // Exit if the user cancels the share
                }
            }
        }

        // Fallback to use Twitter's Web Intent URL.
        const shareURL = new URL('https://twitter.com/intent/tweet');
        const params = new URLSearchParams();
        params.append('text', text);
        params.append('url', url);
        shareURL.search = params;
        window.open(shareURL, '_blank', 'popup,noreferrer,noopener');
        
        // Fallback to Facebook sharing
        const shareURLFacebook = new URL('https://www.facebook.com/sharer/sharer.php');
        const paramsFacebook = new URLSearchParams();
        paramsFacebook.append('u', currentUrl);
        shareURLFacebook.search = paramsFacebook;
        window.open(shareURLFacebook, '_blank', 'popup,noreferrer,noopener');
    });
}

// Loop through each blog post and initialize the share button for each
document.querySelectorAll('.blog-post').forEach(post => {
    const shareButtonElement = post.querySelector('.share-button');
    if (shareButtonElement) {
        shareButton(shareButtonElement); 
    }
});