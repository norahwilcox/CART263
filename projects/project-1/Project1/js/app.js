// Gets elements from HTML
const pages = document.querySelectorAll(".page");
const videos = document.querySelectorAll("video");
const captureBtn = document.getElementById("captureBtn");
const canvas = document.getElementById("photoCanvas");
const album = document.getElementById("album");
const downloadBtn = document.getElementById("downloadBtn");
const deleteBtn = document.getElementById("deleteBtn");
const startBtn = document.querySelector("#startPage .container");
const buttons = document.querySelectorAll(".btn");
const folders = document.querySelectorAll("[data-folder]");
const filterRows = document.querySelectorAll(".filterOption");
const overlays = document.querySelectorAll(".filterOverlay");
const flashOverlay = document.getElementById("flashOverlay");
const countdownDisplay = document.getElementById("countdownDisplay");
const timerButtons = document.querySelectorAll(".timerBtn");
const nextButtons = document.querySelectorAll("[data-next]");
const backButtons = document.querySelectorAll("[data-back]");

let startText = null;
if (startBtn) {
    startText = startBtn.querySelector(".start");
}

// Filter settings are grouped in the filter section at the bottom.
let filters = {};

// Stores app state
let photos = [];
let activeFilter = "bw";
let cameraStream = null;
let countdownTime = 0;
let countdownInterval = null;
let countingDown = false;

// Hide all pages except the selected one
function showPage(pageId) {
    for (let i = 0; i < pages.length; i += 1) {
        pages[i].style.display = "none";
    }

    const pageToShow = document.getElementById(pageId);

    if (pageToShow) {
        pageToShow.style.display = "flex";
    }

    if (pageId === "filterPage" || pageId === "cameraPage") {
        startCamera();
    }
}

// Click next to switch pages
for (let i = 0; i < nextButtons.length; i += 1) {
    nextButtons[i].addEventListener("click", function() {
        showPage(nextButtons[i].dataset.next);
    });
}

// Click back to switch pages
for (let i = 0; i < backButtons.length; i += 1) {
    backButtons[i].addEventListener("click", function() {
        showPage(backButtons[i].dataset.back);
    });
}

// Initialize first page
showPage("startPage");

// Starts the camera
async function startCamera() {
    try {
        if (!cameraStream) {
            cameraStream = await navigator.mediaDevices.getUserMedia({
                // Changed: request higher camera resolution for a clearer preview.
                video: {
                    width: {
                        ideal: 1920
                    },
                    height: {
                        ideal: 1080
                    }
                },
                audio: false
            });
        }

        for (let i = 0; i < videos.length; i += 1) {
            videos[i].srcObject = cameraStream;
            videos[i].play();
        }

        applyFilter();
    } catch (error) {
        console.error("Camera access denied:", error);
    }
}

// Take photo when red circle is clicked
if (captureBtn) {
    captureBtn.addEventListener("click", function() {
        if (countingDown) {
            return;
        }

        if (countdownTime > 0) {
            startCountdown(countdownTime);
        } else {
            triggerFlash();
            takePhoto();
        }
    });
}

// Starts countdown and then takes a photo
function startCountdown(seconds) {
    let remaining = seconds;
    countingDown = true;

    if (countdownDisplay) {
        countdownDisplay.textContent = String(remaining);
    }

    countdownInterval = setInterval(function() {
        remaining -= 1;

        if (remaining > 0) {
            if (countdownDisplay) {
                countdownDisplay.textContent = String(remaining);
            }
        } else {
            clearInterval(countdownInterval);
            countdownInterval = null;
            countingDown = false;

            if (countdownDisplay) {
                countdownDisplay.textContent = "";
            }

            triggerFlash();
            takePhoto();
        }
    }, 1000);
}

