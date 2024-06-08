document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
});

let users = [];
const adminUser = { username: 'admin', password: 'admin123' };

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';

    if (pageId === 'admin') {
        updateAdminStats();
    }
}

function changeTheme(theme) {
    document.getElementById('theme-style').setAttribute('href', theme);
}

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === adminUser.username && password === adminUser.password) {
        document.getElementById('login-message').innerText = 'Admin login successful!';
        showPage('admin');
    } else {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            document.getElementById('login-message').innerText = 'Login successful!';
            showPage('home');
        } else {
            document.getElementById('login-message').innerText = 'Invalid username or password. Please try again.';
        }
    }
});

document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    const subscriptionType = document.getElementById('subscription-type').value;
    const signupDate = new Date().toLocaleString();

    if (users.find(u => u.username === newUsername)) {
        document.getElementById('signup-message').innerText = 'Username already taken. Please choose another one.';
    } else {
        users.push({ username: newUsername, password: newPassword, subscriptionType, signupDate });
        saveUsers();
        document.getElementById('signup-message').innerText = 'Sign up successful! You can now log in.';
        showPage('login');
    }
});

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function loadUsers() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
        users = JSON.parse(savedUsers);
    }
}

function updateAdminStats() {
    const userCount = users.length;
    const monthlySubscriptions = users.filter(user => user.subscriptionType === 'monthly').length;
    const yearlySubscriptions = users.filter(user => user.subscriptionType === 'yearly').length;
    const recentSignup = users.length > 0 ? users[users.length - 1].signupDate : 'No sign-ups yet';

    document.getElementById('user-count').innerText = `Number of registered users: ${userCount}`;
    document.getElementById('subscription-count').innerText = `Monthly subscriptions: ${monthlySubscriptions}, Yearly subscriptions: ${yearlySubscriptions}`;
    document.getElementById('recent-signup').innerText = `Most recent sign-up date: ${recentSignup}`;
}

function logout() {
    showPage('home');
    document.getElementById('login-message').innerText = '';
}

