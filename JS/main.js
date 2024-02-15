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
const registerCancel = document.querySelector(".modal button[type='reset']");

// ?modal logic

function showModal() {
  if (!modal.classList.contains("show")) {
    modal.style.display = "block";
    setTimeout(function () {
      modal.classList.add("show");
    }, 10);
  } else {
    modal.classList.remove("show");
  }
}
function hideModal() {
  modal.classList.remove("show");
}

registerUserModalBtn.addEventListener("click", showModal);


function isDescendant(parent, child) {
  let node = child.parentNode;
  while (node != null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

function clickOutsideModal(event) {
  if (
    !isDescendant(modal, event.target) &&
    event.target !== registerUserModalBtn
  ) {
    modal.classList.remove("show");
  }
}

document.addEventListener("click", clickOutsideModal);

// register logic

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
    showMessage("Some inputs are empty");
    return;
  }

  if (passwordInp.value !== passwordConfirmInp.value) {
    showMessage("Passwords are not correct");
    return;
  }

  if (/\d/.test(userNameInp.value)) {
    showMessage("Username should not contain numbers");
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

  showMessage("Registered successfully!");

  modal.style.opacity = "0";
  modal.style.display = "none";
}

registerForm.addEventListener("submit", registerUser);
registerCancel.addEventListener("click", hideModal);

// message box logic

const messageBox = document.querySelector(".messageBox");

function showMessage(message) {
  messageBox.textContent = message;
  messageBox.classList.add("show");
  setTimeout(hideMessage, 2000);
}

function hideMessage() {
  messageBox.classList.remove("show");
}
