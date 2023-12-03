// var global 
// Mengambil referensi/data dari tabel di Firebase
var idVA, judulVA, isiVA, tglVA;
const alkitabRef = firebase.database().ref("alkitab");

// var global end 
// firebase end 

// card, chechkbox & modal
const cardContainer = document.getElementById("card-container"); // card judul rhema alkitab
const modalRAContainer = document.getElementById("modalRA-container"); //read rhema alkitab
const cb_RMAContainer = document.getElementById("cb-readMA"); //combo box rhema update del alkitab


// card, checkbox & modal
function generateElemenetRA(childSnapshot) {

  const kunciUnik = childSnapshot.key;
  const dataMA = childSnapshot.val();
  const judul = dataMA.judul;
  const isi = dataMA.isi;
  const tanggal = dataMA.tanggal;

  // create element, id & type 

  // checkbox read
  const cbrma = document.createElement("input");
  cbrma.id = `cbrMA|${kunciUnik}`;
  cbrma.type = "checkbox";
  cbrma.className = "m-2";
  cb_RMAContainer.appendChild(cbrma);

  // card   
  const card = document.createElement("div");
  card.className = "flex justify-center items-center w-full lg-w rounded-xl h-[15rem] mx-auto uppercase overflow-hidden hover:ring-2 hover:ring-yellow-500 relative group";

  // modal read rhema alkitab 
  const modalRA = document.createElement("div");
  modalRA.id = `RA${kunciUnik}`;
  modalRA.className = "fixed hidden blur-white inset-0 top-0 z-[2] max-w-[70vh] max-h-[80vh] m-auto rounded-xl p-5 md:max-w-[80%] lg:max-w-[90%] shadow-md mt-[80px] lg:mt-[95px]";

 
  // content card & modal 
  // card content
  const cardContent = `
    <!-- img background  -->
    <div class="w-full h-full bg-fixed bg-center bg-no-repeat transition-all duration-1000 group-hover:rotate-6 group-hover:scale-125 group-hover:ease-in-out" style="background-image: linear-gradient(rgba(0,0,0,0.50), rgba(0,0,0,0.50)),url(https://source.unsplash.com/1920x1080?clouds);">    
    </div>
      <!-- end background  -->
      <!-- card judul  -->
    <div class="h-[80%] w-[95%] flex border hover:animateGetar group-hover:w-[80%] transition-all ease-in-out duration-1000 border-yellow-600 shadow-xl rounded-md justify-center items-center absolute content-center">
          <label for="${cbrma.id}">
              <span class="group-hover:text-[2rem] group-hover:transition-all group-hover:ease-in-out text-2xl duration-[3000] font-vast text-yellow-500 font-gh font-semibold hover:scale-110 hover:cursor-pointer">${judul}</span>
          </label>      
    </div>
   
  `;
  card.innerHTML = cardContent;
  cardContainer.appendChild(card);

  // modal read alkitab
  const modalAContentRRA = `
      <!-- modal content  -->
      <div
          class="container relative z-[999] w-full h-full hover:ring-2 ring-offset-1 ring-offset-white ring-yellow-500 rounded-xl p-5">
          <!-- button close  -->
          <div
              class="flex absolute bg-yellow-200 -right-4 -translate-y-9 rounded-full p-1 ring-slate-900 border-2 border-slate-900">
              <label for="${cbrma.id}" class="text-[16px] cursor-pointer">❌</label>
          </div>
          <!-- end close  -->
          <!-- modal item  -->
          <div class="w-full h-full overflow-container py-2 pr-2">
              <div class="w-full h-full">
                  <!-- read data  -->
                  <div class="w-full h-full relative group">
                      <!-- update data -->
                      <div class="form w-full relative">
                          <div class="w-[100%] py-2 pl-2 hover:pl-20 transition-all ease-linear duration-1000">
                            <label class="font-h mx-auto text-4xl text-[#41d6f0] font-medium  ">
                                RHEMA HARIAN
                            </label>
                          </div>
                          <h1 type="text"
                              class="w-[100%] hover:w-[95%] transition-all ease-in duration-500 mx-auto hover:border border-purple-300 mb-4 text-[#44f8e9] rounded-sm text-[30px] cursor-pointer active:bg-black active:text-white text-center font-gh font-extrabold">
                              ${judul}
                          </h1>
                          <div type="text"
                            class="w-[100%] hover:w-[98%] transition-all ease-in duration-500 mx-auto h-auto hover:border mb-4 text-[#44f8e9] border-purple-300 hover:text-slate-800 rounded-sm p-2 pl-2 cursor-pointer overflow-container active:bg-black active:text-white hover:bg-cyan-400 font-medium text-[20px]">
                            ${isi}
                        </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
            `;

  modalRA.innerHTML = modalAContentRRA;
  modalRAContainer.appendChild(modalRA);
  // end 

  // ended 

  // Di sini Anda dapat memproses checkbox & modal
  const cbRMAC = document.getElementById(cbrma.id);
  const mRAC = document.getElementById(modalRA.id);
  cbRMAC.addEventListener('change', function () {
    mRAC.classList.toggle("hidden");
    if (cbRMAC.checked) {
      console.log(`modal read rhema ${judul} terbuka`);
    } else {
      console.log(`modal read rhema ${judul} tertutup`);
    }
  });

}

// Fungsi untuk membaca data dari Firebase dan membuat element
function readDataAndCreateElement() {
  alkitabRef.once("value", function (snapshot) {
    cardContainer.innerHTML = ""; // Kosongkan kontainer kartu sebelum menambahkan data baru
    cb_RMAContainer.innerHTML = ""; // kosongkan kontainer checkbox read 
    snapshot.forEach(function (childSnapshot) {
      generateElemenetRA(childSnapshot);
    });
  });
}
// Panggil fungsi untuk membaca data dan membuat card,cb & modal saat halaman dimuat
readDataAndCreateElement();
// element end 

// firebase insert
function readFormAlkitab() {

  const date = new Date();

  const formattedDate = date.toLocaleDateString(); // Format date as per user's locale
  const formattedTime = date.toLocaleTimeString(); // Format time as per user's locale

  judulVA = document.getElementById("judulRA").value;
  isiVA = document.getElementById("isiRA").value;
  tglVA = formattedDate + "|" + formattedTime;
  console.log(judulVA, isiVA, tglVA);
}
