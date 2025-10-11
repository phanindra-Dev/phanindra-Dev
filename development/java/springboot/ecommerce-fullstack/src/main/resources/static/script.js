// ==============================
// Global Variables
// ==============================
let products = [];
let cart = [];
let currentUser = null;

// Sections and elements
const dashboard = document.getElementById('dashboard');
const nav = document.getElementById('nav');

// ==============================
// Logout
// ==============================
document.getElementById('logoutBtn').onclick = async () => {
    try {
        await fetch("http://localhost:8080/users/logout", {
            method: "POST",
            credentials: "include"
        });
    } catch (err) {
        console.warn("Backend logout failed:", err);
    }

    // Clear session
    currentUser = null;
    cart = [];
    localStorage.removeItem("currentUser");

    // Redirect to login page
    window.location.href = "login.html";
};

// ==============================
// Fetch Products
// ==============================
async function fetchProducts() {
    try {
        const res = await fetch('http://localhost:8080/products/all', {
            method: 'GET',
            credentials: 'include'
        });
        products = await res.json();
        generateCategoryButtons();
        renderProducts(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        alert('Error fetching products');
    }
}

// ==============================
// Fetch Cart
// ==============================
async function fetchCart() {
    if (!currentUser) return;
    try {
        const res = await fetch(`http://localhost:8080/cart/view/${currentUser.userId}`, {
            method: 'GET',
            credentials: 'include'
        });
        const userCart = await res.json();
        cart = userCart.cartItems.map(item => ({
            cartItemId: item.cartItemId,
            product: item.product,
            quantity: item.quantity,
            price: item.price,
        }));
        renderCart();
        fetchTotalPrice();
    } catch (err) {
        cart = [];
        console.error("Error fetching cart:", err);
    }
}

// ==============================
// Render Products
// ==============================
function renderProducts(productsList) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';

    if (!productsList || productsList.length === 0) {
        container.innerHTML = '<p>No products found.</p>';
        return;
    }

    productsList.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.productName}" class="product-img" />
            <h3>${product.productName}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.productId})">Add to Cart</button>
        `;
        container.appendChild(card);
    });
}

// ==============================
// Render Cart
// ==============================
function renderCart() {
    const tbody = document.querySelector('#cartTable tbody');
    tbody.innerHTML = '';

    if (!cart || cart.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">Cart is empty</td></tr>';
        document.getElementById("totalAmount").innerText = "0.00";
        return;
    }

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.product.productName}</td>
            <td><input type="number" min="1" value="${item.quantity}" onchange="updateCartQuantity(${item.cartItemId}, this.value)" /></td>
            <td>${item.price}</td>
            <td><button onclick="removeFromCart(${item.cartItemId})">Remove</button></td>
        `;
        tbody.appendChild(row);
    });
}

// ==============================
// Add to Cart
// ==============================
async function addToCart(productId) {
    if (!currentUser) {
        alert("Please login first!");
        return;
    }

    try {
        // Fetch the current cart to check if the product already exists
        const res = await fetch(`http://localhost:8080/cart/view/${currentUser.userId}`, {
            method: 'GET',
            credentials: 'include'
        });

        const userCart = await res.json();
        console.log("Fetched cart:", userCart);

        // Find the item in the cart by matching the product ID
        const existingItem = userCart.cartItems.find(item => item.product.productId === productId);

        if (existingItem) {
            // If the product exists, increase the quantity by 1
            const updatedQuantity = existingItem.quantity + 1;

            console.log(`Updating quantity for product ID ${productId} to ${updatedQuantity}`);

            // Use PUT request to update the cart item quantity
            const updateRes = await fetch(`http://localhost:8080/cart/update/${existingItem.cartItemId}?quantity=${updatedQuantity}`, {
                method: 'PUT', // Use PUT for updating the quantity
                credentials: 'include'
            });

            if (!updateRes.ok) {
                throw new Error("Failed to update the cart");
            }

            const updatedCart = await updateRes.json();
            cart = updatedCart.cartItems.map(item => ({
                cartItemId: item.cartItemId,
                product: item.product,
                quantity: item.quantity,
                price: item.price,
            }));
        } else {
            // If the product does not exist, add it with quantity 1
            console.log(`Adding new product ID ${productId} with quantity 1`);

            const addRes = await fetch(`http://localhost:8080/cart/add?userId=${currentUser.userId}&productId=${productId}&quantity=1`, {
                method: 'POST', // Use POST to add the product
                credentials: 'include'
            });

            if (!addRes.ok) {
                throw new Error("Failed to add product to the cart");
            }

            const updatedCart = await addRes.json();
            cart = updatedCart.cartItems.map(item => ({
                cartItemId: item.cartItemId,
                product: item.product,
                quantity: item.quantity,
                price: item.price,
            }));
        }

        renderCart();
        fetchTotalPrice();

    } catch (err) {
        console.error("Error adding to cart:", err);
        alert('Error updating cart. Please check the console for more details.');
    }
}

