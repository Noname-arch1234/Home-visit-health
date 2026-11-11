const PHONE = "918778966138";

document.getElementById("year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "☰";
}));

const dateInput = document.querySelector('input[name="date"]');
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
dateInput.min = localToday;

document.getElementById("bookingForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const error = document.getElementById("formError");
  error.textContent = "";
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const message = [
    "Hello Doorwell Health, I would like to request a doctor home visit.",
    "",
    `Patient name: ${data.get("patient")}`,
    `Age: ${data.get("age")}`,
    `Contact number: ${data.get("mobile")}`,
    `Address: ${data.get("address")}`,
    `Preferred date: ${data.get("date")}`,
    `Preferred time: ${data.get("time")}`,
    `Reason for visit: ${data.get("reason") || "Not specified"}`,
    "",
    "I understand this is a request only and the appointment is subject to confirmation and availability."
  ].join("\n");

  const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
