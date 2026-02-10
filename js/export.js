function exportText(){
  const series = JSON.parse(localStorage.getItem("novel_series")||"[]");
  const content = series.map(s=>s.text).join("\n\n");
  const blob = new Blob([content],{type:"text/plain"});
  const a = document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="novel.txt";
  a.click();
}
