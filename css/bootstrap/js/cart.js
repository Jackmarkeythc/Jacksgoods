document.addEventListener('DOMContentLoaded', () => {
  const cartItems = [
    { id: examplemodal, name: 'Fender Custom Shop 56 Stratocaster', price: 3500, quantity: 1 },
    { id: 2, name: 'Gibson Custom Shop 1957 Les Paul', price: 4500, quantity: 1 }
  ];

  function updateCart() {
    const cartTable = document.getElementById('cart-items');
    cartTable.innerHTML = '';
    let totalAmount = 0;

    cartItems.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>
          <input type="number" value="${item.quantity}" min="1" class="form-control" data-id="${item.id}">
        </td>
        <td>$${(item.price * item.quantity).toFixed(2)}</td>
        <td>
          <button class="btn btn-danger" data-id="${item.id}">Remove</button>
        </td>
      `;
      cartTable.appendChild(row);

      totalAmount += item.price * item.quantity;
    });

    document.getElementById('total-amount').innerText = totalAmount.toFixed(2);
  }

  function addEventListeners() {
    document.getElementById('cart-items').addEventListener('input', event => {
      if (event.target.type === 'number') {
        const id = parseInt(event.target.getAttribute('data-id'));
        const quantity = parseInt(event.target.value);
        const item = cartItems.find(item => item.id === id);
        if (item && quantity > 0) {
          item.quantity = quantity;
          updateCart();
        }
      }
    });

    document.getElementById('cart-items').addEventListener('click', event => {
      if (event.target.classList.contains('btn-danger')) {
        const id = parseInt(event.target.getAttribute('data-id'));
        const itemIndex = cartItems.findIndex(item => item.id === id);
        if (itemIndex > -1) {
          cartItems.splice(itemIndex, 1);
          updateCart();
        }
      }
    });
  }

  updateCart();
  addEventListeners();
});
