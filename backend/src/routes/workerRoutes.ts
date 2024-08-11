import express from "express";
import {
  getWorkers,
  createWorker,
  deleteWorker,
  getWorker,
  isValidWorker,
} from "../controllers/ServiceWorkerController";

const router = express.Router();

router.get("/", getWorkers);
router.post("/", createWorker);
router.delete("/:employeeNumber", deleteWorker);
router.get("/:employeeNumber", getWorker);
router.post("/login", isValidWorker);

export default router;
