const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

// Button submit
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const qrText = document.getElementById('qrText').value;
  const qrTitle = document.getElementById('qrtitle').value;
  const qrSubTitle = document.getElementById('qrsubtitle').value;
  const height = document.getElementById('ddlheight').value;
  const width = document.getElementById('ddlwidth').value;

  // Validate qrText
  if (qrText === '') {
    alert('Please enter something');
  } else {
    showSpinner();
    // Show spinner for 1 sec
    setTimeout(() => {
      hideSpinner();
      generateQRCode(qrText, qrTitle, qrSubTitle, height, width);

      setTimeout(() => {
        // const saveText = qr.querySelector('img').src;
        // createSaveBtn(saveText);
        createSaveBtn('');
      }, 50);
    }, 1000);
  }
};

// Generate QR code
const generateQRCode = (qrText, qrTitle, qrSubTitle, height, width) => {
  // const qrcode = new QRCode('qrcode', {
  //   text: qrText,
  //   width: width,
  //   height: height
  // });

    const qrcode = new QRCode("qrcode", {
      text: qrText,
      width: parseInt(width),
      height: parseInt(height),
      drawer: 'canvas',
      // logo: "img/QR-code-generator.png",
      // logoWidth: qrLogoSize,
      // logoHeight: qrLogoSize,
      // logoBackgroundColor: '#ffffff',
      // logoBackgroundTransparent: false,
      title: qrTitle,
      titleFont: "bold 18px Arial",
      titleColor: "#000000",
      titleBackgroundColor: "#ffffff",
      titleHeight: 80,
      titleTop: 40, 
      subTitle: qrSubTitle,
      subTitleFont: "14px Arial",
      subTitleColor: "#4F4F4F",
      subTitleTop: 60,
  });
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

// Create save button to download QR code as image
const createSaveBtn = (saveText) => {

  var canvas = document.getElementById('qrcode').querySelector('canvas');

  // domtoimage.toBlob(canvas)
  //   .then(function(blob) {
  //     window.saveAs(blob, 'qr-code.png');
  //   });
  
  var anchor = document.createElement ("a");
  anchor.href = canvas.toDataURL("image/png");
  anchor.id = 'save-link';
  anchor.download = "qrcode.PNG";
  anchor.innerHTML = 'Save Image';
  anchor.classList = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  document.getElementById('generated').appendChild(anchor);

};

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);
