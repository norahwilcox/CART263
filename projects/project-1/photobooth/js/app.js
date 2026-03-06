const pages = document.querySelectorAll(".page");
const videos = document.querySelectorAll("video");

// Hide all pages except the first one
function showPage(pageId) {
    pages.forEach(page => page.style.display = "none");
    
    document.getElementById(pageId).style.display = "flex";

    if (pageId === "filterPage" || pageId === "cameraPage") {
        startCamera();
    }
}

// Generic click handler
document.addEventListener("click", (e) => {
    const next = e.target.closest("[data-next]");
    const back = e.target.closest("[data-back]");

    if (next) showPage(next.dataset.next);
    if (back) showPage(back.dataset.back);
});

// Initialize first page
showPage("startPage");

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });

        videos.forEach(video => {
            video.srcObject = stream;
        });

    } catch (error) {
        console.error("Camera access denied:", error);
    }
}
