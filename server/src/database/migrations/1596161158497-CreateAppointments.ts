import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateAppointments1596161158497 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'appointments',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'provider',
						type: 'varchar',
					},
					{
						name: 'date',
						type: 'timestamp with time zone',
					},
				],
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('appointments')
	}
}
