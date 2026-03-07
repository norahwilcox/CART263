const pages = document.querySelectorAll(".page");
const videos = document.querySelectorAll("video");
const captureBtn = document.getElementById("captureBtn");
const canvas = document.getElementById("photoCanvas");
const album = document.getElementById("album");
const downloadBtn = document.getElementById("downloadBtn");

let photos = [];

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

// Take photo when red circle clicked
captureBtn.addEventListener("click", takePhoto);

// takes a photo 
function takePhoto() {
    const video = document.querySelector("#cameraPage video");
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // draw webcam frame onto canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // convert to image
    const photo = canvas.toDataURL("image/png");

    photos.push(photo);
    updateAlbum();
}

// adds the photo to the album
function updateAlbum() {
    album.innerHTML = "";

    photos.forEach((photo, index) => {
        const img = document.createElement("img");
        img.src = photo;
        img.style.width = "150px";
        img.style.margin = "10px";

        album.appendChild(img);

    });
}

downloadBtn.addEventListener("click", downloadPhotos);

function downloadPhotos() {

    photos.forEach((photo, index) => {
        const link = document.createElement("a");

        link.href = photo;
        link.download = "photobooth_" + (index + 1) + ".png";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

}