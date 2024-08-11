import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { WorkerContractMapping } from "./WorkerContractMapping";

@Entity()
export class ServiceWorker {
  @PrimaryColumn()
  employeeNumber: number; // Removed default value initialization

  @Column()
  firstName: string; // Removed default value initialization

  @Column()
  lastName: string; // Removed default value initialization

  @Column()
  role: "owner" | "worker" | "superAdmin"; // Removed default value initialization

  @Column({ type: "text", nullable: true }) // Use text type for dates
  startDate: Date | null; // Removed default value initialization

  @Column({ type: "text", nullable: true }) // Use text type for dates
  endDate: Date | null; // Removed default value initialization

  @OneToMany(() => WorkerContractMapping, (mapping) => mapping.worker)
  contractMappings!: WorkerContractMapping[]; // Removed default value initialization

  constructor(
    employeeNumber: number,
    firstName: string,
    lastName: string,
    role: "owner" | "worker" | "superAdmin",
    startDate: Date | null = null,
    endDate: Date | null = null
  ) {
    this.employeeNumber = employeeNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
