// ===== GECE MODU ÖZELLİĞİ =====
document.addEventListener("DOMContentLoaded", function () {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
        enableDarkMode();
    }
    const darkModeBtn = document.getElementById("darkModeToggle");
    darkModeBtn.addEventListener("click", toggleDarkMode);
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

// ===== SAYAÇ =====
const baslangic = new Date("2025-10-04T20:00:00");
function sayac() {
    const simdi = new Date();
    const fark = simdi - baslangic;
    const gun = Math.floor(fark / (1000 * 60 * 60 * 24));
    document.getElementById("counter").innerText = gun + " Gündür Beraberiz";
}
setInterval(sayac, 1000);

// Havada Süzülen Kalpler Efekti
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart-particle");
    heart.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='100%' height='100%'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' fill='currentColor'/></svg>`;
    const size = Math.random() * 20 + 15;
    heart.style.width = size + "px";
    heart.style.height = size + "px";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 4 + 4 + "s";
    const isDarkMode = document.body.classList.contains("dark-mode");
    const colors = isDarkMode
        ? ["#8a2be2", "#9b59b6", "#d100ff", "#a600ff", "#6a0dad"]
        : ["#ffffff", "#f8f8ff", "#fffafa", "#f5f5f5", "#f0f8ff"];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 8000);
}
setInterval(createHeart, 400);

// Evet - Hayır Butonu Etkileşimi
const btnNo = document.getElementById("btnNo");
btnNo.addEventListener("mouseover", function () {
    const card = document.querySelector(".card");
    btnNo.style.position = "absolute";
    const maxLeft = card.offsetWidth - btnNo.offsetWidth - 40;
    const maxTop = card.offsetHeight - btnNo.offsetHeight - 40;
    const randomLeft = Math.floor(Math.random() * maxLeft) + 20;
    const randomTop = Math.floor(Math.random() * maxTop) + 20;
    btnNo.style.left = randomLeft + "px";
    btnNo.style.top = randomTop + "px";
});

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

// Galeri resimlerini al ve tıklama olaylarını ekle
galleryImages = Array.from(document.querySelectorAll('.gallery img'));
galleryImages.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function () {
        openModal(index);
    });
});

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

function closeModal() { modal.style.display = "none"; }
function saveText() { localStorage.setItem(currentImageSrc, modalText.value); }
modal.addEventListener('click', function (e) { if (e.target === modal) { closeModal(); } });

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

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("scratchCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

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
        canvas.width = wrapper.offsetWidth;
        canvas.height = wrapper.offsetHeight;
        if (!isRevealed) { fillCanvas(); }
    }

    function fillCanvas() {
        ctx.fillStyle = "#a89eb5";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "bold 24px 'Segoe UI', sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText("Kazı Beni!", canvas.width / 2, canvas.height / 2);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function getXY(e) {
        const rect = canvas.getBoundingClientRect();
        let scaleX = canvas.width / rect.width;
        let scaleY = canvas.height / rect.height;
        if (e.type.includes('touch')) {
            return {
                x: (e.touches[0].clientX - rect.left) * scaleX,
                y: (e.touches[0].clientY - rect.top) * scaleY
            };
        }
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }

    function scratch(x, y) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, 2 * Math.PI);
        ctx.fill();
    }

    function handleDown(e) {
        if (isRevealed) return;
        isDrawing = true;
        const pos = getXY(e);
        scratch(pos.x, pos.y);
    }

    function handleMove(e) {
        if (!isDrawing || isRevealed) return;
        if (e.cancelable) e.preventDefault();
        const pos = getXY(e);
        scratch(pos.x, pos.y);
        if (Math.random() > 0.8) { checkReveal(); }
    }

    function handleUp() { isDrawing = false; if (!isRevealed) checkReveal(); }

    canvas.addEventListener("mousedown", handleDown);
    canvas.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    canvas.addEventListener("touchstart", handleDown, { passive: false });
    canvas.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleUp);

    function checkReveal() {
        if (isRevealed) return;
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let transparentPixels = 0;
        const totalPixels = pixels.length / 4;
        for (let i = 0; i < pixels.length; i += 128) {
            if (pixels[i + 3] < 128) { transparentPixels++; }
        }
        const scratchedPercentage = transparentPixels / (totalPixels / 32);
        if (scratchedPercentage > 0.95) {
            isRevealed = true;
            canvas.style.transition = "opacity 0.8s ease";
            canvas.style.opacity = "0";
            setTimeout(() => {
                canvas.style.display = "none";
                for (let i = 0; i < 40; i++) { setTimeout(createExplosionHeart, Math.random() * 800); }
            }, 800);
        }
    }
});
