import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source"; // Adjust path as necessary
import cors from "cors";
import workerRoutes from "./routes/workerRoutes";
import contractRoutes from "./routes/contractRoutes";
import workerContractMappingRoutes from "./routes/mappingRoutes";
import { fetchUserMiddleware } from "./middlewares/authMiddleware";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  const workerPattern = /^\/workers\/\d+$/;
  if (
    workerPattern.test(req.originalUrl) ||
    ["/workers/login"].includes(req.originalUrl)
  ) {
    return next();
  } else {
    return fetchUserMiddleware(req, res, next);
  }
});

app.use("/workers", workerRoutes);
app.use("/contracts", contractRoutes);
app.use("/worker-contract-mapping", workerContractMappingRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error: any) => {
    console.error("Error during Data Source initialization:", error);
  });
