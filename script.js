// ===== GİRİŞ EKRANI (SPLASH SCREEN) =====
function enterSite() {
    // ── 1. HTML5 Audio ile müziği başlat (kullanıcı tıklaması = tarayıcı izni ✅) ──
    const audio = document.getElementById('bgMusic');
    if (audio) {
        audio.volume = 0.75;
        audio.play().catch(() => {
            // Dosya bulunamadıysa sessizce geç; Spotify widget'ı görünür kalır
        });
    }

    // ── 2. Spotify iframe'e de autoplay ver (Premium hesaplarda çalışır) ──
    const iframe = document.getElementById('spotifyIframe');
    if (iframe) {
        iframe.src = 'https://open.spotify.com/embed/track/6cjIlxXM1ca6nxkJ0p27jU?autoplay=1&utm_source=generator';
    }

    // ── 3. Butonu devre dışı bırak (çift tıklamayı önle) ──
    const btn = document.getElementById('splashEnterBtn');
    if (btn) btn.disabled = true;

    // ── 4. Giriş ekranını fade-out ile kapat ──
    const splash = document.getElementById('splashScreen');
    if (splash) {
        splash.classList.add('fade-out');
        setTimeout(() => { splash.style.display = 'none'; }, 1300);
    }
}
// ===== GİRİŞ EKRANI SONU =====

// ===== GECE MODU ÖZELLİĞİ =====
document.addEventListener("DOMContentLoaded", function () {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
        enableDarkMode();
    }
    const darkModeBtn = document.getElementById("darkModeToggle");
    if (darkModeBtn) {
        darkModeBtn.addEventListener("click", toggleDarkMode);
    }
});

function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.contains("dark-mode");
    if (isDarkMode) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

function enableDarkMode() {
    const body = document.body;
    body.classList.add("dark-mode");
    createStars();
    const starContainer = document.getElementById("starContainer");
    starContainer.classList.add("active");
    const nightMessage = document.querySelector(".night-message");
    nightMessage.classList.add("active");
    updateToggleBtn(true);
    localStorage.setItem("darkMode", "true");
}

function disableDarkMode() {
    const body = document.body;
    body.classList.remove("dark-mode");
    const starContainer = document.getElementById("starContainer");
    starContainer.classList.remove("active");
    starContainer.innerHTML = "";
    const nightMessage = document.querySelector(".night-message");
    nightMessage.classList.remove("active");
    updateToggleBtn(false);
    localStorage.setItem("darkMode", "false");
}

function updateToggleBtn(isDark) {
    const btn = document.getElementById("darkModeToggle");
    const icon = btn.querySelector(".btn-icon");
    if (!icon) return;
    icon.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
    icon.style.transform = "rotate(360deg) scale(1.3)";
    setTimeout(() => {
        icon.style.transition = "none";
        icon.style.transform = "rotate(0deg) scale(1)";
        icon.textContent = isDark ? "☀️" : "🌙";
    }, 280);
}

function createStars() {
    const starContainer = document.getElementById("starContainer");
    starContainer.innerHTML = "";
    const starCount = 80;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        const duration = Math.random() * 2 + 2;
        star.style.animationDuration = duration + "s";
        const delay = Math.random() * 2;
        star.style.animationDelay = delay + "s";
        starContainer.appendChild(star);
    }
}

// --- SAYAÇLAR ---
const baslangic = new Date("2025-10-04T20:00:00");

