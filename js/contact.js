document.addEventListener('DOMContentLoaded', function() {
    modalContactForm();
});

// Function to handle the modal form for contact us
function modalContactForm() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Show confirmation modal
        var confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        document.getElementById('confirmationModal').removeAttribute('inert');
        confirmationModal.show();

        // Set up the "Submit" button inside the confirmation modal
        document.getElementById('confirmSubmit').onclick = function() {
            // Hide the confirmation modal
            confirmationModal.hide();

            // Show the thank you modal after confirmation modal is hidden
            var thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'));
            document.getElementById('thankYouModal').removeAttribute('inert');
            thankYouModal.show();

            // Reset inert attribute for confirmation modal once hidden
            confirmationModal._element.addEventListener('hidden.bs.modal', function () {
                document.getElementById('confirmationModal').setAttribute('inert', '');
            });

            // Reset inert attribute when the thank you modal is hidden
            thankYouModal._element.addEventListener('hidden.bs.modal', function () {
                document.getElementById('thankYouModal').setAttribute('inert', '');

                // Reset the form after the "Okay" button in the Thank You modal is clicked
                document.getElementById('contactForm').reset(); // Reset the form fields
            });
        };
    });
}