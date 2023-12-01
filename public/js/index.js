console.log("connect js");

// typing animation
const textElement = document.getElementById('typing-text');
const text = "I'm REKZ";
let index = 0;

function type() {
  if (index < text.length) {
    textElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(type, 400); // Kecepatan ketik (ms)
  } else {
    // Teks telah selesai diketik, atur ulang indeks untuk animasi berulang
    index = 0;
    textElement.innerHTML = '';
    setTimeout(type, 50); // Jeda sebelum animasi berulang (ms)
  }
}
type(); // Memulai animasi ketik
  // typing animation end

  // Menentukan elemen checkbox
const ic_sun1 = document.getElementById("ic_sun1");
const ic_sun2 = document.getElementById("ic_sun2");
const ic_sun3 = document.getElementById("ic_sun3");
const ic_sun4 = document.getElementById("ic_sun4");

// Menambahkan event listener ke setiap checkbox
ic_sun1.addEventListener("change", checkRedirect);
ic_sun2.addEventListener("change", checkRedirect);
ic_sun3.addEventListener("change", checkRedirect);
ic_sun4.addEventListener("change", checkRedirect);

// Fungsi untuk memeriksa checkbox
function checkRedirect() {
  // Memeriksa apakah ketiga kotak centang telah dicentang (kondisi "dan")
  if (ic_sun1.checked && ic_sun2.checked && ic_sun3.checked && ic_sun4.checked) {
    // Jika salah satu dari kedua kondisi terpenuhi, arahkan pengguna ke halaman web lain
    window.location.href = "./public/content/auth/auth.html";
  }
}
  