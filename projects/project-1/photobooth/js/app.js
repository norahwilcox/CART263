// Gets elements from HTML
const pages = document.querySelectorAll(".page");
const videos = document.querySelectorAll("video");
const captureBtn = document.getElementById("captureBtn");
const canvas = document.getElementById("photoCanvas");
const album = document.getElementById("album");
const downloadBtn = document.getElementById("downloadBtn");
const deleteBtn = document.getElementById("deleteBtn");
const startBtn = document.querySelector("#startPage .container");
const startText = startBtn.querySelector(".start");
const buttons = document.querySelectorAll(".btn");
const folders = document.querySelectorAll("[data-folder]");

// Stores the photos taken in an array
let photos = [];

// Hide all pages except the first one
function showPage(pageId) {
    pages.forEach(page => page.style.display = "none");
    
    document.getElementById(pageId).style.display = "flex";

    if (pageId === "filterPage" || pageId === "cameraPage") {
        startCamera();
    }
}

// Click next or back to switch pages
document.addEventListener("click", (e) => {
    const next = e.target.closest("[data-next]");
    const back = e.target.closest("[data-back]");

    if (next) showPage(next.dataset.next);
    if (back) showPage(back.dataset.back);
});

// Initialize first page
showPage("startPage");

// For each page that uses the webacm, start the camera
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

// Take photo and adds to the album
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

// Button pressed animation for the capture button
captureBtn.addEventListener("mouseenter", () => {
    captureBtn.style.backgroundColor = "#CF0C0C";
});

captureBtn.addEventListener("mouseleave", () => {
    captureBtn.style.backgroundColor = "#FF0000";
});

captureBtn.addEventListener("mousedown", () => {
    captureBtn.style.backgroundColor = "#ffffff";
});

captureBtn.addEventListener("mouseup", () => {
    captureBtn.style.backgroundColor = "#FF0000";
});

// Updates the album
function updateAlbum() {
    album.innerHTML = "";

    photos.forEach((photo, index) => {
        const img = document.createElement("img");
        img.src = photo;
        img.style.width = "200px";
        img.style.margin = "5px";

        album.appendChild(img);
    });
}

// Download image button
downloadBtn.addEventListener("click", downloadPhotos);
// Delete all button
deleteBtn.addEventListener("click", deleteAllPhotos);

// Asks user to download the image
function downloadPhotos() {
    if (confirm("Download all photos?")) {
        photos.forEach((photo, index) => {
            setTimeout(() => {
                const link = document.createElement("a");

                link.href = photo;
                link.download = "photobooth_" + (index + 1) + ".png";

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                }, index * 200); // delays each download slightly
            }
        );
    }
}

// Deletes all the images in the album
function deleteAllPhotos() {
   if (confirm("Delete all photos?")) {
        photos = [];
        updateAlbum();
    }
}

// Button pressed animation for the start button
startBtn.addEventListener("mouseenter", () => {
    startBtn.style.backgroundColor = "#C3B9B9";
    startBtn.style.borderColor = "#747474 #F6F2F2 #F6F2F2 #747474";
    startText.style.color = "#3F3F3F";

});

startBtn.addEventListener("mouseleave", () => {
    startBtn.style.backgroundColor = "#e9e4e4";
    startBtn.style.borderColor = "#ffffff #747474 #747474 #ffffff";
    startText.style.color = "#555555";
});

// Button pressed animations for all other buttons
buttons.forEach(btn => {
    const text = btn.querySelector("p");

    btn.addEventListener("mouseenter", () => {
        btn.style.backgroundColor = "#C3B9B9";
        btn.style.borderColor = "#747474 #F6F2F2 #F6F2F2 #747474";

        if (text) text.style.color = "#3F3F3F";
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.backgroundColor = "#e9e4e4";
        btn.style.borderColor = "#ffffff #747474 #747474 #ffffff";

        if (text) text.style.color = "#555555";
    });
});

// File open animation for parent and children
folders.forEach(folder => {
    folder.addEventListener("click", () => {
        const icon = folder.querySelector(".fileIcon");
        const children = folder.nextElementSibling;
        const isOpen = icon.src.includes("file.open");

        if (isOpen) {
            icon.src = "assets/file.closed.png";

            if(children && children.classList.contains("fileChildren")){
                children.style.display = "none";
            }

        } else {
            icon.src = "assets/file.open.png";

            if(children && children.classList.contains("fileChildren")){
                children.style.display = "flex";
            }
        }
    });
});

