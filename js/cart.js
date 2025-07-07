function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsDiv = document.getElementById("cart-items");
    const cartSummaryDiv = document.getElementById("cart-summary");

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `<p style="text-align:center; font-size:1.2rem;">Your cart is empty.</p>`;
        cartSummaryDiv.innerHTML = "";
        return;
    }

    let total = 0;
    cartItemsDiv.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="product-card" style="display:flex;align-items:center;gap:20px;margin-bottom:20px;">
                <img src="${item.image}" alt="${item.name}" style="width:100px;height:100px;object-fit:cover;border-radius:8px;">
                <div style="flex:1;">
                    <div class="product-title">${item.name}</div>
                    <div class="product-price">$${item.price.toFixed(2)}</div>
                    <div>
                        <button class="qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
                        <span style="margin:0 10px;">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
                        <button class="remove-btn" onclick="removeItem('${item.id}')">Remove</button>
                    </div>
                </div>
                <div style="font-weight:600;">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `;
    }).join("");

    cartSummaryDiv.innerHTML = `
        <div style="font-size:1.2rem;">
            <strong>Total: $${total.toFixed(2)}</strong>
        </div>
    `;
}

function updateQty(id, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.quantity += change;
    if (item.quantity < 1) {
        cart = cart.filter(i => i.id !== id);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

document.getElementById("checkout-btn").onclick = function() {
    alert("Checkout functionality coming soon!");
};

renderCart();