import { Router } from "express";
import {
  onboardWorker,
  offboardWorker,
  getWorkersForContract,
  getContractsForWorker,
} from "../controllers/WorkerContractMappingController";

const router = Router();

router.post("/onboard", onboardWorker);
router.post("/offboard", offboardWorker);
router.get("/contracts/:contractId/workers", getWorkersForContract);
router.get("/workers/:employeeNumber/contracts", getContractsForWorker);

export default router;
