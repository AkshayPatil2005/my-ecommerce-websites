document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("click", function (e) {
        if (e.target.classList.contains("add-to-cart-btn")) {
            const card = e.target.closest(".product-card");
            const name = card.querySelector(".product-title").textContent.trim();
            const price = parseFloat(card.querySelector(".product-price").textContent.replace("$", ""));
            const image = card.querySelector("img").src;
            const id = name.replace(/\s+/g, "-").toLowerCase(); // simple id

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let existing = cart.find(item => item.id === id);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({ id, name, price, image, quantity: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(cart));

            // Optional: show notification
            showCartNotification(`${name} added to cart!`);
        }
    });

    function showCartNotification(message) {
        let notif = document.createElement("div");
        notif.className = "cart-notification";
        notif.textContent = message;
        document.body.appendChild(notif);

        setTimeout(() => notif.classList.add("visible"), 10);
        setTimeout(() => {
            notif.classList.remove("visible");
            setTimeout(() => notif.remove(), 300);
        }, 1500);
    }

    // Add minimal notification styles if not present
    if (!document.getElementById("cart-notification-style")) {
        const style = document.createElement("style");
        style.id = "cart-notification-style";
        style.textContent = `
        .cart-notification {
            position: fixed;
            top: 30px;
            right: 30px;
            background: #222;
            color: #fff;
            padding: 16px 32px;
            border-radius: 30px;
            font-size: 1rem;
            box-shadow: 0 2px 12px rgba(0,0,0,0.12);
            opacity: 0;
            pointer-events: none;
            z-index: 9999;
            transition: opacity 0.3s, transform 0.3s;
            transform: translateY(-20px);
        }
        .cart-notification.visible {
            opacity: 1;
            transform: translateY(0);
        }
        `;
        document.head.appendChild(style);
    }
});