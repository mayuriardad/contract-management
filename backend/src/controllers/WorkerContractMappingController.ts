import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { WorkerContractMapping } from "../entities/WorkerContractMapping";
import { ServiceWorker } from "../entities/ServiceWorker";

export const onboardWorker = async (req: Request, res: Response) => {
  const { contractId, employeeNumber } = req.body;

  // const loggedInUser = req.user; // This is the user fetched in the middleware

  // if (!loggedInUser || ["worker"].includes(loggedInUser.role)) {
  //   return res.status(403).json({ message: "Permission denied" });
  // }

  try {
    const workerRepository = AppDataSource.getRepository(ServiceWorker);

    const worker = await workerRepository.findOneBy({ employeeNumber });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    const workerContractMappingRepository = AppDataSource.getRepository(
      WorkerContractMapping
    );
    const newMapping = workerContractMappingRepository.create({
      contractId,
      worker,
    });

    await workerContractMappingRepository.save(newMapping);
    res.status(201).json(newMapping);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const offboardWorker = async (req: Request, res: Response) => {
  const { contractId, employeeNumber } = req.body;

  try {
    const workerRepository = AppDataSource.getRepository(ServiceWorker);
    const worker = await workerRepository.findOneBy({ employeeNumber });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    if (worker.role === "worker") {
      return res.status(403).json({ message: "Permission denied" });
    }

    const workerContractMappingRepository = AppDataSource.getRepository(
      WorkerContractMapping
    );
    const existingMapping = await workerContractMappingRepository.findOneBy({
      contractId,
      worker,
    });

    if (!existingMapping) {
      return res.status(404).json({ message: "Mapping not found" });
    }

    await workerContractMappingRepository.remove(existingMapping);
    res.status(200).json({ message: "Worker offboarded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getWorkersForContract = async (req: Request, res: Response) => {
  const { contractId } = req.params;
  try {
    const workerContractMappings = await AppDataSource.getRepository(
      WorkerContractMapping
    ).find({
      where: { contractId: Number(contractId) },
      relations: ["worker"],
    });

    if (workerContractMappings.length === 0) {
      return res.json([]);
    }

    const workers = workerContractMappings.map((mapping) => mapping.worker);

    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getContractsForWorker = async (req: Request, res: Response) => {
  const { employeeNumber } = req.params;

  try {
    const workerContractMappingRepository = AppDataSource.getRepository(
      WorkerContractMapping
    );
    const mappings = await workerContractMappingRepository.find({
      where: { worker: { employeeNumber: Number(employeeNumber) } },
      relations: ["contract"],
    });

    if (mappings.length === 0) {
      return res.status(200).json([]);
    }

    const contracts = mappings.map((mapping) => mapping.contract);
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
