import templates from "../data/ai-review-templates.json" assert { type: "json" };
import { generateAIName } from "./ai-names.js";

export function review(text) {
  const persona = Object.keys(templates)[Math.floor(Math.random() * 3)];
  const sentence =
    templates[persona][Math.floor(Math.random() * templates[persona].length)];

  const ai = generateAIName();

  return {
    persona,
    sentence,
    aiName: ai.name,
    tag: ai.tag
  };
}
