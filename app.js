// Данные пользователей и поездок
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let trips = JSON.parse(localStorage.getItem('trips')) || [];

// Показ секции
function showSection(id) {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// Регистрация
function register() {
    const email = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value.trim();

    if (!email || !password) {
        alert('Введите email и пароль!');
        return;
    }

    if (users.some(user => user.email === email)) {
        alert('Пользователь с таким email уже существует!');
        return;
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Регистрация успешна! Теперь войдите.');
}

// Вход
function login() {
    const email = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value.trim();

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        document.getElementById('authStatus').innerText = `Вы вошли как: ${currentUser.email}`;
        updateHistory();
        alert('Вход выполнен успешно!');
    } else {
        alert('Неверный email или пароль!');
    }
}

// Подсчет расхода топлива
function calculateFuel() {
    const distance = parseFloat(document.getElementById('distance').value);
    const fuel = parseFloat(document.getElementById('fuel').value);

    if (isNaN(distance) || isNaN(fuel) || distance <= 0 || fuel <= 0) {
        alert('Введите корректные значения!');
        return;
    }

    const consumption = (fuel / distance) * 100;
    document.getElementById('result').innerHTML = `🚗 <strong>Расход:</strong> ${consumption.toFixed(2)} л/100км`;

    if (currentUser) {
        trips.push({ user: currentUser.email, distance, fuel, date: new Date() });
        localStorage.setItem('trips', JSON.stringify(trips));
        updateHistory();
    }
}

// Обновление истории поездок
function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = trips
        .filter(trip => currentUser && trip.user === currentUser.email)
        .map(trip => `<li>${new Date(trip.date).toLocaleDateString()}: ${trip.distance} км — ${trip.fuel} л</li>`)
        .join('');
}

// Инициализация
function init() {
    if (currentUser) {
        document.getElementById('authStatus').innerText = `Вы вошли как: ${currentUser.email}`;
        updateHistory();
    }
}

init();


