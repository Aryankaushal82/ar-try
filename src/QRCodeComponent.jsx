import { QRCode } from 'qrcode.react';

function QRCodeComponent() {
  const arUrl = 'https://your-deployed-ar-url.com';  // URL where your AR scene is hosted
  
  return (
    <div>
      <QRCode value={arUrl} size={256} />
      <p>Scan the QR code to view the model in AR</p>
    </div>
  );
}
