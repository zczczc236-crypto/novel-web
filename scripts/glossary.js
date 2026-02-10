const glossary = {};

export function addTerm(word, text) {
  glossary[word] = text;
}

export function applyGlossary(content) {
  let result = content;
  Object.keys(glossary).forEach(word => {
    result = result.replaceAll(word, glossary[word]);
  });
  return result;
}
