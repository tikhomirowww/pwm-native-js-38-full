//show modal connect
const registerUserModalBtn = document.querySelector(".registerUser-modal");
const modal = document.querySelector(".modal");

//register connect
const userNameInp = document.querySelector("#username");
const emailInp = document.querySelector("#email");
const ageInp = document.querySelector("#age");
const passwordImp = document.querySelector("#password");
const passwordConfirmInp = document.querySelector("#passwordConfirm");
const registerForm = document.querySelector("#registerUser-form");
const USERS_API = "http://localhost:8000/users";

//modal logic

function showModal() {
  if (modal.style.display === "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
}

registerUserModalBtn.addEventListener("click", showModal);
document;
//register logic
passwordImp.addEventListener("input", () => {
  if (passwordImp.value.length < 6) {
    passwordImp.style.border = "3px solid red";
    passwordImp.style.borderRadius = "3px";
  } else {
    passwordImp.style.border = "3px solid green";
    passwordImp.style.borderRadius = "3px";
  }
});
passwordConfirmInp.addEventListener("input", () => {
  if (
    passwordConfirmInp.value.length < 6 ||
    passwordImp.value !== passwordConfirmInp.value
  ) {
    passwordConfirmInp.style.border = "3px solid red";
    passwordConfirmInp.style.borderRadius = "3px";
  } else {
    passwordConfirmInp.style.border = "3px solid green";
    passwordConfirmInp.style.borderRadius = "3px";
  }
});
function registerUser(e) {
  e.preventDefault();
  if (
    !userNameInp.value.trim() ||
    !emailInp.value.trim() ||
    !ageInp.value.trim() ||
    !passwordImp.value.trim() ||
    !passwordConfirmInp.value.trim()
  ) {
    alert("Заполните все поля");
    return;
  }
  if (passwordImp.value !== passwordConfirmInp.value) {
    alert("Неправильное подтверждение пароля");
    return;
  }
  if (passwordImp.value.length < 6) {
    alert("Пароль должен быть не менее 6 символов");
    return;
  }
  const userObj = {
    username: userNameInp.value,
    email: emailInp.value,
    age: ageInp.value,
    password: passwordImp.value,
  };
  fetch(USERS_API, {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  userNameInp.value = "";
  emailInp.value = "";
  ageInp.value = "";
  passwordImp.value = "";
  passwordConfirmInp.value = "";

  alert("Успех!!!");

  modal.style.display = "none";
}

registerForm.addEventListener("submit", registerUser);
