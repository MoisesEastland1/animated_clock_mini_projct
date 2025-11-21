function clock() {
const now = new Date();
const canvas = document.getElementById('canvas');
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
ctx.strokeStyle = '#800000';
ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
ctx.stroke();
ctx.fill();
ctx.restore();

//Draw hour lines
ctx.save();
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

console.log(`${hr}:${min}:${sec}`);




ctx.restore(); //save the default state
}

clock();