const mobileInput = document.querySelector("[data-numeric-input]");

function handleNumericInput(e) {
  const value = e.target.value;

  const numeric = value.replace(/[^0-9]/g, "");

  e.target.value = numeric;
}

if (mobileInput !== null) {
  mobileInput.addEventListener("input", handleNumericInput);
}

const sidebarItems = document.querySelectorAll(".sidebar-item");

sidebarItems.forEach((item) => {
  if (item.href === window.location.href) {
    item.classList.add("active");
    item.ariaCurrent = "page";
  }
});
