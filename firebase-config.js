// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-GdClwXxnZN9IJrR5G-wPJLFGsZoAMcM",
    authDomain: "stem-mau.firebaseapp.com",
    databaseURL: "https://stem-mau-default-rtdb.firebaseio.com",
    projectId: "stem-mau",
    storageBucket: "stem-mau.firebasestorage.app",
    messagingSenderId: "655056688147",
    appId: "1:655056688147:web:e3cbb0536ec7898c2f1be6",
    measurementId: "G-GBPVQHVT0R"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Analytics
const analytics = firebase.analytics();

// Initialize Realtime Database
const database = firebase.database(); 