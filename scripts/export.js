export function exportTXT(title, content) {
  const blob = new Blob([title + "\n\n" + content], { type: "text/plain" });
  download(blob, `${title}.txt`);
}

export function exportEPUB(title, content) {
  const html = `<h1>${title}</h1><p>${content.replace(/\n/g, "<br>")}</p>`;
  const blob = new Blob([html], { type: "application/epub+zip" });
  download(blob, `${title}.epub`);
}

function download(blob, name) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
}
