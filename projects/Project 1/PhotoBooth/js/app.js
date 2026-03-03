const startButton = document.querySelector(".rectangle-5");
const startPage = document.getElementById("startPage");
const filterPage = document.getElementById("filterPage");

startButton.addEventListener("click", function() {
    startPage.style.display = "none";
    filterPage.style.display = "flex";  // or block depending on layout
});