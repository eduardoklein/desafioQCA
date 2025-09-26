import express from "express";
import routes from "./routes/index";
import { prisma } from "./utils/prismaClient";
import { requestLogger } from "./middlewares/logger";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);
app.use("/", routes);

app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);

    if (err.statusCode) {
      return res.status(err.statusCode).json({
        error: {
          code: err.code,
          message: err.message,
        },
      });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
);

app.get("/health", async (_req, res) => {
  await prisma.$queryRaw`SELECT 1`;
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
