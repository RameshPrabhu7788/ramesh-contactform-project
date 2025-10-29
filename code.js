const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");
const responseBadge = document.getElementById("responseBadge");

const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  subject: document.getElementById("subject"),
  message: document.getElementById("message"),
};

const errs = {
  name: document.getElementById("nameErr"),
  email: document.getElementById("emailErr"),
  message: document.getElementById("messageErr"),
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clearErrors() {
  Object.values(errs).forEach((e) => {
    e.style.display = "none";
    e.textContent = "";
  });
}

function showBadge(type, text) {
  responseBadge.className = "status " + (type === "success" ? "success" : "error");
  responseBadge.textContent = text;
  responseBadge.style.visibility = "visible";

  setTimeout(() => {
    responseBadge.style.visibility = "hidden";
  }, 4000);
}

clearBtn.addEventListener("click", () => {
  form.reset();
  clearErrors();
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearErrors();

  let valid = true;

  if (!fields.name.value.trim()) {
    errs.name.style.display = "block";
    errs.name.textContent = "Name is required.";
    valid = false;
  }

  if (!fields.email.value.trim()) {
    errs.email.style.display = "block";
    errs.email.textContent = "Email is required.";
    valid = false;
  } else if (!emailRegex.test(fields.email.value.trim())) {
    errs.email.style.display = "block";
    errs.email.textContent = "Enter a valid email.";
    valid = false;
  }

  if (!fields.message.value.trim()) {
    errs.message.style.display = "block";
    errs.message.textContent = "Message cannot be empty.";
    valid = false;
  }

  if (!valid) {
    showBadge("error", "Please fix errors before submitting.");
    return;
  }

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Simulate API call
  await new Promise((r) => setTimeout(r, 1000));

  showBadge("success", "Message sent successfully!");
  form.reset();
  submitBtn.textContent = "Submit";
  submitBtn.disabled = false;
});