import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ServiceContract } from "../entities/ServiceContract";
import { ServiceWorker } from "../entities/ServiceWorker";

export const createContract = async (req: Request, res: Response) => {
  const { name, status, ownerId, createdAt, updatedAt } = req.body;

  try {
    // Check if ownerId is assigned to another active contract
    const activeContracts = await AppDataSource.getRepository(ServiceContract)
      .createQueryBuilder("contract")
      .where("contract.ownerId = :ownerId", { ownerId })
      .andWhere("contract.status = :status", { status: "active" })
      .getCount();

    if (activeContracts > 0) {
      return res.status(400).json({
        message: "Owner ID is already assigned to another active contract.",
      });
    }

    const contractRepository = AppDataSource.getRepository(ServiceContract);

    const newContract = contractRepository.create({
      name,
      status,
      ownerId,
      createdAt,
      updatedAt,
    });

    await contractRepository.save(newContract);

    res.status(201).json({
      message: "Contract created successfully!",
      contract: newContract,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create contract", error });
  }
};

export const getContracts = async (req: Request, res: Response) => {
  const contractRepository = AppDataSource.getRepository(ServiceContract);
  const contracts = await contractRepository.find();
  res.json(contracts);
};

export const getContractById = async (req: Request, res: Response) => {
  const contractRepository = AppDataSource.getRepository(ServiceContract);
  const contract = await contractRepository.findOne({
    where: { contractId: Number(req.params.id) },
  });
  if (contract) {
    res.json(contract);
  } else {
    res.status(404).send("Contract not found");
  }
};

export const updateContract = async (req: Request, res: Response) => {
  const contractRepository = AppDataSource.getRepository(ServiceContract);
  const contract = await contractRepository.findOne({
    where: { contractId: Number(req.params.id) },
  });
  if (contract) {
    contractRepository.merge(contract, req.body);
    await contractRepository.save(contract);
    res.json(contract);
  } else {
    res.status(404).send("Contract not found");
  }
};

export const deleteContract = async (req: Request, res: Response) => {
  const contractRepository = AppDataSource.getRepository(ServiceContract);
  const result = await contractRepository.delete(req.params.id);
  if (result.affected) {
    res.status(204).send();
  } else {
    res.status(404).send("Contract not found");
  }
};