// Draws a mirrored camera frame 
function drawVideoToCanvas(context, video, width, height, filterStyle) {
    const sourceWidth = video.videoWidth;
    const sourceHeight = video.videoHeight;
    const scale = Math.max(width / sourceWidth, height / sourceHeight);
    const drawWidth = sourceWidth * scale;
    const drawHeight = sourceHeight * scale;
    const drawX = (width - drawWidth) / 2;
    const drawY = (height - drawHeight) / 2;
    const mirroredX = width - drawX - drawWidth;

    context.save();
    context.translate(width, 0);
    context.scale(-1, 1);
    context.filter = filterStyle || "none";
    context.drawImage(video, mirroredX, drawY, drawWidth, drawHeight);
    context.restore();
}

// Take photo and adds it to the album
function takePhoto() {
    if (!canvas) {
        return;
    }

    const photoPen = canvas.getContext("2d");
    const video = document.querySelector("#cameraPage video");
    const container = document.querySelector("#cameraPage .videoContainer");
    let filterData = {};

    if (filters[activeFilter]) {
        filterData = filters[activeFilter];
    }

    if (!photoPen || !video || !container || video.videoWidth === 0 || video.videoHeight === 0) {
        return;
    }

    // Capture base frame, then keep selected filter settings on the photo object.
    canvas.width = Math.max(1, video.videoWidth);
    canvas.height = Math.max(1, video.videoHeight);
    photoPen.clearRect(0, 0, canvas.width, canvas.height);

    drawVideoToCanvas(photoPen, video, canvas.width, canvas.height, "none");

    photoPen.filter = "none";
    photoPen.globalAlpha = 1;

    const photo = canvas.toDataURL("image/png");
    photos.push({
        src: photo,
        // Changed: keep CSS filter values so Safari album uses same filter look.
        filter: filterData.style || "none",
        overlayColor: filterData.overlayColor || "transparent",
        overlayOpacity: filterData.overlayOpacity || 0,
        filterName: activeFilter
    });

    updateAlbum();
}

// Shows a flash when a photo is taken
function triggerFlash() {
    if (!flashOverlay) {
        return;
    }

    flashOverlay.classList.add("flash-on");

    setTimeout(function() {
        flashOverlay.classList.remove("flash-on");
    }, 120);
}

// Button pressed animation for the capture button
if (captureBtn) {
    captureBtn.addEventListener("mouseenter", function() {
        captureBtn.classList.add("is-hover");
    });

    captureBtn.addEventListener("mouseleave", function() {
        captureBtn.classList.remove("is-hover");
        captureBtn.classList.remove("is-pressed");
    });

    captureBtn.addEventListener("mousedown", function() {
        captureBtn.classList.add("is-pressed");
    });

    captureBtn.addEventListener("mouseup", function() {
        captureBtn.classList.remove("is-pressed");
    });
}

// Button pressed animation for the start button
if (startBtn && startText) {
    startBtn.addEventListener("mouseenter", function() {
        startBtn.style.backgroundColor = "#C3B9B9";
        startBtn.style.borderColor = "#747474 #F6F2F2 #F6F2F2 #747474";
        startText.style.color = "#3F3F3F";
    });

    startBtn.addEventListener("mouseleave", function() {
        startBtn.style.backgroundColor = "#e9e4e4";
        startBtn.style.borderColor = "#ffffff #747474 #747474 #ffffff";
        startText.style.color = "#555555";
    });
}

// Button pressed animations for all other buttons
for (let i = 0; i < buttons.length; i += 1) {
    const btn = buttons[i];
    const text = btn.querySelector("p");

    btn.addEventListener("mouseenter", function() {
        btn.style.backgroundColor = "#C3B9B9";
        btn.style.borderColor = "#747474 #F6F2F2 #F6F2F2 #747474";

        if (text) {
            text.style.color = "#3F3F3F";
        }
    });

    btn.addEventListener("mouseleave", function() {
        btn.style.backgroundColor = "#e9e4e4";
        btn.style.borderColor = "#ffffff #747474 #747474 #ffffff";

        if (text) {
            text.style.color = "#555555";
        }
    });
}

