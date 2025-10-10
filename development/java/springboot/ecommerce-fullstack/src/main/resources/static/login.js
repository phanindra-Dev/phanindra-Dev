let currentUser = null;
let resetEmail = '';

// Sections
const loginSection = document.getElementById('loginSection');
const signupSection = document.getElementById('signupSection');
const forgetPasswordLink = document.getElementById('forgetPasswordLink');
const loginForm = document.getElementById('loginForm');

// Toggle signup/login
document.getElementById('showSignup').onclick = () => {
    loginSection.classList.add('hidden');
    signupSection.classList.remove('hidden');
};

document.getElementById('showLogin').onclick = () => {
    signupSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
};

// Login form submission
loginForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const res = await fetch('http://localhost:8080/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });

        if (res.ok) {
            const user = await res.json();
            currentUser = user;
            localStorage.setItem("currentUser", JSON.stringify(user));

            // Redirect to dashboard (index.html)
            window.location.href = "index.html";
        } else {
            document.getElementById('loginError').innerText = "Invalid email or password";
        }
    } catch (err) {
        console.error(err);
        alert('Server error during login');
    }
};

// Signup form submission
document.getElementById('signupForm').onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const res = await fetch('http://localhost:8080/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ name, email, password }),
        });

        if (res.ok) {
            alert('Signup successful! Please login.');
            signupSection.classList.add('hidden');
            loginSection.classList.remove('hidden');
        } else {
            document.getElementById('signupError').innerText = "Signup failed: use different credentials";
        }
    } catch (err) {
        console.error(err);
        alert('Server error during signup');
    }
};

// Function to show password reset fields (with email input)
function showPasswordFields(event) {
    event.preventDefault(); // Prevent the default link behavior
    forgetPasswordLink.style.display = 'none'; // Hide the "Forgot Password?" link

    // Replace login form with email input and reset password fields
    loginForm.innerHTML = `
        <label for="reset-email">Enter your email</label>
        <input type="email" id="reset-email" name="reset-email" placeholder="Enter your email" required>
        <button type="button" onclick="showResetPasswordFields()">Next</button>
    `;
}

// Show reset password fields after entering email
function showResetPasswordFields() {
    resetEmail = document.getElementById('reset-email').value; // Save the email value

    // Validate the email format
    if (!resetEmail || !/\S+@\S+\.\S+/.test(resetEmail)) {
        alert("Please enter a valid email.");
        return;
    }

    // Replace the form with new password and confirmation fields
    loginForm.innerHTML = `
        <label for="new-password">New Password</label>
        <input type="password" id="new-password" name="new-password" placeholder="Enter new password" required>

        <label for="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm your new password" required>

        <button type="button" onclick="resetPassword(event)">Reset Password</button>
    `;
}

// Function to validate and reset the password
async function resetPassword(event) {
    event.preventDefault(); // Prevent the default form submit
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Password match validation
    if (newPassword !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    // Basic password strength validation
    if (newPassword.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }

    try {
        const res = await fetch('http://localhost:8080/users/reset-password', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: resetEmail, newPassword })
        });

        if (res.ok) {
            alert("Password has been reset successfully.");
            loginSection.classList.remove('hidden');
            document.getElementById('loginForm').reset();
            backToLogin();
        } else {
            alert("Failed to reset the password. Please try again.");
        }
    } catch (err) {
        console.error(err);
        alert('Server error during password reset');
    }
}

// When the user decides to go back to the login screen, restore the "Forgot Password?" link
function backToLogin() {
    // Show the "Forgot Password?" link again when returning to the login screen
    forgetPasswordLink.style.display = 'inline';

    // Restore the original login form
    loginForm.innerHTML = `
        <input type="email" id="loginEmail" placeholder="Enter Email" required />
        <input type="password" id="loginPassword" placeholder="Enter Password" required />
        <button type="submit">Login</button>
    `;
    document.getElementById("loginForm").reset(); // Reset the form to clear input fields
}

// Attach event listener to the "Forgot Password?" link
forgetPasswordLink.addEventListener('click', showPasswordFields);
