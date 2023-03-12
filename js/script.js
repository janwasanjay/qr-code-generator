const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

// Button submit
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  // getLocation();

  const qrText = document.getElementById('qrText').value;
  const qrTitle = document.getElementById('qrtitle').value;
  const qrSubTitle = document.getElementById('qrsubtitle').value;
  const height = document.getElementById('ddlheight').value;
  const width = document.getElementById('ddlwidth').value;
  const qrLogoSize = document.getElementById('logosize').value;

  // Validate qrText
  if (qrText === '') {
    alert('Please enter something');
  } else {
    showSpinner();
    // Show spinner for 1 sec
    setTimeout(() => {
      hideSpinner();
      generateQRCode(qrText, qrTitle, qrSubTitle, height, width, qrLogoSize);

      // Generate the save button after the qr code image src is ready
      setTimeout(() => {
        // Get save text
        const saveText = qr.querySelector('canvas').src;
        // Create save button
        createSaveBtn(saveText);
      }, 50);
    }, 1000);
  }
};

// Generate QR code
const generateQRCode = (qrText, qrTitle, qrSubTitle, height, width, qrLogoSize) => {
  const qrcode = new QRCode('qrcode', {
    text: qrText,
    width: width,
    height: height,
  });

//   const qrcode = new QRCode("qrcode", {
//     text: qrText,
//      width: parseInt(width),
//      height: parseInt(height),
//      drawer: 'img',
//     // logo: "img/QR-code-generator.png",
//     // logoWidth: qrLogoSize,
//     // logoHeight: qrLogoSize,
//     // logoBackgroundColor: '#ffffff',
//     // logoBackgroundTransparent: false,
//     title: qrTitle,
//     titleFont: "bold 18px Arial",
//     titleColor: "#000000",
//     titleBackgroundColor: "#ffffff",
//     titleHeight: 80,
//     titleTop: 40, 
//     subTitle: qrSubTitle,
//     subTitleFont: "14px Arial",
//     subTitleColor: "#4F4F4F",
//     subTitleTop: 60,
// });
};

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = '';
  const saveBtn = document.getElementById('save-link');
  if (saveBtn) {
    saveBtn.remove();
  }
};

// Show spinner
const showSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block';
};

// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'none';
};

function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#imgpreview').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
  }
};

// $("#fileUpload").change(function() {
//   $("#loader").removeClass("d-none");
//   var files = $('#fileUpload').prop("files");

//   var paath = this.files[0].mozFullPath;
//   var filePath = $(this).val();
//   var path = (window.URL || window.webkitURL).createObjectURL(files[0]);
//   var imgpath = $('input[type=file]').val();
//   var uppath = document.getElementById("fileUpload").value;

//   var file_size = files[0].size;
//   if (parseFloat(file_size) > 2000000) {
//       return;
//   }

//   readURL(this);
//   $("#imgpreview").removeClass("d-none");

// });

var x = document.getElementById("lblLocation");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}

// Create save button to download QR code as image
const createSaveBtn = (saveText) => {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.classList =
    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.href = saveText;
  link.download = 'qrcode';
  link.innerHTML = 'Save Image';
  document.getElementById('generated').appendChild(link);
};

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);
