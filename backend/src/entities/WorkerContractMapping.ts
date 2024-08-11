import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { ServiceWorker } from "./ServiceWorker";
import { ServiceContract } from "./ServiceContract";

@Entity()
export class WorkerContractMapping {
  @PrimaryColumn()
  employeeNumber: number;

  @PrimaryColumn()
  contractId: number;

  @Column({ type: "text", default: () => "CURRENT_TIMESTAMP" }) // Use text type for dates in SQLite
  createdAt: Date;

  @Column({
    type: "text",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  }) // Use text type for dates in SQLite
  updatedAt: Date;

  @ManyToOne(() => ServiceWorker, (worker) => worker.contractMappings)
  worker: ServiceWorker;

  @ManyToOne(() => ServiceContract, (contract) => contract.workerMappings)
  contract: ServiceContract;

  constructor(
    employeeNumber: number,
    contractId: number,
    worker: ServiceWorker,
    contract: ServiceContract,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.employeeNumber = employeeNumber;
    this.contractId = contractId;
    this.worker = worker;
    this.contract = contract;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
