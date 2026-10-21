import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_paginas_blocks_hero_celular_celular_mensagens_de" AS ENUM('negocio', 'cliente');
  CREATE TYPE "public"."enum_paginas_blocks_hero_celular_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_paginas_blocks_hero_celular_icone_decisor" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_paginas_blocks_faixa_numeros_itens_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_paginas_blocks_faixa_numeros_itens_tom" AS ENUM('cyan', 'mint', 'violet');
  CREATE TYPE "public"."enum_paginas_blocks_modulos_itens_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_paginas_blocks_cartoes_segmento_cartoes_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_paginas_blocks_simulador_plano" AS ENUM('Essencial', 'Crescimento', 'Performance');
  CREATE TYPE "public"."enum_perguntas_tipo" AS ENUM('unica', 'multipla');
  CREATE TYPE "public"."enum_paginas_tipo" AS ENUM('nicho', 'outra');
  CREATE TYPE "public"."enum_paginas_visual" AS ENUM('ds', 'original');
  CREATE TYPE "public"."enum_paginas_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__paginas_v_blocks_hero_celular_celular_mensagens_de" AS ENUM('negocio', 'cliente');
  CREATE TYPE "public"."enum__paginas_v_blocks_hero_celular_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__paginas_v_blocks_hero_celular_icone_decisor" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__paginas_v_blocks_faixa_numeros_itens_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__paginas_v_blocks_faixa_numeros_itens_tom" AS ENUM('cyan', 'mint', 'violet');
  CREATE TYPE "public"."enum__paginas_v_blocks_modulos_itens_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__paginas_v_blocks_cartoes_segmento_cartoes_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__paginas_v_blocks_simulador_plano" AS ENUM('Essencial', 'Crescimento', 'Performance');
  CREATE TYPE "public"."enum__perguntas_v_tipo" AS ENUM('unica', 'multipla');
  CREATE TYPE "public"."enum__paginas_v_version_tipo" AS ENUM('nicho', 'outra');
  CREATE TYPE "public"."enum__paginas_v_version_visual" AS ENUM('ds', 'original');
  CREATE TYPE "public"."enum__paginas_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_planos_planos_chave" AS ENUM('Essencial', 'Crescimento', 'Performance');
  CREATE TABLE "paginas_blocks_hero_celular_celular_mensagens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"de" "enum_paginas_blocks_hero_celular_celular_mensagens_de" DEFAULT 'negocio',
  	"hora" varchar,
  	"texto" varchar
  );
  
  CREATE TABLE "paginas_blocks_hero_celular" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icone" "enum_paginas_blocks_hero_celular_icone",
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"icone_decisor" "enum_paginas_blocks_hero_celular_icone_decisor",
  	"linha_decisor" varchar,
  	"botao_principal_texto" varchar,
  	"botao_principal_url" varchar DEFAULT '#cadastro',
  	"botao_secundario_texto" varchar,
  	"botao_secundario_url" varchar DEFAULT '#solucoes',
  	"celular_titulo" varchar,
  	"celular_subtitulo" varchar DEFAULT 'online · IA Bu1lder',
  	"block_name" varchar
  );
  
  CREATE TABLE "paginas_blocks_faixa_numeros_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icone" "enum_paginas_blocks_faixa_numeros_itens_icone",
  	"tom" "enum_paginas_blocks_faixa_numeros_itens_tom" DEFAULT 'cyan',
  	"valor" varchar,
  	"rotulo" varchar
  );
  
  CREATE TABLE "paginas_blocks_faixa_numeros" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "paginas_blocks_linha_do_tempo_passos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"dia" varchar,
  	"titulo" varchar,
  	"descricao" varchar
  );
  
  CREATE TABLE "paginas_blocks_linha_do_tempo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"subtitulo" varchar,
  	"ancora" varchar,
  	"destaque" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "paginas_blocks_modulos_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icone" "enum_paginas_blocks_modulos_itens_icone",
  	"nome" varchar,
  	"beneficio" varchar,
  	"exemplo" varchar
  );
  
  CREATE TABLE "paginas_blocks_modulos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"subtitulo" varchar,
  	"texto_entrega" varchar DEFAULT 'Entrega em poucos dias · WhatsApp + IA',
  	"ancora" varchar DEFAULT 'solucoes',
  	"destaque" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "paginas_blocks_cartoes_segmento_cartoes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icone" "enum_paginas_blocks_cartoes_segmento_cartoes_icone",
  	"titulo" varchar,
  	"texto" varchar
  );
  
  CREATE TABLE "paginas_blocks_cartoes_segmento" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"subtitulo" varchar,
  	"ancora" varchar,
  	"destaque" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "paginas_blocks_texto_lista_lista" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "paginas_blocks_texto_lista" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar,
  	"texto" varchar,
  	"nota" varchar,
  	"ancora" varchar,
  	"destaque" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "paginas_blocks_simulador" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"subtitulo" varchar,
  	"plano" "enum_paginas_blocks_simulador_plano" DEFAULT 'Crescimento',
  	"rotulo_valor" varchar DEFAULT 'Sua renda mensal',
  	"min_clientes" numeric DEFAULT 1,
  	"max_clientes" numeric DEFAULT 50,
  	"clientes_inicial" numeric DEFAULT 10,
  	"mostrar_anual" boolean DEFAULT true,
  	"mostrar_portfolio" boolean DEFAULT true,
  	"aviso" varchar,
  	"ancora" varchar,
  	"destaque" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "paginas_blocks_notas_facilidade" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"subtitulo" varchar,
  	"achar" numeric,
  	"explicar" numeric,
  	"roi" numeric,
  	"fechar" numeric,
  	"ancora" varchar,
  	"destaque" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "paginas_blocks_antes_depois_antes_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rotulo" varchar,
  	"valor" varchar
  );
  
  CREATE TABLE "paginas_blocks_antes_depois_depois_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rotulo" varchar,
  	"valor" varchar
  );
  
  CREATE TABLE "paginas_blocks_antes_depois" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"subtitulo" varchar,
  	"antes_titulo" varchar,
  	"depois_titulo" varchar,
  	"delta" varchar,
  	"citacao" varchar,
  	"autor" varchar,
  	"ancora" varchar,
  	"destaque" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "paginas_blocks_argumento" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar,
  	"assinatura" varchar,
  	"ancora" varchar,
  	"destaque" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "paginas_blocks_faq_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pergunta" varchar,
  	"resposta" varchar
  );
  
  CREATE TABLE "paginas_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar DEFAULT 'FAQ',
  	"titulo" varchar DEFAULT 'Perguntas frequentes',
  	"incluir_perguntas_plataforma" boolean DEFAULT true,
  	"ancora" varchar,
  	"destaque" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "paginas_blocks_chamada_cadastro_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar
  );
  
  CREATE TABLE "perguntas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rotulo" varchar,
  	"nome" varchar,
  	"tipo" "enum_perguntas_tipo" DEFAULT 'unica',
  	"obrigatoria" boolean DEFAULT false
  );
  
  CREATE TABLE "paginas_blocks_chamada_cadastro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"depoimento_texto" varchar,
  	"depoimento_autor" varchar,
  	"formulario_texto_consentimento" varchar,
  	"formulario_botao_secundario_texto" varchar,
  	"formulario_botao_secundario_url" varchar,
  	"formulario_form_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "paginas" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar,
  	"slug" varchar,
  	"tipo" "enum_paginas_tipo" DEFAULT 'nicho',
  	"navegacao_rotulo" varchar,
  	"navegacao_ordem" numeric DEFAULT 100,
  	"visual" "enum_paginas_visual" DEFAULT 'ds',
  	"tema_claro_padrao" boolean DEFAULT true,
  	"cabecalho_mostrar_navegacao_segmentos" boolean DEFAULT false,
  	"cabecalho_mostrar_voltar" boolean DEFAULT false,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"scripts_personalizados_head" varchar,
  	"scripts_personalizados_body_fim" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_paginas_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "paginas_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_hero_celular_celular_mensagens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"de" "enum__paginas_v_blocks_hero_celular_celular_mensagens_de" DEFAULT 'negocio',
  	"hora" varchar,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_hero_celular" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icone" "enum__paginas_v_blocks_hero_celular_icone",
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"icone_decisor" "enum__paginas_v_blocks_hero_celular_icone_decisor",
  	"linha_decisor" varchar,
  	"botao_principal_texto" varchar,
  	"botao_principal_url" varchar DEFAULT '#cadastro',
  	"botao_secundario_texto" varchar,
  	"botao_secundario_url" varchar DEFAULT '#solucoes',
  	"celular_titulo" varchar,
  	"celular_subtitulo" varchar DEFAULT 'online · IA Bu1lder',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_faixa_numeros_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icone" "enum__paginas_v_blocks_faixa_numeros_itens_icone",
  	"tom" "enum__paginas_v_blocks_faixa_numeros_itens_tom" DEFAULT 'cyan',
  	"valor" varchar,
  	"rotulo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_faixa_numeros" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_linha_do_tempo_passos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"dia" varchar,
  	"titulo" varchar,
  	"descricao" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_linha_do_tempo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"subtitulo" varchar,
  	"ancora" varchar,
  	"destaque" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_modulos_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icone" "enum__paginas_v_blocks_modulos_itens_icone",
  	"nome" varchar,
  	"beneficio" varchar,
  	"exemplo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_modulos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"subtitulo" varchar,
  	"texto_entrega" varchar DEFAULT 'Entrega em poucos dias · WhatsApp + IA',
  	"ancora" varchar DEFAULT 'solucoes',
  	"destaque" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_cartoes_segmento_cartoes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icone" "enum__paginas_v_blocks_cartoes_segmento_cartoes_icone",
  	"titulo" varchar,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_cartoes_segmento" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"subtitulo" varchar,
  	"ancora" varchar,
  	"destaque" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_texto_lista_lista" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_texto_lista" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar,
  	"texto" varchar,
  	"nota" varchar,
  	"ancora" varchar,
  	"destaque" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_simulador" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"subtitulo" varchar,
  	"plano" "enum__paginas_v_blocks_simulador_plano" DEFAULT 'Crescimento',
  	"rotulo_valor" varchar DEFAULT 'Sua renda mensal',
  	"min_clientes" numeric DEFAULT 1,
  	"max_clientes" numeric DEFAULT 50,
  	"clientes_inicial" numeric DEFAULT 10,
  	"mostrar_anual" boolean DEFAULT true,
  	"mostrar_portfolio" boolean DEFAULT true,
  	"aviso" varchar,
  	"ancora" varchar,
  	"destaque" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_notas_facilidade" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"subtitulo" varchar,
  	"achar" numeric,
  	"explicar" numeric,
  	"roi" numeric,
  	"fechar" numeric,
  	"ancora" varchar,
  	"destaque" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_antes_depois_antes_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rotulo" varchar,
  	"valor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_antes_depois_depois_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rotulo" varchar,
  	"valor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_antes_depois" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"subtitulo" varchar,
  	"antes_titulo" varchar,
  	"depois_titulo" varchar,
  	"delta" varchar,
  	"citacao" varchar,
  	"autor" varchar,
  	"ancora" varchar,
  	"destaque" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_argumento" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"texto" varchar,
  	"assinatura" varchar,
  	"ancora" varchar,
  	"destaque" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_faq_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"pergunta" varchar,
  	"resposta" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar DEFAULT 'FAQ',
  	"titulo" varchar DEFAULT 'Perguntas frequentes',
  	"incluir_perguntas_plataforma" boolean DEFAULT true,
  	"ancora" varchar,
  	"destaque" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_chamada_cadastro_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_perguntas_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rotulo" varchar,
  	"nome" varchar,
  	"tipo" "enum__perguntas_v_tipo" DEFAULT 'unica',
  	"obrigatoria" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_paginas_v_blocks_chamada_cadastro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"depoimento_texto" varchar,
  	"depoimento_autor" varchar,
  	"formulario_texto_consentimento" varchar,
  	"formulario_botao_secundario_texto" varchar,
  	"formulario_botao_secundario_url" varchar,
  	"formulario_form_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_paginas_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_titulo" varchar,
  	"version_slug" varchar,
  	"version_tipo" "enum__paginas_v_version_tipo" DEFAULT 'nicho',
  	"version_navegacao_rotulo" varchar,
  	"version_navegacao_ordem" numeric DEFAULT 100,
  	"version_visual" "enum__paginas_v_version_visual" DEFAULT 'ds',
  	"version_tema_claro_padrao" boolean DEFAULT true,
  	"version_cabecalho_mostrar_navegacao_segmentos" boolean DEFAULT false,
  	"version_cabecalho_mostrar_voltar" boolean DEFAULT false,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_scripts_personalizados_head" varchar,
  	"version_scripts_personalizados_body_fim" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__paginas_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_paginas_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "planos_planos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"chave" "enum_planos_planos_chave" NOT NULL,
  	"preco" numeric NOT NULL,
  	"parte_bu1lder" numeric NOT NULL,
  	"plataforma" numeric NOT NULL,
  	"inclui" varchar,
  	"destaque" boolean DEFAULT false
  );
  
  CREATE TABLE "planos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"mostrar_parcela_plataforma" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "faq_plataforma_perguntas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pergunta" varchar NOT NULL,
  	"resposta" varchar NOT NULL
  );
  
  CREATE TABLE "faq_plataforma" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "formulario" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"texto_consentimento" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "formulario_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "rodape_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rotulo" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "rodape" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo_links" varchar DEFAULT 'Legal',
  	"texto_direitos" varchar DEFAULT 'MIIND. Todos os direitos reservados.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "paginas_id" integer;
  ALTER TABLE "paginas_blocks_hero_celular_celular_mensagens" ADD CONSTRAINT "paginas_blocks_hero_celular_celular_mensagens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas_blocks_hero_celular"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_hero_celular" ADD CONSTRAINT "paginas_blocks_hero_celular_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_faixa_numeros_itens" ADD CONSTRAINT "paginas_blocks_faixa_numeros_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas_blocks_faixa_numeros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_faixa_numeros" ADD CONSTRAINT "paginas_blocks_faixa_numeros_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_linha_do_tempo_passos" ADD CONSTRAINT "paginas_blocks_linha_do_tempo_passos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas_blocks_linha_do_tempo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_linha_do_tempo" ADD CONSTRAINT "paginas_blocks_linha_do_tempo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_modulos_itens" ADD CONSTRAINT "paginas_blocks_modulos_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas_blocks_modulos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_modulos" ADD CONSTRAINT "paginas_blocks_modulos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_cartoes_segmento_cartoes" ADD CONSTRAINT "paginas_blocks_cartoes_segmento_cartoes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas_blocks_cartoes_segmento"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_cartoes_segmento" ADD CONSTRAINT "paginas_blocks_cartoes_segmento_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_texto_lista_lista" ADD CONSTRAINT "paginas_blocks_texto_lista_lista_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas_blocks_texto_lista"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_texto_lista" ADD CONSTRAINT "paginas_blocks_texto_lista_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_simulador" ADD CONSTRAINT "paginas_blocks_simulador_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_notas_facilidade" ADD CONSTRAINT "paginas_blocks_notas_facilidade_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_antes_depois_antes_itens" ADD CONSTRAINT "paginas_blocks_antes_depois_antes_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas_blocks_antes_depois"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_antes_depois_depois_itens" ADD CONSTRAINT "paginas_blocks_antes_depois_depois_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas_blocks_antes_depois"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_antes_depois" ADD CONSTRAINT "paginas_blocks_antes_depois_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_argumento" ADD CONSTRAINT "paginas_blocks_argumento_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_faq_itens" ADD CONSTRAINT "paginas_blocks_faq_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_faq" ADD CONSTRAINT "paginas_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_chamada_cadastro_bullets" ADD CONSTRAINT "paginas_blocks_chamada_cadastro_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas_blocks_chamada_cadastro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "perguntas" ADD CONSTRAINT "perguntas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas_blocks_chamada_cadastro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas_blocks_chamada_cadastro" ADD CONSTRAINT "paginas_blocks_chamada_cadastro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paginas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "paginas" ADD CONSTRAINT "paginas_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "paginas_texts" ADD CONSTRAINT "paginas_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."paginas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_hero_celular_celular_mensagens" ADD CONSTRAINT "_paginas_v_blocks_hero_celular_celular_mensagens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v_blocks_hero_celular"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_hero_celular" ADD CONSTRAINT "_paginas_v_blocks_hero_celular_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_faixa_numeros_itens" ADD CONSTRAINT "_paginas_v_blocks_faixa_numeros_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v_blocks_faixa_numeros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_faixa_numeros" ADD CONSTRAINT "_paginas_v_blocks_faixa_numeros_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_linha_do_tempo_passos" ADD CONSTRAINT "_paginas_v_blocks_linha_do_tempo_passos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v_blocks_linha_do_tempo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_linha_do_tempo" ADD CONSTRAINT "_paginas_v_blocks_linha_do_tempo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_modulos_itens" ADD CONSTRAINT "_paginas_v_blocks_modulos_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v_blocks_modulos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_modulos" ADD CONSTRAINT "_paginas_v_blocks_modulos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_cartoes_segmento_cartoes" ADD CONSTRAINT "_paginas_v_blocks_cartoes_segmento_cartoes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v_blocks_cartoes_segmento"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_cartoes_segmento" ADD CONSTRAINT "_paginas_v_blocks_cartoes_segmento_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_texto_lista_lista" ADD CONSTRAINT "_paginas_v_blocks_texto_lista_lista_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v_blocks_texto_lista"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_texto_lista" ADD CONSTRAINT "_paginas_v_blocks_texto_lista_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_simulador" ADD CONSTRAINT "_paginas_v_blocks_simulador_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_notas_facilidade" ADD CONSTRAINT "_paginas_v_blocks_notas_facilidade_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_antes_depois_antes_itens" ADD CONSTRAINT "_paginas_v_blocks_antes_depois_antes_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v_blocks_antes_depois"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_antes_depois_depois_itens" ADD CONSTRAINT "_paginas_v_blocks_antes_depois_depois_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v_blocks_antes_depois"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_antes_depois" ADD CONSTRAINT "_paginas_v_blocks_antes_depois_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_argumento" ADD CONSTRAINT "_paginas_v_blocks_argumento_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_faq_itens" ADD CONSTRAINT "_paginas_v_blocks_faq_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_faq" ADD CONSTRAINT "_paginas_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_chamada_cadastro_bullets" ADD CONSTRAINT "_paginas_v_blocks_chamada_cadastro_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v_blocks_chamada_cadastro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_perguntas_v" ADD CONSTRAINT "_perguntas_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v_blocks_chamada_cadastro"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v_blocks_chamada_cadastro" ADD CONSTRAINT "_paginas_v_blocks_chamada_cadastro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paginas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_paginas_v" ADD CONSTRAINT "_paginas_v_parent_id_paginas_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."paginas"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_paginas_v" ADD CONSTRAINT "_paginas_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_paginas_v_texts" ADD CONSTRAINT "_paginas_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_paginas_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "planos_planos" ADD CONSTRAINT "planos_planos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."planos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_plataforma_perguntas" ADD CONSTRAINT "faq_plataforma_perguntas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_plataforma"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "formulario_texts" ADD CONSTRAINT "formulario_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."formulario"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rodape_links" ADD CONSTRAINT "rodape_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rodape"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "paginas_blocks_hero_celular_celular_mensagens_order_idx" ON "paginas_blocks_hero_celular_celular_mensagens" USING btree ("_order");
  CREATE INDEX "paginas_blocks_hero_celular_celular_mensagens_parent_id_idx" ON "paginas_blocks_hero_celular_celular_mensagens" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_hero_celular_order_idx" ON "paginas_blocks_hero_celular" USING btree ("_order");
  CREATE INDEX "paginas_blocks_hero_celular_parent_id_idx" ON "paginas_blocks_hero_celular" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_hero_celular_path_idx" ON "paginas_blocks_hero_celular" USING btree ("_path");
  CREATE INDEX "paginas_blocks_faixa_numeros_itens_order_idx" ON "paginas_blocks_faixa_numeros_itens" USING btree ("_order");
  CREATE INDEX "paginas_blocks_faixa_numeros_itens_parent_id_idx" ON "paginas_blocks_faixa_numeros_itens" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_faixa_numeros_order_idx" ON "paginas_blocks_faixa_numeros" USING btree ("_order");
  CREATE INDEX "paginas_blocks_faixa_numeros_parent_id_idx" ON "paginas_blocks_faixa_numeros" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_faixa_numeros_path_idx" ON "paginas_blocks_faixa_numeros" USING btree ("_path");
  CREATE INDEX "paginas_blocks_linha_do_tempo_passos_order_idx" ON "paginas_blocks_linha_do_tempo_passos" USING btree ("_order");
  CREATE INDEX "paginas_blocks_linha_do_tempo_passos_parent_id_idx" ON "paginas_blocks_linha_do_tempo_passos" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_linha_do_tempo_order_idx" ON "paginas_blocks_linha_do_tempo" USING btree ("_order");
  CREATE INDEX "paginas_blocks_linha_do_tempo_parent_id_idx" ON "paginas_blocks_linha_do_tempo" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_linha_do_tempo_path_idx" ON "paginas_blocks_linha_do_tempo" USING btree ("_path");
  CREATE INDEX "paginas_blocks_modulos_itens_order_idx" ON "paginas_blocks_modulos_itens" USING btree ("_order");
  CREATE INDEX "paginas_blocks_modulos_itens_parent_id_idx" ON "paginas_blocks_modulos_itens" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_modulos_order_idx" ON "paginas_blocks_modulos" USING btree ("_order");
  CREATE INDEX "paginas_blocks_modulos_parent_id_idx" ON "paginas_blocks_modulos" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_modulos_path_idx" ON "paginas_blocks_modulos" USING btree ("_path");
  CREATE INDEX "paginas_blocks_cartoes_segmento_cartoes_order_idx" ON "paginas_blocks_cartoes_segmento_cartoes" USING btree ("_order");
  CREATE INDEX "paginas_blocks_cartoes_segmento_cartoes_parent_id_idx" ON "paginas_blocks_cartoes_segmento_cartoes" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_cartoes_segmento_order_idx" ON "paginas_blocks_cartoes_segmento" USING btree ("_order");
  CREATE INDEX "paginas_blocks_cartoes_segmento_parent_id_idx" ON "paginas_blocks_cartoes_segmento" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_cartoes_segmento_path_idx" ON "paginas_blocks_cartoes_segmento" USING btree ("_path");
  CREATE INDEX "paginas_blocks_texto_lista_lista_order_idx" ON "paginas_blocks_texto_lista_lista" USING btree ("_order");
  CREATE INDEX "paginas_blocks_texto_lista_lista_parent_id_idx" ON "paginas_blocks_texto_lista_lista" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_texto_lista_order_idx" ON "paginas_blocks_texto_lista" USING btree ("_order");
  CREATE INDEX "paginas_blocks_texto_lista_parent_id_idx" ON "paginas_blocks_texto_lista" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_texto_lista_path_idx" ON "paginas_blocks_texto_lista" USING btree ("_path");
  CREATE INDEX "paginas_blocks_simulador_order_idx" ON "paginas_blocks_simulador" USING btree ("_order");
  CREATE INDEX "paginas_blocks_simulador_parent_id_idx" ON "paginas_blocks_simulador" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_simulador_path_idx" ON "paginas_blocks_simulador" USING btree ("_path");
  CREATE INDEX "paginas_blocks_notas_facilidade_order_idx" ON "paginas_blocks_notas_facilidade" USING btree ("_order");
  CREATE INDEX "paginas_blocks_notas_facilidade_parent_id_idx" ON "paginas_blocks_notas_facilidade" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_notas_facilidade_path_idx" ON "paginas_blocks_notas_facilidade" USING btree ("_path");
  CREATE INDEX "paginas_blocks_antes_depois_antes_itens_order_idx" ON "paginas_blocks_antes_depois_antes_itens" USING btree ("_order");
  CREATE INDEX "paginas_blocks_antes_depois_antes_itens_parent_id_idx" ON "paginas_blocks_antes_depois_antes_itens" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_antes_depois_depois_itens_order_idx" ON "paginas_blocks_antes_depois_depois_itens" USING btree ("_order");
  CREATE INDEX "paginas_blocks_antes_depois_depois_itens_parent_id_idx" ON "paginas_blocks_antes_depois_depois_itens" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_antes_depois_order_idx" ON "paginas_blocks_antes_depois" USING btree ("_order");
  CREATE INDEX "paginas_blocks_antes_depois_parent_id_idx" ON "paginas_blocks_antes_depois" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_antes_depois_path_idx" ON "paginas_blocks_antes_depois" USING btree ("_path");
  CREATE INDEX "paginas_blocks_argumento_order_idx" ON "paginas_blocks_argumento" USING btree ("_order");
  CREATE INDEX "paginas_blocks_argumento_parent_id_idx" ON "paginas_blocks_argumento" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_argumento_path_idx" ON "paginas_blocks_argumento" USING btree ("_path");
  CREATE INDEX "paginas_blocks_faq_itens_order_idx" ON "paginas_blocks_faq_itens" USING btree ("_order");
  CREATE INDEX "paginas_blocks_faq_itens_parent_id_idx" ON "paginas_blocks_faq_itens" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_faq_order_idx" ON "paginas_blocks_faq" USING btree ("_order");
  CREATE INDEX "paginas_blocks_faq_parent_id_idx" ON "paginas_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_faq_path_idx" ON "paginas_blocks_faq" USING btree ("_path");
  CREATE INDEX "paginas_blocks_chamada_cadastro_bullets_order_idx" ON "paginas_blocks_chamada_cadastro_bullets" USING btree ("_order");
  CREATE INDEX "paginas_blocks_chamada_cadastro_bullets_parent_id_idx" ON "paginas_blocks_chamada_cadastro_bullets" USING btree ("_parent_id");
  CREATE INDEX "perguntas_order_idx" ON "perguntas" USING btree ("_order");
  CREATE INDEX "perguntas_parent_id_idx" ON "perguntas" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_chamada_cadastro_order_idx" ON "paginas_blocks_chamada_cadastro" USING btree ("_order");
  CREATE INDEX "paginas_blocks_chamada_cadastro_parent_id_idx" ON "paginas_blocks_chamada_cadastro" USING btree ("_parent_id");
  CREATE INDEX "paginas_blocks_chamada_cadastro_path_idx" ON "paginas_blocks_chamada_cadastro" USING btree ("_path");
  CREATE UNIQUE INDEX "paginas_slug_idx" ON "paginas" USING btree ("slug");
  CREATE INDEX "paginas_seo_seo_og_image_idx" ON "paginas" USING btree ("seo_og_image_id");
  CREATE INDEX "paginas_updated_at_idx" ON "paginas" USING btree ("updated_at");
  CREATE INDEX "paginas_created_at_idx" ON "paginas" USING btree ("created_at");
  CREATE INDEX "paginas__status_idx" ON "paginas" USING btree ("_status");
  CREATE INDEX "paginas_texts_order_parent" ON "paginas_texts" USING btree ("order","parent_id");
  CREATE INDEX "_paginas_v_blocks_hero_celular_celular_mensagens_order_idx" ON "_paginas_v_blocks_hero_celular_celular_mensagens" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_hero_celular_celular_mensagens_parent_id_idx" ON "_paginas_v_blocks_hero_celular_celular_mensagens" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_hero_celular_order_idx" ON "_paginas_v_blocks_hero_celular" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_hero_celular_parent_id_idx" ON "_paginas_v_blocks_hero_celular" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_hero_celular_path_idx" ON "_paginas_v_blocks_hero_celular" USING btree ("_path");
  CREATE INDEX "_paginas_v_blocks_faixa_numeros_itens_order_idx" ON "_paginas_v_blocks_faixa_numeros_itens" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_faixa_numeros_itens_parent_id_idx" ON "_paginas_v_blocks_faixa_numeros_itens" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_faixa_numeros_order_idx" ON "_paginas_v_blocks_faixa_numeros" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_faixa_numeros_parent_id_idx" ON "_paginas_v_blocks_faixa_numeros" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_faixa_numeros_path_idx" ON "_paginas_v_blocks_faixa_numeros" USING btree ("_path");
  CREATE INDEX "_paginas_v_blocks_linha_do_tempo_passos_order_idx" ON "_paginas_v_blocks_linha_do_tempo_passos" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_linha_do_tempo_passos_parent_id_idx" ON "_paginas_v_blocks_linha_do_tempo_passos" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_linha_do_tempo_order_idx" ON "_paginas_v_blocks_linha_do_tempo" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_linha_do_tempo_parent_id_idx" ON "_paginas_v_blocks_linha_do_tempo" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_linha_do_tempo_path_idx" ON "_paginas_v_blocks_linha_do_tempo" USING btree ("_path");
  CREATE INDEX "_paginas_v_blocks_modulos_itens_order_idx" ON "_paginas_v_blocks_modulos_itens" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_modulos_itens_parent_id_idx" ON "_paginas_v_blocks_modulos_itens" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_modulos_order_idx" ON "_paginas_v_blocks_modulos" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_modulos_parent_id_idx" ON "_paginas_v_blocks_modulos" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_modulos_path_idx" ON "_paginas_v_blocks_modulos" USING btree ("_path");
  CREATE INDEX "_paginas_v_blocks_cartoes_segmento_cartoes_order_idx" ON "_paginas_v_blocks_cartoes_segmento_cartoes" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_cartoes_segmento_cartoes_parent_id_idx" ON "_paginas_v_blocks_cartoes_segmento_cartoes" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_cartoes_segmento_order_idx" ON "_paginas_v_blocks_cartoes_segmento" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_cartoes_segmento_parent_id_idx" ON "_paginas_v_blocks_cartoes_segmento" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_cartoes_segmento_path_idx" ON "_paginas_v_blocks_cartoes_segmento" USING btree ("_path");
  CREATE INDEX "_paginas_v_blocks_texto_lista_lista_order_idx" ON "_paginas_v_blocks_texto_lista_lista" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_texto_lista_lista_parent_id_idx" ON "_paginas_v_blocks_texto_lista_lista" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_texto_lista_order_idx" ON "_paginas_v_blocks_texto_lista" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_texto_lista_parent_id_idx" ON "_paginas_v_blocks_texto_lista" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_texto_lista_path_idx" ON "_paginas_v_blocks_texto_lista" USING btree ("_path");
  CREATE INDEX "_paginas_v_blocks_simulador_order_idx" ON "_paginas_v_blocks_simulador" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_simulador_parent_id_idx" ON "_paginas_v_blocks_simulador" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_simulador_path_idx" ON "_paginas_v_blocks_simulador" USING btree ("_path");
  CREATE INDEX "_paginas_v_blocks_notas_facilidade_order_idx" ON "_paginas_v_blocks_notas_facilidade" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_notas_facilidade_parent_id_idx" ON "_paginas_v_blocks_notas_facilidade" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_notas_facilidade_path_idx" ON "_paginas_v_blocks_notas_facilidade" USING btree ("_path");
  CREATE INDEX "_paginas_v_blocks_antes_depois_antes_itens_order_idx" ON "_paginas_v_blocks_antes_depois_antes_itens" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_antes_depois_antes_itens_parent_id_idx" ON "_paginas_v_blocks_antes_depois_antes_itens" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_antes_depois_depois_itens_order_idx" ON "_paginas_v_blocks_antes_depois_depois_itens" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_antes_depois_depois_itens_parent_id_idx" ON "_paginas_v_blocks_antes_depois_depois_itens" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_antes_depois_order_idx" ON "_paginas_v_blocks_antes_depois" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_antes_depois_parent_id_idx" ON "_paginas_v_blocks_antes_depois" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_antes_depois_path_idx" ON "_paginas_v_blocks_antes_depois" USING btree ("_path");
  CREATE INDEX "_paginas_v_blocks_argumento_order_idx" ON "_paginas_v_blocks_argumento" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_argumento_parent_id_idx" ON "_paginas_v_blocks_argumento" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_argumento_path_idx" ON "_paginas_v_blocks_argumento" USING btree ("_path");
  CREATE INDEX "_paginas_v_blocks_faq_itens_order_idx" ON "_paginas_v_blocks_faq_itens" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_faq_itens_parent_id_idx" ON "_paginas_v_blocks_faq_itens" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_faq_order_idx" ON "_paginas_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_faq_parent_id_idx" ON "_paginas_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_faq_path_idx" ON "_paginas_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_paginas_v_blocks_chamada_cadastro_bullets_order_idx" ON "_paginas_v_blocks_chamada_cadastro_bullets" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_chamada_cadastro_bullets_parent_id_idx" ON "_paginas_v_blocks_chamada_cadastro_bullets" USING btree ("_parent_id");
  CREATE INDEX "_perguntas_v_order_idx" ON "_perguntas_v" USING btree ("_order");
  CREATE INDEX "_perguntas_v_parent_id_idx" ON "_perguntas_v" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_chamada_cadastro_order_idx" ON "_paginas_v_blocks_chamada_cadastro" USING btree ("_order");
  CREATE INDEX "_paginas_v_blocks_chamada_cadastro_parent_id_idx" ON "_paginas_v_blocks_chamada_cadastro" USING btree ("_parent_id");
  CREATE INDEX "_paginas_v_blocks_chamada_cadastro_path_idx" ON "_paginas_v_blocks_chamada_cadastro" USING btree ("_path");
  CREATE INDEX "_paginas_v_parent_idx" ON "_paginas_v" USING btree ("parent_id");
  CREATE INDEX "_paginas_v_version_version_slug_idx" ON "_paginas_v" USING btree ("version_slug");
  CREATE INDEX "_paginas_v_version_seo_version_seo_og_image_idx" ON "_paginas_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_paginas_v_version_version_updated_at_idx" ON "_paginas_v" USING btree ("version_updated_at");
  CREATE INDEX "_paginas_v_version_version_created_at_idx" ON "_paginas_v" USING btree ("version_created_at");
  CREATE INDEX "_paginas_v_version_version__status_idx" ON "_paginas_v" USING btree ("version__status");
  CREATE INDEX "_paginas_v_created_at_idx" ON "_paginas_v" USING btree ("created_at");
  CREATE INDEX "_paginas_v_updated_at_idx" ON "_paginas_v" USING btree ("updated_at");
  CREATE INDEX "_paginas_v_latest_idx" ON "_paginas_v" USING btree ("latest");
  CREATE INDEX "_paginas_v_texts_order_parent" ON "_paginas_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "planos_planos_order_idx" ON "planos_planos" USING btree ("_order");
  CREATE INDEX "planos_planos_parent_id_idx" ON "planos_planos" USING btree ("_parent_id");
  CREATE INDEX "faq_plataforma_perguntas_order_idx" ON "faq_plataforma_perguntas" USING btree ("_order");
  CREATE INDEX "faq_plataforma_perguntas_parent_id_idx" ON "faq_plataforma_perguntas" USING btree ("_parent_id");
  CREATE INDEX "formulario_texts_order_parent" ON "formulario_texts" USING btree ("order","parent_id");
  CREATE INDEX "rodape_links_order_idx" ON "rodape_links" USING btree ("_order");
  CREATE INDEX "rodape_links_parent_id_idx" ON "rodape_links" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_paginas_fk" FOREIGN KEY ("paginas_id") REFERENCES "public"."paginas"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_paginas_id_idx" ON "payload_locked_documents_rels" USING btree ("paginas_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "paginas_blocks_hero_celular_celular_mensagens" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_blocks_hero_celular" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_blocks_faixa_numeros_itens" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_blocks_faixa_numeros" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_blocks_linha_do_tempo_passos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_blocks_linha_do_tempo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_blocks_modulos_itens" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_blocks_modulos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_blocks_cartoes_segmento_cartoes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_blocks_cartoes_segmento" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_blocks_texto_lista_lista" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_blocks_texto_lista" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_blocks_simulador" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_blocks_notas_facilidade" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_blocks_antes_depois_antes_itens" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_blocks_antes_depois_depois_itens" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_blocks_antes_depois" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_blocks_argumento" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_blocks_faq_itens" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_blocks_chamada_cadastro_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "perguntas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_blocks_chamada_cadastro" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "paginas_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_hero_celular_celular_mensagens" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_hero_celular" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_faixa_numeros_itens" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_faixa_numeros" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_linha_do_tempo_passos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_linha_do_tempo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_modulos_itens" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_modulos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_cartoes_segmento_cartoes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_cartoes_segmento" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_texto_lista_lista" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_texto_lista" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_simulador" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_notas_facilidade" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_antes_depois_antes_itens" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_antes_depois_depois_itens" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_antes_depois" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_argumento" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_faq_itens" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_chamada_cadastro_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_perguntas_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_blocks_chamada_cadastro" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_paginas_v_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "planos_planos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "planos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faq_plataforma_perguntas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faq_plataforma" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "formulario" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "formulario_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rodape_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rodape" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "paginas_blocks_hero_celular_celular_mensagens" CASCADE;
  DROP TABLE "paginas_blocks_hero_celular" CASCADE;
  DROP TABLE "paginas_blocks_faixa_numeros_itens" CASCADE;
  DROP TABLE "paginas_blocks_faixa_numeros" CASCADE;
  DROP TABLE "paginas_blocks_linha_do_tempo_passos" CASCADE;
  DROP TABLE "paginas_blocks_linha_do_tempo" CASCADE;
  DROP TABLE "paginas_blocks_modulos_itens" CASCADE;
  DROP TABLE "paginas_blocks_modulos" CASCADE;
  DROP TABLE "paginas_blocks_cartoes_segmento_cartoes" CASCADE;
  DROP TABLE "paginas_blocks_cartoes_segmento" CASCADE;
  DROP TABLE "paginas_blocks_texto_lista_lista" CASCADE;
  DROP TABLE "paginas_blocks_texto_lista" CASCADE;
  DROP TABLE "paginas_blocks_simulador" CASCADE;
  DROP TABLE "paginas_blocks_notas_facilidade" CASCADE;
  DROP TABLE "paginas_blocks_antes_depois_antes_itens" CASCADE;
  DROP TABLE "paginas_blocks_antes_depois_depois_itens" CASCADE;
  DROP TABLE "paginas_blocks_antes_depois" CASCADE;
  DROP TABLE "paginas_blocks_argumento" CASCADE;
  DROP TABLE "paginas_blocks_faq_itens" CASCADE;
  DROP TABLE "paginas_blocks_faq" CASCADE;
  DROP TABLE "paginas_blocks_chamada_cadastro_bullets" CASCADE;
  DROP TABLE "perguntas" CASCADE;
  DROP TABLE "paginas_blocks_chamada_cadastro" CASCADE;
  DROP TABLE "paginas" CASCADE;
  DROP TABLE "paginas_texts" CASCADE;
  DROP TABLE "_paginas_v_blocks_hero_celular_celular_mensagens" CASCADE;
  DROP TABLE "_paginas_v_blocks_hero_celular" CASCADE;
  DROP TABLE "_paginas_v_blocks_faixa_numeros_itens" CASCADE;
  DROP TABLE "_paginas_v_blocks_faixa_numeros" CASCADE;
  DROP TABLE "_paginas_v_blocks_linha_do_tempo_passos" CASCADE;
  DROP TABLE "_paginas_v_blocks_linha_do_tempo" CASCADE;
  DROP TABLE "_paginas_v_blocks_modulos_itens" CASCADE;
  DROP TABLE "_paginas_v_blocks_modulos" CASCADE;
  DROP TABLE "_paginas_v_blocks_cartoes_segmento_cartoes" CASCADE;
  DROP TABLE "_paginas_v_blocks_cartoes_segmento" CASCADE;
  DROP TABLE "_paginas_v_blocks_texto_lista_lista" CASCADE;
  DROP TABLE "_paginas_v_blocks_texto_lista" CASCADE;
  DROP TABLE "_paginas_v_blocks_simulador" CASCADE;
  DROP TABLE "_paginas_v_blocks_notas_facilidade" CASCADE;
  DROP TABLE "_paginas_v_blocks_antes_depois_antes_itens" CASCADE;
  DROP TABLE "_paginas_v_blocks_antes_depois_depois_itens" CASCADE;
  DROP TABLE "_paginas_v_blocks_antes_depois" CASCADE;
  DROP TABLE "_paginas_v_blocks_argumento" CASCADE;
  DROP TABLE "_paginas_v_blocks_faq_itens" CASCADE;
  DROP TABLE "_paginas_v_blocks_faq" CASCADE;
  DROP TABLE "_paginas_v_blocks_chamada_cadastro_bullets" CASCADE;
  DROP TABLE "_perguntas_v" CASCADE;
  DROP TABLE "_paginas_v_blocks_chamada_cadastro" CASCADE;
  DROP TABLE "_paginas_v" CASCADE;
  DROP TABLE "_paginas_v_texts" CASCADE;
  DROP TABLE "planos_planos" CASCADE;
  DROP TABLE "planos" CASCADE;
  DROP TABLE "faq_plataforma_perguntas" CASCADE;
  DROP TABLE "faq_plataforma" CASCADE;
  DROP TABLE "formulario" CASCADE;
  DROP TABLE "formulario_texts" CASCADE;
  DROP TABLE "rodape_links" CASCADE;
  DROP TABLE "rodape" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_paginas_fk";
  
  DROP INDEX "payload_locked_documents_rels_paginas_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "paginas_id";
  DROP TYPE "public"."enum_paginas_blocks_hero_celular_celular_mensagens_de";
  DROP TYPE "public"."enum_paginas_blocks_hero_celular_icone";
  DROP TYPE "public"."enum_paginas_blocks_hero_celular_icone_decisor";
  DROP TYPE "public"."enum_paginas_blocks_faixa_numeros_itens_icone";
  DROP TYPE "public"."enum_paginas_blocks_faixa_numeros_itens_tom";
  DROP TYPE "public"."enum_paginas_blocks_modulos_itens_icone";
  DROP TYPE "public"."enum_paginas_blocks_cartoes_segmento_cartoes_icone";
  DROP TYPE "public"."enum_paginas_blocks_simulador_plano";
  DROP TYPE "public"."enum_perguntas_tipo";
  DROP TYPE "public"."enum_paginas_tipo";
  DROP TYPE "public"."enum_paginas_visual";
  DROP TYPE "public"."enum_paginas_status";
  DROP TYPE "public"."enum__paginas_v_blocks_hero_celular_celular_mensagens_de";
  DROP TYPE "public"."enum__paginas_v_blocks_hero_celular_icone";
  DROP TYPE "public"."enum__paginas_v_blocks_hero_celular_icone_decisor";
  DROP TYPE "public"."enum__paginas_v_blocks_faixa_numeros_itens_icone";
  DROP TYPE "public"."enum__paginas_v_blocks_faixa_numeros_itens_tom";
  DROP TYPE "public"."enum__paginas_v_blocks_modulos_itens_icone";
  DROP TYPE "public"."enum__paginas_v_blocks_cartoes_segmento_cartoes_icone";
  DROP TYPE "public"."enum__paginas_v_blocks_simulador_plano";
  DROP TYPE "public"."enum__perguntas_v_tipo";
  DROP TYPE "public"."enum__paginas_v_version_tipo";
  DROP TYPE "public"."enum__paginas_v_version_visual";
  DROP TYPE "public"."enum__paginas_v_version_status";
  DROP TYPE "public"."enum_planos_planos_chave";`)
}
