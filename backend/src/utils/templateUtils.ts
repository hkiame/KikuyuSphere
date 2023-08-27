import fs from "fs/promises";
import path from "path";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename.slice(1)); // Remove the leading slash

export const readEmailTemplate = async (templateName: string) => {
  const templatesDirectory = path.join(__dirname, "..", "templates");
  const templatePath = path.join(templatesDirectory, `${templateName}.html`);

  try {
    return await fs.readFile(templatePath, "utf-8");
  } catch (err) {
    throw new Error(`Error reading template file. ${templatePath}`);
  }
};
