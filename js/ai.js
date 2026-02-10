const personas = [
  "편집자 노아",
  "독자 시점 미르",
  "서사 분석가 루엔",
  "기록관 에이린"
];

export function review(text) {
  const who = personas[Math.floor(Math.random()*personas.length)];
  return `
<b>${who}</b><br>
이 회차는 흐름이 자연스럽고 장면 전환이 과하지 않습니다.
특히 독자가 감정을 따라가게 만드는 지점이 명확합니다.
  `;
}