// Timer options 3s and 5s
for (let i = 0; i < timerButtons.length; i += 1) {
    const btn = timerButtons[i];

    btn.addEventListener("click", function() {
        const value = Number(btn.dataset.countdown);

        if (btn.classList.contains("is-active")) {
            btn.classList.remove("is-active");
            countdownTime = 0;
        } else {
            for (let j = 0; j < timerButtons.length; j += 1) {
                timerButtons[j].classList.remove("is-active");
            }

            btn.classList.add("is-active");
            countdownTime = value;
        }
    });
}

// Updates the album
function updateAlbum() {
    if (!album) {
        return;
    }

    album.innerHTML = "";

    for (let i = 0; i < photos.length; i += 1) {
        const photoData = photos[i];
        const card = document.createElement("div");
        card.className = "photoCard";

        const photoView = document.createElement("div");
        photoView.style.position = "relative";
        photoView.style.width = "100%";

        const img = document.createElement("img");
        img.src = photoData.src;
        img.className = "albumPhoto";
        img.style.filter = photoData.filter || "none";
        img.style.webkitFilter = photoData.filter || "none";

        const tint = document.createElement("div");
        tint.style.position = "absolute";
        tint.style.top = "0";
        tint.style.left = "0";
        tint.style.width = "100%";
        tint.style.height = "100%";
        tint.style.pointerEvents = "none";
        tint.style.background = photoData.overlayColor || "transparent";
        tint.style.opacity = String(photoData.overlayOpacity || 0);
        tint.style.mixBlendMode = "normal";

        const actions = document.createElement("div");
        actions.className = "photoActions";

        const saveBtn = document.createElement("button");
        saveBtn.className = "photoActionBtn";
        saveBtn.textContent = "Save";
        saveBtn.addEventListener("click", function() {
            downloadFilteredPhoto(photoData, i + 1);
        });

        const deleteOneBtn = document.createElement("button");
        deleteOneBtn.className = "photoActionBtn";
        deleteOneBtn.textContent = "Delete";
        deleteOneBtn.addEventListener("click", function() {
            photos.splice(i, 1);
            updateAlbum();
        });

        actions.appendChild(saveBtn);
        actions.appendChild(deleteOneBtn);
        photoView.appendChild(img);
        photoView.appendChild(tint);
        card.appendChild(photoView);
        card.appendChild(actions);
        album.appendChild(card);
    }
}

// Download image button
if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadPhotos);
}

// Delete all button
if (deleteBtn) {
    deleteBtn.addEventListener("click", deleteAllPhotos);
}

