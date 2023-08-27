// utils/templateUtils.ts
import fs from "fs/promises";
import path from "path";

export const readEmailTemplate = async (templateName: string) => {
  const templatePath = path.join(
    __dirname,
    "../templates",
    `${templateName}.html`
  );

  try {
    return await fs.readFile(templatePath, "utf-8");
  } catch (err) {
    throw new Error("Error reading template file.");
  }
};
