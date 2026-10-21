import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_paginas_blocks_hero_fluxo_fluxo_etapas_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_paginas_blocks_cartoes_cartoes_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_paginas_blocks_cartoes_colunas" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_paginas_blocks_destaque_itens_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_paginas_blocks_checklist_cartao_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__paginas_v_blocks_hero_fluxo_fluxo_etapas_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__paginas_v_blocks_cartoes_cartoes_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__paginas_v_blocks_cartoes_colunas" AS ENUM('2', '3');
  CREATE TYPE "public"."enum__paginas_v_blocks_destaque_itens_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__paginas_v_blocks_checklist_cartao_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TYPE "public"."enum_paginas_blocks_hero_celular_icone" ADD VALUE 'Layers' BEFORE 'Home';
  ALTER TYPE "public"."enum_paginas_blocks_hero_celular_icone" ADD VALUE 'Workflow' BEFORE 'Wrench';
  ALTER TYPE "public"."enum_paginas_blocks_hero_celular_icone_decisor" ADD VALUE 'Layers' BEFORE 'Home';
  ALTER TYPE "public"."enum_paginas_blocks_hero_celular_icone_decisor" ADD VALUE 'Workflow' BEFORE 'Wrench';
  ALTER TYPE "public"."enum_paginas_blocks_faixa_numeros_itens_icone" ADD VALUE 'Layers' BEFORE 'Home';
  ALTER TYPE "public"."enum_paginas_blocks_faixa_numeros_itens_icone" ADD VALUE 'Workflow' BEFORE 'Wrench';
  ALTER TYPE "public"."enum_paginas_blocks_modulos_itens_icone" ADD VALUE 'Layers' BEFORE 'Home';
  ALTER TYPE "public"."enum_paginas_blocks_modulos_itens_icone" ADD VALUE 'Workflow' BEFORE 'Wrench';
  ALTER TYPE "public"."enum_paginas_blocks_cartoes_segmento_cartoes_icone" ADD VALUE 'Layers' BEFORE 'Home';
  ALTER TYPE "public"."enum_paginas_blocks_cartoes_segmento_cartoes_icone" ADD VALUE 'Workflow' BEFORE 'Wrench';
  ALTER TYPE "public"."enum__paginas_v_blocks_hero_celular_icone" ADD VALUE 'Layers' BEFORE 'Home';
  ALTER TYPE "public"."enum__paginas_v_blocks_hero_celular_icone" ADD VALUE 'Workflow' BEFORE 'Wrench';
  ALTER TYPE "public"."enum__paginas_v_blocks_hero_celular_icone_decisor" ADD VALUE 'Layers' BEFORE 'Home';
  ALTER TYPE "public"."enum__paginas_v_blocks_hero_celular_icone_decisor" ADD VALUE 'Workflow' BEFORE 'Wrench';
  ALTER TYPE "public"."enum__paginas_v_blocks_faixa_numeros_itens_icone" ADD VALUE 'Layers' BEFORE 'Home';
  ALTER TYPE "public"."enum__paginas_v_blocks_faixa_numeros_itens_icone" ADD VALUE 'Workflow' BEFORE 'Wrench';
  ALTER TYPE "public"."enum__paginas_v_blocks_modulos_itens_icone" ADD VALUE 'Layers' BEFORE 'Home';
  ALTER TYPE "public"."enum__paginas_v_blocks_modulos_itens_icone" ADD VALUE 'Workflow' BEFORE 'Wrench';
  ALTER TYPE "public"."enum__paginas_v_blocks_cartoes_segmento_cartoes_icone" ADD VALUE 'Layers' BEFORE 'Home';
  ALTER TYPE "public"."enum__paginas_v_blocks_cartoes_segmento_cartoes_icone" ADD VALUE 'Workflow' BEFORE 'Wrench';
  CREATE TABLE "paginas_blocks_hero_fluxo_fluxo_etapas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icone" "enum_paginas_blocks_hero_fluxo_fluxo_etapas_icone",
  	"titulo" varchar,
  	"texto" varchar
  );
  
  CREATE TABLE "paginas_blocks_hero_fluxo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"titulo_destaque" varchar,
  	"texto" varchar,
  	"texto_secundario" varchar,
  	"botao_principal_texto" varchar,
  	"botao_principal_url" varchar DEFAULT '#cadastro',
  	"botao_secundario_texto" varchar,
  	"botao_secundario_url" varchar DEFAULT '#como-funciona',
  	"nota" varchar,
  	"fluxo_etiqueta" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "paginas_blocks_cartoes_cartoes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icone" "enum_paginas_blocks_cartoes_cartoes_icone",
  	"numero" varchar,
  	"titulo" varchar,
  	"texto" varchar
  );
  
  CREATE TABLE "paginas_blocks_cartoes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"colunas" "enum_paginas_blocks_cartoes_colunas" DEFAULT '2',
  	"ancora" varchar,
  	"destaque" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "paginas_blocks_destaque_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icone" "enum_paginas_blocks_destaque_itens_icone",
  	"titulo" varchar,
  	"texto" varchar
  );
  
  CREATE TABLE "paginas_blocks_destaque" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"ancora" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "paginas_blocks_checklist_cartao_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar
  );
  
  CREATE TABLE "paginas_blocks_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"cartao_icone" "enum_paginas_blocks_checklist_cartao_icone",
  	"cartao_titulo" varchar,
  	"ancora" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_hero_fluxo_fluxo_etapas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icone" "enum__paginas_v_blocks_hero_fluxo_fluxo_etapas_icone",
  	"titulo" varchar,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_hero_fluxo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"titulo_destaque" varchar,
  	"texto" varchar,
  	"texto_secundario" varchar,
  	"botao_principal_texto" varchar,
  	"botao_principal_url" varchar DEFAULT '#cadastro',
  	"botao_secundario_texto" varchar,
  	"botao_secundario_url" varchar DEFAULT '#como-funciona',
  	"nota" varchar,
  	"fluxo_etiqueta" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_cartoes_cartoes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icone" "enum__paginas_v_blocks_cartoes_cartoes_icone",
  	"numero" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_cartoes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"colunas" "enum__paginas_v_blocks_cartoes_colunas" DEFAULT '2',
  	"ancora" varchar,
  	"destaque" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_destaque_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icone" "enum__paginas_v_blocks_destaque_itens_icone",
  	"titulo" varchar,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_destaque" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"ancora" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_checklist_cartao_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"cartao_icone" "enum__paginas_v_blocks_checklist_cartao_icone",
  	"cartao_titulo" varchar,
  	"ancora" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "paginas_blocks_simulador" ADD COLUMN "permitir_escolher_plano" boolean DEFAULT false;
  ALTER TABLE "paginas_blocks_simulador" ADD COLUMN "botao_texto" varchar;
  ALTER TABLE "paginas_blocks_simulador" ADD COLUMN "botao_url" varchar DEFAULT '#cadastro';
  ALTER TABLE "_paginas_v_blocks_simulador" ADD COLUMN "permitir_escolher_plano" boolean DEFAULT false;
  ALTER TABLE "_paginas_v_blocks_simulador" ADD COLUMN "botao_texto" varchar;
  ALTER TABLE "_paginas_v_blocks_simulador" ADD COLUMN "botao_url" varchar DEFAULT '#cadastro';
  ALTER TABLE "paginas_blocks_hero_fluxo_fluxo_etapas" ADD CONSTRAINT "paginas_blocks_hero_fluxo_fluxo_etapas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas_blocks_hero_fluxo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_hero_fluxo" ADD CONSTRAINT "paginas_blocks_hero_fluxo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_cartoes_cartoes" ADD CONSTRAINT "paginas_blocks_cartoes_cartoes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas_blocks_cartoes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_cartoes" ADD CONSTRAINT "paginas_blocks_cartoes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_destaque_itens" ADD CONSTRAINT "paginas_blocks_destaque_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas_blocks_destaque"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_destaque" ADD CONSTRAINT "paginas_blocks_destaque_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_checklist_cartao_itens" ADD CONSTRAINT "paginas_blocks_checklist_cartao_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas_blocks_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_checklist" ADD CONSTRAINT "paginas_blocks_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_hero_fluxo_fluxo_etapas" ADD CONSTRAINT "_paginas_v_blocks_hero_fluxo_fluxo_etapas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v_blocks_hero_fluxo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_hero_fluxo" ADD CONSTRAINT "_paginas_v_blocks_hero_fluxo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_cartoes_cartoes" ADD CONSTRAINT "_paginas_v_blocks_cartoes_cartoes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v_blocks_cartoes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_cartoes" ADD CONSTRAINT "_paginas_v_blocks_cartoes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_destaque_itens" ADD CONSTRAINT "_paginas_v_blocks_destaque_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v_blocks_destaque"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_destaque" ADD CONSTRAINT "_paginas_v_blocks_destaque_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_checklist_cartao_itens" ADD CONSTRAINT "_paginas_v_blocks_checklist_cartao_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v_blocks_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_checklist" ADD CONSTRAINT "_paginas_v_blocks_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "paginas_blocks_hero_fluxo_fluxo_etapas_order_idx" ON "paginas_blocks_hero_fluxo_fluxo_etapas" USING btree ("_order");
  CREATE INDEX "paginas_blocks_hero_fluxo_fluxo_etapas_parent_id_idx" ON "paginas_blocks_hero_fluxo_fluxo_etapas" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_hero_fluxo_order_idx" ON "paginas_blocks_hero_fluxo" USING btree ("_order");
  CREATE INDEX "paginas_blocks_hero_fluxo_parent_id_idx" ON "paginas_blocks_hero_fluxo" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_hero_fluxo_path_idx" ON "paginas_blocks_hero_fluxo" USING btree ("_path");
  CREATE INDEX "paginas_blocks_cartoes_cartoes_order_idx" ON "paginas_blocks_cartoes_cartoes" USING btree ("_order");
  CREATE INDEX "paginas_blocks_cartoes_cartoes_parent_id_idx" ON "paginas_blocks_cartoes_cartoes" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_cartoes_order_idx" ON "paginas_blocks_cartoes" USING btree ("_order");
  CREATE INDEX "paginas_blocks_cartoes_parent_id_idx" ON "paginas_blocks_cartoes" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_cartoes_path_idx" ON "paginas_blocks_cartoes" USING btree ("_path");
  CREATE INDEX "paginas_blocks_destaque_itens_order_idx" ON "paginas_blocks_destaque_itens" USING btree ("_order");
  CREATE INDEX "paginas_blocks_destaque_itens_parent_id_idx" ON "paginas_blocks_destaque_itens" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_destaque_order_idx" ON "paginas_blocks_destaque" USING btree ("_order");
  CREATE INDEX "paginas_blocks_destaque_parent_id_idx" ON "paginas_blocks_destaque" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_destaque_path_idx" ON "paginas_blocks_destaque" USING btree ("_path");
  CREATE INDEX "paginas_blocks_checklist_cartao_itens_order_idx" ON "paginas_blocks_checklist_cartao_itens" USING btree ("_order");
  CREATE INDEX "paginas_blocks_checklist_cartao_itens_parent_id_idx" ON "paginas_blocks_checklist_cartao_itens" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_checklist_order_idx" ON "paginas_blocks_checklist" USING btree ("_order");
  CREATE INDEX "paginas_blocks_checklist_parent_id_idx" ON "paginas_blocks_checklist" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_checklist_path_idx" ON "paginas_blocks_checklist" USING btree ("_path");
  CREATE INDEX "_paginas_v_blocks_hero_fluxo_fluxo_etapas_order_idx" ON "_paginas_v_blocks_hero_fluxo_fluxo_etapas" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_hero_fluxo_fluxo_etapas_parent_id_idx" ON "_paginas_v_blocks_hero_fluxo_fluxo_etapas" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_hero_fluxo_order_idx" ON "_paginas_v_blocks_hero_fluxo" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_hero_fluxo_parent_id_idx" ON "_paginas_v_blocks_hero_fluxo" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_hero_fluxo_path_idx" ON "_paginas_v_blocks_hero_fluxo" USING btree ("_path");
  CREATE INDEX "_paginas_v_blocks_cartoes_cartoes_order_idx" ON "_paginas_v_blocks_cartoes_cartoes" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_cartoes_cartoes_parent_id_idx" ON "_paginas_v_blocks_cartoes_cartoes" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_cartoes_order_idx" ON "_paginas_v_blocks_cartoes" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_cartoes_parent_id_idx" ON "_paginas_v_blocks_cartoes" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_cartoes_path_idx" ON "_paginas_v_blocks_cartoes" USING btree ("_path");
  CREATE INDEX "_paginas_v_blocks_destaque_itens_order_idx" ON "_paginas_v_blocks_destaque_itens" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_destaque_itens_parent_id_idx" ON "_paginas_v_blocks_destaque_itens" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_destaque_order_idx" ON "_paginas_v_blocks_destaque" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_destaque_parent_id_idx" ON "_paginas_v_blocks_destaque" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_destaque_path_idx" ON "_paginas_v_blocks_destaque" USING btree ("_path");
  CREATE INDEX "_paginas_v_blocks_checklist_cartao_itens_order_idx" ON "_paginas_v_blocks_checklist_cartao_itens" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_checklist_cartao_itens_parent_id_idx" ON "_paginas_v_blocks_checklist_cartao_itens" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_checklist_order_idx" ON "_paginas_v_blocks_checklist" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_checklist_parent_id_idx" ON "_paginas_v_blocks_checklist" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_checklist_path_idx" ON "_paginas_v_blocks_checklist" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "paginas_blocks_hero_fluxo_fluxo_etapas" CASCADE;
  DROP TABLE "paginas_blocks_hero_fluxo" CASCADE;
  DROP TABLE "paginas_blocks_cartoes_cartoes" CASCADE;
  DROP TABLE "paginas_blocks_cartoes" CASCADE;
  DROP TABLE "paginas_blocks_destaque_itens" CASCADE;
  DROP TABLE "paginas_blocks_destaque" CASCADE;
  DROP TABLE "paginas_blocks_checklist_cartao_itens" CASCADE;
  DROP TABLE "paginas_blocks_checklist" CASCADE;
  DROP TABLE "_paginas_v_blocks_hero_fluxo_fluxo_etapas" CASCADE;
  DROP TABLE "_paginas_v_blocks_hero_fluxo" CASCADE;
  DROP TABLE "_paginas_v_blocks_cartoes_cartoes" CASCADE;
  DROP TABLE "_paginas_v_blocks_cartoes" CASCADE;
  DROP TABLE "_paginas_v_blocks_destaque_itens" CASCADE;
  DROP TABLE "_paginas_v_blocks_destaque" CASCADE;
  DROP TABLE "_paginas_v_blocks_checklist_cartao_itens" CASCADE;
  DROP TABLE "_paginas_v_blocks_checklist" CASCADE;
  ALTER TABLE "paginas_blocks_hero_celular" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_hero_celular_icone";
  CREATE TYPE "public"."enum_paginas_blocks_hero_celular_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_hero_celular" ALTER COLUMN "icone" SET DATA TYPE "public"."enum_paginas_blocks_hero_celular_icone" USING "icone"::"public"."enum_paginas_blocks_hero_celular_icone";
  ALTER TABLE "paginas_blocks_hero_celular" ALTER COLUMN "icone_decisor" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_hero_celular_icone_decisor";
  CREATE TYPE "public"."enum_paginas_blocks_hero_celular_icone_decisor" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_hero_celular" ALTER COLUMN "icone_decisor" SET DATA TYPE "public"."enum_paginas_blocks_hero_celular_icone_decisor" USING "icone_decisor"::"public"."enum_paginas_blocks_hero_celular_icone_decisor";
  ALTER TABLE "paginas_blocks_faixa_numeros_itens" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_faixa_numeros_itens_icone";
  CREATE TYPE "public"."enum_paginas_blocks_faixa_numeros_itens_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_faixa_numeros_itens" ALTER COLUMN "icone" SET DATA TYPE "public"."enum_paginas_blocks_faixa_numeros_itens_icone" USING "icone"::"public"."enum_paginas_blocks_faixa_numeros_itens_icone";
  ALTER TABLE "paginas_blocks_modulos_itens" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_modulos_itens_icone";
  CREATE TYPE "public"."enum_paginas_blocks_modulos_itens_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_modulos_itens" ALTER COLUMN "icone" SET DATA TYPE "public"."enum_paginas_blocks_modulos_itens_icone" USING "icone"::"public"."enum_paginas_blocks_modulos_itens_icone";
  ALTER TABLE "paginas_blocks_cartoes_segmento_cartoes" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_cartoes_segmento_cartoes_icone";
  CREATE TYPE "public"."enum_paginas_blocks_cartoes_segmento_cartoes_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_cartoes_segmento_cartoes" ALTER COLUMN "icone" SET DATA TYPE "public"."enum_paginas_blocks_cartoes_segmento_cartoes_icone" USING "icone"::"public"."enum_paginas_blocks_cartoes_segmento_cartoes_icone";
  ALTER TABLE "_paginas_v_blocks_hero_celular" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_hero_celular_icone";
  CREATE TYPE "public"."enum__paginas_v_blocks_hero_celular_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_hero_celular" ALTER COLUMN "icone" SET DATA TYPE "public"."enum__paginas_v_blocks_hero_celular_icone" USING "icone"::"public"."enum__paginas_v_blocks_hero_celular_icone";
  ALTER TABLE "_paginas_v_blocks_hero_celular" ALTER COLUMN "icone_decisor" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_hero_celular_icone_decisor";
  CREATE TYPE "public"."enum__paginas_v_blocks_hero_celular_icone_decisor" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_hero_celular" ALTER COLUMN "icone_decisor" SET DATA TYPE "public"."enum__paginas_v_blocks_hero_celular_icone_decisor" USING "icone_decisor"::"public"."enum__paginas_v_blocks_hero_celular_icone_decisor";
  ALTER TABLE "_paginas_v_blocks_faixa_numeros_itens" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_faixa_numeros_itens_icone";
  CREATE TYPE "public"."enum__paginas_v_blocks_faixa_numeros_itens_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_faixa_numeros_itens" ALTER COLUMN "icone" SET DATA TYPE "public"."enum__paginas_v_blocks_faixa_numeros_itens_icone" USING "icone"::"public"."enum__paginas_v_blocks_faixa_numeros_itens_icone";
  ALTER TABLE "_paginas_v_blocks_modulos_itens" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_modulos_itens_icone";
  CREATE TYPE "public"."enum__paginas_v_blocks_modulos_itens_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_modulos_itens" ALTER COLUMN "icone" SET DATA TYPE "public"."enum__paginas_v_blocks_modulos_itens_icone" USING "icone"::"public"."enum__paginas_v_blocks_modulos_itens_icone";
  ALTER TABLE "_paginas_v_blocks_cartoes_segmento_cartoes" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_cartoes_segmento_cartoes_icone";
  CREATE TYPE "public"."enum__paginas_v_blocks_cartoes_segmento_cartoes_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_cartoes_segmento_cartoes" ALTER COLUMN "icone" SET DATA TYPE "public"."enum__paginas_v_blocks_cartoes_segmento_cartoes_icone" USING "icone"::"public"."enum__paginas_v_blocks_cartoes_segmento_cartoes_icone";
  ALTER TABLE "paginas_blocks_simulador" DROP COLUMN "permitir_escolher_plano";
  ALTER TABLE "paginas_blocks_simulador" DROP COLUMN "botao_texto";
  ALTER TABLE "paginas_blocks_simulador" DROP COLUMN "botao_url";
  ALTER TABLE "_paginas_v_blocks_simulador" DROP COLUMN "permitir_escolher_plano";
  ALTER TABLE "_paginas_v_blocks_simulador" DROP COLUMN "botao_texto";
  ALTER TABLE "_paginas_v_blocks_simulador" DROP COLUMN "botao_url";
  DROP TYPE "public"."enum_paginas_blocks_hero_fluxo_fluxo_etapas_icone";
  DROP TYPE "public"."enum_paginas_blocks_cartoes_cartoes_icone";
  DROP TYPE "public"."enum_paginas_blocks_cartoes_colunas";
  DROP TYPE "public"."enum_paginas_blocks_destaque_itens_icone";
  DROP TYPE "public"."enum_paginas_blocks_checklist_cartao_icone";
  DROP TYPE "public"."enum__paginas_v_blocks_hero_fluxo_fluxo_etapas_icone";
  DROP TYPE "public"."enum__paginas_v_blocks_cartoes_cartoes_icone";
  DROP TYPE "public"."enum__paginas_v_blocks_cartoes_colunas";
  DROP TYPE "public"."enum__paginas_v_blocks_destaque_itens_icone";
  DROP TYPE "public"."enum__paginas_v_blocks_checklist_cartao_icone";`)
}
