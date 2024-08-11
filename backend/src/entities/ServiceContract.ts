import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { WorkerContractMapping } from "./WorkerContractMapping";

@Entity()
export class ServiceContract {
  @PrimaryColumn()
  contractId!: number; // Definite assignment assertion

  @Column()
  name!: string; // Definite assignment assertion

  @Column()
  status!: "draft" | "approved" | "active" | "inactive"; // Definite assignment assertion

  @Column()
  ownerId!: number; // Definite assignment assertion

  @Column()
  createdAt!: Date; // Definite assignment assertion

  @Column()
  updatedAt!: Date; // Definite assignment assertion

  @OneToMany(() => WorkerContractMapping, (mapping) => mapping.contract)
  workerMappings!: WorkerContractMapping[]; // Definite assignment assertion
}
