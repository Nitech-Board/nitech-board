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
  if (summary.length !== 2) {
    return "OpenAPI format error";
  }

  // 要約されたコメントを DB に保存
  updateSummary(courseId, summary[0], summary[1]);

  return "要約されたコメント";
};

const createSummary = async (comments: string[]): Promise<string[]> => {
  const systemPrompt = `
  大学の授業についてのコメントが複数あります。
  一文目に良い点を、二文目に悪い点を、改行区切りで要約してください。
  `;

  let commentPrompt = "";

  comments.forEach((comment) => {
    commentPrompt += comment + "\n";
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      { role: "user", content: commentPrompt },
    ],
  });

  const result = completion.choices[0].message.content;
  console.log(result);

  return result.split("\n");
};
