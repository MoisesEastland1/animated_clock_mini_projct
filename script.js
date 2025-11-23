const canvas = document.getElementById('canvas');

const faceColor = document.getElementById('face-color');

const borderColor = document.getElementById('border-color');

const lineColor = document.getElementById('line-color');

const largeHands = document.getElementById('large-hands-color');

const secHand = document.getElementById('sec-hand-color');



function clock() {
const now = new Date();

const ctx = canvas.getContext('2d');

//Setup canvas
ctx.save(); //save the default state
ctx.clearRect(0, 0, 500, 500);
ctx.translate(250, 250); // Position 0,0 in the middle
ctx.rotate(-Math.PI / 2); // Rotate clock -90 deg

//Set default styles
ctx.strokeStyle = '#000000';
ctx.fillStyle = '#f4f4f4';
ctx.lineWidth = 5;
ctx.lineCap = 'round';

//Draw Clock face/border
ctx.save();
ctx.beginPath();
ctx.lineWidth = 14;
ctx.strokeStyle = borderColor.value;
ctx.fillStyle = faceColor.value;
ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
ctx.stroke();
ctx.fill();
ctx.restore();

//Draw hour lines
ctx.save();
ctx.strokeStyle = lineColor.value;
for(let i=0; i < 12; i++) {
  ctx.beginPath();
  ctx.rotate(Math.PI / 6);
ctx.moveTo(100, 0);
ctx.lineTo(120, 0);
ctx.stroke();
}
ctx.restore()

//Drawn minutes lines
ctx.save();
ctx.strokeStyle =lineColor.value;
ctx.lineWidth = 4;
for(let i=0; i < 60; i++) {
  if(i % 5 !== 0) {
  ctx.beginPath();
  ctx.moveTo(117, 0);
  ctx.lineTo(120, 0);
  ctx.stroke();
  }
  ctx.rotate(Math.PI / 30);
}
ctx.restore()

//Get the current time
const hr = now.getHours() % 12;
const min = now.getMinutes();
const sec = now.getSeconds();

//console.log(`${hr}:${min}:${sec}`);

//Draw hour hand
ctx.save();
ctx.rotate((Math.PI /6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec);
ctx.strokeStyle = largeHands.value;
ctx.lineWidth = 12;
ctx.beginPath();
ctx.moveTo(-20, 0);
ctx.lineTo(80, 0);
ctx.stroke();
ctx.restore();
console.log(largeHands.value);
//Draw minute hand 
ctx.save();
ctx.rotate((Math.PI /30) * min + (Math.PI / 1800) * sec);
ctx.strokeStyle = largeHands.value;
ctx.lineWidth = 8;
ctx.beginPath();
ctx.moveTo(-28, 0);
ctx.lineTo(112, 0);
ctx.stroke();
ctx.restore();

//Draw sec hand
ctx.save();
ctx.rotate((sec * Math.PI / 30));
ctx.strokeStyle = secHand.value;
ctx.fillStyle = secHand.value;
ctx.lineWidth = 6;
ctx.beginPath();
ctx.moveTo(-30, 0);
ctx.lineTo(100, 0);
ctx.stroke();
ctx.beginPath();
ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
ctx.fill();
ctx.restore();

/**Adding the colors to localStorage **/
// Save current color values to localStorage
function saveColors() {
  try {
    localStorage.setItem('faceColor', faceColor.value);
    localStorage.setItem('borderColor', borderColor.value);
    localStorage.setItem('lineColor', lineColor.value);
    localStorage.setItem('largeHands', largeHands.value);
    localStorage.setItem('secHand', secHand.value);
  } catch (evt) {
    console.warn('Could not save colors to localStorage', evt);
  }
}

// Load saved color values from localStorage (if present)
function loadColors() {
  try {
    const fc = localStorage.getItem('faceColor');
    const bc = localStorage.getItem('borderColor');
    const lc = localStorage.getItem('lineColor');
    const lh = localStorage.getItem('largeHands');
    const sh = localStorage.getItem('secHand');
    if (fc !== null) faceColor.value = fc;
    if (bc !== null) borderColor.value = bc;
    if (lc !== null) lineColor.value = lc;
    if (lh !== null) largeHands.value = lh;
    if (sh !== null) secHand.value = sh;
  } catch (evt) {
    console.warn('Could not load colors from localStorage', evt);
  }
}

// Wire input events so changes are saved immediately
[faceColor, borderColor, lineColor, largeHands, secHand].forEach(el => {
  if (el) el.addEventListener('input', saveColors);
});

// Load values once on script run
loadColors();
ctx.restore(); //save the default state

requestAnimationFrame(clock);
}
requestAnimationFrame(clock);

document.getElementById('save-btn').addEventListener('click', () => {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'clock.png';
  link.href = dataURL;
  link.click();
});
