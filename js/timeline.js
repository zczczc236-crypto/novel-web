const KEY = "novel_timeline";
const list = document.getElementById("timelineList");

function addEvent(){
  const e = {
    title: timeTitle.value,
    date: timeDate.value,
    desc: timeDesc.value
  };
  const arr = JSON.parse(localStorage.getItem(KEY)||"[]");
  arr.push(e);
  localStorage.setItem(KEY,JSON.stringify(arr));
  render();
}

function render(){
  const arr = JSON.parse(localStorage.getItem(KEY)||"[]");
  list.innerHTML = arr.map(e=>`
    <li><strong>${e.date}</strong> ${e.title}<br>${e.desc}</li>
  `).join("");
}
render();
