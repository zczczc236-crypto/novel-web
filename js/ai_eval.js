// js/ai_eval.js

const AI_TAGS = [
  "편집자_L",
  "문학평론가_은",
  "신인상심사",
  "웹소설PD",
  "조용한독자",
  "서사연구자",
  "장르독해자",
  "초판검수"
];

const AI_STYLES = [
  {
    name: "부드러운",
    eval: (len) => {
      if (len < 300)
        return "아직 숨을 고르는 단계 같아요. 장면 하나만 더 깊게 파봐도 좋을 것 같아요.";
      if (len < 1000)
        return "전개가 자연스럽고 읽기 편해요. 감정이 조금만 더 드러나면 더 좋아질 듯해요.";
      return "리듬과 분위기가 잘 유지돼요. 이 흐름을 끝까지 가져가도 충분해 보여요.";
    }
  },
  {
    name: "편집자",
    eval: (len) => {
      if (len < 300)
        return "도입부로는 나쁘지 않지만 독자를 붙잡기엔 정보가 적어요.";
      if (len < 1000)
        return "구조는 안정적이에요. 중반부 갈등을 조금 더 분명히 해보세요.";
      return "전체 호흡이 안정돼 있고 수정 포인트도 명확해 보여요.";
    }
  },
  {
    name: "독자시점",
    eval: (len) => {
      if (len < 300)
        return "솔직히 아직은 어떤 이야기인지 잘 모르겠어요.";
      if (len < 1000)
        return "계속 읽고 싶긴 한데 인물 쪽이 더 궁금해요.";
      return "다음 화가 있으면 바로 누를 것 같아요.";
    }
  }
];

// editor.html에서 호출
function aiEvaluate() {
  const text = document.getElementById("content").value;
  const box = document.getElementById("ai_result");

  if (!text || text.trim().length < 50) {
    box.innerText = "AI 평가: 내용이 너무 짧아요.";
    return;
  }

  const len = text.length;
  const tag = AI_TAGS[Math.floor(Math.random() * AI_TAGS.length)];
  const style = AI_STYLES[Math.floor(Math.random() * AI_STYLES.length)];

  box.innerText =
    `AI 평가 (${tag})\n` +
    style.eval(len);
}
