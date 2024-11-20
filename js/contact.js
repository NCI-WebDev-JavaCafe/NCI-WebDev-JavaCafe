document.addEventListener('DOMContentLoaded', function() {
    modalContactForm();
});

//Function for contact us form modals
function modalContactForm() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Show confirmation modal
        var confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        document.getElementById('confirmationModal').removeAttribute('inert');
        confirmationModal.show();

        // Handle submit button on Confirmation and Thank you modal
        document.getElementById('confirmSubmit').onclick = () => {
            confirmationModal.hide();
            document.getElementById('confirmationModal').setAttribute('inert', '');

            var thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'));
            document.getElementById('thankYouModal').removeAttribute('inert');
            thankYouModal.show();

            // Modal is hidden after closing
            thankYouModal._element.addEventListener('hidden.bs.modal', function() {
                document.getElementById('thankYouModal').setAttribute('inert', '');
            });
        };

        //An event listener to ensure that the confirmation modal is hidden
        document.getElementById('confirmationModal').addEventListener('hidden.bs.modal', function () {
            document.getElementById('confirmationModal').setAttribute('inert', '');
        });
    });
}
