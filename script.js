document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartModal = document.getElementById('cart-modal');
    const cartLink = document.getElementById('cart-link');
    const closeBtn = document.querySelector('.close');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCountElement = document.querySelector('.cart-count');
    const checkoutButton = document.getElementById('proceedToCheckout');
    const currency = getCurrency();

    // Add to Cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const title = productCard.querySelector('.product-title').textContent;
            const price = parseFloat(productCard.querySelector('.product-price').textContent.replace(/[^0-9.]/g, ''));

            const cartItem = { title, price };
            cart.push(cartItem);
            updateCart();
        });
    });

    // Cart Modal open/close functionality
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Clear Cart functionality
    document.getElementById('clear-cart').addEventListener('click', () => {
        cart.length = 0;
        updateCart();
        console.log('Cart cleared');
    });

    // Checkout button functionality
    checkoutButton.addEventListener('click', () => {
        const isLoggedIn = checkLoginStatus();

        if (isLoggedIn) {
            window.location.href = 'paymentpage.html';
        } else {
            window.location.href = 'sign-up/signup.html';
        }
    });

    // Update cart display
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                ${item.title} - ${currency} ${item.price.toFixed(2)}
                <button class="remove-item">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
            total += item.price;

            // Handle removal of individual items
            cartItemElement.querySelector('.remove-item').addEventListener('click', () => {
                const index = cart.indexOf(item);
                if (index > -1) {
                    cart.splice(index, 1);
                    updateCart();
                    console.log(`Item ${item.title} removed`);
                }
            });
        });

        totalPriceElement.textContent = `${currency} ${total.toFixed(2)}`;
        cartCountElement.textContent = cart.length;
    }

    // Currency determination function
    function getCurrency() {
        const userCountry = navigator.language.includes('en-KE') ? 'KSH' : 'USD';
        return userCountry === 'KSH' ? 'ksh' : '$';
    }

    // Simplified login check function
    function checkLoginStatus() {
        return document.cookie.includes('loggedIn=true');
    }

    // Display user profile or login/sign-up button
    function displayUserProfile() {
        const welcomeMessage = document.querySelector('.welcome-message');
        const profileButton = document.getElementById('profile-button');

        if (checkLoginStatus()) {
            welcomeMessage.style.display = 'inline';
            profileButton.classList.add('show');
        } else {
            welcomeMessage.style.display = 'none';
            profileButton.classList.remove('show');
        }
    }

    displayUserProfile();

    // Redirect to profile or sign-up page
    document.getElementById('profile-button').addEventListener('click', () => {
        window.location.href = '/account-details';
    });

    document.getElementById('signUpBtn').addEventListener('click', () => {
        window.location.href = 'sign-up/signup.html';
    });

    document.getElementById('register-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch('register.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            showLogin();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});


// document.addEventListener('DOMContentLoaded', () => {
//     const cart = [];
//     const cartModal = document.getElementById('cart-modal');
//     const cartLink = document.getElementById('cart-link');
//     const closeBtn = document.querySelector('.close');
//     const cartItemsContainer = document.querySelector('.cart-items');
//     const totalPriceElement = document.getElementById('total-price');
//     const cartCountElement = document.querySelector('.cart-count');
//     const checkoutButton = document.getElementById('proceedToCheckout');
//     const currency = getCurrency();

//     document.querySelectorAll('.add-to-cart').forEach(button => {
//         button.addEventListener('click', (e) => {
//             const productCard = e.target.closest('.product-card');
//             const title = productCard.querySelector('.product-title').textContent;
//             const price = parseFloat(productCard.querySelector('.product-price').textContent.replace(/[^0-9.]/g, ''));

//             const cartItem = { title, price };
//             cart.push(cartItem);
//             updateCart();
//         });
//     });

//     cartLink.addEventListener('click', (e) => {
//         e.preventDefault();
//         cartModal.style.display = 'block';
//     });

//     closeBtn.addEventListener('click', () => {
//         cartModal.style.display = 'none';
//     });

//     window.addEventListener('click', (e) => {
//         if (e.target == cartModal) {
//             cartModal.style.display = 'none';
//         }
//     });
//     document.getElementById('clear-cart').addEventListener('click', () => {
//         cart.length = 0; // Clear the cart array
//         updateCart();
//         console.log('Cart cleared');
//     function updateCart() {
//         cartItemsContainer.innerHTML = '';
//         let total = 0;

