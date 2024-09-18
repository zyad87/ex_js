document.getElementById('loginButton').addEventListener('click', loginHandler);

async function loginHandler() {
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const usernameAlertMessage = document.getElementById('usernameAlertMessage');
  const passwordAlertMessage = document.getElementById('passwordAlertMessage');

  clearAlerts();

  if (!username.value || !password.value) {
    showAlerts('الرجاء إدخال اسم المستخدم وكلمة المرور.');
    return;
  }

  const url = 'https://66ea7f4b55ad32cda4791cbe.mockapi.io/Users';

  try {
    const res = await fetch(url);
    const data = await res.json();

    const userFound = data.find(user => user.userName === username.value && user.password === password.value);

    if (userFound) {
      localStorage.setItem('name', userFound.realName);
      window.location.href = 'home.html';
    } else {
      showAlerts('اسم المستخدم أو كلمة المرور غير صحيحة.');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    showAlerts('حدث خطأ أثناء الاتصال بالخادم. حاول مرة أخرى لاحقًا.');
  }
}

function showAlerts(message) {
  usernameAlertMessage.textContent = message;
  passwordAlertMessage.textContent = message;
  usernameAlertMessage.style.display = 'block';
  passwordAlertMessage.style.display = 'block';
}

function clearAlerts() {
  usernameAlertMessage.style.display = 'none';
  passwordAlertMessage.style.display = 'none';
}