// Downloads one photo
function downloadFilteredPhoto(photoData, number) {
    const img = new Image();
    img.onload = function() {
        const saveCanvas = document.createElement("canvas");
        const pen = saveCanvas.getContext("2d");

        if (!pen) {
            return;
        }

        saveCanvas.width = img.naturalWidth || img.width;
        saveCanvas.height = img.naturalHeight || img.height;

        // Draw base photo first, then apply filter.
        pen.drawImage(img, 0, 0, saveCanvas.width, saveCanvas.height);
        const needsExtraFilter = (photoData.filter && photoData.filter !== "none") ||
            (photoData.overlayOpacity && photoData.overlayOpacity > 0);

        if (isSafariBrowser() && needsExtraFilter) {
            // Changed: keep Safari save logic in one section/function.
            applySafariSaveFilter(pen, saveCanvas.width, saveCanvas.height, photoData);
        } else if (needsExtraFilter) {
            pen.clearRect(0, 0, saveCanvas.width, saveCanvas.height);
            pen.filter = photoData.filter || "none";
            pen.drawImage(img, 0, 0, saveCanvas.width, saveCanvas.height);
            pen.filter = "none";

            if (photoData.overlayColor && photoData.overlayOpacity > 0) {
                pen.globalAlpha = photoData.overlayOpacity;
                pen.fillStyle = photoData.overlayColor;
                pen.fillRect(0, 0, saveCanvas.width, saveCanvas.height);
                pen.globalAlpha = 1;
            }
        }

        const link = document.createElement("a");
        link.href = saveCanvas.toDataURL("image/png");
        link.download = "photobooth_" + number + ".png";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    img.src = photoData.src;
}

// Safari fallback functions are grouped at the bottom.

// Downloads all photos
function downloadPhotos() {
    if (!photos.length) {
        return;
    }

    if (confirm("Download all photos?")) {
        for (let i = 0; i < photos.length; i += 1) {
            setTimeout(function() {
                downloadFilteredPhoto(photos[i], i + 1);
            }, i * 200);
        }
    }
}

// Deletes all the photos in the album
function deleteAllPhotos() {
    if (confirm("Delete all photos?")) {
        photos = [];
        updateAlbum();
    }
}

// File open animation for parent and children
for (let i = 0; i < folders.length; i += 1) {
    const folder = folders[i];
    const icon = folder.querySelector(".fileIcon");
    const children = folder.nextElementSibling;

    if (icon && children && children.classList.contains("fileChildren")) {
        icon.src = "assets/file.open.png";
        children.style.display = "flex";

        folder.addEventListener("click", function() {
            const isOpen = icon.src.includes("file.open");

            if (isOpen) {
                icon.src = "assets/file.closed.png";
                children.style.display = "none";
            } else {
                icon.src = "assets/file.open.png";
                children.style.display = "flex";
            }
        });
    }
}

// Filter section
// Source:https://baseline.is/tools/css-photo-filters/
filters = {
    coolbw: {
        style: "brightness(106%) contrast(130%) grayscale(100%) saturate(128%)",
        overlayColor: "#008efa",
        overlayOpacity: 0.12
    },
    soft: {
        style: "brightness(120%) contrast(116%) saturate(70%) blur(2px)",
        overlayColor: "#0c0079",
        overlayOpacity: 0.1
    },
    invert: {
        style: "invert(100%) brightness(108%) contrast(106%) saturate(112%)",
        overlayColor: "transparent",
        overlayOpacity: 0.1
    },
    bw: {
        style: "invert(80%) saturate(145%) grayscale(100%) brightness(150%) contrast(114%)",
        overlayColor: "#000000",
        overlayOpacity: 0.2
    },
    sepia: {
        style: "brightness(123%) contrast(120%) grayscale(100%) saturate(60%) sepia(70%)",
        overlayColor: "#3d0202",
        overlayOpacity: 0.23
    },
    analog: {
        style: "brightness(130%) contrast(70%) saturate(90%)",
        overlayColor: "#ffbcf6",
        overlayOpacity: 0.15
    },
    film: {
        style: "brightness(130%) contrast(90%) saturate(90%)",
        overlayColor: "#fff897",
        overlayOpacity: 0.15
    },
    cyber: {
        style: "brightness(120%) contrast(130%) hue-rotate(204deg) saturate(80%)",
        overlayColor: "#00aeff",
        overlayOpacity: 0.24
    },
    matrix: {
        style: "brightness(85%) contrast(140%) hue-rotate(95deg) saturate(80%)",
        overlayColor: "rgba(2, 99, 31, 0.18)",
        overlayOpacity: 0.24
    }
};

const selectedFilterRow = document.querySelector(".filterOption.is-selected");
if (selectedFilterRow && selectedFilterRow.dataset && selectedFilterRow.dataset.filter) {
    activeFilter = selectedFilterRow.dataset.filter;
}

// Click a filter to select it
for (let i = 0; i < filterRows.length; i += 1) {
    const row = filterRows[i];

    row.addEventListener("click", function() {
        const filterName = row.dataset.filter;

        if (filterName) {
            activeFilter = filterName;

            for (let j = 0; j < filterRows.length; j += 1) {
                filterRows[j].classList.remove("is-selected");
            }

            row.classList.add("is-selected");
            applyFilter();
        }
    });
}

// Applies the selected filter to the live preview
function applyFilter() {
    let filterData = {};

    if (filters[activeFilter]) {
        filterData = filters[activeFilter];
    }

    for (let i = 0; i < videos.length; i += 1) {
        videos[i].style.filter = filterData.style || "none";
        videos[i].style.webkitFilter = filterData.style || "none";
    }

    for (let i = 0; i < overlays.length; i += 1) {
        overlays[i].style.background = filterData.overlayColor || "transparent";
        overlays[i].style.opacity = String(filterData.overlayOpacity || 0);
        overlays[i].style.mixBlendMode = "normal";
    }
}


// Apply default selected filter on load
applyFilter();


/* Disclaimer: 


Safari encountered a major issue with the filter, as saved photos either lacked filters or had significantly altered colours. 
We couldn't troubleshoot it ourselves, so I used Gen AI to help create this section for Safari. 
This part can be removed if needed, but we included it to be cautious and user-friendly. 
Unfortunately, this was beyond the scope of the class, and we didn't fully understand the code.

*/ 

// Safari fallback section
function isSafariBrowser() {
    const ua = navigator.userAgent;
    return ua.includes("Safari") &&
        !ua.includes("Chrome") &&
        !ua.includes("CriOS") &&
        !ua.includes("FxiOS") &&
        !ua.includes("EdgiOS");
}

function clampColor(value) {
    if (value < 0) {
        return 0;
    }

    if (value > 255) {
        return 255;
    }

    return value;
}

function applyContrastValue(value, amount) {
    return (value - 128) * amount + 128;
}

// Simple blur pass (center + left/right/up/down average).
function applySimpleBlurPass(context, width, height, passes) {
    let passCount = passes;

    if (!passCount || passCount < 1) {
        passCount = 1;
    }

    for (let pass = 0; pass < passCount; pass += 1) {
        const imageData = context.getImageData(0, 0, width, height);
        const data = imageData.data;
        const copy = new Uint8ClampedArray(data);
        const rowSize = width * 4;

        for (let y = 1; y < height - 1; y += 1) {
            for (let x = 1; x < width - 1; x += 1) {
                const index = (y * width + x) * 4;
                const left = index - 4;
                const right = index + 4;
                const up = index - rowSize;
                const down = index + rowSize;

                data[index] = (copy[index] + copy[left] + copy[right] + copy[up] + copy[down]) / 5;
                data[index + 1] = (copy[index + 1] + copy[left + 1] + copy[right + 1] + copy[up + 1] + copy[down + 1]) / 5;
                data[index + 2] = (copy[index + 2] + copy[left + 2] + copy[right + 2] + copy[up + 2] + copy[down + 2]) / 5;
            }
        }

        context.putImageData(imageData, 0, 0);
    }
}

function parseFilterOperations(styleText) {
    const operations = [];

    if (!styleText) {
        return operations;
    }

    const parts = styleText.split(")");

    for (let i = 0; i < parts.length; i += 1) {
        const part = parts[i].trim();

        if (!part) {
            continue;
        }

        const splitIndex = part.indexOf("(");

        if (splitIndex === -1) {
            continue;
        }

        const name = part.slice(0, splitIndex).trim();
        const valueText = part.slice(splitIndex + 1).trim();
        const rawNumber = Number(valueText.replace("%", "").replace("deg", "").replace("px", ""));

        if (Number.isNaN(rawNumber)) {
            continue;
        }

        operations.push({
            name: name,
            value: rawNumber
        });
    }

    return operations;
}

function applySafariManualFilter(context, width, height, filterName) {
    const filterData = filters[filterName] || {};
    const operations = parseFilterOperations(filterData.style || "");

    if (!operations.length) {
        return;
    }

    const imageData = context.getImageData(0, 0, width, height);
    const data = imageData.data;
    let blurPasses = 0;

    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        for (let j = 0; j < operations.length; j += 1) {
            const operation = operations[j];

            if (operation.name === "blur") {
                const passes = Math.round(operation.value);

                if (passes > blurPasses) {
                    blurPasses = passes;
                }

                continue;
            }

            if (operation.name === "brightness") {
                const amount = operation.value / 100;
                r *= amount;
                g *= amount;
                b *= amount;
            } else if (operation.name === "contrast") {
                const amount = operation.value / 100;
                r = applyContrastValue(r, amount);
                g = applyContrastValue(g, amount);
                b = applyContrastValue(b, amount);
            } else if (operation.name === "grayscale") {
                const amount = operation.value / 100;
                const gray = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
                r = (r * (1 - amount)) + (gray * amount);
                g = (g * (1 - amount)) + (gray * amount);
                b = (b * (1 - amount)) + (gray * amount);
            } else if (operation.name === "saturate") {
                const amount = operation.value / 100;
                const nr = (0.213 + (0.787 * amount)) * r + (0.715 - (0.715 * amount)) * g + (0.072 - (0.072 * amount)) * b;
                const ng = (0.213 - (0.213 * amount)) * r + (0.715 + (0.285 * amount)) * g + (0.072 - (0.072 * amount)) * b;
                const nb = (0.213 - (0.213 * amount)) * r + (0.715 - (0.715 * amount)) * g + (0.072 + (0.928 * amount)) * b;
                r = nr;
                g = ng;
                b = nb;
            } else if (operation.name === "invert") {
                const amount = operation.value / 100;
                r = (r * (1 - amount)) + ((255 - r) * amount);
                g = (g * (1 - amount)) + ((255 - g) * amount);
                b = (b * (1 - amount)) + ((255 - b) * amount);
            } else if (operation.name === "sepia") {
                const amount = operation.value / 100;
                const sr = (0.393 * r) + (0.769 * g) + (0.189 * b);
                const sg = (0.349 * r) + (0.686 * g) + (0.168 * b);
                const sb = (0.272 * r) + (0.534 * g) + (0.131 * b);
                r = (r * (1 - amount)) + (sr * amount);
                g = (g * (1 - amount)) + (sg * amount);
                b = (b * (1 - amount)) + (sb * amount);
            } else if (operation.name === "hue-rotate") {
                const angle = operation.value * Math.PI / 180;
                const cos = Math.cos(angle);
                const sin = Math.sin(angle);
                const nr = (0.213 + (0.787 * cos) - (0.213 * sin)) * r +
                    (0.715 - (0.715 * cos) - (0.715 * sin)) * g +
                    (0.072 - (0.072 * cos) + (0.928 * sin)) * b;
                const ng = (0.213 - (0.213 * cos) + (0.143 * sin)) * r +
                    (0.715 + (0.285 * cos) + (0.140 * sin)) * g +
                    (0.072 - (0.072 * cos) - (0.283 * sin)) * b;
                const nb = (0.213 - (0.213 * cos) - (0.787 * sin)) * r +
                    (0.715 - (0.715 * cos) + (0.715 * sin)) * g +
                    (0.072 + (0.928 * cos) + (0.072 * sin)) * b;
                r = nr;
                g = ng;
                b = nb;
            }
        }

        data[i] = clampColor(r);
        data[i + 1] = clampColor(g);
        data[i + 2] = clampColor(b);
    }

    context.putImageData(imageData, 0, 0);

    if (blurPasses > 0) {
        applySimpleBlurPass(context, width, height, blurPasses);
    }
}

function applySafariSaveFilter(context, width, height, photoData) {
    const sourceCanvas = document.createElement("canvas");
    const sourcePen = sourceCanvas.getContext("2d");

    if (!sourcePen) {
        return;
    }

    sourceCanvas.width = width;
    sourceCanvas.height = height;
    sourcePen.drawImage(context.canvas, 0, 0, width, height);

    context.clearRect(0, 0, width, height);
    context.drawImage(sourceCanvas, 0, 0, width, height);
    applySafariManualFilter(context, width, height, photoData.filterName || "");

    if (photoData.overlayColor && photoData.overlayOpacity > 0) {
        context.globalAlpha = photoData.overlayOpacity;
        context.fillStyle = photoData.overlayColor;
        context.fillRect(0, 0, width, height);
        context.globalAlpha = 1;
    }
}
