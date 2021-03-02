import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1614524823020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('up')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('down')
  }
}
