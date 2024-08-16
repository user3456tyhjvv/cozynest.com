 // Toggle between login and register forms
 function showRegister() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
}

// Handle form submissions
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

document.getElementById('login-btn').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch('cozynestdb_users.sql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'homepage.html';
        } else if (data.error === 'no_account') {
            document.getElementById('message').innerText = 'You do not have an account. Redirecting to signup...';
            setTimeout(() => {
                window.location.href = 'signup.html';
            }, 3000);
        } else {
            document.getElementById('message').innerText = 'Incorrect email or password. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Dropdown menu toggle
document.addEventListener('DOMContentLoaded', function() {
    var dropdown = document.querySelector('.dropdown');
    var dropdownContent = document.querySelector('.dropdown-content');

    dropdown.addEventListener('mouseover', function() {
        dropdownContent.style.display = 'block';
    });

    dropdown.addEventListener('mouseout', function() {
        dropdownContent.style.display = 'none';
    });

    dropdown.addEventListener('click', function() {
        dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
    });
});

// document.addEventListener("DOMContentLoaded", function() {
//     let slideIndex = 0;
//     showSlides();

//     function showSlides() {
//         let slides = document.getElementsByClassName("mySlides");
//         for (let i = 0; i < slides.length; i++) {
//             slides[i].style.display = "none";
//         }
//         slideIndex++;
//         if (slideIndex > slides.length) { slideIndex = 1 }
//         slides[slideIndex - 1].style.display = "block";
//         setTimeout(showSlides, 3000); // Change image every 3 seconds
//     }

//     document.getElementById('regiClick').addEventListener('click', function() {
//         document.getElementById('login-form').style.display = 'none';
//         document.getElementById('signup-form').style.display = 'block';
//     });

//     document.getElementById('loginClick').addEventListener('click', function() {
//         document.getElementById('signup-form').style.display = 'none';
//         document.getElementById('login-form').style.display = 'block';
//     });
// });
// // 