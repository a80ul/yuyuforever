
const lightbox = document.getElementById("myLightbox");
const lightboxImg = document.getElementById("lightboxImg");
const captionText = document.getElementById("caption");

function openLightbox(element, text) {
    const autoSrc = element.querySelector("img").src;
    lightboxImg.src = autoSrc;
    captionText.innerText = text;
    lightbox.style.display = "flex";
    setTimeout(() => {
        lightbox.classList.add("active");
    }, 10);
}

function closeLightbox() {
    lightbox.classList.remove("active");
    setTimeout(() => {
        lightbox.style.display = "none";
    }, 400);
}


lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.style.display === "flex") {
        closeLightbox();
    }
});


function openLightbox(element, text, isVideo = false) {
    const lightbox = document.getElementById('myLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const caption = document.getElementById('caption');
    const polaroidBox = document.querySelector('.polaroid-box');
    const oldVideo = document.getElementById('lightboxVideo');
    if (oldVideo) oldVideo.remove();

    if (isVideo) {
        lightboxImg.style.display = 'none'
        const video = document.createElement('video');
        video.id = 'lightboxVideo';
        video.src = element.querySelector('video').src;
        video.controls = true;
        video.autoplay = true;
        video.classList.add('lightbox-img'); 
        polaroidBox.insertBefore(video, caption);

    } else {
        lightboxImg.style.display = 'block';
        lightboxImg.src = element.querySelector('img').src;
    }

    caption.innerText = text;
    lightbox.classList.add('active');
}

document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
});


function openLightbox(element, text) {
    const lightbox = document.getElementById('myLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const caption = document.getElementById('caption');
    const polaroidBox = document.querySelector('.polaroid-box');


    const existingVideo = document.getElementById('lightboxVideo');
    if (existingVideo) existingVideo.remove();


    const videoSource = element.querySelector('video');
    const imageSource = element.querySelector('img');

    if (videoSource) {
        lightboxImg.style.display = 'none';
        const newVideo = document.createElement('video');
        newVideo.id = 'lightboxVideo';
        newVideo.src = videoSource.src;
        newVideo.controls = true;
        newVideo.autoplay = true;
        newVideo.style.width = "100%";
        newVideo.style.aspectRatio = "1/1";
        newVideo.style.objectFit = "cover";
        polaroidBox.insertBefore(newVideo, caption);
    } else if (imageSource) {

        lightboxImg.style.display = 'block';
        lightboxImg.src = imageSource.src;
    }

    caption.innerText = text;
    lightbox.style.display = 'flex';
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);
}

function closeLightbox() {
    const lightbox = document.getElementById('myLightbox');
    lightbox.classList.remove('active');

    setTimeout(() => {
        const video = document.getElementById('lightboxVideo');
        if (video) video.remove();
        lightbox.style.display = 'none';
    }, 400); 
}
