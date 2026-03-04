// Get all pages
const pages = document.querySelectorAll(".page");

// Hide all pages except the first one
function showPage(pageId) {
    pages.forEach(page => page.style.display = "none");
    document.getElementById(pageId).style.display = "flex";
}

// Initialize first page
showPage("startPage");

// Generic click handler
document.addEventListener("click", (e) => {
    const next = e.target.closest("[data-next]");
    const back = e.target.closest("[data-back]");

    if (next) showPage(next.dataset.next);
    if (back) showPage(back.dataset.back);
});