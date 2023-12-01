// var global 
var idVQA, QuestionVA, AnswerVA, tglVA;
const QAalkitabRef = firebase.database().ref("QA_alkitab");
// var global end 

// card, chechkbox & modal
const cardQnAContainer = document.getElementById("cardQ&A-container"); // card question alkitab
const cb_QAMAContainer = document.getElementById("cb-readMQ&AA"); //checkbox box question alkitab
const modalQnAContainer = document.getElementById("modalQ&AA-container"); //read rhema alkitab

function readFormQA_Alkitab() {

  const date = new Date();

  const formattedDate = date.toLocaleDateString(); // Format date as per user's locale
  const formattedTime = date.toLocaleTimeString(); // Format time as per user's locale

  QuestionVA = document.getElementById("questionA").value;
  AnswerVA = document.getElementById("answerA").value;
  tglVA = formattedDate + "|" + formattedTime;
  console.log(QuestionVA, AnswerVA, tglVA);
}

// card, checkbox & modal
function generateElemenetQnA(childSnapshot) {

  const kunciUnik = childSnapshot.key;
  const dataQnAMA = childSnapshot.val();
  const questionA = dataQnAMA.Q;
  const answerA = dataQnAMA.A;
  const tanggal = dataQnAMA.tanggal;


  // create element, id & type 

  // checkbox read
  const cbQAma = document.createElement("input");
  cbQAma.id = `cbQAMA|${kunciUnik}`;
  cbQAma.type = "checkbox";
  cbQAma.className = "m-2";
  cb_QAMAContainer.appendChild(cbQAma);

  // card   
  const cardQnA = document.createElement("div");
  cardQnA.className = "flex justify-center items-center w-full lg-w rounded-xl h-[15rem] mx-auto uppercase overflow-hidden hover:ring-2 hover:ring-yellow-500 relative group";


  // modal read rhema alkitab 
  const modalQAA = document.createElement("div");
  modalQAA.id = `RQnAA${kunciUnik}`;
  modalQAA.className = "fixed hidden blur-white inset-0 top-0 z-[2] max-w-[70vh] max-h-[80vh] m-auto rounded-xl p-5 md:max-w-[80%] lg:max-w-[90%] mt-[80px] lg:mt-[95px]";


  // content card & modal 
  // card content
  const cardQnAContent = `
    <!-- img background  -->
    <div class="w-full h-full bg-fixed bg-center bg-no-repeat transition-all duration-1000 group-hover:rotate-6 group-hover:scale-125 group-hover:ease-in-out" style="background-image: linear-gradient(rgba(0,0,0,0.50), rgba(0,0,0,0.50)),url(https://source.unsplash.com/1920x1080?clouds);">    
    </div>
      <!-- end background  -->
      <!-- card judul  -->
    <div class="h-[80%] w-[95%] flex border hover:animateGetar group-hover:w-[80%] transition-all ease-in-out duration-1000 border-yellow-600 shadow-xl rounded-md justify-center items-center absolute content-center">
          <label for="${cbQAma.id}">
              <span class="group-hover:text-[2rem] group-hover:transition-all group-hover:ease-in-out text-2xl duration-[3000] font-vast text-yellow-500 font-gh font-semibold hover:scale-110 hover:cursor-pointer">${questionA}</span>
          </label>      
    </div>
   
  `;
  cardQnA.innerHTML = cardQnAContent;
  cardQnAContainer.appendChild(cardQnA);

  // modal read alkitab
  const modalQnAContentRRA = `
    <!-- modal content  -->
    <div class="container relative z-[999] w-full h-full hover:ring-2 ring-offset-1 ring-offset-white ring-pink-500 rounded-xl p-5">
          <!-- button close  -->
          <div class="flex absolute bg-yellow-200 -right-4 -translate-y-9 rounded-full p-1 ring-slate-900 border-2 border-slate-900">
              <label for="${cbQAma.id}" class="text-[16px] cursor-pointer">❌</label>
          </div>
          <!-- end close  -->
          <!-- modal item  -->
          <div class="w-full h-full overflow-container py-2 pr-2">
              <div class="w-full h-full">
                  <!-- read data  -->
                  <div class="w-full h-full relative group">
                      <!-- read data -->
                    <div class="form w-full relative">
                      <div class="w-[100%] py-2 pl-2 hover:pl-20 transition-all ease-linear duration-1000">
                        <label class="font-h mx-auto text-4xl text-[#41d6f0] font-medium  ">
                            RHEMA HARIAN
                        </label>
                    </div>
                    <h1 type="text"
                        class="w-[100%] hover:w-[95%] transition-all ease-in duration-500 mx-auto hover:border border-purple-300 mb-4 text-[#44f8e9] rounded-sm text-[30px] cursor-pointer active:bg-black active:text-white text-center font-gh font-extrabold">
                        ${questionA}
                    </h1>
                    <div class="container w-[100%] hover:w-[98%] transition-all ease-in duration-500 mx-auto h-auto hover:border mb-4 text-[#44f8e9] border-purple-300 hover:text-slate-800 rounded-sm p-2 pl-2 cursor-pointer active:bg-black active:text-white hover:bg-cyan-400 font-medium text-[20px] overflow-container ">
                        ${answerA}
                    </div>
                  </div>
              </div>
          </div>
    </div>`;

  modalQAA.innerHTML = modalQnAContentRRA;
  modalQnAContainer.appendChild(modalQAA);
  // end 

  // Di sini Anda dapat memproses checkbox & modal
  const cbQAMAC = document.getElementById(cbQAma.id);
  const mQAAC = document.getElementById(modalQAA.id);
  cbQAMAC.addEventListener('change', function () {
    mQAAC.classList.toggle("hidden");
    if (cbQAMAC.checked) {
      console.log(`modal pertanyaan : ${questionA} terbuka`);
    } else {
      console.log(`modal pertanyaan : ${questionA} tertutup`);
    }
  });

}
// Fungsi untuk membaca data dari Firebase dan membuat element
function readDataAndCreateElementQA() {
  QAalkitabRef.once("value", function (snapshot) {
    cardQnAContainer.innerHTML = ""; // Kosongkan kontainer kartu sebelum menambahkan data baru
    cb_QAMAContainer.innerHTML = ""; // kosongkan kontainer checkbox read 
    modalQnAContainer.innerHTML = ""; // Kosongkan kontainer modal sebelum menambahkan data baru
    snapshot.forEach(function (childSnapshot) {
      generateElemenetQnA(childSnapshot);
    });
  });
}
// Panggil fungsi untuk membaca data dan membuat card,cb & modal saat halaman dimuat
readDataAndCreateElementQA();
// element end 
