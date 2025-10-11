const user = JSON.parse(localStorage.getItem("currentUser"));
const userId = user.userId;

let cachedAddresses = []; // Cache for all addresses

// Fetch user details, all addresses, and user orders
Promise.all([
    fetch(`http://localhost:8080/users/me/${userId}`).then(response => response.json()),
    fetch(`http://localhost:8080/addresses/all`).then(response => response.json()),
    fetch(`http://localhost:8080/orders/user/${userId}`).then(response => response.json()) // Fetch orders for the user
])
    .then(([user, allAddresses, userOrders]) => {
        console.log('User data:', user);
        console.log('All addresses:', allAddresses);
        console.log('User orders:', userOrders); // Log user orders

        cachedAddresses = allAddresses; // Cache the addresses

        const userInfoDiv = document.getElementById('user-info');
        const userAddressElement = document.getElementById('user-address');
        const addressSelect = document.getElementById('address-select');
        const ordersSection = document.getElementById('orders-section'); // Add an element for orders

        // Display user information and current address in the profile section
        if (!userInfoDiv) {
            console.error('No element with id "user-info" found in HTML');
            return;
        }
        userInfoDiv.innerHTML = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phoneNumber || 'N/A'}</p>
            <h3>Address</h3>
            <p id="user-address">
               ${user.address ? formatAddress(user.address) : ''}
            </p>
            <button onclick="openAddressModal()">Edit Address</button>

            <h3 style="margin-top:20px">Orders</h3>
            <div id="orders-section">
                ${userOrders.length > 0 ? renderOrders(userOrders) : '<p>No orders found.</p>'}
            </div>
        `;

        // Set the address in the modal select dropdown (address-select)
        if (user.address) {
            addressSelect.value = user.address.id; // Set the user's current address as selected
        }

        // Set the current address in the profile section if available
        if (user.address) {
            userAddressElement.innerText = formatAddress(user.address);
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        document.getElementById('user-info').innerHTML = '<p>Failed to load user data.</p>';
    });

// Format the address as a readable string
function formatAddress(address) {
    return `${address.addressLine1}${address.addressLine2 ? ', ' + address.addressLine2 : ''}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;
}

// Function to render orders as a list
function renderOrders(orders) {
    return orders.map(order => {
        return `
            <div class="order">
                <p><strong>Order ID:</strong> ${order.orderId}</p>
                <p><strong>Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> ${order.status}</p>

                <h4>Products:</h4>
                <ul>
                    ${order.orderedItems && order.orderedItems.length > 0 ? renderProducts(order.orderedItems) : '<li>No products found</li>'}
                </ul>
            </div>
        `;
    }).join('');
}

// Function to render product details (product name, quantity, etc.)
function renderProducts(products) {
    return products.map(product => {
        return `
            <li>
                <img src="${product.product.imageUrl}" alt="${product.product.productName}" style="width: 50px; height: 50px;"/>
                <strong>Product Name:</strong> ${product.product.productName} <br>
                <strong>Category:</strong> ${product.product.category} <br>
                <strong>Quantity:</strong> ${product.quantity} <br>
                <strong>Price:</strong> ₹${product.product.price} <br>
                <strong>Rating:</strong> ${product.product.rating}⭐ <br>
            </li>
        `;
    }).join('');
}

// Open modal for address editing and show available addresses
function openAddressModal() {
    document.getElementById('editModal').style.display = 'flex';
    document.getElementById('address-form').style.display = 'block';

    // Display all addresses in the modal (using cached addresses)
    const addressSelect = document.getElementById('address-select');
    addressSelect.innerHTML = ''; // Clear previous options

    cachedAddresses.forEach(address => {
        const option = document.createElement('option');
        option.value = address.id;
        option.textContent = formatAddress(address);
        addressSelect.appendChild(option);
    });

    // Set the user's current address as the selected option
    if (user.address) {
        addressSelect.value = user.address.id;
    }
}

// Close the modal
function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Save new Address
function saveAddress() {
    const newAddress = {
        addressLine1: document.getElementById('address-line1').value,
        addressLine2: document.getElementById('address-line2').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zipCode: document.getElementById('zip-code').value,
        country: document.getElementById('country').value,
    };

    // Add new address
    fetch(`http://localhost:8080/addresses/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAddress)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Address added:', data);
        // After saving, update the address section
        document.getElementById('user-address').innerText = formatAddress(newAddress);
        closeModal();  // Close modal after saving
    })
    .catch(err => console.error('Error saving address:', err));
}

// Event listener for closing modal when clicked outside
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeModal();
    }
};
