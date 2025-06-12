document.addEventListener('DOMContentLoaded', function() {
    const emailList = document.getElementById('emailList');
    const copyEmailsButton = document.getElementById('copyEmailsButton');
    const copyMessage = document.getElementById('copyMessage');

    // Reference to your Firebase Realtime Database subscribers node
    const subscribersRef = firebase.database().ref('subscribers');

    // Fetch and display emails
    subscribersRef.on('value', (snapshot) => {
        emailList.innerHTML = ''; // Clear existing list
        const emails = [];

        snapshot.forEach((childSnapshot) => {
            const email = childSnapshot.val(); // Get the email string directly
            emails.push(email);
            const listItem = document.createElement('li');
            listItem.textContent = email;
            emailList.appendChild(listItem);
        });

        if (emails.length === 0) {
            const listItem = document.createElement('li');
            listItem.textContent = 'No subscribers yet.';
            emailList.appendChild(listItem);
            copyEmailsButton.disabled = true;
        } else {
            copyEmailsButton.disabled = false;
        }
    }, (errorObject) => {
        console.error('The read failed:' + errorObject.name);
        emailList.innerHTML = '<li>Error loading emails.</li>';
    });

    // Copy functionality
    copyEmailsButton.addEventListener('click', () => {
        const emailNodes = emailList.querySelectorAll('li');
        const emailsToCopy = Array.from(emailNodes)
                                 .map(node => node.textContent)
                                 .filter(text => text !== 'No subscribers yet.' && text !== 'Error loading emails.')
                                 .join('\n');

        if (emailsToCopy) {
            navigator.clipboard.writeText(emailsToCopy).then(() => {
                copyMessage.textContent = 'Emails copied to clipboard!';
                copyMessage.className = 'message success';
                setTimeout(() => {
                    copyMessage.className = 'message';
                    copyMessage.textContent = '';
                }, 3000);
            }).catch(err => {
                console.error('Could not copy text:', err);
                copyMessage.textContent = 'Failed to copy emails.';
                copyMessage.className = 'message error';
                setTimeout(() => {
                    copyMessage.className = 'message';
                    copyMessage.textContent = '';
                }, 3000);
            });
        } else {
            copyMessage.textContent = 'No emails to copy.';
            copyMessage.className = 'message error';
            setTimeout(() => {
                copyMessage.className = 'message';
                copyMessage.textContent = '';
            }, 3000);
        }
    });
}); 