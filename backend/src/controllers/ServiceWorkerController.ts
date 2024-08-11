import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ServiceWorker } from "../entities/ServiceWorker";

// Get all workers
export const getWorkers = async (req: Request, res: Response) => {
  try {
    const workerRepository = AppDataSource.getRepository(ServiceWorker);
    const workers = await workerRepository.find();
    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Create a new worker
export const createWorker = async (req: Request, res: Response) => {
  try {
    const workerRepository = AppDataSource.getRepository(ServiceWorker);
    const newWorker = workerRepository.create(req.body);
    const savedWorker = await workerRepository.save(newWorker);
    res.status(201).json(savedWorker);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Delete a worker by employee number
export const deleteWorker = async (req: Request, res: Response) => {
  try {
    const workerRepository = AppDataSource.getRepository(ServiceWorker);
    const { employeeNumber } = req.params;
    const workerToDelete = await workerRepository.findOneBy({
      employeeNumber: parseInt(employeeNumber),
    });

    if (!workerToDelete) {
      return res.status(404).json({ message: "Worker not found" });
    }

    await workerRepository.remove(workerToDelete);
    res.status(200).json({ message: "Worker deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getWorker = async (req: Request, res: Response) => {
  try {
    const workerRepository = AppDataSource.getRepository(ServiceWorker);
    const { employeeNumber } = req.params;
    const workerTofind = await workerRepository.findOneBy({
      employeeNumber: parseInt(employeeNumber),
    });

    if (!workerTofind) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.status(200).json(workerTofind);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const isValidWorker = async (req: Request, res: Response) => {
  try {
    const workerRepository = AppDataSource.getRepository(ServiceWorker);
    const { employeeNumber } = req.body;
    const workerTofind = await workerRepository.findOneBy({
      employeeNumber: parseInt(employeeNumber),
    });

    if (!workerTofind) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.status(200).json({ message: "Valid worker" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
