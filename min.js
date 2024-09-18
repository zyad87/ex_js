document
  .getElementById('signUpButton')
  .addEventListener('click', signUpHandler);

async function signUpHandler() {
  let realName = document.getElementById('realName');
  let username = document.getElementById('username');
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let nameAlertMessage = document.getElementById('nameAlertMessage');
  let usernameAlertMessage = document.getElementById('usernameAlertMessage');
  let emailAlertMessage = document.getElementById('emailAlertMessage');
  let passwordAlertMessage = document.getElementById('passwordAlertMessage');

  nameAlertMessage.style.display = 'none';
  usernameAlertMessage.style.display = 'none';
  emailAlertMessage.style.display = 'none';
  passwordAlertMessage.style.display = 'none';

  let isValid = true; 

  if (realName.value.length < 3) {
    nameAlertMessage.style.display = 'block';
    isValid = false;
  }

  let userNameValidator = /^[A-Za-z]+$/;
  if (!userNameValidator.test(username.value)) {
    usernameAlertMessage.style.display = 'block';
    isValid = false;
  }

  let emailValidator = /^((?!\.)[\w-_.]*[^.])@(\w+)(\.\w+(\.\w+)?[^.\W])$/;
  if (!emailValidator.test(email.value)) {
    emailAlertMessage.style.display = 'block';
    isValid = false;
  }

  if (password.value.length < 5) {
    passwordAlertMessage.style.display = 'block';
    isValid = false;
  }

  if (isValid) {
    let url = 'https://66ea7f4b55ad32cda4791cbe.mockapi.io/Users';

    try {
      let res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          realName: realName.value,
          userName: username.value,
          email: email.value,
          password: password.value,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      let data = await res.json();
      window.location.href = 'login.html';
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
