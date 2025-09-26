let products = [];
let cart = [];
let currentUser = null;

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

// Login form submission
document.getElementById('loginForm').onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const res = await fetch('http://localhost:8080/users/all');
        const users = await res.json();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            currentUser = user;
            loginSection.classList.add('hidden');
            dashboard.classList.remove('hidden');
            document.getElementById('userName').innerText = user.name;

            await fetchProducts();
            await fetchCart();
            renderProducts(products);
            renderCart();
            fetchTotalPrice();
        } else {
            alert('Invalid credentials');
        }
    } catch (err) {
        console.error(err);
        alert('Server error');
    }
};

// Signup form submission
document.getElementById('signupForm').onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        await fetch('http://localhost:8080/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        alert('Signup successful! Please login.');
        signupSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
    } catch (err) {
        console.error(err);
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

// Fetch products from backend
async function fetchProducts() {
    try {
        const res = await fetch('http://localhost:8080/products/all');
        products = await res.json();
        generateCategoryButtons();
        renderProducts(products);
    } catch (err) {
        console.error(err);
        alert('Error fetching products');
    }
}

// Fetch cart for current user
async function fetchCart() {
    try {
        const res = await fetch(`http://localhost:8080/cart/view/${currentUser.userId}`);
        const userCart = await res.json();
        cart = userCart.cartItems.map(item => ({
            cartItemId: item.cartItemId,
            product: item.product,
            quantity: item.quantity,
            price: item.price,
        }));
    } catch (err) {
        cart = [];
        console.error(err);
    }
}

// Render products in the table
//function renderProducts(productsList) {
//    const tbody = document.querySelector('#productsTable tbody');
//    tbody.innerHTML = '';
//    productsList.forEach(product => {
//        const row = document.createElement('tr');
//        row.innerHTML = `
//            <td>${product.productId}</td>
//            <td>${product.productName}</td>
//            <td>${product.category}</td>
//            <td>${product.price}</td>
//            <td><button onclick="addToCart(${product.productId})">Add to Cart</button></td>
//        `;
//        tbody.appendChild(row);
//    });
//}
 function renderProducts(productsList) {
            const tbody = document.querySelector('#productsTable tbody');
            tbody.innerHTML = '';  // Clear existing table rows

            productsList.forEach(product => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${product.productId}</td>
                    <td>${product.productName}</td>
                    <td>${product.category}</td>
                    <td>$${product.price}</td>
                    <td style="display: flex; align-items: center; justify-content: center;">
                        <button class="add-to-cart-button" onclick="addToCart(${product.productId})">Add to Cart</button>
                    </td>
                `;

                tbody.appendChild(row);
            });
        }

// Render cart in the table
function renderCart() {
    const tbody = document.querySelector('#cartTable tbody');
    tbody.innerHTML = '';
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
    fetchTotalPrice();
}

// Add product to cart
async function addToCart(productId) {
    try {
        const res = await fetch(`http://localhost:8080/cart/add?userId=${currentUser.userId}&productId=${productId}&quantity=1`, {
            method: 'POST',
        });
        const updatedCart = await res.json();
        cart = updatedCart.cartItems.map(item => ({
            cartItemId: item.cartItemId,
            product: item.product,
            quantity: item.quantity,
            price: item.price,
        }));
        renderCart();
    } catch (err) {
        console.error(err);
        alert('Error adding to cart');
    }
}

// Remove item from cart
async function removeFromCart(cartItemId) {
    try {
        const res = await fetch(`http://localhost:8080/cart/remove/${cartItemId}`, {
            method: 'DELETE',
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
    } catch (err) {
        console.error(err);
        alert('Error removing item from cart');
    }
}

// Update quantity in cart
async function updateCartQuantity(cartItemId, quantity) {
    try {
        const res = await fetch(`http://localhost:8080/cart/update/${cartItemId}?quantity=${quantity}`, {
            method: 'PUT',
        });
        const updatedCart = await res.json();
        cart = updatedCart.cartItems.map(item => ({
            cartItemId: item.cartItemId,
            product: item.product,
            quantity: item.quantity,
            price: item.price,
        }));
        renderCart();
    } catch (err) {
        console.error(err);
        alert('Error updating cart');
    }
}

// Get total price
async function fetchTotalPrice() {
    try {
        const res = await fetch(`http://localhost:8080/cart/total/${currentUser.userId}`);
        if (!res.ok) throw new Error("Failed to fetch total price");
        const total = await res.json();
        document.getElementById("totalAmount").innerText = total.toFixed(2);
    } catch (err) {
        console.error(err);
        document.getElementById("totalAmount").innerText = "Error";
    }
}

// Search products by name or category
document.getElementById('searchBtn').onclick = () => {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(
        p =>
            p.productName.toLowerCase().includes(keyword) ||
            p.category.toLowerCase().includes(keyword)
    );
    renderProducts(filtered);
};

// Generate category buttons dynamically
function generateCategoryButtons() {
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '';

    const categories = [...new Set(products.map(p => p.category))];

    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.classList.add('category-btn');
        btn.innerText = category;
        btn.style.margin = '5px';
        btn.onclick = () => filterByCategory(category);
        categoryFilter.appendChild(btn);
    });

    const allBtn = document.createElement('button');
    allBtn.classList.add('category-btn');
    allBtn.innerText = 'All Products';
    allBtn.style.margin = '5px';
    allBtn.onclick = () => renderProducts(products);
    categoryFilter.appendChild(allBtn);
}

// Filter products by category
function filterByCategory(category) {
    const filteredProducts = products.filter(p => p.category === category);
    renderProducts(filteredProducts);
}


// Buy button logic
document.getElementById('buyBtn').onclick = async () => {
    if (!currentUser) {
        alert("Please login first!");
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    try {
        const items = cart.map(item => ({
            productId: item.product.productId,
            quantity: item.quantity
        }));
        console.log("hii1");

        const requestBody = {
            userId: currentUser.userId,
            addressId: 1, // choose default address
            items: items
        };
        console.log("hii2");
        // Call placeOrder API
        const response = await fetch('http://localhost:8080/orders/place', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });
        console.log("hii3");
        let data = null;
               try {
                   data = await response.json();
               } catch (e) {
                   console.warn("Response not JSON:", e);
               }

               if (!response.ok) {
                   console.error("Backend error:", data);
                   alert("Order failed: " + (data?.message || response.statusText));
                   return;
               }

               console.log("hii4");
               const order = data;

               if (order.status === "Success") {
                   cart = [];
                   renderCart();
                   fetchTotalPrice();
                   alert(`Order #${order.orderId} completed successfully!`);
               } else {
                   alert(`Order failed: ${order.status}`);
               }

           } catch (err) {
               console.error("Network/JS error:", err);
               alert("Error placing order: " + err.message);
           }
       };