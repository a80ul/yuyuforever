//INTERACTIVE PHYSICS HERO
const { Engine, Render, Runner, Bodies, World, Mouse, MouseConstraint, Body } = Matter;

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('physics-container');
    if (!container) return;

    //CONFIGURATION 
    const totalPhotos = 10; 
    const jumlahFileTersedia = 25;
    const photoPath = 'assets/img/foto/';

    const daftarFoto = [
        '1.jpg', 
        '2.jpg', 
        '3.jpg', 
        '4.jpg', 
        '5.jpg',
        '6.jpg',
        '7.jpg',
        '8.jpg',
        '9.jpg',
        '10.jpg',
        '11.jpg',
        '12.jpg',
        '13.jpg',
        '14.jpg',
        '15.jpg',
        '16.jpg',
        '17.jpg',
        '18.jpg',
        '19.jpg',
        '21.jpg',
        '22.jpg',
        '23.jpg',
        '24.jpg',
        '25.jpg',
        '26.jpg',

    ];

    
    
    // Ukuran kartu
    const cardWidth = Math.min(Math.max(window.innerWidth * 0.15, 160), 220);
    const cardHeight = cardWidth * (4 / 3);

    // ENGINE SETUP
    const engine = Engine.create({ gravity: { y: 0, x: 0 } });
    const world = engine.world;

    const render = Render.create({
        element: container,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false,
            background: 'transparent'
        }
    });

    Render.run(render);
    Runner.run(Runner.create(), engine);
    const wallOptions = { isStatic: true, render: { visible: false } };
    World.add(world, [
        Bodies.rectangle(window.innerWidth / 2, -50, window.innerWidth, 100, wallOptions),
        Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, wallOptions),
        Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, wallOptions),
        Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, wallOptions)
    ]);

    // CREATE PHOTO BODIES
    const photoBodies = [];

    for (let i = 0; i < totalPhotos; i++) {
    const namaFile = daftarFoto[i % daftarFoto.length];

    const img = document.createElement('img');
    img.src = photoPath + namaFile; 
    
    img.className = 'card-polaroid';
        img.style.width = `${cardWidth}px`;
        img.style.height = `${cardHeight}px`;
        container.appendChild(img);


        let xPos = Math.random() * window.innerWidth;
        if (xPos > window.innerWidth * 0.35 && xPos < window.innerWidth * 0.65) {
            xPos = xPos < window.innerWidth * 0.5 ? xPos - 200 : xPos + 200;
        }

        const yPos = Math.random() * window.innerHeight;
        const rotInitial = (Math.random() * 40 - 20) * (Math.PI / 180);

        const photoBody = Bodies.rectangle(xPos, yPos, cardWidth, cardHeight, {
            frictionAir: 0.04, 
            restitution: 0.6,
            density: 0.01,
            angle: rotInitial,
            render: { visible: false },
            domElement: img,
            parallaxDepth: Math.random() * 0.4 + 0.1 
        });

        Body.setVelocity(photoBody, {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
        });

        photoBodies.push(photoBody);
    }

    World.add(world, photoBodies);

    //INTERACTION
    const mouse = Mouse.create(render.canvas);
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { stiffness: 0.15, render: { visible: false } }
    });

    World.add(world, mouseConstraint);
    render.mouse = mouse;
    World.add(world, mouseConstraint);
    render.mouse = mouse;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener("mousemove", (e) => {
        targetX = (e.clientX - window.innerWidth / 2) * 0.05;
        targetY = (e.clientY - window.innerHeight / 2) * 0.05;
    });

    function updateDOM() {
        //Smoothing parallax
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        photoBodies.forEach(body => {
            if (body.domElement) {
                Body.applyForce(body, body.position, { 
                    x: (Math.random() - 0.5) * 0.00005, 
                    y: (Math.random() - 0.5) * 0.00005 
                });

                const { x, y } = body.position;
                const pX = currentX * body.parallaxDepth;
                const pY = currentY * body.parallaxDepth;

                body.domElement.style.left = `${x - cardWidth / 2}px`;
                body.domElement.style.top = `${y - cardHeight / 2}px`;
                body.domElement.style.transform = `translate(${pX}px, ${pY}px) rotate(${body.angle}rad)`;
            }
        });
        requestAnimationFrame(updateDOM);
    }
    updateDOM();

    window.addEventListener('resize', () => {
        render.options.width = window.innerWidth;
        render.options.height = window.innerHeight;
    });
});