// ==============================
// Remove from Cart
// ==============================
async function removeFromCart(cartItemId) {
    try {
        const res = await fetch(`http://localhost:8080/cart/remove/${cartItemId}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (!res.ok) throw new Error('Failed to remove item');
        const updatedCart = await res.json();
        cart = updatedCart.cartItems.map(item => ({
            cartItemId: item.cartItemId,
            product: item.product,
            quantity: item.quantity,
            price: item.price,
        }));
        renderCart();
        fetchTotalPrice();
    } catch (err) {
        console.error("Error removing item:", err);
        alert('Error removing item from cart');
    }
}

// ==============================
// Update Cart Quantity
// ==============================
async function updateCartQuantity(cartItemId, quantity) {
    try {
        const res = await fetch(`http://localhost:8080/cart/update/${cartItemId}?quantity=${quantity}`, {
            method: 'PUT',
            credentials: 'include'
        });
        const updatedCart = await res.json();
        cart = updatedCart.cartItems.map(item => ({
            cartItemId: item.cartItemId,
            product: item.product,
            quantity: item.quantity,
            price: item.price,
        }));
        renderCart();
        fetchTotalPrice();
    } catch (err) {
        console.error("Error updating cart:", err);
        alert('Error updating cart');
    }
}

// ==============================
// Total Price
// ==============================
async function fetchTotalPrice() {
    if (!currentUser) return;

    try {
        const res = await fetch(`http://localhost:8080/cart/total/${currentUser.userId}`, {
            method: 'GET',
            credentials: 'include'
        });
        if (!res.ok) throw new Error("Failed to fetch total price");
        const total = await res.json();
        document.getElementById("totalAmount").innerText = total.toFixed(2);
    } catch (err) {
        console.error("Error fetching total price:", err);
        document.getElementById("totalAmount").innerText = "0.00";
    }
}

// ==============================
// Search
// ==============================
document.getElementById('searchInput').addEventListener('input', () => {
    const keyword = document.getElementById('searchInput').value.toLowerCase().trim();

    if (keyword.trim() === '') {
        // Optionally reset or show all products
        renderProducts(products);
    } else {
        const filtered = (products || []).filter(
            p => p.productName.toLowerCase().includes(keyword) || p.category.toLowerCase().includes(keyword)
        );
        renderProducts(filtered);
    }
});


// ==============================
// Category Filter
// ==============================
function generateCategoryButtons() {
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '';
    const categories = [...new Set(products.map(p => p.category))];

    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.classList.add('category-btn');
        btn.innerText = category;
        btn.style.margin = '5px';
        btn.onclick = () => renderProducts(products.filter(p => p.category === category));
        categoryFilter.appendChild(btn);
    });

    const allBtn = document.createElement('button');
    allBtn.classList.add('category-btn');
    allBtn.innerText = 'All Products';
    allBtn.style.margin = '10px';
    allBtn.onclick = () => renderProducts(products);
    categoryFilter.appendChild(allBtn);
}

// ==============================
// Buy Button
// ==============================
document.getElementById('buyBtn').onclick = async () => {
    if (!currentUser) { alert("Please login first!"); return; }
    if (cart.length === 0) { alert("Your cart is empty!"); return; }

    try {
        const items = cart.map(item => ({ productId: item.product.productId, quantity: item.quantity }));
        const requestBody = { userId: currentUser.userId, addressId: 1, items: items };

        const response = await fetch('http://localhost:8080/orders/place', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        if (response.ok && data.status === "Success") {
            cart = [];
            renderCart();
            fetchTotalPrice();
            alert(`Order #${data.orderId} placed successfully!`);
        } else {
            alert("Order failed: " + (data?.message || response.statusText));
        }
    } catch (err) {
        console.error("Error placing order:", err);
        alert("Error placing order");
    }
};

// ==============================
// Mobile Navbar Toggle
// ==============================
const mobileNav = document.querySelector(".hamburger");
const navbar = document.querySelector(".menubar");
const toggleNav = () => {
    navbar.classList.toggle("active");
    mobileNav.classList.toggle("hamburger-active");
};
mobileNav.addEventListener("click", toggleNav);
document.querySelectorAll(".menubar a").forEach(link => link.addEventListener("click", toggleNav));

// ==============================
// Check Session on Page Load
// ==============================
async function checkSession() {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        dashboard.classList.remove("hidden");
        nav.classList.remove("hidden");
        document.getElementById("userName").innerText = currentUser.name;
        await fetchProducts();
        await fetchCart();
    } else {
        try {
            const res = await fetch("http://localhost:8080/users/me", { method: "GET", credentials: "include" });
            if (!res.ok) return;
            const user = await res.json();
            if (user) {
                currentUser = user;
                localStorage.setItem("currentUser", JSON.stringify(user));
                dashboard.classList.remove("hidden");
                nav.classList.remove("hidden");
                document.getElementById("userName").innerText = user.name;
                await fetchProducts();
                await fetchCart();
            }
        } catch (err) { console.error("Session check failed:", err); }
    }
}

// Call session check on load
window.onload = () => {
    checkSession();
};

// Select the dark mode toggle button
const darkModeToggle = document.getElementById('darkModeToggle');

// Check if the user has already set a dark mode preference
const isDarkMode = localStorage.getItem('darkMode') === 'true';

// Apply dark mode if it was previously set
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerText = 'Light Mode';
}

// Toggle dark mode when the button is clicked
darkModeToggle.onclick = () => {
    const isDark = document.body.classList.toggle('dark-mode');

    // Store the preference in localStorage
    localStorage.setItem('darkMode', isDark);
    let b = document.getElementById('dashboard');

    // Apply the background color based on dark mode state
    b.style.backgroundColor = isDark ? '#121212' : '#ffffff';

    // Change the button text based on the mode
    darkModeToggle.innerText = isDark ? 'Light Mode' : 'Dark Mode';
};
