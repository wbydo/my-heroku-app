import { MigrationInterface, QueryRunner, getManager } from 'typeorm';

import { Access } from '../entities/Access';

export class CreateAccess1614056950017 implements MigrationInterface {
  name = 'CreateAccess1614056950017';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `accesses` (`id` int NOT NULL AUTO_INCREMENT, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updeted_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleated_at` datetime(6) NULL, `token` varchar(255) NOT NULL, `access_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
      'ALTER TABLE `accesses` ADD CONSTRAINT `FK_5bb3cd65c337e1475696b4811e6` FOREIGN KEY (`access_id`) REFERENCES `accesses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
    const rootAccess = new Access('May the 4th B with y0u.', 1);
    await getManager().save(rootAccess);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `accesses` DROP FOREIGN KEY `FK_5bb3cd65c337e1475696b4811e6`'
    );
    await queryRunner.query('DROP TABLE `accesses`');
  }
}
