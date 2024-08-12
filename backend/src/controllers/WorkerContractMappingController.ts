import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { WorkerContractMapping } from "../entities/WorkerContractMapping";
import { ServiceWorker } from "../entities/ServiceWorker";
import { In } from "typeorm";

export const onboardWorker = async (req: Request, res: Response) => {
  const { contractId, employeeNumber } = req.body;
  const loggedInUser = res.locals.user; // This is the user fetched in the middleware

  if (!loggedInUser || ["worker"].includes(loggedInUser.role)) {
    return res.status(403).json({ message: "Permission denied" });
  }
  const mappingAlreadyExists = await AppDataSource.getRepository(
    WorkerContractMapping
  ).find({
    where: {
      contractId: Number(contractId),
      employeeNumber: Number(employeeNumber),
    },
  });

  if (mappingAlreadyExists) {
    return res
      .status(409)
      .json({ message: "Worker already assigned to project" });
  }

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
      employeeNumber,
      contractId,
    });

    await workerContractMappingRepository.save(newMapping);
    res.status(201).json(worker);
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
      employeeNumber,
      contractId,
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
    });

    if (workerContractMappings.length === 0) {
      return res.json([]);
    }

    const workerIds = workerContractMappings.map(
      (mapping) => mapping.employeeNumber
    );

    const workers = await AppDataSource.getRepository(ServiceWorker).find({
      where: {
        employeeNumber: In(workerIds),
      },
    });

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
      where: { employeeNumber: Number(employeeNumber) },
    });

    if (mappings.length === 0) {
      return res.status(200).json([]);
    }

    const contractIds = mappings.map((mapping) => mapping.contractId);
    const contracts = await workerContractMappingRepository.find({
      where: { contractId: In(contractIds) },
    });
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
