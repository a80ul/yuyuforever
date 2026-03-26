const documData = [
    { 
        type: "image", 
        title: "Permulaan - Day 1", 
        src: "../assets/docu/img/dokumentasi.jpeg",
        desc: "Awal- Awal Pake AI, buat minta refrensi web bucin",
        comments: [
            "Ide ini dudul dapet pas yuyu ngirim video tiktok orang bikin pdf lucu buat cewenya pake gambaran, disni dudul bikin pake website karena dudul nda mawu kalah jugakk",
            "Awalnya dudul make warna merah marun karena itu bawaan dari AI nya, terus dudul pikir pikir itu bukan warna kesukaan yuyu"
        ]
    },
    { 
        type: "video", 
        title: "Semuanya masih mentah karena masih full AI - Day 2", 
        src: "../assets/docu/vid/day1.mp4", 
        desc: "Pada bagian ini dudul bikin semuanya dari AI tapi pada akhirnya dudul memahami fungsi2 coding perlahan bukan bearti asal jiplak aja",
        comments: [
            "disini dudul berusahaa memahami bahasa pemrogramman HTML, CSS dan JS. ",
            "sempet beberapa kali salah karena dudul kali ini ngecodingnya ga menyuruh AI buat bikin langsung jadi tapi bertahap gitu, otomatis ini juga memakan waktu yang lumayan lama",
            "awalnya dibagiann ini tuh dudul udah mau nyerah karena bener bener pusing. nyari problem codenya dimna aja karena semua terpisah. tapi dudul harus berusaha karena tujuan awal dudul adalah membuat yuyu merasa butterfly, dan senang karena dibuatkan seperti ini. bukan karena keterpaksaan, tapi karena rasa cinta dudul besar "
        ]
    },
    { 
        type: "video", 
        title: "Disini dudul beralih pada halaman kedua yaitu pada bagian Memories - Day 3", 
        src: "../assets/docu/vid/day2.mp4", 
        desc: "sama aja karena sininya awal awal diisi sama AI full, tapi disini dudul perlahan makin memahami beberapa fungsi codingnya",
        comments: [
            "dudul ngeinput kurang lebih ada 58 Gambar dan Video kenangan kita yang masih tersisa, setidaknya dudul masih memiliki bagian-bagian itu",
            "jujur ada beberapa bagian foto yang membuat dudul sedih sekaligus terharu, karena dudul sampai saat ini rasa sayang dan cintanya dudul masih ada, dan sekarang dudul makin sayang sama yuyua❤️‍🩹",
            "dudul sayang yuyu",
            "padahal ini tuh dudul ngevideonya lumayan panjang sekitar 1.5menitan, atau sekitar 1 jam 50 menit, tapi battry low jadi dia mati sendiri recordannya",
        ]
    },
    { 
        type: "video", 
        title: "Bikin playlist laguuu - Day 3", 
        src: "../assets/docu/vid/day3.mp4", 
        desc: "nginput banyak laguuu, nda banyak sihh tapi lumayan susah karena harus download lagunya dlu dan cover lagunya",
        comments: [
            "awalnya dudul rencannanya ini tuh terhubung ke spotify tapi pas dudul coba try error ngecoba ke dalam device hp jadinya error dan dudul pake cara coding lain pun malahan disuruh login",
            "agak menguras waktu pada bagian ngeinput lagu2 ini, tapi dudul nda akan menyerah demi yuyuu",
            "karena dudul sayang yuyu",
        ]
    },
    { 
        type: "video", 
        title: "Ganti warna biru - Day 4", 
        src: "../assets/docu/vid/day4.mp4", 
        desc: "kebetulan dudul ingat, yuyu suka warna biru, dudul ubah deh jadi warna biru",
        comments: [
            "disini dudul mulai coba coding sendiri tanpa AI dan memilih warna yang profesional, tanpa minta bantuan AI",
            "agak lama disini dudul memilih warna yang bagus, jadi setengah harian dudul mikirin warna dan mengubah warna sekaligus menemani yuyu curhat disni karena dudul akan ada selalu untuk yuyu",
        ]
    },
    { 
        type: "video", 
        title: "Selesai Ganti Warna - Day 4", 
        src: "../assets/docu/vid/day4selesai.mp4", 
        desc: "selesai ganti warna biru semuaaa",
        comments: [
            "dari pagiii sampaiii malam agyy",
        ]
    },
    { 
        type: "video", 
        title: "Bikin bukuu - Day 4", 
        src: "../assets/docu/vid/day5book.mp4", 
        desc: "part paling susah",
        comments: [
            "huhuhuhu dudul terpaksa mengorankan bagian book ini, padahal dudul pengen bikin kya scrapbook gitu tapi susahh, dan errror berkali kali",
        ]
    },
     { 
        type: "video", 
        title: "Gagal bikin book - Day 5", 
        src: "../assets/docu/vid/day5bookgagal.mp4", 
        desc: "dan duduwlna menyerah karena banyak sekali bugnya sudah tak tertolong",
    },
    { 
        type: "video", 
        title: "Bikin Halaman Dokumentasi Part 1 <br>- Day 5", 
        src: "../assets/docu/vid/day5.mp4", 
        desc: "yang halaman book tadi dudul ganti jadi halaman dokumentasi",
        comments: [
            "hihihihi sengaja selipin bagian dokumentasi biar ada bukti klw dudulna serius bikin ini",
            "ini dudul videonya kepotong2 soalnya hp panas tewuss jadi dia otomatis terjeda tanpa dudul sadari jadi ini adalah part - 1",
        ]
    },
    { 
        type: "video", 
        title: "Bikin Halaman Dokumentasi Part 2 <br> - Day 5", 
        src: "../assets/docu/vid/day5part2.mp4", 
        desc: "ini dokumentasi day 5 dipart 2 yaww",
        comments: [
            "udah lama lama ngerecord malahan kejeda otomatis videonya🥲",
        ]
    },
    { 
        type: "video", 
        title: "Bikin Halaman Dokumentasi Part 3 <br> - Day 5", 
        src: "../assets/docu/vid/day5part3.mp4", 
        desc: "ini part 3nyaa, inipun juga terpotong videonya",
        comments: [
            "padahal dudul record lumayan lama bagian sini tapi malahan ngebug apps timelepsnya",
        ]
    },
];