const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (entry.target.classList.contains('stats-section')) {
                animateStats(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

function animateStats(parent) {
    const stats = parent.querySelectorAll(".stat-number");
    stats.forEach(stat => {
        const text = stat.innerText.replace('+', '');
        const target = parseInt(text);
        if (isNaN(target)) return; 
        
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / 2000, 1);
            stat.innerText = Math.floor(progress * target) + "+";
            if (progress < 1) window.requestAnimationFrame(step);
            else stat.innerText = target + "+";
        };
        window.requestAnimationFrame(step);
    });
}

//TYPING EFFECT (FOOTER)
const footerText = "I LOVE YOU";
let charIndex = 0;
let isTypingStarted = false;

function typeWriter() {
    const target = document.getElementById("typing-target");
    if (target && charIndex < footerText.length) {
        target.innerHTML += footerText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 150);
    }
}

const footerObserver = new IntersectionObserver((entries) => {
    if(entries && entries[0].isIntersecting && !isTypingStarted) {
        isTypingStarted = true;
        typeWriter();
    }
}, { threshold: 0.5 });

const footerElem = document.querySelector('.footer');
if (footerElem) footerObserver.observe(footerElem);

//Hari Jadian
function updateJadianCounter() {
    const startDate = new Date("2023-02-11");
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const counterElem = document.getElementById("days-counter");
    if (counterElem) {
        counterElem.innerText = diffDays + "days";
    }
}
document.addEventListener("DOMContentLoaded", updateJadianCounter);

// logika playmusik

const songs = [
    {
        title: "Heart 2 Heart",
        artist: "Mac DeMarco",
        cover: "assets/vinyl/heart.jpg", 
        src: "assets/music/heart.mp3"    
    },
    {
        title: "Season",
        artist: "wave to earth",
        cover: "assets/vinyl/season.jpg",
        src: "assets/music/season.mp3"
    },
    {
        title: "Love Shine",
        artist: "LEEHEESANG",
        cover: "assets/vinyl/loveshine.jpg",
        src: "assets/music/loveshine.mp3"
    },
    {
        title: "Bloom",
        artist: "The Papper Kites",
        cover: "assets/vinyl/bloom.jpg",
        src: "assets/music/bloom.mp3"
    },
    {
        title: "YK",
        artist: "Cean Jr",
        cover: "assets/vinyl/yk.jpg",
        src: "assets/music/yk.mp3"
    },
    {
        title: "Always",
        artist: "Daniel Ceaesar",
        cover: "assets/vinyl/always.jpg",
        src: "assets/music/always.mp3"
    },
    {
        title: "Flower",
        artist: "DANIEL",
        cover: "assets/vinyl/flower.webp",
        src: "assets/music/flower.mp3"
    },
];

let songIndex = 0;
const audio = document.getElementById('mainAudio');
const playIcon = document.getElementById('playIcon');
const vinyl = document.getElementById('mainVinyl');

// Load Lagu
function loadSong(index) {
    const song = songs[index];
    document.getElementById('currentTitle').innerText = song.title;
    document.getElementById('currentArtist').innerText = song.artist;
    document.getElementById('currentCover').src = song.cover;
    audio.src = song.src;
    renderPlaylist();
}

// Render List Playlist
function renderPlaylist() {
    const list = document.getElementById('songList');
    list.innerHTML = "";
    songs.forEach((song, i) => {
        const div = document.createElement('div');
        div.className = `song-item ${i === songIndex ? 'active' : ''}`;
        div.onclick = () => { songIndex = i; loadSong(i); playSong(); };
        div.innerHTML = `
            <img src="${song.cover}">
            <div class="song-info">
                <h5>${song.title}</h5>
                <p>${song.artist}</p>
            </div>
        `;
        list.appendChild(div);
    });
}

function togglePlay() {
    if (audio.paused) playSong();
    else pauseSong();
}

function playSong() {
    audio.play();
    playIcon.className = "fas fa-pause";
    vinyl.classList.add('playing');
}

function pauseSong() {
    audio.pause();
    playIcon.className = "fas fa-play";
    vinyl.classList.remove('playing');
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    playSong();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    playSong();
}

// Timeline Logic
audio.addEventListener('timeupdate', () => {
    const { duration, currentTime } = audio;
    const percent = (currentTime / duration) * 100;
    document.getElementById('progressBar').style.width = `${percent}%`;
    document.getElementById('timeStart').innerText = formatTime(currentTime);
    if(duration) document.getElementById('timeEnd').innerText = formatTime(duration);
});

