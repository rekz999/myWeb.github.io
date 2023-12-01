// var global 
var idVQA, QuestionVA, AnswerVA, tglVA;
const QAalkitabRef = firebase.database().ref("QA_alkitab");
// var global end 

// card, chechkbox & modal
const cardQnAContainer = document.getElementById("cardQ&A-container"); // card question alkitab
const cb_QAMAContainer = document.getElementById("cb-readMQ&AA"); //checkbox box question alkitab
const modalQnAContainer = document.getElementById("modalQ&AA-container"); //read rhema alkitab
const modalUDQnAContainer = document.getElementById("modalQ&A-container"); //update delete modal rhema alkitab
const cb_MUDQnAContainer = document.getElementById("CB-MQ&AA"); //ceck box rhema update del alkitab

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
  // checkbox update delete
  const cbmQnAUD = document.createElement("input");
  cbmQnAUD.id = `cbMQnAA|${kunciUnik}`;
  cbmQnAUD.type = "checkbox";
  cbmQnAUD.className = "m-2";
  cb_MUDQnAContainer.appendChild(cbmQnAUD);

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

  // modal update delete
  const modalQnAUD = document.createElement("div");
  modalQnAUD.id = `UDQnAA${kunciUnik}`;
  modalQnAUD.className = "container fixed hidden overflow-container overflow-hidden blur-white inset-0 top-0 z-[2] max-w-[70vh] max-h-[80vh] m-auto rounded-xl p-5 md:max-w-[80%] lg:max-w-[90%] mb-5";
  // ended 

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
    <button id="delete|${kunciUnik}" class="text-[#fa465e] hover:text-2xl hover:transition-all hover:duration-1000 hover:ease-out absolute bottom-3 right-3 mt-5 m-2 transform hover:animate-bounce">
    <i class="fa-solid fa-trash fa-xl"></i>
    </button>
   
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
                    <label for="${cbmQnAUD.id}" class="m-3 mt-1 cursor-pointer">
                        <i class="fa-solid fa-pen-to-square fa-bounce fa-2xl" style="color: #aaaa99;"></i>
                      </label>
                  </div>
              </div>
          </div>
    </div>`;

  modalQAA.innerHTML = modalQnAContentRRA;
  modalQnAContainer.appendChild(modalQAA);
  // end 

  // modal content update delete
  const modalQnAContentUD = `
    <!-- modal content  -->
    <div
        class="container relative z-[999] w-full h-full hover:ring-4 ring-offset-2 ring-offset-slate-900 ring-pink-500 rounded-xl p-5">
        <!-- button close  -->
        <div
            class="flex absolute bg-yellow-200 -right-4 -translate-y-9 rounded-full p-1 ring-slate-900 border-2 border-slate-900">
            <label for="${cbmQnAUD.id}" class="text-[16px] cursor-pointer">❌</label>
        </div>
        <!-- end close  -->
        <!-- modal item  -->
        <div class="w-full h-full overflow-container pr-2">
            <div class="w-full h-full">
                <!-- update data  -->
                <div class="w-full h-full relative group">
                    <!-- update data -->
                    <div class="form w-full relative">
                    <Label class="font-h mx-auto text-4xl text-[#ffff00] my-2">RHEMA HARIAN </Label>
                    <input type="text" disabled
                        class="w-full border border-purple-300 mb-4 bg-blue-100 text-slate-800 rounded-sm h-10 p-2 pl-2 text-2xl cursor-pointer active:bg-black active:text-white hover:bg-yellow-400 font-gh font-extrabold"
                        placeholder="kunci unik firebase" value="${modalQnAUD.id}"/>
                    <input type="text" id="QA|${kunciUnik}"
                        class="w-full border border-purple-300 mb-4 bg-blue-100 text-slate-800 rounded-sm h-10 p-2 pl-2 text-2xl cursor-pointer active:bg-black active:text-white hover:bg-yellow-400 text-center font-gh font-extrabold"
                        placeholder="JUDUL OPO ?" value="${questionA}"/>
                    <textarea type="text" id="AA|${kunciUnik}" class="w-full h-[400px] border mb-4 border-purple-300 bg-blue-100 text-slate-800 rounded-sm p-2 pl-2 cursor-pointer active:bg-black active:text-white hover:bg-yellow-400" placeholder="REKZ, RHEMA APA ?">${answerA}</textarea>
                    <div class="flex flex-wrap">
                        <button id="update|${kunciUnik}" class="text-[#3b93e6] hover:transition-all hover:duration-1000 hover:ease-out mt-5 m-2 transform hover:animate-bounce">
                            <i class="fa-solid fa-pen-to-square fa-bounce fa-2xl"
                                style="color: #ffff00;"></i>
                        </button>                                               
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
  modalQnAUD.innerHTML = modalQnAContentUD;
  modalUDQnAContainer.appendChild(modalQnAUD);
  // ended 

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

  const cbQAMAUDC = document.getElementById(cbmQnAUD.id);
  const mQAUDC = document.getElementById(modalQnAUD.id);
  cbQAMAUDC.addEventListener('change', function () {
    mQAUDC.classList.toggle("hidden");
    if (cbQAMAUDC.checked) {
      console.log(`modal pertanyaan : ${questionA} terbuka`);
    } else {
      console.log(`modal pertanyaan : ${questionA} tertutup`);
    }
  });

  // ---------------------------------------------------------------------------------
  // update & delete 

  // read data modal question 
  function readFormQA_AlkitabAU() {

    const date = new Date();
  
    const formattedDate = date.toLocaleDateString(); // Format date as per user's locale
    const formattedTime = date.toLocaleTimeString(); // Format time as per user's locale
  
    QuestionVA = document.getElementById(`QA|${kunciUnik}`).value;
    AnswerVA = document.getElementById(`AA|${kunciUnik}`).value;
    tglVA = formattedDate + "|" + formattedTime;
    console.log(QuestionVA, AnswerVA, tglVA);
  }

  document.getElementById(`update|${kunciUnik}`).onclick = function () {
    readFormQA_AlkitabAU()
    firebase
      .database()
      .ref(`QA_alkitab/${kunciUnik}`)
      .update({
        Q:QuestionVA,
        A:AnswerVA,
        tanggal: tglVA,
        timestamp: firebase.database.ServerValue.TIMESTAMP, //mengurutkan data
      });
    alert("Data Update");    
    readDataAndCreateElementQA();
    cbQAMAC.checked = !cbQAMAC.checked;
    
  };
  document.getElementById(`delete|${kunciUnik}`).onclick = function () {
    var result = window.confirm("Apakah Anda yakin ingin lanjut menghapus?");

    if (result) {
      // Jika user memilih "OK" (Yes), tambahkan tindakan yang ingin Anda lakukan di sini
      alert("Anda memilih menghapus!");
      firebase
        .database()
        .ref(`QA_alkitab/${kunciUnik}`)
        .remove();
      alert(`Data ${kunciUnik} Deleted`);
      readDataAndCreateElementQA();

    } else {
      alert("Anda memilih No");
    }
  };

}
// Fungsi untuk membaca data dari Firebase dan membuat element
function readDataAndCreateElementQA() {
  QAalkitabRef.once("value", function (snapshot) {
    cardQnAContainer.innerHTML = ""; // Kosongkan kontainer kartu sebelum menambahkan data baru
    cb_QAMAContainer.innerHTML = ""; // kosongkan kontainer checkbox read 
    modalQnAContainer.innerHTML = ""; // Kosongkan kontainer modal sebelum menambahkan data baru
    cb_MUDQnAContainer.innerHTML = ""; // kosongkan kontainer checkbox update delete
    modalUDQnAContainer.innerHTML = ""; // Kosongkan kontainer modal sebelum menambahkan data baru
    snapshot.forEach(function (childSnapshot) {
      generateElemenetQnA(childSnapshot);
    });
  });
}
// Panggil fungsi untuk membaca data dan membuat card,cb & modal saat halaman dimuat
readDataAndCreateElementQA();
// element end 

// insert data firebase
document.getElementById("QAinsert").onclick = function () {
  readFormQA_Alkitab();
  if (!QuestionVA || !AnswerVA) {
    alert("wajib input field")
  } else {
    const newData = {
      Q: QuestionVA,
      A: AnswerVA,
      tanggal: tglVA,
      // Tambahkan timestamp
      timestamp: firebase.database.ServerValue.TIMESTAMP
    };

    QAalkitabRef.push(newData, function (error) {
      if (error) {
        alert("Data insertion failed: " + error.message);
      } else {
        alert("Data Inserted successfully");
        readDataAndCreateElementQA();
        document.getElementById("questionA").value = "";
        document.getElementById("answerA").value = "";
      }
    });
  }

}