//     //     cart.forEach(item => {
//     //         const cartItemElement = document.createElement('div');
//     //         cartItemElement.textContent = `${item.title} - ksh${item.price.toFixed(2)}`;
//     //         cartItemsContainer.appendChild(cartItemElement);
//     //         total += item.price;
//     //     });

//     //     totalPriceElement.textContent = `ksh${total.toFixed(2)}`;
//     //     cartCountElement.textContent = cart.length;
//     // }
//     cart.forEach(item => {
//         const cartItemElement = document.createElement('div');
//         cartItemElement.className = 'cart-item';
//         cartItemElement.innerHTML = `
//             ${item.title} - ${currency} ${item.price.toFixed(2)}
//             <button class="remove-item">Remove</button>
//         `;
//         cartItemsContainer.appendChild(cartItemElement);
//         total += item.price;
// // Handle removal of individual items
// cartItemElement.querySelector('.remove-item').addEventListener('click', () => {
//     const index = cart.indexOf(item);
//     if (index > -1) {
//         cart.splice(index, 1);
//         updateCart();
//         console.log(`Item ${item.title} removed`);
//     }
// });
// });

// totalPriceElement.textContent = `${currency} ${total.toFixed(2)}`;
// cartCountElement.textContent = cart.length;
// }

// function getCurrency() {
// const userCountry = navigator.language.includes('en-KE') ? 'KSH' : 'USD';
// return userCountry === 'KSH' ? 'ksh' : '$';
// }


// });
// });
// checkoutButton.addEventListener('click', () => {
//     const isLoggedIn = checkLoginStatus(); // Replace with actual login check

//     if (isLoggedIn) {
//         window.location.href = 'paymentpage.html'; // Replace with your actual checkout page
//     } else {
//         window.location.href = 'sign-up/signup.html'; // Redirect to sign-up if not logged in
//     }
//     function checkLoginStatus() {
//     return document.cookie.includes('loggedIn=true'); // Simplified login check
// }
// });


// //Handle checkout button logic
// document.addEventListener('DOMContentLoaded', function() {
//     var checkoutButton = document.getElementById('#proceed-to-checkout');

//     checkoutButton.addEventListener('click', function() {
//         var isLoggedIn = checkLoginStatus(); // You should implement this function

//         if (isLoggedIn) {
//             window.location.href = 'paymentpage.html'; // Replace with your actual checkout page
//         } else {
//             window.location.href = 'sign-up/signup.html'; // Replace with your actual sign-up page
//         }
//     });
// });

// //Handle form submission
// document.getElementById('register-form').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const formData = new FormData(this);

//     fetch('register.php', {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => response.text())
//     .then(data => {
//         alert(data);
//         showLogin();
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// });


// // scripts.js
// document.addEventListener('DOMContentLoaded', () => {
//     function isLoggedIn() {
//         // This function should check if the user is logged in
//         // For demonstration, let's assume a cookie indicates login status
//         return document.cookie.includes('loggedIn=true'); // Example check
//     }

//     function displayUserProfile() {
//         const welcomeMessage = document.querySelector('.welcome-message');
//         const profileButton = document.getElementById('profile-button');

//         if (isLoggedIn()) {
//             welcomeMessage.style.display = 'inline'; // Show welcome message
//             profileButton.classList.add('show'); // Show profile button
//         } else {
//             welcomeMessage.style.display = 'none'; // Hide welcome message
//             profileButton.classList.remove('show'); // Hide profile button
//         }
//     }

//     displayUserProfile();

//     // Add click event listener to profile button
//     document.getElementById('profile-button').addEventListener('click', () => {
//         window.location.href = '/account-details'; // Redirect to account details page
//     });
// });
  




// // Wait for the DOM to fully load
// document.addEventListener('DOMContentLoaded', function() {
//     // Get the sign-up button by its ID
//     var signUpBtn = document.getElementById('signUpBtn');

//     // Add a click event listener to the button
//     signUpBtn.addEventListener('click', function() {
//         // Redirect to the sign-up page
//         window.location.href = 'sign-up/signup.html';
//     });
// });