function formatTime(sec) {
    let min = Math.floor(sec / 60);
    let s = Math.floor(sec % 60);
    return `${min}:${s < 10 ? '0' : ''}${s}`;
}

// Jalankan Pertama Kali
loadSong(songIndex);


// scrolltotop

window.onscroll = function() {
    var btn = document.getElementById("scrollToTop");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.style.opacity = "1";
        btn.style.visibility = "visible";
        btn.style.transform = "translateY(0)";
    } else {
        btn.style.opacity = "0";
        btn.style.visibility = "hidden";
        btn.style.transform = "translateY(20px)";
    }
};
function goToTop() {
    window.scrollTo({
        top: 0, 
        behavior: 'smooth'
    });
}

window.addEventListener("load", () => {
    
    //Pengaturan Folder & Gambar
    const folderPath = "assets/img/foto/"; 
    const imagesList = [
        '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
        '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg',
        '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg'
    ];

    //Elemen HTML
    const cardContainer = document.getElementById("yuyu-moments-card");
    const cardInner = cardContainer.querySelector(".card-inner");
    const imgFront = document.getElementById("img-front");
    const imgBack = document.getElementById("img-back");

    //Variabel Kontrol
    let currentIdx = 0;
    let flipInterval;
    let isDragging = false;
    let startX;
    let currentRotation = 0;
    let dragRotation = 0;

    //Shuffle Gambar
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledImages = shuffleArray([...imagesList]);

    function loadInitialImages() {
        imgFront.src = folderPath + shuffledImages[0];
        imgBack.src = folderPath + shuffledImages[1];
        currentIdx = 2;
    }

    //Logika Ganti Gambar
    function updateImagesDuringFlip(targetRotation) {
        const normalizedRotation = Math.abs(targetRotation % 360);
        
        if (normalizedRotation === 180) {
            setTimeout(() => {
                imgFront.src = folderPath + imagesList[currentIdx];
                currentIdx = (currentIdx + 1) % imagesList.length;
            }, 300);
        } else if (normalizedRotation === 0 || normalizedRotation === 360) {
            setTimeout(() => {
                imgBack.src = folderPath + imagesList[currentIdx];
                currentIdx = (currentIdx + 1) % imagesList.length;
            }, 300);
        }
    }

    // 6. Fungsi Otomatis
    function startAutoFlip() {
        flipInterval = setInterval(() => {
            currentRotation += 180;
            cardInner.style.transition = "transform 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            cardInner.style.transform = `rotateY(${currentRotation}deg)`;
            updateImagesDuringFlip(currentRotation);
        }, 3000);
    }

    function stopAutoFlip() {
        clearInterval(flipInterval);
    }

    // 7. Logika DRAG
    const startDrag = (e) => {
        isDragging = true;
        stopAutoFlip();
        startX = (e.pageX || e.touches[0].pageX);
        cardInner.style.transition = "none";
        cardContainer.style.cursor = "grabbing";
    };

    const moveDrag = (e) => {
        if (!isDragging) return;
        const x = (e.pageX || e.touches[0].pageX);
        const walk = (x - startX) * 0.6;
        dragRotation = currentRotation + walk;
        cardInner.style.transform = `rotateY(${dragRotation}deg)`;
    };

    const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        cardContainer.style.cursor = "grab";
        currentRotation = Math.round(dragRotation / 180) * 180;
        cardInner.style.transition = "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        cardInner.style.transform = `rotateY(${currentRotation}deg)`;
        
        updateImagesDuringFlip(currentRotation);
        startAutoFlip(); 
    };

    // Event Listeners
    cardContainer.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", moveDrag);
    window.addEventListener("mouseup", endDrag);
    cardContainer.addEventListener("touchstart", startDrag);
    window.addEventListener("touchmove", moveDrag);
    window.addEventListener("touchend", endDrag);
    loadInitialImages();
    startAutoFlip();
});

// mobile view
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById('mobile-menu');
    const nav = document.querySelector('.nav-links');

    if (btn && nav) {
        btn.onclick = function(e) {
            e.stopPropagation(); 
            e.stopImmediatePropagation();
            
            this.classList.toggle('is-active');
            nav.classList.toggle('active');
            
            console.log("Navbar Triggered!");
        };

        document.querySelectorAll('.nav-link').forEach(link => {
            link.onclick = () => {
                btn.classList.remove('is-active');
                nav.classList.remove('active');
            };
        });
    }
});