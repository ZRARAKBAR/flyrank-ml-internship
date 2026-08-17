/* =========================================================
   SPLASH SCREEN
========================================================= */

window.addEventListener("load", () => {

    const splash = document.getElementById("splash");

    setTimeout(() => {
        splash.classList.add("hide");
    }, 2600);

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================================
   IMAGE LIGHTBOX
========================================================= */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDescription = document.getElementById("lightbox-description");

const closeButton = document.querySelector(".lightbox-close");
const previousButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

const images = Array.from(
    document.querySelectorAll(".zoomable")
);

let currentImageIndex = 0;


/* =========================================================
   OPEN IMAGE
========================================================= */

function openLightbox(index) {

    currentImageIndex = index;

    const image = images[currentImageIndex];

    if (!image) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || "";

    lightboxTitle.textContent =
        image.alt || "Research figure";

    lightboxDescription.textContent =
        "Click outside or press Esc to close";

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* =========================================================
   CLOSE IMAGE
========================================================= */

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================================
   NEXT IMAGE
========================================================= */

function showNextImage() {

    currentImageIndex++;

    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }

    openLightbox(currentImageIndex);
}


/* =========================================================
   PREVIOUS IMAGE
========================================================= */

function showPreviousImage() {

    currentImageIndex--;

    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }

    openLightbox(currentImageIndex);
}


/* =========================================================
   CLICK IMAGE
========================================================= */

images.forEach((image, index) => {

    image.addEventListener("click", () => {

        openLightbox(index);

    });

});


/* =========================================================
   BUTTONS
========================================================= */

closeButton.addEventListener(
    "click",
    closeLightbox
);

nextButton.addEventListener(
    "click",
    showNextImage
);

previousButton.addEventListener(
    "click",
    showPreviousImage
);


/* =========================================================
   CLICK BACKDROP
========================================================= */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        showNextImage();
    }

    if (event.key === "ArrowLeft") {
        showPreviousImage();
    }

});


/* =========================================================
   TOUCH SWIPE
========================================================= */

let touchStartX = 0;

lightbox.addEventListener("touchstart", (event) => {

    touchStartX = event.changedTouches[0].screenX;

});


lightbox.addEventListener("touchend", (event) => {

    const touchEndX = event.changedTouches[0].screenX;

    const difference =
        touchStartX - touchEndX;

    if (Math.abs(difference) < 50) {
        return;
    }

    if (difference > 0) {
        showNextImage();
    } else {
        showPreviousImage();
    }

});