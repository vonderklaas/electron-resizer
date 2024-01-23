const form = document.querySelector('#img-form');
const img = document.querySelector('#img');
const outputPath = document.querySelector('#output-path');
const filename = document.querySelector('#filename');
const heightInput = document.querySelector('#height');
const widthInput = document.querySelector('#width');

const loadImage = (e) => {
  const file = e.target.files[0];

  // Check if file is an image
  if (!isFileImage(file)) {
    showToastMessage('You can only resize images.', 'error');
    return;
  }

  // Add current height and width to form using the URL API
  const image = new Image();
  image.src = URL.createObjectURL(file);
  image.onload = function () {
    widthInput.value = this.width;
    heightInput.value = this.height;
  };

  form.style.display = 'block';
  filename.innerHTML = img.files[0].name;
  outputPath.innerText = path.join(os.homedir(), 'image-resizer');
};

// Send image to be resized to the main process using IPC
const sendImage = (e) => {
  e.preventDefault();

  const width = widthInput.value;
  const height = heightInput.value;
  const imgPath = img.files[0].path;

  if (!img.files[0]) {
    showToastMessage('Please upload an image.', 'error');
    return;
  }

  if (width === '' || height === '') {
    showToastMessage('Please enter a valid width and height.', 'error');
    return;
  }

  ipcRenderer.send('image:resize', {
    imgPath,
    width,
    height,
  });

  // Catch success notification from main process
  ipcRenderer.on('image:done', () => {
    showToastMessage(
      `Image was resized to ${width} x ${height} successfully.`,
      'success'
    );
  });
};

const isFileImage = (file) => {
  const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
  return file && acceptedImageTypes.includes(file['type']);
};

const showToastMessage = (message, type) => {
  Toastify.toast({
    text: message,
    duration: 2000,
    close: false,
    gravity: 'top',
    style: {
      background: type === 'error' ? 'orangered' : 'lime',
      color: '#fff',
      textAlign: 'center',
      padding: '0.5rem 0',
    },
  });
};

img.addEventListener('change', loadImage);
form.addEventListener('submit', sendImage);
