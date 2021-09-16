const scriptURL = "https://script.google.com/macros/s/AKfycbzq63H7FA0twEhQp11IV1BBEebgUTgSmvHqdgd9XWcuMym0vE0kvfh-1SzIcxhTWu2Asw/exec";
const form = document.forms["Asterix-form"];
const btnKirim = document.querySelector(".btn-kirim");
const btnLoading = document.querySelector(".btn-loading");
const MyAlert = document.querySelector(".alert");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // ketika tombol submit diklik

  // tampilkan tombol loading, hilangkan tombol kirim
  btnLoading.classList.toggle("d-none");
  btnKirim.classList.toggle("d-none");

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      // tampilkan tombol kirim, hilangkan tombol loading
      btnLoading.classList.toggle("d-none");
      btnKirim.classList.toggle("d-none");
      // tampilkan alert
      MyAlert.classList.toggle("d-none");
      // reset form
      form.reset;

      console.log("Success!", response);
    })
    .catch((error) => console.error("Error!", error.message));
});

const galleryImage = document.querySelectorAll(".card");
galleryImage.forEach((img, i) => {
  img.dataset.aos = "fade-down";
  img.dataset.aosDelay = i * 100;
  img.dataset.duration = 1000;
});

AOS.init({
  once: true,
  duration: 2000,
});

gsap.from(".navbar", { duration: 1.5, y: "-100%", opacity: 0, ease: "bounce" });
gsap.from(".display-4", { duration: 1, x: -200, opacity: 0, ease: "back" });
gsap.from(".lead", { duration: 1, x: 200, opacity: 0, ease: "back" });
