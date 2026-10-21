import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_cadastros_tipo" AS ENUM('lp', 'hub', 'contato-plataforma');
  CREATE TYPE "public"."enum_cadastros_envio_status" AS ENUM('pendente', 'enviado', 'falha');
  CREATE TABLE "cadastros" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nome" varchar,
  	"email" varchar,
  	"whatsapp" varchar,
  	"cidade_uf" varchar,
  	"perfil" varchar,
  	"segmento" varchar,
  	"empresas_atendidas" varchar,
  	"clientes_atendidos" varchar,
  	"uso" varchar,
  	"extras" jsonb,
  	"contato_empresa" varchar,
  	"contato_cargo" varchar,
  	"contato_volume" varchar,
  	"contato_desafio" varchar,
  	"consentimento_aceito" boolean DEFAULT false,
  	"consentimento_data" timestamp(3) with time zone,
  	"consentimento_texto" varchar,
  	"tipo" "enum_cadastros_tipo",
  	"pagina" varchar,
  	"formulario" varchar,
  	"utm_source" varchar,
  	"utm_medium" varchar,
  	"utm_campaign" varchar,
  	"utm_content" varchar,
  	"utm_term" varchar,
  	"utm_id" varchar,
  	"gclid" varchar,
  	"gbraid" varchar,
  	"wbraid" varchar,
  	"waclid" varchar,
  	"fbclid" varchar,
  	"xcod" varchar,
  	"src" varchar,
  	"fbc" varchar,
  	"fbp" varchar,
  	"origem" varchar,
  	"ip" varchar,
  	"user_agent" varchar,
  	"envio_status" "enum_cadastros_envio_status" DEFAULT 'pendente',
  	"envio_tentativas" numeric DEFAULT 0,
  	"envio_resposta_status" numeric,
  	"envio_ultimo_erro" varchar,
  	"envio_enviado_em" timestamp(3) with time zone,
  	"token" varchar,
  	"event_id" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cadastros_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "ty_page_proximos_passos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar NOT NULL,
  	"texto" varchar
  );
  
  CREATE TABLE "ty_page_variacoes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"titulo" varchar,
  	"texto" varchar
  );
  
  CREATE TABLE "ty_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar NOT NULL,
  	"texto" varchar,
  	"agenda_titulo" varchar,
  	"agenda_url" varchar,
  	"agenda_altura" numeric DEFAULT 700,
  	"agenda_embed" varchar,
  	"botao_texto" varchar,
  	"botao_url" varchar,
  	"expor_contato_aos_scripts" boolean DEFAULT false,
  	"scripts_personalizados_head" varchar,
  	"scripts_personalizados_body_fim" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "cadastros_id" integer;
  ALTER TABLE "cadastros_texts" ADD CONSTRAINT "cadastros_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cadastros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ty_page_proximos_passos" ADD CONSTRAINT "ty_page_proximos_passos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ty_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ty_page_variacoes" ADD CONSTRAINT "ty_page_variacoes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ty_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "cadastros_nome_idx" ON "cadastros" USING btree ("nome");
  CREATE INDEX "cadastros_email_idx" ON "cadastros" USING btree ("email");
  CREATE INDEX "cadastros_tipo_idx" ON "cadastros" USING btree ("tipo");
  CREATE INDEX "cadastros_pagina_idx" ON "cadastros" USING btree ("pagina");
  CREATE INDEX "cadastros_envio_envio_status_idx" ON "cadastros" USING btree ("envio_status");
  CREATE UNIQUE INDEX "cadastros_token_idx" ON "cadastros" USING btree ("token");
  CREATE UNIQUE INDEX "cadastros_event_id_idx" ON "cadastros" USING btree ("event_id");
  CREATE INDEX "cadastros_updated_at_idx" ON "cadastros" USING btree ("updated_at");
  CREATE INDEX "cadastros_created_at_idx" ON "cadastros" USING btree ("created_at");
  CREATE INDEX "cadastros_texts_order_parent" ON "cadastros_texts" USING btree ("order","parent_id");
  CREATE INDEX "ty_page_proximos_passos_order_idx" ON "ty_page_proximos_passos" USING btree ("_order");
  CREATE INDEX "ty_page_proximos_passos_parent_id_idx" ON "ty_page_proximos_passos" USING btree ("_parent_id");
  CREATE INDEX "ty_page_variacoes_order_idx" ON "ty_page_variacoes" USING btree ("_order");
  CREATE INDEX "ty_page_variacoes_parent_id_idx" ON "ty_page_variacoes" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cadastros_fk" FOREIGN KEY ("cadastros_id") REFERENCES "public"."cadastros"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_cadastros_id_idx" ON "payload_locked_documents_rels" USING btree ("cadastros_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cadastros" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cadastros_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ty_page_proximos_passos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ty_page_variacoes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ty_page" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "cadastros" CASCADE;
  DROP TABLE "cadastros_texts" CASCADE;
  DROP TABLE "ty_page_proximos_passos" CASCADE;
  DROP TABLE "ty_page_variacoes" CASCADE;
  DROP TABLE "ty_page" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_cadastros_fk";
  
  DROP INDEX "payload_locked_documents_rels_cadastros_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "cadastros_id";
  DROP TYPE "public"."enum_cadastros_tipo";
  DROP TYPE "public"."enum_cadastros_envio_status";`)
}
