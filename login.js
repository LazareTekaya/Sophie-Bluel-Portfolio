document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('email').value;
    const password = document.getElementById('mdp').value;
    const errorMessage = document.getElementById('error-message');

    console.log("Username:", username);
    console.log("Password:", password);

    if (username === 'sophie.bluel@test.tld' && password === 'S0phie') {
        const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4';

        localStorage.setItem('authToken', authToken);

        console.log("Redirecting to admin.html");
        window.location.href = 'admin.html';
    } else {
        errorMessage.textContent = 'Nom d\'utilisateur ou mot de passe incorrect';
    }
});