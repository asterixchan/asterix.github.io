const close = document.querySelectorAll(".close");
// const card = document.querySelector(".card");

close.forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.target.parentElement.style.display = "none";
    e.preventDefault("blank");
  });
});
