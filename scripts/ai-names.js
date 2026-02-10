export function generateAIName() {
  const names = ["서사판관", "문장수집가", "백야의독자", "플롯감별사"];
  const tags = ["#AI평론", "#가상독자", "#비인간"];
  return {
    name: names[Math.floor(Math.random() * names.length)],
    tag: tags[Math.floor(Math.random() * tags.length)]
  };
}
