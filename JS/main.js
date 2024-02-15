//show modal connect
const registerUserModalBtn = document.querySelector(".registerUser-modal");
const modal = document.querySelector(".modal");


// ?register  connect

const userNameInp = document.querySelector("#username");
const emailInp = document.querySelector("#email");
const ageInp = document.querySelector("#age");
const passwordImp = document.querySelector("#password");
const passwordConfirmInp = document.querySelector("#passwordConfirm");
const registerForm = document.querySelector("#registerUser-form");
const USERS_API = "http://localhost:8000/users";


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



function registerUser(e) {
  e.preventDefault();
  if (
    !userNameInp.value.trim() ||
    !emailInp.value.trim() ||
    !ageInp.value.trim() ||
    !passwordImp.value.trim() ||
    !passwordConfirmInp.value.trim()
  ) {

    showMessage("Some inputs are empty");
    return;
  }

  if (passwordInp.value !== passwordConfirmInp.value) {
    showMessage("Passwords are not correct");
    return;
  }

if (passwordImp.value.length < 6) {
    alert("Пароль должен быть не менее 6 символов");
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

  showMessage("Успех!!!");

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
