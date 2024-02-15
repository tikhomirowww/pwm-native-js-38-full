// show modal connect
const modal = document.querySelector(".modal");
const registerUserModalBtn = document.querySelector(".registerUser-modal");

// ?register  connect
const userNameInp = document.querySelector("#username");
const emailInp = document.querySelector("#email");
const ageInp = document.querySelector("#age");
const passwordInp = document.querySelector("#password");
const passwordConfirmInp = document.querySelector("#passwordConfirm");
const registerForm = document.querySelector("#registerUser-form");

// ?modal logic

function showModal() {
  if (modal.style.display === "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
}

registerUserModalBtn.addEventListener("click", showModal);

//? register logic
const USERS_API = "http://localhost:8000/users";

function registerUser(e) {
  e.preventDefault();
  if (
    !userNameInp.value.trim() ||
    !emailInp.value.trim() ||
    !ageInp.value.trim() ||
    !passwordInp.value.trim() ||
    !passwordConfirmInp.value.trim()
  ) {
    alert("Some inputs are empty");
    return;
  }

  if (passwordInp.value !== passwordConfirmInp.value) {
    alert("Passwords are not correct");
    return;
  }

  const userObj = {
    username: userNameInp.value,
    email: emailInp.value,
    age: ageInp.value,
    password: passwordInp.value,
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
  passwordInp.value = "";
  passwordConfirmInp.value = "";

  alert("Registered successfully!");

  modal.style.display = "none";
}

registerForm.addEventListener("submit", registerUser);
