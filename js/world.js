// js/world.js

const WORLD_KEY = "novel_world";
const area = document.getElementById("worldText");

area.value = localStorage.getItem(WORLD_KEY) || "";

function saveWorld(){
  localStorage.setItem(WORLD_KEY, area.value);
  alert("세계관 저장됨");
}
