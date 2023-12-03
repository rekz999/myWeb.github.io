console.log("connect home js");

// scroll add class

window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  const fixedNav = 0; // Ganti dengan batas scroll yang Anda inginkan  

  if (window.pageYOffset > fixedNav) {
    header.classList.add('bg-navbar');

  } else {
    header.classList.remove('bg-navbar');
  }
});

// end scroll
// Fungsi untuk menampilkan atau menyembunyikan menu navigasi 3 bar
function toggleNav() {
  var navMenu = document.getElementById("nav-menu");
  navMenu.classList.toggle("blur-white")
  navMenu.classList.toggle("hidden");
}

// Ambil tombol hamburger
var btnNav = document.getElementById("btn_nav");

// Tambahkan event click pada tombol hamburger
btnNav.addEventListener("click", function () {
  toggleNav();
  btnNav.classList.toggle("btn-nav-active");
});

// login admin

// firebase input
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyC4cm73aFsrs879ACvXM8cGvWKa4mwA7UI",
  authDomain: "mywebsite-cae74.firebaseapp.com",
  databaseURL: "https://mywebsite-cae74-default-rtdb.firebaseio.com",
  projectId: "mywebsite-cae74",
  storageBucket: "mywebsite-cae74.appspot.com",
  messagingSenderId: "557863601901",
  appId: "1:557863601901:web:9520c70e8fd9d9f465aee4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);