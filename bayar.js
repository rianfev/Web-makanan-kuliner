let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCheckout() {
    const tbody = document.querySelector('#checkout-table tbody');
    tbody.innerHTML = '';
    let subtotalTotal = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.qty;
        subtotalTotal += subtotal;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>Rp${item.price}</td>
            <td>${item.qty}</td>
            <td>Rp${subtotal}</td>
        `;
        tbody.appendChild(tr);
    });

    updateTotal(subtotalTotal);
}

function getShippingCost() {
    const shippingSelect = document.getElementById('shipping');
    const selected = shippingSelect.value;
    if(selected.includes("JNE")) return 15000;
    if(selected.includes("SiCepat")) return 12000;
    if(selected.includes("Gojek")) return 10000;
    return 0;
}

function updateTotal(subtotal) {
    const shippingCost = getShippingCost();
    document.getElementById('shipping-cost').textContent = shippingCost;
    document.getElementById('checkout-total').textContent = subtotal + shippingCost;
}

// Update total saat pilih metode pengiriman
document.getElementById('shipping').addEventListener('change', () => {
    const subtotalTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    updateTotal(subtotalTotal);
});

// Proses pembayaran
const paymentForm = document.getElementById('payment-form');
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(cart.length === 0){
        alert("Keranjang kosong!");
        window.location.href = 'index.html';
        return;
    }

    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const shippingMethod = document.getElementById('shipping').value;
    const subtotalTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shippingCost = getShippingCost();
    const totalPayment = subtotalTotal + shippingCost;

    alert(`Pembayaran berhasil!\nTotal: Rp${totalPayment}\nMetode Pembayaran: ${paymentMethod}\nMetode Pengiriman: ${shippingMethod}\nTerima kasih telah berbelanja di Rian Shop.`);

    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'index.html';
});