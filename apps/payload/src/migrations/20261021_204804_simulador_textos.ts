import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "paginas_blocks_simulador" ADD COLUMN "cabecalho_cartao" varchar DEFAULT 'Quanto você ganha · Plano {plano}';
  ALTER TABLE "paginas_blocks_simulador" ADD COLUMN "linha_setup" varchar DEFAULT 'Setup incluso';
  ALTER TABLE "paginas_blocks_simulador" ADD COLUMN "linha_operacao" varchar DEFAULT 'A Bu1lder cuida da operação';
  ALTER TABLE "_paginas_v_blocks_simulador" ADD COLUMN "cabecalho_cartao" varchar DEFAULT 'Quanto você ganha · Plano {plano}';
  ALTER TABLE "_paginas_v_blocks_simulador" ADD COLUMN "linha_setup" varchar DEFAULT 'Setup incluso';
  ALTER TABLE "_paginas_v_blocks_simulador" ADD COLUMN "linha_operacao" varchar DEFAULT 'A Bu1lder cuida da operação';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "paginas_blocks_simulador" DROP COLUMN "cabecalho_cartao";
  ALTER TABLE "paginas_blocks_simulador" DROP COLUMN "linha_setup";
  ALTER TABLE "paginas_blocks_simulador" DROP COLUMN "linha_operacao";
  ALTER TABLE "_paginas_v_blocks_simulador" DROP COLUMN "cabecalho_cartao";
  ALTER TABLE "_paginas_v_blocks_simulador" DROP COLUMN "linha_setup";
  ALTER TABLE "_paginas_v_blocks_simulador" DROP COLUMN "linha_operacao";`)
}
