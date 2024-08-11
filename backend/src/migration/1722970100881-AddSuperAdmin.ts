import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSuperAdmin1722970100881 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO service_worker (employeeNumber, firstName, lastName, role, startDate) VALUES (1, 'Mayuri', 'Ardad', 'superAdmin', '2024-01-01')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM service_worker WHERE employee_number = 1 AND role = 'superAdmin'`
    );
  }
}
