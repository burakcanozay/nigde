const baslangic = new Date("2025-10-04T21:30:00"); // Kendi tarihinle değiştir

function sayac() {
    const simdi = new Date();
    const fark = simdi - baslangic;
    
    const gun = Math.floor(fark / (1000 * 60 * 60 * 24));
    document.getElementById("counter").innerText = gun + " Gündür Beraberiz";
}

setInterval(sayac, 1000);

function mesajGoster() {
    alert("Seni dünyalar kadar seviyorum! ❤️");
}
