
// Sections
const loginSection = document.getElementById('loginSection');
const signupSection = document.getElementById('signupSection');
const dashboard = document.getElementById('dashboard');

// Toggle signup/login
document.getElementById('showSignup').onclick = () => {
    loginSection.classList.add('hidden');
    signupSection.classList.remove('hidden');
};
document.getElementById('showLogin').onclick = () => {
    signupSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
};

// Login
document.getElementById('loginForm').onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const res = await fetch('http://localhost:8080/users/all');
        const users = await res.json();
        const user = users.find(u => u.email === email && u.password === password);

        if(user){
            currentUser = user;
            loginSection.classList.add('hidden');
            dashboard.classList.remove('hidden');
            document.getElementById('userName').innerText = user.name;

            await fetchProducts();
            await fetchCart();
            renderProducts(products);
            renderCart();
        } else {
            alert('Invalid credentials');
        }
    } catch(err){
        console.log(err);
        alert('Server error');
    }
};

// Signup
document.getElementById('signupForm').onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        await fetch('http://localhost:8080/users/add', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({name, email, password})
        });
        alert('Signup successful! Please login.');
        signupSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
    } catch(err){
        console.log(err);
        alert('Server error');
    }
};

// Logout
document.getElementById('logoutBtn').onclick = () => {
    currentUser = null;
    cart = [];
    dashboard.classList.add('hidden');
    loginSection.classList.remove('hidden');
};

// Fetch products
async function fetchProducts(){
    try {
        const res = await fetch('http://localhost:8080/products/all');
        products = await res.json();
    } catch(err){
        console.log(err);
        alert('Error fetching products');
    }
}

// Fetch cart
async function fetchCart(){
    try {
        const res = await fetch(`http://localhost:8080/cart/view/${currentUser.userId}`);
        const userCart = await res.json();
        cart = userCart.cartItems.map(item => ({
            cartItemId: item.cartItemId,
            product: item.product,
            quantity: item.quantity,
            price: item.price
        }));
    } catch(err){
        cart = [];
        console.log(err);
    }
}

// Render products
function renderProducts(productsList){
    const tbody = document.querySelector('#productsTable tbody');
    tbody.innerHTML = '';
    productsList.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.productId}</td>
            <td>${product.productName}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td><button onclick="addToCart(${product.productId})">Add</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Render cart
function renderCart(){
    const tbody = document.querySelector('#cartTable tbody');
    tbody.innerHTML = '';
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.product.productName}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1"
                       onchange="updateCartQuantity(${item.cartItemId}, this.value)">
            </td>
            <td>${item.price}</td>
            <td><button onclick="removeFromCart(${item.cartItemId})">Remove</button></td>
        `;
        tbody.appendChild(row);
    });
}


// Add to cart
async function addToCart(productId){
    try {
        const res = await fetch(`http://localhost:8080/cart/add?userId=${currentUser.userId}&productId=${productId}&quantity=1`, { method: 'POST' });
        const updatedCart = await res.json();
        cart = updatedCart.cartItems.map(item => ({
            cartItemId: item.cartItemId,
            product: item.product,
            quantity: item.quantity,
            price: item.price
        }));
        renderCart();
    } catch(err){
        console.log(err);
        alert('Error adding to cart');
    }
}

// Remove from cart
async function removeFromCart(cartItemId){
    console.log("Trying to remove cartItemId:", cartItemId);
    try {
        const res = await fetch(`http://localhost:8080/cart/remove/${cartItemId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if(!res.ok){
            throw new Error("Failed to remove item");
        }
        const updatedCart = await res.json();
        cart = updatedCart.cartItems;  // refresh local cart
        renderCart();
    } catch(err){
        console.error("Error removing item from cart:", err);
        alert("Error removing item from cart");
    }
}





// Update cart quantity
async function updateCartQuantity(cartItemId, quantity){
    try {
        const res = await fetch(`http://localhost:8080/cart/update/${cartItemId}?quantity=${quantity}`, { method: 'PUT' });
        const updatedCart = await res.json();
        cart = updatedCart.cartItems.map(item => ({
            cartItemId: item.cartItemId,
            product: item.product,
            quantity: item.quantity,
            price: item.price
        }));
        renderCart();
    } catch(err){
        console.log(err);
        alert('Error updating cart');
    }
}

// Search products
document.getElementById('searchBtn').onclick = () => {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p =>
        p.productName.toLowerCase().includes(keyword) ||
        p.category.toLowerCase().includes(keyword)
    );
    renderProducts(filtered);
};
