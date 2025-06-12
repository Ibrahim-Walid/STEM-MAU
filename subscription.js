document.addEventListener('DOMContentLoaded', function() {
    const subscriptionForm = document.getElementById('emailSubscriptionForm');
    const messageDiv = document.querySelector('.subscription-message');

    subscriptionForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('.email-input');
        const email = emailInput.value.trim();
        
        // Basic email validation
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        try {
            // Disable the form while submitting
            const submitButton = this.querySelector('.subscribe-btn');
            submitButton.disabled = true;
            submitButton.textContent = 'Subscribing...';

            console.log('Attempting to save email to Firebase:', email);

            // Save to Firebase Realtime Database
            await saveToFirebase(email);

            console.log('Successfully saved email to Firebase');

            // Show success message
            showMessage('Thank you for subscribing! We\'ll keep you updated.', 'success');
            
            // Clear the form
            emailInput.value = '';
        } catch (error) {
            console.error('Subscription error:', error);
            showMessage('Sorry, something went wrong. Please try again later.', 'error');
        } finally {
            // Re-enable the form
            const submitButton = this.querySelector('.subscribe-btn');
            submitButton.disabled = false;
            submitButton.textContent = 'Subscribe';
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = 'subscription-message ' + type;
        
        // Hide the message after 5 seconds
        setTimeout(() => {
            messageDiv.className = 'subscription-message';
        }, 5000);
    }

    async function saveToFirebase(email) {
        try {
            console.log('Starting Firebase save operation...');
            
            // Create a new subscriber entry with just the email
            const subscriberRef = firebase.database().ref('subscribers').push();
            await subscriberRef.set(email);

            console.log('Email saved successfully with key:', subscriberRef.key);
            return subscriberRef.key;
        } catch (error) {
            console.error('Error saving to Firebase:', error);
            throw error;
        }
    }
}); 