import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateWorkerContractMappingTable1723481929449
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "worker_contract_mapping2" 
      ("employeeNumber" integer NOT NULL, "contractId" integer NOT NULL,
       "createdAt" text NOT NULL DEFAULT (CURRENT_TIMESTAMP),
        "updatedAt" text NOT NULL DEFAULT (CURRENT_TIMESTAMP), 
       PRIMARY KEY ("employeeNumber", "contractId"))`
    );
    await queryRunner.query(
      `INSERT INTO worker_contract_mapping2 (employeeNumber, contractId, createdAt, updatedAt)
      SELECT employeeNumber, contractId, createdAt, updatedAt FROM worker_contract_mapping`
    );
    await queryRunner.query(`DROP TABLE worker_contract_mapping`);
    await queryRunner.query(
      `ALTER TABLE worker_contract_mapping2 RENAME TO worker_contract_mapping`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
