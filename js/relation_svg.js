// js/relation_svg.js

const svg = document.getElementById("relation");

const nodes = [
  {x:200,y:200,name:"주인공"},
  {x:400,y:200,name:"조력자"},
  {x:300,y:80,name:"적대자"}
];

nodes.forEach(n=>{
  const c = document.createElementNS("http://www.w3.org/2000/svg","circle");
  c.setAttribute("cx",n.x);
  c.setAttribute("cy",n.y);
  c.setAttribute("r",30);
  c.setAttribute("fill","#444");
  svg.appendChild(c);

  const t = document.createElementNS("http://www.w3.org/2000/svg","text");
  t.setAttribute("x",n.x-18);
  t.setAttribute("y",n.y+5);
  t.setAttribute("fill","#fff");
  t.textContent=n.name;
  svg.appendChild(t);
});
