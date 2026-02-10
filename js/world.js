js
function renderWorld(nodes){
const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
svg.setAttribute('viewBox','0 0 600 300');
nodes.forEach((n,i)=>{
const c = document.createElementNS(svg.namespaceURI,'circle');
c.setAttribute('cx',100+i*120);
c.setAttribute('cy',150);
c.setAttribute('r',30);
c.setAttribute('fill','#6366f1');
svg.appendChild(c);
});
document.body.appendChild(svg);
}
