let currentUser = null;

// Sections
const loginSection = document.getElementById('loginSection');
const signupSection = document.getElementById('signupSection');

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
document.getElementById('loginForm').onsubmit = async (e) => {
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
            document.getElementById('signupError').innerText = "Signup failed";
        }
    } catch (err) {
        console.error(err);
        alert('Server error during signup');
    }
};
