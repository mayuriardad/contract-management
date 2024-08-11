import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1722950655670 implements MigrationInterface {
    name = 'InitialSchema1722950655670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "service_contract" ("contractId" integer PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "status" varchar NOT NULL, "ownerId" integer NOT NULL, "createdAt" datetime NOT NULL, "updatedAt" datetime NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "worker_contract_mapping" ("employeeNumber" integer NOT NULL, "contractId" integer NOT NULL, "createdAt" text NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" text NOT NULL DEFAULT (CURRENT_TIMESTAMP), "workerEmployeeNumber" integer, "contractContractId" integer, PRIMARY KEY ("employeeNumber", "contractId"))`);
        await queryRunner.query(`CREATE TABLE "service_worker" ("employeeNumber" integer PRIMARY KEY NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "role" varchar NOT NULL, "startDate" text, "endDate" text)`);
        await queryRunner.query(`CREATE TABLE "temporary_worker_contract_mapping" ("employeeNumber" integer NOT NULL, "contractId" integer NOT NULL, "createdAt" text NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" text NOT NULL DEFAULT (CURRENT_TIMESTAMP), "workerEmployeeNumber" integer, "contractContractId" integer, CONSTRAINT "FK_0e1ef412fed1ee96b12ac33358d" FOREIGN KEY ("workerEmployeeNumber") REFERENCES "service_worker" ("employeeNumber") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_ed29ec4dc3744b8793ebdfa2dc9" FOREIGN KEY ("contractContractId") REFERENCES "service_contract" ("contractId") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("employeeNumber", "contractId"))`);
        await queryRunner.query(`INSERT INTO "temporary_worker_contract_mapping"("employeeNumber", "contractId", "createdAt", "updatedAt", "workerEmployeeNumber", "contractContractId") SELECT "employeeNumber", "contractId", "createdAt", "updatedAt", "workerEmployeeNumber", "contractContractId" FROM "worker_contract_mapping"`);
        await queryRunner.query(`DROP TABLE "worker_contract_mapping"`);
        await queryRunner.query(`ALTER TABLE "temporary_worker_contract_mapping" RENAME TO "worker_contract_mapping"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worker_contract_mapping" RENAME TO "temporary_worker_contract_mapping"`);
        await queryRunner.query(`CREATE TABLE "worker_contract_mapping" ("employeeNumber" integer NOT NULL, "contractId" integer NOT NULL, "createdAt" text NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" text NOT NULL DEFAULT (CURRENT_TIMESTAMP), "workerEmployeeNumber" integer, "contractContractId" integer, PRIMARY KEY ("employeeNumber", "contractId"))`);
        await queryRunner.query(`INSERT INTO "worker_contract_mapping"("employeeNumber", "contractId", "createdAt", "updatedAt", "workerEmployeeNumber", "contractContractId") SELECT "employeeNumber", "contractId", "createdAt", "updatedAt", "workerEmployeeNumber", "contractContractId" FROM "temporary_worker_contract_mapping"`);
        await queryRunner.query(`DROP TABLE "temporary_worker_contract_mapping"`);
        await queryRunner.query(`DROP TABLE "service_worker"`);
        await queryRunner.query(`DROP TABLE "worker_contract_mapping"`);
        await queryRunner.query(`DROP TABLE "service_contract"`);
    }

}