function updateAllCounters() {
    const now = new Date();

    // 1. Beraberlik Sayacı
    const togetherDiff = now - baslangic;
    const togetherDays = Math.floor(togetherDiff / (1000 * 60 * 60 * 24));
    const counterEl = document.getElementById("counter");
    if (counterEl) counterEl.innerText = togetherDays + " Gündür Beraberiz";

    // 2. Doğum Günü Sayacı (13 Mayıs)
    const birthdayMonth = 5;
    const birthdayDay = 13;
    let bday = new Date(now.getFullYear(), birthdayMonth - 1, birthdayDay);
    if (now > bday) bday = new Date(now.getFullYear() + 1, birthdayMonth - 1, birthdayDay);

    const bdayDiff = bday - now;
    const bdayCountdownEl = document.getElementById("birthdayCountdown");
    const bdayMessageEl = document.getElementById("birthdayMessage");

    if (isBirthdayToday(now) || _birthdayManualTrigger) {
        // Doğum günü özel ekranını göster
        if (bdayCountdownEl) bdayCountdownEl.style.display = "none";
        if (bdayMessageEl)   bdayMessageEl.style.display   = "none";
        showBirthdaySpecial();
    } else {
        hideBirthdaySpecial();
        if (bdayCountdownEl) bdayCountdownEl.style.display = "flex";
        if (bdayMessageEl)   bdayMessageEl.style.display   = "none";
        const d = document.getElementById("days");
        const h = document.getElementById("hours");
        const m = document.getElementById("minutes");
        const s = document.getElementById("seconds");
        if (d) d.textContent = Math.floor(bdayDiff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        if (h) h.textContent = Math.floor((bdayDiff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
        if (m) m.textContent = Math.floor((bdayDiff / 1000 / 60) % 60).toString().padStart(2, '0');
        if (s) s.textContent = Math.floor((bdayDiff / 1000) % 60).toString().padStart(2, '0');
    }

    // 3. Yıldönümü Sayacı (4 Ekim)
    let anni = new Date(now.getFullYear(), 9, 4);
    if (now > anni) anni = new Date(now.getFullYear() + 1, 9, 4);

    const anniDiff = anni - now;
    const anniCountdownEl = document.getElementById("anniversaryCountdown");
    const anniMessageEl = document.getElementById("anniversaryMessage");

    if (now.getMonth() === 9 && now.getDate() === 4) {
        if (anniCountdownEl) anniCountdownEl.style.display = "none";
        if (anniMessageEl) anniMessageEl.style.display = "block";
    } else {
        if (anniCountdownEl) anniCountdownEl.style.display = "flex";
        if (anniMessageEl) anniMessageEl.style.display = "none";
        const ad = document.getElementById("anni-days");
        const ah = document.getElementById("anni-hours");
        const am = document.getElementById("anni-minutes");
        const as = document.getElementById("anni-seconds");
        if (ad) ad.textContent = Math.floor(anniDiff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        if (ah) ah.textContent = Math.floor((anniDiff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
        if (am) am.textContent = Math.floor((anniDiff / 1000 / 60) % 60).toString().padStart(2, '0');
        if (as) as.textContent = Math.floor((anniDiff / 1000) % 60).toString().padStart(2, '0');
    }
}

setInterval(updateAllCounters, 1000);
document.addEventListener("DOMContentLoaded", updateAllCounters);

/* =========================================
   DOĞUM GÜNÜ MODÜLÜ
========================================= */

const _BDAY_MONTH = 5;   // Mayıs
const _BDAY_DAY   = 13;  // 13. gün  ← buradan kolayca değiştir

let _birthdayManualTrigger = false; // Klavye ile tetikleme için

function isBirthdayToday(now) {
    return now.getMonth() === _BDAY_MONTH - 1 && now.getDate() === _BDAY_DAY;
}

function showBirthdaySpecial() {
    const specialCard = document.getElementById("birthdaySpecialCard");
    if (!specialCard) return;
    
    if (specialCard.style.display !== "block") {
        specialCard.style.display = "block";
        // Kartı ekranın ortasına kaydır ki kullanıcı görsün
        specialCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    startBirthdayConfettiOnce();
}

function hideBirthdaySpecial() {
    const specialCard = document.getElementById("birthdaySpecialCard");
    if (specialCard && !_birthdayManualTrigger) {
        specialCard.style.display = "none";
    }
}

let _birthdayConfettiStarted = false;

function startBirthdayConfettiOnce() {
    if (_birthdayConfettiStarted) return;
    _birthdayConfettiStarted = true;

    const layer = document.getElementById("birthdayConfettiLayer");
    if (!layer) return;

    const colors = ["#ec4899", "#a78bfa", "#7c3aed", "#facc15", "#fce7f3", "#c084fc"];

    for (let i = 0; i < 70; i++) {
        setTimeout(() => {
            const piece = document.createElement("div");
            piece.className = "birthday-confetti";
            piece.style.left            = Math.random() * 100 + "vw";
            piece.style.background      = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDuration = (Math.random() * 2 + 3) + "s";
            piece.style.transform       = `rotate(${Math.random() * 360}deg)`;
            layer.appendChild(piece);
            setTimeout(() => piece.remove(), 5600);
        }, i * 40);
    }

    if (typeof createExplosionHeart === "function") {
        for (let i = 0; i < 18; i++) {
            setTimeout(createExplosionHeart, Math.random() * 900);
        }
    }
}

// ===== KLAVYEDEN "BIRTHDAY" YAZINCA TETİKLE =====
let _bdayInputBuffer = "";
const _bdayTargetWord = "birthday";

document.addEventListener("keydown", (e) => {
    // Sadece harf tuşlarını dikkate al
    if (e.key.length === 1) {
        _bdayInputBuffer += e.key.toLowerCase();
        
        // Sadece hedef kelime uzunluğu kadar tut
        if (_bdayInputBuffer.length > _bdayTargetWord.length) {
            _bdayInputBuffer = _bdayInputBuffer.substring(_bdayInputBuffer.length - _bdayTargetWord.length);
        }
        
        // Kelime eşleşti mi?
        if (_bdayInputBuffer === _bdayTargetWord) {
            _birthdayManualTrigger = true;
            _birthdayConfettiStarted = false; // Konfeti tekrar patlasın
            showBirthdaySpecial();
            _bdayInputBuffer = ""; // Buffer'ı temizle
            console.log("Doğum günü sürprizi aktif edildi! 🎂💜");
        }
    }
});

// Havada Süzülen Kalpler Efekti
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart-particle");
    heart.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='100%' height='100%'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' fill='currentColor'/></svg>`;
    const size = Math.random() * 25 + 20; // Boyut büyütüldü (20px-45px)
    heart.style.width = size + "px";
    heart.style.height = size + "px";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";
    const isDarkMode = document.body.classList.contains("dark-mode");
    const colors = isDarkMode
        ? ["#a855f7", "#ec4899", "#d100ff", "#a600ff", "#7c3aed"]
        : ["#ec4899", "#f472b6", "#a855f7", "#d946ef", "#ff85c0"]; // Açık modda da renkli kalpler
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 8000);
}
setInterval(createHeart, 300); // Sıklık artırıldı (400ms -> 300ms)

// Evet - Hayır Butonu Etkileşimi
const btnNo = document.getElementById("btnNo");
btnNo.addEventListener("mouseover", moveNoButton);
btnNo.addEventListener("touchstart", function (e) {
    e.preventDefault();
    moveNoButton();
}, { passive: false });

function moveNoButton() {
    const card = document.querySelector(".card");
    if (!card) return;
    btnNo.style.position = "absolute";
    const maxLeft = card.offsetWidth - btnNo.offsetWidth - 40;
    const maxTop = card.offsetHeight - btnNo.offsetHeight - 40;
    const randomLeft = Math.floor(Math.random() * maxLeft) + 20;
    const randomTop = Math.floor(Math.random() * maxTop) + 20;
    btnNo.style.left = randomLeft + "px";
    btnNo.style.top = randomTop + "px";
}

function loveYes() {
    for (let i = 0; i < 100; i++) { createExplosionHeart(); }
    for (let i = 0; i < 50; i++) { setTimeout(createHeart, Math.random() * 800); }
    setTimeout(() => { alert("Ben de seni dünyalar kadar seviyorum! ❤️❤️❤️"); }, 150);
}

function createExplosionHeart() {
    const card = document.querySelector('.card');
    if (!card) return;

    const heart = document.createElement("div");
    heart.classList.add("heart-particle", "explosion");
    heart.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='100%' height='100%'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' fill='currentColor'/></svg>`;

    const size = Math.random() * 30 + 15;
    heart.style.width = size + "px";
    heart.style.height = size + "px";

    // Kart merkezi
    const centerX = card.offsetWidth / 2;
    const centerY = card.offsetHeight / 2;

    // Kart içinden rastgele bir nokta seç
    const startX = Math.random() * (card.offsetWidth * 0.8) + (card.offsetWidth * 0.1);
    const startY = Math.random() * (card.offsetHeight * 0.8) + (card.offsetHeight * 0.1);

    heart.style.left = startX + "px";
    heart.style.top = startY + "px";
    heart.style.transform = "translate(-50%, -50%) scale(0.1)";
    heart.style.zIndex = "50";
    heart.style.pointerEvents = "none";

    const isDarkMode = document.body.classList.contains("dark-mode");
    const colors = isDarkMode
        ? ["#8a2be2", "#9b59b6", "#d100ff", "#a600ff", "#6a0dad"]
        : ["#ff69b4", "#ff1493", "#ffb6c1", "#ffc0cb", "#ff85c0"];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];

    // Kart içine ekle
    card.appendChild(heart);

    // Etrafa yayıl
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 30;
    let tx = Math.cos(angle) * distance;
    let ty = Math.sin(angle) * distance;

    // Sınırları kontrol et - kartın dışına çıkmasın
    const maxTx = (card.offsetWidth / 2) - 30;
    const maxTy = (card.offsetHeight / 2) - 30;
    tx = Math.max(-maxTx, Math.min(maxTx, tx));
    ty = Math.max(-maxTy, Math.min(maxTy, ty));

    setTimeout(() => {
        heart.style.transition = "transform 1.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.5s ease-out";
        heart.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.2)`;
        heart.style.opacity = "0";
    }, 10);

    setTimeout(() => { heart.remove(); }, 1500);
}

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const modalText = document.getElementById("modalText");
let currentImageSrc = "";
let currentScale = 1;
let galleryImages = [];
let currentImageIndex = -1;

// Galeri resimlerini al, karıştır ve tıklama olaylarını ekle
function initGallery() {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return;

    let images = Array.from(gallery.querySelectorAll('img'));

    // Fisher-Yates Karıştırma Algoritması
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        gallery.appendChild(images[j]); // Sona ekleyerek sırayı değiştirir
        [images[i], images[j]] = [images[j], images[i]];
    }

    // Karıştırılmış yeni listeyi al ve olayları ekle
    galleryImages = Array.from(gallery.querySelectorAll('img'));
    galleryImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function () {
            openModal(index);
        });
    });
}

document.addEventListener("DOMContentLoaded", initGallery);

function openModal(index) {
    if (index < 0 || index >= galleryImages.length) return;
    currentImageIndex = index;
    modal.style.display = "flex";
    currentImageSrc = galleryImages[index].getAttribute('src');
    modalImg.src = currentImageSrc;
    currentScale = 1;
    modalImg.style.transform = `scale(${currentScale})`;
    const savedText = localStorage.getItem(currentImageSrc);
    modalText.value = savedText ? savedText : "";
}

function prevImage() {
    if (currentImageIndex > 0) {
        openModal(currentImageIndex - 1);
    } else {
        openModal(galleryImages.length - 1); // Sona dön
    }
}

function nextImage() {
    if (currentImageIndex < galleryImages.length - 1) {
        openModal(currentImageIndex + 1);
    } else {
        openModal(0); // Başa dön
    }
}

modalImg.addEventListener('wheel', function (e) {
    e.preventDefault();
    if (e.deltaY < 0) { currentScale += 0.1; } else { currentScale -= 0.1; }
    currentScale = Math.max(0.5, Math.min(currentScale, 4));
    modalImg.style.transform = `scale(${currentScale})`;
});

function closeModal() {
    modal.style.display = "none";
}
function saveText() { localStorage.setItem(currentImageSrc, modalText.value); }
modal.addEventListener('click', function (e) {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", function (e) {
    // Textarea veya input odaklanmışsa kısayolları engelle
    const isTyping = e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT";

    // Modal açıksa yön tuşları VE WASD ile gezinti yap
    if (modal.style.display === "flex") {
        if (e.code === "ArrowLeft" || (!isTyping && e.code === "KeyA")) {
            prevImage();
            e.preventDefault();
        } else if (e.code === "ArrowRight" || (!isTyping && e.code === "KeyD")) {
            nextImage();
            e.preventDefault();
        } else if (e.code === "Escape") {
            closeModal();
            e.preventDefault();
        }
    }

    if (e.code === "Space") {
        if (!isTyping) {
            e.preventDefault();
            for (let i = 0; i < 30; i++) { createExplosionHeart(); }
        }
    }
});

// ===== KAZI KAZAN OYUNU MANTIĞI =====
const scratchSurprises = [
    { src: "foto1.jpeg", message: "Seninle geçen her saniye çok güzel... 💜" },
    { src: "foto2.jpeg", message: "Gülüşün en güzel manzaram! 😍" },
    { src: "foto3.jpeg", message: "İyi ki varsın canım sevgilim. ❤️" },
    { src: "foto4.jpeg", message: "Sonsuza dek seninle... ✨" },
    { src: "foto5.jpeg", message: "Beraber yaşlanacağımız günlere! 🍷" },
    { src: "foto6.jpeg", message: "Kalbimin tek sahibi sensin. 🔒💖" },
    { src: "foto7.jpeg", message: "En güzel anılarımızı biriktirmeye devam! 📸" },
    { src: "foto8.jpeg", message: "Seninle her yer cennet bana. 🏝️" },
    { src: "foto9.jpeg", message: "Bakışlarında kaybolduğum o an... 👀💕" },
    { src: "foto10.jpeg", message: "Hayatımın en güzel sürprizi sensin. 🎁" },
    { src: "foto11.jpeg", message: "Yanında huzur bulduğum tek yer. 🏡✨" },
    { src: "foto12.jpeg", message: "Elini hiç bırakmayacağım. 🤝❤️" },
    { src: "foto13.jpeg", message: "Yıldızlar kadar parla hayatımda. 🌟" },
    { src: "foto14.jpeg", message: "Rüya gibi bir aşk bizimkisi. 🌙☁️" },
    { src: "foto15.jpeg", message: "Dünyadaki en şanslı insan benim. 🍀💜" }
];

function initScratchCard() {
    const canvas = document.getElementById("scratchCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    // Sürpriz seçimi
    const randomSurprise = scratchSurprises[Math.floor(Math.random() * scratchSurprises.length)];
    const scratchImageElement = document.querySelector(".scratch-image");
    const scratchMessageElement = document.querySelector(".scratch-message");

    if (scratchImageElement && scratchMessageElement) {
        scratchImageElement.src = randomSurprise.src;
        scratchMessageElement.textContent = randomSurprise.message;
    }

    let isDrawing = false;
    let isRevealed = false;

    function resizeCanvas() {
        const wrapper = document.querySelector('.scratch-wrapper');
        if (!wrapper) return;
        canvas.width = wrapper.offsetWidth;
        canvas.height = wrapper.offsetHeight;
        if (!isRevealed) { fillCanvas(); }
    }

    function fillCanvas() {
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, "#c084fc");
        grad.addColorStop(0.5, "#a855f7");
        grad.addColorStop(1, "#7c3aed");

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(255,255,255,0.15)";
        for (let i = 0; i < 150; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.font = "bold 24px 'Outfit', sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Kazı Beni! ❤️", canvas.width / 2, canvas.height / 2);
    }

    window.addEventListener('resize', resizeCanvas);
    setTimeout(resizeCanvas, 300);

    function getXY(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : (e.changedTouches ? e.changedTouches[0].clientX : e.clientX);
        const clientY = (e.touches && e.touches[0]) ? e.touches[0].clientY : (e.changedTouches ? e.changedTouches[0].clientY : e.clientY);

        // Masaüstünde zoom: 0.8, Mobilde: 1.0
        const zoom = (window.innerWidth > 768) ? 0.8 : 1.0;

        return {
            x: (clientX - rect.left) / zoom,
            y: (clientY - rect.top) / zoom
        };
    }

    function scratch(x, y) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, 2 * Math.PI);
        ctx.fill();
    }

    function handleStart(e) {
        isDrawing = true;
        const p = getXY(e);
        scratch(p.x, p.y);
        if (e.type === "touchstart") e.preventDefault();
    }

    function handleMove(e) {
        if (!isDrawing) return;
        const p = getXY(e);
        scratch(p.x, p.y);
        if (e.type === "touchmove") e.preventDefault();
    }

    function handleEnd() {
        if (isDrawing) {
            isDrawing = false;
            checkReveal();
        }
    }

    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);

    canvas.addEventListener("touchstart", handleStart, { passive: false });
    canvas.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleEnd);
    window.addEventListener("touchcancel", handleEnd);

    function checkReveal() {
        if (isRevealed) return;
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let transparent = 0;
        for (let i = 0; i < pixels.length; i += 40) { if (pixels[i + 3] === 0) transparent++; }
        if (transparent / (pixels.length / 40) > 0.45) revealAll();
    }

    function revealAll() {
        if (isRevealed) return;
        isRevealed = true;
        canvas.style.transition = "opacity 1s ease, transform 1.5s ease";
        canvas.style.opacity = "0";
        canvas.style.transform = "scale(1.2)";
        setTimeout(() => { canvas.style.display = "none"; for (let i = 0; i < 30; i++) { setTimeout(createExplosionHeart, i * 60); } }, 1000);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    initScratchCard();
});


// ===== ZAMAN DUYARLI KARŞILAMA MODÜLÜ =====
function updateTimeGreeting() {
    const greetingElement = document.getElementById("timeGreeting");
    if (!greetingElement) return;

    const now = new Date();
    const hours = now.getHours();

    let greeting = "";

    // Saat aralıklarına göre mesaj seçimi
    if (hours >= 5 && hours < 12) {
        greeting = "Günaydın, Günışığım! ☀️";
    } else if (hours >= 12 && hours < 18) {
        greeting = "Tünaydın sevgilim! 🌸";
    } else if (hours >= 18 && hours < 22) {
        greeting = "İyi akşamlar birtanem! ✨";
    } else {
        greeting = "Hala uyumadın mı sevgilim? 🌙";
    }

    // Mesaj değişiminde fade efekti
    if (greetingElement.textContent !== greeting) {
        greetingElement.style.opacity = "0";
        greetingElement.style.transform = "translateY(-10px)";

        setTimeout(() => {
            greetingElement.textContent = greeting;
            greetingElement.style.opacity = "1";
            greetingElement.style.transform = "translateY(0)";
        }, 500);
    }
}

// Sayfa yüklendiğinde hemen çalıştır
document.addEventListener("DOMContentLoaded", function () {
    updateTimeGreeting(); // İlk çalıştırma

    // Saati güncelle (her dakika başında)
    setInterval(updateTimeGreeting, 60000);
});

// Sayfa görünür olunca da güncelle (sekme değiştirildiğinde)
document.addEventListener("visibilitychange", function () {
    if (!document.hidden) {
        updateTimeGreeting();
    }
});

// ===== GİZLİ MESAJ (EASTER EGG) MANTIĞI =====
function initEasterEgg() {
    let clicks = 0;
    const heart = document.querySelector(".heart-icon");
    const overlay = document.getElementById("secretMessageOverlay");
    const badge = document.getElementById("secretBadge");
    const hint = document.getElementById("secretHint");
    const textTarget = document.getElementById("secretTypewriterText");
    const closeBtn = document.querySelector(".secret-close-btn");

    if (!heart || !overlay || !hint) return;

    // Badge'i kapatma fonksiyonunu global yapalım ki HTML'den erişilebilsin
    window.dismissSecretBadge = (e) => {
        if (e) e.stopPropagation();
        if (badge) {
            badge.style.opacity = "0";
            setTimeout(() => { badge.style.display = "none"; }, 500);
            sessionStorage.setItem("secretBadgeDismissed", "true");
        }
    };

    const message = "Bunu bulacağını biliyordum...\nSana söylemek istediğim gizli bir şey var:\nİyi ki hayatımdasın. Seni sandığından çok daha fazla seviyorum 💜";
    const hintTexts = ["Bir şey mi arıyorsun? 💜", "Devam et...", "Yaklaştın ✨", "Bir tık daha..."];

    // Sayfa yüklendiğinde mesaj önceden bulunmuşsa ve bu oturumda kapatılmamışsa göster
    if (localStorage.getItem("secretMessageFound") === "true" && !sessionStorage.getItem("secretBadgeDismissed")) {
        if (badge) {
            badge.style.display = "block";
            badge.style.opacity = "1";
            // 8 saniye sonra otomatik gizle (çok rahatsız etmemesi için)
            setTimeout(() => {
                if (!sessionStorage.getItem("secretBadgeDismissed") && badge.style.display !== "none") {
                    badge.style.opacity = "0";
                    setTimeout(() => { badge.style.display = "none"; }, 500);
                }
            }, 8000);
        }
    }

    heart.addEventListener("click", function (e) {
        clicks++;
        if (clicks < 5) {
            hint.textContent = hintTexts[clicks - 1];
            hint.style.left = (e.clientX + 15) + "px";
            hint.style.top = (e.clientY - 40) + "px";
            hint.style.opacity = "1";
            hint.style.display = "block";
            setTimeout(() => {
                if (hint.style.opacity === "1") hint.style.opacity = "0";
            }, 1000);
        } else {
            clicks = 0;
            overlay.style.display = "flex";
            setTimeout(() => overlay.classList.add("active"), 10);

            textTarget.textContent = "";
            let i = 0;
            function type() {
                if (i < message.length) {
                    textTarget.textContent += message.charAt(i);
                    i++;
                    setTimeout(type, 50);
                }
            }
            setTimeout(type, 600);

            // localStorage'a kaydet ve rozeti göster
            localStorage.setItem("secretMessageFound", "true");
            if (badge) {
                badge.style.display = "block";
                badge.style.opacity = "1";
            }
        }
    });

    const closeSecret = () => {
        overlay.classList.remove("active");
        setTimeout(() => { overlay.style.display = "none"; textTarget.textContent = ""; }, 500);
    };

    if (closeBtn) closeBtn.onclick = closeSecret;
    overlay.onclick = (e) => { if (e.target === overlay) closeSecret(); };
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSecret(); });
}

window.addEventListener("load", initEasterEgg);

/* =========================================
   AŞK MEKTUBU MODÜLÜ (TYPEWRITER EFFECT)
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    // 13. Kural: Element Kontrolü (Hata vermemesi için)
    const openBtn = document.getElementById("openLoveLetterBtn");
    if (!openBtn) return;

    const overlay = document.getElementById("loveLetterOverlay");
    const closeBtn = document.getElementById("closeLoveLetterBtn");
    const letterTextEl = document.getElementById("loveLetterText");
    const footerEl = document.querySelector(".love-letter-footer");

    // 18. Kural: Mektup metnini buradan kolayca değiştirebilirsin
    // '\n' işaretleri alt satıra geçmek içindir
    const loveLetterMessage = `Merve,\n\nBu siteyi sana sadece güzel görünsün diye yapmadım.
    \nHer açtığında, seni düşündüğümü hisset diye yaptım.
    \nBeraber geçirdiğimiz her saniye benim için çok kıymetli.
    \nGülüşün, sesin, varlığın hepsi bana huzur veriyor.Seninle gezmek yanında olmak yemek yemek hepsi çok güzel.Senin kendinde kusur olarak gördüğün her şey benim için mükemmel.
    \nBazen tartışsak da kavga etsek de sana hiç darılamıyorum seni çok seviyorum.Bana sevmeyi ve sevilmeyi öğrettiğin
    için teşekkür ederim.Her şeyini seviyorum senin.Yanağını, gözlerini dudağını, kokunu, sesini, bakışını, dokunuşunu, her şeyini, her 
    şeyini seviyorum.Sana gerçekten aşığım.Sensiz yapamıyorum.
    \nUmarım beğenirsin sevgilim.
    \nİyi ki varsın, iyi ki benimlesin.İyi ki doğdun sevgilim.
    \nSeni çok seviyorum 💜`;

    let typingInterval;

    function openModal() {
        overlay.style.display = "flex";

        // CSS transition animasyonunun çalışması için ufak bir gecikme
        setTimeout(() => {
            overlay.classList.add("show");
        }, 10);

        startTypewriter();
        createSparkles(); // 20. Kural: Hafif kalp/parıltı efekti
    }

    function closeModal() {
        overlay.classList.remove("show");

        // Modalın kapanış animasyonu bittikten sonra gizle ve animasyonu sıfırla
        setTimeout(() => {
            overlay.style.display = "none";
            clearInterval(typingInterval);
        }, 400);
    }

    function startTypewriter() {
        // 12. Kural: Butona tekrar basılırsa önce eskisini durdur
        clearInterval(typingInterval);

        // Her açılışta yazıyı sıfırla (11. Kural)
        letterTextEl.textContent = "";
        footerEl.style.opacity = "0";

        let index = 0;

        // Daktilo hızı (40ms - 17. Kural: okunabilir hızda)
        typingInterval = setInterval(() => {
            if (index < loveLetterMessage.length) {
                letterTextEl.textContent += loveLetterMessage.charAt(index);
                index++;
            } else {
                clearInterval(typingInterval);
                footerEl.style.opacity = "1"; // Yazı bitince alttaki tatlı not ortaya çıkar
            }
        }, 40);
    }

    function createSparkles() {
        const modal = document.getElementById("loveLetterModal");

        // Modal açıldığında rastgele konumlarda 5 adet parıltı (✨) oluştur
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement("div");
            sparkle.innerHTML = "✨";
            sparkle.style.position = "absolute";
            // Modal içinden dışarı taşmamaları için %10 - %90 arası sınırlar
            sparkle.style.left = (10 + Math.random() * 80) + "%";
            sparkle.style.top = (10 + Math.random() * 80) + "%";
            sparkle.style.opacity = "0";
            sparkle.style.pointerEvents = "none";
            sparkle.style.animation = `loveSparkleAnim 1.5s ease-in-out ${Math.random() * 0.4}s`;

            modal.appendChild(sparkle);

            // İşlevi biten elementi DOM'dan temizle
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }
    }

    // Event Listener'lar
    openBtn.addEventListener("click", openModal);
    closeBtn.addEventListener("click", closeModal);

    // 10. Kural: Modal dışına (overlay) tıklayınca kapatma
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });

    // 9. Kural: Klavyeden ESC tuşuna basınca kapatma
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.style.display === "flex") {
            closeModal();
        }
    });
});

/* =========================================
   FAVORİ FOTOĞRAF MODÜLÜ
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.querySelector(".gallery");
    if (!gallery) return;

    let favorites = JSON.parse(localStorage.getItem("favoritePhotos")) || [];
    const favCountEl = document.getElementById("favCount");
    const toggleBtn = document.getElementById("toggleFavoritesBtn");
    const toast = document.getElementById("favoriteToast");

    function updateCounter() { if (favCountEl) favCountEl.textContent = favorites.length; }

    // Kalp butonlarını oluştur ve resimlerin üstüne yerleştir (Wrapper kullanarak)
    function initHearts() {
        const imgs = gallery.querySelectorAll("img");
        imgs.forEach((img, index) => {
            const src = img.getAttribute("src");
            
            // Eğer resim zaten bir wrapper içindeyse (shuffle sonrası tekrar çağrılırsa diye)
            if (img.parentElement.classList.contains("favorite-photo-wrapper")) return;

            // 1. Wrapper oluştur ve resmi içine al
            const wrapper = document.createElement("div");
            wrapper.className = "favorite-photo-wrapper";
            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);

            // 2. Butonu oluştur ve wrapper'a ekle
            const btn = document.createElement("button");
            btn.className = "favorite-photo-btn";
            btn.type = "button"; // Form submit'i önlemek için
            btn.dataset.targetSrc = src;
            btn.innerHTML = favorites.includes(src) ? "❤️" : "🤍";
            if (favorites.includes(src)) {
                btn.classList.add("favorite-photo-active");
                img.classList.add("favorite-glow");
            }

            btn.addEventListener("click", function (event) {
                event.stopPropagation();
                const isFav = favorites.includes(src);
                if (isFav) {
                    favorites = favorites.filter(s => s !== src);
                    this.innerHTML = "🤍";
                    this.classList.remove("favorite-photo-active");
                    img.classList.remove("favorite-glow");
                } else {
                    favorites.push(src);
                    this.innerHTML = "❤️";
                    this.classList.add("favorite-photo-active");
                    img.classList.add("favorite-glow");
                    showToast();
                }
                localStorage.setItem("favoritePhotos", JSON.stringify(favorites));
                updateCounter();
                if (gallery.classList.contains("favorites-only")) filterGallery();
            });
            wrapper.appendChild(btn);
        });
    }

    function filterGallery() {
        const wrappers = gallery.querySelectorAll(".favorite-photo-wrapper");
        wrappers.forEach(wrapper => {
            const img = wrapper.querySelector("img");
            const src = img.getAttribute("src");
            wrapper.style.display = (gallery.classList.contains("favorites-only") && !favorites.includes(src)) ? "none" : "block";
        });
    }

    function showToast() {
        if (!toast) return;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
    }

    if (toggleBtn) {
        toggleBtn.onclick = () => {
            gallery.classList.toggle("favorites-only");
            toggleBtn.classList.toggle("active");
            toggleBtn.textContent = gallery.classList.contains("favorites-only") ? "Tümünü Göster" : "Sadece Favorileri Göster";
            filterGallery();
        };
    }

    // Galeri karıştırıldıktan (shuffle) sonra butonları yerleştir
    setTimeout(initHearts, 100);

    updateCounter();
});

/* =========================================
   RUH HALİNE GÖRE MESAJ MODÜLÜ
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const moodSection = document.getElementById("moodMessageSection");
    if (!moodSection) return;

    const moodButtons = document.querySelectorAll(".mood-btn");
    const resultCard = document.getElementById("moodResultCard");
    const resultText = document.getElementById("moodResultText");

    const moodMessages = {
        sad: "Üzgünsen biraz yanıma gelmiş gibi düşün... Ben seni her halinle seviyorum. Kötü hissettiğin anlarda bile benim için çok değerlisin 🥺💜",
        miss: "Beni özlediysen bil ki ben de seni özlüyorum. Mesafeler bazen can sıkabilir ama kalbim hep senin yanında 💭💜",
        happy: "Mutluysan, mutluluğun bana da bulaştı demektir. Gülüşün bana mutluluk veriyor ✨💜",
        low: "Moralin bozuksa bugün dünyayı biraz kenara bırakalım. Senin güzel kalbin her şeyden daha önemli 🌧️🤍",
        hug: "Sarılmak istiyorsan gözlerini kapat ve beni yanında hayal et. Keşke şu an sana ben de sımsıkı sarılabilsem 🤍",
        jealous: "Kıskandıysan bile bu biraz tatlı olabilir. Ama bilmeni isterim ki benim kalbimde senin yerin ayrı ve çok özel 🙈💜",
        tired: "Yorulduysan biraz dinlen sevgilim. Her şeyi tek başına taşımak zorunda değilsin, ben hep yanındayım 🫶"
    };

    let selectedMood = localStorage.getItem("selectedMood") || null;

    function closeMoodMessage() {
        if (resultCard) resultCard.classList.remove("show");
        moodButtons.forEach(btn => {
            btn.classList.remove("mood-btn-active");
        });
        localStorage.removeItem("selectedMood");
        selectedMood = null;
    }

    function openMoodMessage(moodKey, button) {
        selectedMood = moodKey;
        localStorage.setItem("selectedMood", moodKey);

        moodButtons.forEach(btn => {
            btn.classList.remove("mood-btn-active");
        });

        if (button) button.classList.add("mood-btn-active");
        if (resultText) resultText.textContent = moodMessages[moodKey];
        if (resultCard) resultCard.classList.add("show");
    }

    moodButtons.forEach(button => {
        button.addEventListener("click", function () {
            const moodKey = button.dataset.mood;

            if (selectedMood === moodKey && resultCard.classList.contains("show")) {
                closeMoodMessage();
                return;
            }

            openMoodMessage(moodKey, button);
        });
    });

    // Sayfa yenilenince eğer son seçili ruh hali varsa mesaj yine açılsın
    if (selectedMood && moodMessages[selectedMood]) {
        const activeBtn = Array.from(moodButtons).find(btn => btn.dataset.mood === selectedMood);
        openMoodMessage(selectedMood, activeBtn);
    }
});

/* =========================================
   AŞK ÇARKI MODÜLÜ
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const wheel    = document.getElementById("loveWheel");
    const spinBtn  = document.getElementById("spinLoveWheelBtn");
    const resultBox  = document.getElementById("loveWheelResult");
    const resultText = document.getElementById("loveWheelResultText");

    // Element kontrolü — bölüm yoksa sessizce çık
    if (!wheel || !spinBtn || !resultBox || !resultText) return;

    const loveWheelItems = [
        "Sana bir iltifat hakkı çıktı 💜",
        "Sürpriz: Sana kocaman sarılma borcum var 🤍",
        "Bugünün aşk notu: İyi ki hayatımdasın ✨",
        "Birlikte dinlenecek bir şarkı seç 🎵",
        "Bana bugün bir kalp emojisi at ❤️",
        "Bugün sana ekstra naz yapma hakkı çıktı 🙈",
        "Birlikte film seçme hakkı sende 🎬",
        "Sana minicik bir şiir borcum var 📝"
    ];

    // localStorage'dan önceki rotasyonu yükle (sürekli artan değer, doğal animasyon için)
    let currentRotation = Number(localStorage.getItem("loveWheelRotation")) || 0;
    const savedResult   = localStorage.getItem("loveWheelLastResult");

    // Sayfa yenilenince önceki sonucu göster
    if (savedResult) {
        resultText.textContent = savedResult;
        resultBox.classList.add("show");
    }

    // Çarkı önceki konumuna getir (animasyonsuz, anında)
    wheel.style.transition = "none";
    wheel.style.transform  = `rotate(${currentRotation}deg)`;

    // Bir sonraki çevirmede transition aktif olsun
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            wheel.style.transition = "transform 3s cubic-bezier(0.12, 0.72, 0.18, 1)";
        });
    });

    spinBtn.addEventListener("click", function () {
        // Butonu geçici devre dışı bırak
        spinBtn.disabled = true;
        spinBtn.textContent = "Dönüyor... 💫";

        // Sonuç kutusunu gizle
        resultBox.classList.remove("show");

        // ── Açı hesabı ──────────────────────────────────────────────────────
        // 8 segment, her biri 45°. Segment i, çark üzerinde i×45° konumundadır.
        // Pointer tepede (0°). Segment i'nin pointer'a gelmesi için:
        //   (i × 45 + θ) mod 360 = 0  →  θ_hedef = (360 - i × 45) mod 360
        const segmentCount = loveWheelItems.length;       // 8
        const segmentAngle = 360 / segmentCount;          // 45°

        const randomIndex = Math.floor(Math.random() * segmentCount);

        // Segment i'nin çark üzerindeki MERKEZ açısı = i×45 + 22.5
        // Bu merkezi pointer'a (0°/360°) getirmek için:
        //   θ_hedef = (360 - merkez_açısı) mod 360
        const segmentCenter = randomIndex * segmentAngle + segmentAngle / 2;
        const targetMod     = (360 - segmentCenter) % 360;

        // Mevcut rotasyonun 0-360 içindeki karşılığı
        const currentMod = ((currentRotation % 360) + 360) % 360;

        // Hedefe ulaşmak için gereken en küçük pozitif fark
        let delta = targetMod - currentMod;
        if (delta <= 0) delta += 360; // En az biraz dönsün

        // 4 tam tur (1440°) + hassas hizalama açısı
        currentRotation += 1440 + delta;
        // ────────────────────────────────────────────────────────────────────

        wheel.style.transition = "transform 3s cubic-bezier(0.12, 0.72, 0.18, 1)";
        wheel.style.transform  = `rotate(${currentRotation}deg)`;

        // Animasyon bitince sonucu göster (3s + 100ms tolerans)
        setTimeout(() => {
            const result = loveWheelItems[randomIndex];

            resultText.textContent = result;
            resultBox.classList.add("show");

            // localStorage'a kaydet
            localStorage.setItem("loveWheelLastResult", result);
            localStorage.setItem("loveWheelRotation",   currentRotation.toString());

            // Kalp patlaması — mevcut fonksiyon varsa kullan
            if (typeof createExplosionHeart === "function") {
                for (let i = 0; i < 15; i++) {
                    setTimeout(createExplosionHeart, Math.random() * 500);
                }
            }

            // Butonu tekrar aktif et
            spinBtn.disabled    = false;
            spinBtn.textContent = "Tekrar Çevir 💘";
        }, 3100);
    });
});