const videoGrid = document.getElementById('videoGrid');
const lightbox = document.getElementById('videoLightbox');
const mainVideo = document.getElementById('mainVideo');
const mainImg = document.getElementById('mainImg');
const videoCaption = document.getElementById('videoCaption');
documData.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'video-item';
    
    let thumbnailHTML = item.type === "video" 
        ? `<video src="${item.src}" muted></video>` 
        : `<img src="${item.src}" alt="${item.title}" style="width:100%; height:100%; object-fit:cover;">`;

    card.innerHTML = `
        <div class="video-thumbnail">
            ${thumbnailHTML}
        </div>
        <div class="video-info">
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
        </div>
    `;

    card.onclick = () => openLightbox(item);
    videoGrid.appendChild(card);
});

function openLightbox(item) {
    const container = document.getElementById('commentsContainer');
    container.innerHTML = "";

    document.getElementById('videoCaption').innerText = item.desc;
    
    if (item.type === "video") {
        mainImg.style.display = "none";
        mainVideo.style.display = "block";
        mainVideo.src = item.src;
        mainVideo.play();
    } else {
        mainVideo.style.display = "none";
        mainVideo.src = "";
        mainImg.style.display = "block";
        mainImg.src = item.src;
    }
    
    if (item.comments && item.comments.length > 0) {
        item.comments.forEach(text => {
            const bubble = document.createElement('div');
            bubble.className = 'comment-bubble';
            bubble.innerHTML = `
                <p>${text}</p>
                <span class="comment-time">Dudul • Just Now</span>
            `;
            container.appendChild(bubble);
        });
    }
    
    lightbox.classList.add('active');
}

function closeVideo() {
    lightbox.classList.remove('active');
    mainVideo.pause();
    mainVideo.src = "";
    mainImg.src = "";
}