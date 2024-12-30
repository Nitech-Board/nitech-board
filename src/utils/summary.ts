import { getComments, updateSummary } from "@/repositories/review";
import OpenAI from "openai";

const openai = new OpenAI();

export const setSummary = async (courseId: string): Promise<string> => {
  // 該当courseについたコメントのうち、最新のものから10件取得
  const comments = await getComments(courseId);

  if (comments.length === 0) {
    return "no comments";
  }

  // OpenAI APIを使って、コメントを要約
  const summary = await createSummary(comments);

  // 要約されたコメントを DB に保存
  updateSummary(courseId, summary);

  return "要約されたコメント";
};

const createSummary = async (comments: string[]): Promise<string> => {
  const systemPrompt = `
  以下にある大学の講義のレビューコメントが複数与えられます。
  コメントから、講義の良い点と悪い点を要約し、
  良い点：
  悪い点：
  のフォーマットに従い出力して下さい
  良い点と悪い点の間には、改行を入れてください。
  `;

  let userPrompt = "";

  comments.forEach((comment) => {
    userPrompt += comment + "\n";
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  return completion.choices[0].message.content;
};
