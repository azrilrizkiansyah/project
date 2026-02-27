const users = [
    { username: "admin", password: "123456" },
    { username: "user", password: "password" },
    { username: "test", password: "test123" }
];

document.querySelector('.login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    console.log("Username input:", username);
    console.log("Password input:", password);


    const foundUser = users.find(user =>
        user.username === username && user.password === password
    );

    if (foundUser) {
        alert('Login berhasil! Selamat datang, ' + username);
        window.location.href = 'katalog.html';
    } else {
        alert('Username atau password salah!');
        document.getElementById('password').value = '';
        document.getElementById('password').focus();
    }
});