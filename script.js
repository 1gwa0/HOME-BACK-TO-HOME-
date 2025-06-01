const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');
const downloadButton = document.getElementById('download');
const context = canvas.getContext('2d');
const templateImage = new Image();
templateImage.src = 'template.png';

// 啟用相機
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error('無法存取相機：', err);
  });

// 拍照並合成模板
captureButton.addEventListener('click', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  context.drawImage(templateImage, 0, 0, canvas.width, canvas.height);
});

// 下載圖片
downloadButton.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'photo.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
