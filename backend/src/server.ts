import express from "express";
const PORT: number = 3001;

const app = express();

app.listen(PORT, () => console.log(`started server at PORT:, ${PORT}`));
