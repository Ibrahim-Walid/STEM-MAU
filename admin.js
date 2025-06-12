document.addEventListener('DOMContentLoaded', function() {
    const loginSection = document.getElementById('loginSection');
    const contentSection = document.getElementById('contentSection');
    const loginForm = document.getElementById('loginForm');
    const loginEmailInput = document.getElementById('loginEmail');
    const loginPasswordInput = document.getElementById('loginPassword');
    const loginError = document.getElementById('loginError');
    const logoutButton = document.getElementById('logoutButton');

    const emailList = document.getElementById('emailList');
    const copyEmailsButton = document.getElementById('copyEmailsButton');
    const copyMessage = document.getElementById('copyMessage');

    // Firebase Realtime Database subscribers node reference (initially null, set after login)
    let subscribersRef = null;

    // Handle Login
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = loginEmailInput.value;
        const password = loginPasswordInput.value;
        loginError.textContent = ''; // Clear previous errors

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            // Firebase Auth state observer will handle UI updates
        } catch (error) {
            console.error('Login error:', error);
            loginError.textContent = 'Login failed: ' + error.message;
        }
    });

    // Handle Logout
    logoutButton.addEventListener('click', async function() {
        try {
            await firebase.auth().signOut();
        } catch (error) {
            console.error('Logout error:', error);
            alert('Logout failed: ' + error.message);
        }
    });

    // Firebase Authentication State Observer
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in. Show content, hide login.
            loginSection.style.display = 'none';
            contentSection.style.display = 'block';

            // Initialize subscribersRef only when user is logged in
            subscribersRef = firebase.database().ref('subscribers');
            fetchEmails();
        } else {
            // User is signed out. Show login, hide content.
            loginSection.style.display = 'block';
            contentSection.style.display = 'none';
            emailList.innerHTML = ''; // Clear list if not logged in
            subscribersRef = null; // Clear reference
        }
    });

    // Fetch and display emails function
    function fetchEmails() {
        if (!subscribersRef) return; // Only fetch if ref is initialized (user logged in)

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
    }

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