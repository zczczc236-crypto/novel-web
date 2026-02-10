export function draw(svg, nodes) {
  svg.innerHTML = '';
  nodes.forEach((n,i)=>{
    const c=document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx",100+i*120);
    c.setAttribute("cy",200);
    c.setAttribute("r",20);
    svg.appendChild(c);
  });
}
