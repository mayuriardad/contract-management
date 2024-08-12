import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ServiceWorker } from "./ServiceWorker";
import { ServiceContract } from "./ServiceContract";

@Entity()
export class WorkerContractMapping {
  @PrimaryColumn()
  employeeNumber: number; // Primary column, no default

  @PrimaryColumn()
  contractId: number; // Primary column, no default

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date = new Date(); // Initialize with current date

  @Column({
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date = new Date(); // Initialize with current date

  @ManyToOne(() => ServiceWorker, (worker) => worker.contractMappings)
  @JoinColumn({ name: "employeeNumber" })
  worker: ServiceWorker;

  @ManyToOne(() => ServiceContract, (contract) => contract.workerMappings)
  @JoinColumn({ name: "contractId" })
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
