const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
let drawing=false;

c.onmousedown=()=>drawing=true;
c.onmouseup=()=>drawing=false;
c.onmousemove=e=>{
  if(!drawing) return;
  ctx.fillRect(e.offsetX,e.offsetY,3,3);
};

function clearCanvas(){
  ctx.clearRect(0,0,c.width,c.height);
}
