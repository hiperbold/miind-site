import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_paginas_cartao_hub_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__paginas_v_version_cartao_hub_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_homepage_blocks_hero_plat_integracoes_itens_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_homepage_blocks_hero_cad_bullets_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_homepage_blocks_grade_cartoes_itens_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."estilo" AS ENUM('pilula', 'tracos');
  CREATE TYPE "public"."enum_homepage_blocks_grade_cartoes_variante" AS ENUM('problema', 'construir', 'diferencial', 'beneficio', 'metodologia', 'governanca');
  CREATE TYPE "public"."enum_homepage_blocks_camadas_camadas_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_homepage_blocks_camadas_camadas_cor" AS ENUM('ciano', 'azul', 'violeta', 'menta');
  CREATE TYPE "public"."enum_homepage_blocks_etapas_plat_etapas_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_homepage_blocks_passos_hub_passos_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_homepage_blocks_faq_secao_variante" AS ENUM('plataforma', 'programa');
  CREATE TYPE "public"."enum_homepage_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__homepage_blocks_hero_plat_v_integracoes_itens_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__homepage_blocks_hero_cad_v_bullets_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__homepage_v_blocks_grade_cartoes_itens_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__homepage_v_blocks_grade_cartoes_variante" AS ENUM('problema', 'construir', 'diferencial', 'beneficio', 'metodologia', 'governanca');
  CREATE TYPE "public"."enum__homepage_v_blocks_camadas_camadas_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__homepage_v_blocks_camadas_camadas_cor" AS ENUM('ciano', 'azul', 'violeta', 'menta');
  CREATE TYPE "public"."enum__homepage_blocks_etapas_plat_v_etapas_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__homepage_v_blocks_passos_hub_passos_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__homepage_v_blocks_faq_secao_variante" AS ENUM('plataforma', 'programa');
  CREATE TYPE "public"."enum__homepage_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_parceiros_blocks_hero_plat_integracoes_itens_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_parceiros_blocks_hero_cad_bullets_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_parceiros_blocks_grade_cartoes_itens_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_parceiros_blocks_grade_cartoes_variante" AS ENUM('problema', 'construir', 'diferencial', 'beneficio', 'metodologia', 'governanca');
  CREATE TYPE "public"."enum_parceiros_blocks_camadas_camadas_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_parceiros_blocks_camadas_camadas_cor" AS ENUM('ciano', 'azul', 'violeta', 'menta');
  CREATE TYPE "public"."enum_parceiros_blocks_etapas_plat_etapas_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_parceiros_blocks_passos_hub_passos_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_parceiros_blocks_faq_secao_variante" AS ENUM('plataforma', 'programa');
  CREATE TYPE "public"."enum_parceiros_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__parceiros_blocks_hero_plat_v_integracoes_itens_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__parceiros_blocks_hero_cad_v_bullets_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__parceiros_v_blocks_grade_cartoes_itens_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__parceiros_v_blocks_grade_cartoes_variante" AS ENUM('problema', 'construir', 'diferencial', 'beneficio', 'metodologia', 'governanca');
  CREATE TYPE "public"."enum__parceiros_v_blocks_camadas_camadas_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__parceiros_v_blocks_camadas_camadas_cor" AS ENUM('ciano', 'azul', 'violeta', 'menta');
  CREATE TYPE "public"."enum__parceiros_blocks_etapas_plat_v_etapas_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__parceiros_v_blocks_passos_hub_passos_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__parceiros_v_blocks_faq_secao_variante" AS ENUM('plataforma', 'programa');
  CREATE TYPE "public"."enum__parceiros_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "homepage_cabecalho_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rotulo" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "homepage_blocks_hero_plat_integracoes_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icone" "enum_homepage_blocks_hero_plat_integracoes_itens_icone",
  	"nome" varchar
  );
  
  CREATE TABLE "homepage_blocks_hero_plat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo_linha1" varchar,
  	"titulo_linha2" varchar,
  	"texto" varchar,
  	"botao_principal_texto" varchar,
  	"botao_principal_url" varchar DEFAULT '#contato',
  	"video_texto_botao" varchar,
  	"video_titulo_modal" varchar,
  	"video_url" varchar,
  	"video_aviso_sem_video" varchar,
  	"cartoes_desempenho" varchar,
  	"cartoes_economia_titulo" varchar,
  	"cartoes_economia_periodo" varchar,
  	"cartoes_economia_valor" numeric,
  	"cartoes_economia_variacao" varchar,
  	"integracoes_titulo" varchar,
  	"rotulo_rolagem" varchar DEFAULT 'Scroll',
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_hero_cad_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icone" "enum_homepage_blocks_hero_cad_bullets_icone",
  	"texto" varchar
  );
  
  CREATE TABLE "homepage_blocks_hero_cad" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"cartao_etiqueta" varchar,
  	"cartao_titulo" varchar,
  	"cartao_texto" varchar,
  	"formulario_origem" varchar DEFAULT 'hub-hero',
  	"formulario_form_id" varchar DEFAULT 'cadastro',
  	"formulario_rotulo_segmento" varchar,
  	"formulario_opcao_sem_segmento" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_faixa_nomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_faixa_estat_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valor" varchar,
  	"rotulo" varchar
  );
  
  CREATE TABLE "homepage_blocks_faixa_estat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_grade_cartoes_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icone" "enum_homepage_blocks_grade_cartoes_itens_icone",
  	"numero" varchar,
  	"titulo" varchar,
  	"texto" varchar
  );
  
  CREATE TABLE "homepage_blocks_grade_cartoes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_estilo_etiqueta" "estilo" DEFAULT 'pilula',
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"variante" "enum_homepage_blocks_grade_cartoes_variante" DEFAULT 'construir',
  	"rotulo_item" varchar,
  	"frase_final_texto" varchar,
  	"frase_final_destaque" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_camadas_camadas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icone" "enum_homepage_blocks_camadas_camadas_icone",
  	"titulo" varchar,
  	"cor" "enum_homepage_blocks_camadas_camadas_cor" DEFAULT 'ciano'
  );
  
  CREATE TABLE "homepage_blocks_camadas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_estilo_etiqueta" "estilo" DEFAULT 'pilula',
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"rotulo_camada" varchar DEFAULT 'Camada',
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_publico_alvo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_estilo_etiqueta" "estilo" DEFAULT 'pilula',
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"faixa_titulo" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_etapas_plat_etapas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icone" "enum_homepage_blocks_etapas_plat_etapas_icone",
  	"titulo" varchar,
  	"texto" varchar
  );
  
  CREATE TABLE "homepage_blocks_etapas_plat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_estilo_etiqueta" "estilo" DEFAULT 'pilula',
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"rotulo_etapa" varchar DEFAULT 'Etapa',
  	"frase_final" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_passos_hub_passos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icone" "enum_homepage_blocks_passos_hub_passos_icone",
  	"titulo" varchar,
  	"texto" varchar
  );
  
  CREATE TABLE "homepage_blocks_passos_hub" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"rotulo_passo" varchar DEFAULT 'Passo',
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_casos_uso_abas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nome" varchar
  );
  
  CREATE TABLE "homepage_blocks_casos_uso" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_estilo_etiqueta" "estilo" DEFAULT 'pilula',
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_metricas_secundarios" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valor" varchar,
  	"rotulo" varchar
  );
  
  CREATE TABLE "homepage_blocks_metricas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"marcador" varchar,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"principal_valor" varchar,
  	"principal_rotulo" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_depoimento" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"texto" varchar,
  	"iniciais" varchar,
  	"autor" varchar,
  	"cargo" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_manifesto_linhas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar
  );
  
  CREATE TABLE "homepage_blocks_manifesto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"etiqueta" varchar,
  	"assinatura" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_cartoes_link_cartoes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"url" varchar,
  	"texto_link" varchar
  );
  
  CREATE TABLE "homepage_blocks_cartoes_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_grade_nichos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar DEFAULT 'segmentos',
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"texto_link" varchar,
  	"texto_link_curto" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_faq_secao_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pergunta" varchar,
  	"resposta" varchar
  );
  
  CREATE TABLE "homepage_blocks_faq_secao" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"variante" "enum_homepage_blocks_faq_secao_variante" DEFAULT 'plataforma',
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"incluir_perguntas_plataforma" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_convite" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"botao_texto" varchar,
  	"botao_url" varchar DEFAULT '#contato',
  	"link_secundario_texto" varchar,
  	"link_secundario_url" varchar DEFAULT '#contato',
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_contato_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar,
  	"texto" varchar
  );
  
  CREATE TABLE "homepage_blocks_contato_formulario_opcoes_volume" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valor" varchar,
  	"rotulo" varchar
  );
  
  CREATE TABLE "homepage_blocks_contato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar DEFAULT 'contato',
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"citacao_texto" varchar,
  	"citacao_autor" varchar,
  	"formulario_aviso" varchar,
  	"formulario_texto_botao" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_blocks_chamada_final" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"link_celular_texto" varchar,
  	"link_celular_url" varchar DEFAULT '#cadastro',
  	"formulario_origem" varchar DEFAULT 'hub-bottom',
  	"formulario_form_id" varchar DEFAULT 'cadastro-final',
  	"formulario_rotulo_segmento" varchar,
  	"formulario_opcao_sem_segmento" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_rodape_colunas_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rotulo" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "homepage_rodape_colunas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cabecalho_texto_botao" varchar,
  	"cabecalho_texto_botao_celular" varchar,
  	"cabecalho_url_botao" varchar DEFAULT '#contato',
  	"rodape_etiqueta" varchar,
  	"rodape_frase" varchar,
  	"rodape_texto" varchar,
  	"rodape_descricao_marca" varchar,
  	"rodape_direitos" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_keywords" varchar,
  	"seo_dados_estruturados_nome" varchar,
  	"seo_dados_estruturados_descricao" varchar,
  	"seo_dados_estruturados_organizacao" varchar,
  	"seo_dados_estruturados_slogan" varchar,
  	"scripts_personalizados_head" varchar,
  	"scripts_personalizados_body_fim" varchar,
  	"_status" "enum_homepage_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_homepage_v_version_cabecalho_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rotulo" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_blocks_hero_plat_v_integracoes_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icone" "enum__homepage_blocks_hero_plat_v_integracoes_itens_icone",
  	"nome" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_blocks_hero_plat_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo_linha1" varchar,
  	"titulo_linha2" varchar,
  	"texto" varchar,
  	"botao_principal_texto" varchar,
  	"botao_principal_url" varchar DEFAULT '#contato',
  	"video_texto_botao" varchar,
  	"video_titulo_modal" varchar,
  	"video_url" varchar,
  	"video_aviso_sem_video" varchar,
  	"cartoes_desempenho" varchar,
  	"cartoes_economia_titulo" varchar,
  	"cartoes_economia_periodo" varchar,
  	"cartoes_economia_valor" numeric,
  	"cartoes_economia_variacao" varchar,
  	"integracoes_titulo" varchar,
  	"rotulo_rolagem" varchar DEFAULT 'Scroll',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_blocks_hero_cad_v_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icone" "enum__homepage_blocks_hero_cad_v_bullets_icone",
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_blocks_hero_cad_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"cartao_etiqueta" varchar,
  	"cartao_titulo" varchar,
  	"cartao_texto" varchar,
  	"formulario_origem" varchar DEFAULT 'hub-hero',
  	"formulario_form_id" varchar DEFAULT 'cadastro',
  	"formulario_rotulo_segmento" varchar,
  	"formulario_opcao_sem_segmento" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_faixa_nomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_blocks_faixa_estat_v_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"valor" varchar,
  	"rotulo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_blocks_faixa_estat_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_grade_cartoes_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icone" "enum__homepage_v_blocks_grade_cartoes_itens_icone",
  	"numero" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_grade_cartoes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_estilo_etiqueta" "estilo" DEFAULT 'pilula',
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"variante" "enum__homepage_v_blocks_grade_cartoes_variante" DEFAULT 'construir',
  	"rotulo_item" varchar,
  	"frase_final_texto" varchar,
  	"frase_final_destaque" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_camadas_camadas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icone" "enum__homepage_v_blocks_camadas_camadas_icone",
  	"titulo" varchar,
  	"cor" "enum__homepage_v_blocks_camadas_camadas_cor" DEFAULT 'ciano',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_camadas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_estilo_etiqueta" "estilo" DEFAULT 'pilula',
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"rotulo_camada" varchar DEFAULT 'Camada',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_publico_alvo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_estilo_etiqueta" "estilo" DEFAULT 'pilula',
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"faixa_titulo" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_blocks_etapas_plat_v_etapas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icone" "enum__homepage_blocks_etapas_plat_v_etapas_icone",
  	"titulo" varchar,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_blocks_etapas_plat_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_estilo_etiqueta" "estilo" DEFAULT 'pilula',
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"rotulo_etapa" varchar DEFAULT 'Etapa',
  	"frase_final" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_passos_hub_passos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icone" "enum__homepage_v_blocks_passos_hub_passos_icone",
  	"titulo" varchar,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_passos_hub" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"rotulo_passo" varchar DEFAULT 'Passo',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_casos_uso_abas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"nome" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_casos_uso" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_estilo_etiqueta" "estilo" DEFAULT 'pilula',
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_metricas_secundarios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"valor" varchar,
  	"rotulo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_metricas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"marcador" varchar,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"principal_valor" varchar,
  	"principal_rotulo" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_blocks_depoimento_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"texto" varchar,
  	"iniciais" varchar,
  	"autor" varchar,
  	"cargo" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_manifesto_linhas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_manifesto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"etiqueta" varchar,
  	"assinatura" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_cartoes_link_cartoes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"url" varchar,
  	"texto_link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_cartoes_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_grade_nichos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar DEFAULT 'segmentos',
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"texto_link" varchar,
  	"texto_link_curto" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_faq_secao_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"pergunta" varchar,
  	"resposta" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_faq_secao" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"variante" "enum__homepage_v_blocks_faq_secao_variante" DEFAULT 'plataforma',
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"incluir_perguntas_plataforma" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_convite" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"botao_texto" varchar,
  	"botao_url" varchar DEFAULT '#contato',
  	"link_secundario_texto" varchar,
  	"link_secundario_url" varchar DEFAULT '#contato',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_contato_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_contato_formulario_opcoes_volume" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"valor" varchar,
  	"rotulo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_blocks_contato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar DEFAULT 'contato',
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"citacao_texto" varchar,
  	"citacao_autor" varchar,
  	"formulario_aviso" varchar,
  	"formulario_texto_botao" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_blocks_chamada_final_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"link_celular_texto" varchar,
  	"link_celular_url" varchar DEFAULT '#cadastro',
  	"formulario_origem" varchar DEFAULT 'hub-bottom',
  	"formulario_form_id" varchar DEFAULT 'cadastro-final',
  	"formulario_rotulo_segmento" varchar,
  	"formulario_opcao_sem_segmento" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_homepage_v_version_rodape_colunas_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rotulo" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_version_rodape_colunas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_cabecalho_texto_botao" varchar,
  	"version_cabecalho_texto_botao_celular" varchar,
  	"version_cabecalho_url_botao" varchar DEFAULT '#contato',
  	"version_rodape_etiqueta" varchar,
  	"version_rodape_frase" varchar,
  	"version_rodape_texto" varchar,
  	"version_rodape_descricao_marca" varchar,
  	"version_rodape_direitos" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_keywords" varchar,
  	"version_seo_dados_estruturados_nome" varchar,
  	"version_seo_dados_estruturados_descricao" varchar,
  	"version_seo_dados_estruturados_organizacao" varchar,
  	"version_seo_dados_estruturados_slogan" varchar,
  	"version_scripts_personalizados_head" varchar,
  	"version_scripts_personalizados_body_fim" varchar,
  	"version__status" "enum__homepage_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_homepage_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "parceiros_blocks_hero_plat_integracoes_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icone" "enum_parceiros_blocks_hero_plat_integracoes_itens_icone",
  	"nome" varchar
  );
  
  CREATE TABLE "parceiros_blocks_hero_plat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo_linha1" varchar,
  	"titulo_linha2" varchar,
  	"texto" varchar,
  	"botao_principal_texto" varchar,
  	"botao_principal_url" varchar DEFAULT '#contato',
  	"video_texto_botao" varchar,
  	"video_titulo_modal" varchar,
  	"video_url" varchar,
  	"video_aviso_sem_video" varchar,
  	"cartoes_desempenho" varchar,
  	"cartoes_economia_titulo" varchar,
  	"cartoes_economia_periodo" varchar,
  	"cartoes_economia_valor" numeric,
  	"cartoes_economia_variacao" varchar,
  	"integracoes_titulo" varchar,
  	"rotulo_rolagem" varchar DEFAULT 'Scroll',
  	"block_name" varchar
  );
  
  CREATE TABLE "parceiros_blocks_hero_cad_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icone" "enum_parceiros_blocks_hero_cad_bullets_icone",
  	"texto" varchar
  );
  
  CREATE TABLE "parceiros_blocks_hero_cad" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"cartao_etiqueta" varchar,
  	"cartao_titulo" varchar,
  	"cartao_texto" varchar,
  	"formulario_origem" varchar DEFAULT 'hub-hero',
  	"formulario_form_id" varchar DEFAULT 'cadastro',
  	"formulario_rotulo_segmento" varchar,
  	"formulario_opcao_sem_segmento" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "parceiros_blocks_faixa_nomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "parceiros_blocks_faixa_estat_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valor" varchar,
  	"rotulo" varchar
  );
  
  CREATE TABLE "parceiros_blocks_faixa_estat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "parceiros_blocks_grade_cartoes_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icone" "enum_parceiros_blocks_grade_cartoes_itens_icone",
  	"numero" varchar,
  	"titulo" varchar,
  	"texto" varchar
  );
  
  CREATE TABLE "parceiros_blocks_grade_cartoes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_estilo_etiqueta" "estilo" DEFAULT 'pilula',
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"variante" "enum_parceiros_blocks_grade_cartoes_variante" DEFAULT 'construir',
  	"rotulo_item" varchar,
  	"frase_final_texto" varchar,
  	"frase_final_destaque" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "parceiros_blocks_camadas_camadas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icone" "enum_parceiros_blocks_camadas_camadas_icone",
  	"titulo" varchar,
  	"cor" "enum_parceiros_blocks_camadas_camadas_cor" DEFAULT 'ciano'
  );
  
  CREATE TABLE "parceiros_blocks_camadas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_estilo_etiqueta" "estilo" DEFAULT 'pilula',
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"rotulo_camada" varchar DEFAULT 'Camada',
  	"block_name" varchar
  );
  
  CREATE TABLE "parceiros_blocks_publico_alvo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_estilo_etiqueta" "estilo" DEFAULT 'pilula',
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"faixa_titulo" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "parceiros_blocks_etapas_plat_etapas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icone" "enum_parceiros_blocks_etapas_plat_etapas_icone",
  	"titulo" varchar,
  	"texto" varchar
  );
  
  CREATE TABLE "parceiros_blocks_etapas_plat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_estilo_etiqueta" "estilo" DEFAULT 'pilula',
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"rotulo_etapa" varchar DEFAULT 'Etapa',
  	"frase_final" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "parceiros_blocks_passos_hub_passos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icone" "enum_parceiros_blocks_passos_hub_passos_icone",
  	"titulo" varchar,
  	"texto" varchar
  );
  
  CREATE TABLE "parceiros_blocks_passos_hub" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"rotulo_passo" varchar DEFAULT 'Passo',
  	"block_name" varchar
  );
  
  CREATE TABLE "parceiros_blocks_casos_uso_abas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nome" varchar
  );
  
  CREATE TABLE "parceiros_blocks_casos_uso" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_estilo_etiqueta" "estilo" DEFAULT 'pilula',
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "parceiros_blocks_metricas_secundarios" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valor" varchar,
  	"rotulo" varchar
  );
  
  CREATE TABLE "parceiros_blocks_metricas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"marcador" varchar,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"principal_valor" varchar,
  	"principal_rotulo" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "parceiros_blocks_depoimento" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"texto" varchar,
  	"iniciais" varchar,
  	"autor" varchar,
  	"cargo" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "parceiros_blocks_manifesto_linhas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar
  );
  
  CREATE TABLE "parceiros_blocks_manifesto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"etiqueta" varchar,
  	"assinatura" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "parceiros_blocks_cartoes_link_cartoes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"url" varchar,
  	"texto_link" varchar
  );
  
  CREATE TABLE "parceiros_blocks_cartoes_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "parceiros_blocks_grade_nichos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar DEFAULT 'segmentos',
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"texto_link" varchar,
  	"texto_link_curto" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "parceiros_blocks_faq_secao_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pergunta" varchar,
  	"resposta" varchar
  );
  
  CREATE TABLE "parceiros_blocks_faq_secao" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"variante" "enum_parceiros_blocks_faq_secao_variante" DEFAULT 'plataforma',
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"incluir_perguntas_plataforma" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "parceiros_blocks_convite" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"botao_texto" varchar,
  	"botao_url" varchar DEFAULT '#contato',
  	"link_secundario_texto" varchar,
  	"link_secundario_url" varchar DEFAULT '#contato',
  	"block_name" varchar
  );
  
  CREATE TABLE "parceiros_blocks_contato_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titulo" varchar,
  	"texto" varchar
  );
  
  CREATE TABLE "parceiros_blocks_contato_formulario_opcoes_volume" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valor" varchar,
  	"rotulo" varchar
  );
  
  CREATE TABLE "parceiros_blocks_contato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar DEFAULT 'contato',
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"citacao_texto" varchar,
  	"citacao_autor" varchar,
  	"formulario_aviso" varchar,
  	"formulario_texto_botao" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "parceiros_blocks_chamada_final" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"link_celular_texto" varchar,
  	"link_celular_url" varchar DEFAULT '#cadastro',
  	"formulario_origem" varchar DEFAULT 'hub-bottom',
  	"formulario_form_id" varchar DEFAULT 'cadastro-final',
  	"formulario_rotulo_segmento" varchar,
  	"formulario_opcao_sem_segmento" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "parceiros" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cabecalho_texto_botao" varchar,
  	"cabecalho_texto_botao_curto" varchar,
  	"cabecalho_url_botao" varchar DEFAULT '#cadastro',
  	"rodape_texto" varchar,
  	"rodape_texto_link" varchar,
  	"rodape_url_link" varchar DEFAULT '/bu1lder/',
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"seo_og_image_id" integer,
  	"scripts_personalizados_head" varchar,
  	"scripts_personalizados_body_fim" varchar,
  	"_status" "enum_parceiros_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "parceiros_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_parceiros_blocks_hero_plat_v_integracoes_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icone" "enum__parceiros_blocks_hero_plat_v_integracoes_itens_icone",
  	"nome" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_parceiros_blocks_hero_plat_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo_linha1" varchar,
  	"titulo_linha2" varchar,
  	"texto" varchar,
  	"botao_principal_texto" varchar,
  	"botao_principal_url" varchar DEFAULT '#contato',
  	"video_texto_botao" varchar,
  	"video_titulo_modal" varchar,
  	"video_url" varchar,
  	"video_aviso_sem_video" varchar,
  	"cartoes_desempenho" varchar,
  	"cartoes_economia_titulo" varchar,
  	"cartoes_economia_periodo" varchar,
  	"cartoes_economia_valor" numeric,
  	"cartoes_economia_variacao" varchar,
  	"integracoes_titulo" varchar,
  	"rotulo_rolagem" varchar DEFAULT 'Scroll',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_parceiros_blocks_hero_cad_v_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icone" "enum__parceiros_blocks_hero_cad_v_bullets_icone",
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_parceiros_blocks_hero_cad_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"cartao_etiqueta" varchar,
  	"cartao_titulo" varchar,
  	"cartao_texto" varchar,
  	"formulario_origem" varchar DEFAULT 'hub-hero',
  	"formulario_form_id" varchar DEFAULT 'cadastro',
  	"formulario_rotulo_segmento" varchar,
  	"formulario_opcao_sem_segmento" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_faixa_nomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_parceiros_blocks_faixa_estat_v_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"valor" varchar,
  	"rotulo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_parceiros_blocks_faixa_estat_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_grade_cartoes_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icone" "enum__parceiros_v_blocks_grade_cartoes_itens_icone",
  	"numero" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_grade_cartoes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_estilo_etiqueta" "estilo" DEFAULT 'pilula',
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"variante" "enum__parceiros_v_blocks_grade_cartoes_variante" DEFAULT 'construir',
  	"rotulo_item" varchar,
  	"frase_final_texto" varchar,
  	"frase_final_destaque" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_camadas_camadas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icone" "enum__parceiros_v_blocks_camadas_camadas_icone",
  	"titulo" varchar,
  	"cor" "enum__parceiros_v_blocks_camadas_camadas_cor" DEFAULT 'ciano',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_camadas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_estilo_etiqueta" "estilo" DEFAULT 'pilula',
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"rotulo_camada" varchar DEFAULT 'Camada',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_publico_alvo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_estilo_etiqueta" "estilo" DEFAULT 'pilula',
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"faixa_titulo" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_parceiros_blocks_etapas_plat_v_etapas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icone" "enum__parceiros_blocks_etapas_plat_v_etapas_icone",
  	"titulo" varchar,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_parceiros_blocks_etapas_plat_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_estilo_etiqueta" "estilo" DEFAULT 'pilula',
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"rotulo_etapa" varchar DEFAULT 'Etapa',
  	"frase_final" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_passos_hub_passos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icone" "enum__parceiros_v_blocks_passos_hub_passos_icone",
  	"titulo" varchar,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_passos_hub" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"rotulo_passo" varchar DEFAULT 'Passo',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_casos_uso_abas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"nome" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_casos_uso" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_estilo_etiqueta" "estilo" DEFAULT 'pilula',
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_metricas_secundarios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"valor" varchar,
  	"rotulo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_metricas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"marcador" varchar,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"principal_valor" varchar,
  	"principal_rotulo" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_parceiros_blocks_depoimento_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"texto" varchar,
  	"iniciais" varchar,
  	"autor" varchar,
  	"cargo" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_manifesto_linhas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_manifesto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"etiqueta" varchar,
  	"assinatura" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_cartoes_link_cartoes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"url" varchar,
  	"texto_link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_cartoes_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_grade_nichos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar DEFAULT 'segmentos',
  	"cabecalho_etiqueta" varchar,
  	"cabecalho_titulo" varchar,
  	"cabecalho_subtitulo" varchar,
  	"texto_link" varchar,
  	"texto_link_curto" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_faq_secao_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"pergunta" varchar,
  	"resposta" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_faq_secao" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"variante" "enum__parceiros_v_blocks_faq_secao_variante" DEFAULT 'plataforma',
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"incluir_perguntas_plataforma" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_convite" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"botao_texto" varchar,
  	"botao_url" varchar DEFAULT '#contato',
  	"link_secundario_texto" varchar,
  	"link_secundario_url" varchar DEFAULT '#contato',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_contato_itens" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_contato_formulario_opcoes_volume" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"valor" varchar,
  	"rotulo" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_parceiros_v_blocks_contato" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar DEFAULT 'contato',
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"citacao_texto" varchar,
  	"citacao_autor" varchar,
  	"formulario_aviso" varchar,
  	"formulario_texto_botao" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_parceiros_blocks_chamada_final_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ancora" varchar,
  	"etiqueta" varchar,
  	"titulo" varchar,
  	"texto" varchar,
  	"link_celular_texto" varchar,
  	"link_celular_url" varchar DEFAULT '#cadastro',
  	"formulario_origem" varchar DEFAULT 'hub-bottom',
  	"formulario_form_id" varchar DEFAULT 'cadastro-final',
  	"formulario_rotulo_segmento" varchar,
  	"formulario_opcao_sem_segmento" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_parceiros_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_cabecalho_texto_botao" varchar,
  	"version_cabecalho_texto_botao_curto" varchar,
  	"version_cabecalho_url_botao" varchar DEFAULT '#cadastro',
  	"version_rodape_texto" varchar,
  	"version_rodape_texto_link" varchar,
  	"version_rodape_url_link" varchar DEFAULT '/bu1lder/',
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_og_title" varchar,
  	"version_seo_og_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_scripts_personalizados_head" varchar,
  	"version_scripts_personalizados_body_fim" varchar,
  	"version__status" "enum__parceiros_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_parceiros_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  ALTER TABLE "paginas_blocks_hero_celular" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_hero_celular_icone";
  CREATE TYPE "public"."enum_paginas_blocks_hero_celular_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_hero_celular" ALTER COLUMN "icone" SET DATA TYPE "public"."enum_paginas_blocks_hero_celular_icone" USING "icone"::"public"."enum_paginas_blocks_hero_celular_icone";
  ALTER TABLE "paginas_blocks_hero_celular" ALTER COLUMN "icone_decisor" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_hero_celular_icone_decisor";
  CREATE TYPE "public"."enum_paginas_blocks_hero_celular_icone_decisor" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_hero_celular" ALTER COLUMN "icone_decisor" SET DATA TYPE "public"."enum_paginas_blocks_hero_celular_icone_decisor" USING "icone_decisor"::"public"."enum_paginas_blocks_hero_celular_icone_decisor";
  ALTER TABLE "paginas_blocks_hero_fluxo_fluxo_etapas" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_hero_fluxo_fluxo_etapas_icone";
  CREATE TYPE "public"."enum_paginas_blocks_hero_fluxo_fluxo_etapas_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_hero_fluxo_fluxo_etapas" ALTER COLUMN "icone" SET DATA TYPE "public"."enum_paginas_blocks_hero_fluxo_fluxo_etapas_icone" USING "icone"::"public"."enum_paginas_blocks_hero_fluxo_fluxo_etapas_icone";
  ALTER TABLE "paginas_blocks_faixa_numeros_itens" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_faixa_numeros_itens_icone";
  CREATE TYPE "public"."enum_paginas_blocks_faixa_numeros_itens_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_faixa_numeros_itens" ALTER COLUMN "icone" SET DATA TYPE "public"."enum_paginas_blocks_faixa_numeros_itens_icone" USING "icone"::"public"."enum_paginas_blocks_faixa_numeros_itens_icone";
  ALTER TABLE "paginas_blocks_modulos_itens" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_modulos_itens_icone";
  CREATE TYPE "public"."enum_paginas_blocks_modulos_itens_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_modulos_itens" ALTER COLUMN "icone" SET DATA TYPE "public"."enum_paginas_blocks_modulos_itens_icone" USING "icone"::"public"."enum_paginas_blocks_modulos_itens_icone";
  ALTER TABLE "paginas_blocks_cartoes_cartoes" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_cartoes_cartoes_icone";
  CREATE TYPE "public"."enum_paginas_blocks_cartoes_cartoes_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_cartoes_cartoes" ALTER COLUMN "icone" SET DATA TYPE "public"."enum_paginas_blocks_cartoes_cartoes_icone" USING "icone"::"public"."enum_paginas_blocks_cartoes_cartoes_icone";
  ALTER TABLE "paginas_blocks_cartoes_segmento_cartoes" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_cartoes_segmento_cartoes_icone";
  CREATE TYPE "public"."enum_paginas_blocks_cartoes_segmento_cartoes_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_cartoes_segmento_cartoes" ALTER COLUMN "icone" SET DATA TYPE "public"."enum_paginas_blocks_cartoes_segmento_cartoes_icone" USING "icone"::"public"."enum_paginas_blocks_cartoes_segmento_cartoes_icone";
  ALTER TABLE "paginas_blocks_destaque_itens" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_destaque_itens_icone";
  CREATE TYPE "public"."enum_paginas_blocks_destaque_itens_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_destaque_itens" ALTER COLUMN "icone" SET DATA TYPE "public"."enum_paginas_blocks_destaque_itens_icone" USING "icone"::"public"."enum_paginas_blocks_destaque_itens_icone";
  ALTER TABLE "paginas_blocks_checklist" ALTER COLUMN "cartao_icone" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_checklist_cartao_icone";
  CREATE TYPE "public"."enum_paginas_blocks_checklist_cartao_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_checklist" ALTER COLUMN "cartao_icone" SET DATA TYPE "public"."enum_paginas_blocks_checklist_cartao_icone" USING "cartao_icone"::"public"."enum_paginas_blocks_checklist_cartao_icone";
  ALTER TABLE "_paginas_v_blocks_hero_celular" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_hero_celular_icone";
  CREATE TYPE "public"."enum__paginas_v_blocks_hero_celular_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_hero_celular" ALTER COLUMN "icone" SET DATA TYPE "public"."enum__paginas_v_blocks_hero_celular_icone" USING "icone"::"public"."enum__paginas_v_blocks_hero_celular_icone";
  ALTER TABLE "_paginas_v_blocks_hero_celular" ALTER COLUMN "icone_decisor" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_hero_celular_icone_decisor";
  CREATE TYPE "public"."enum__paginas_v_blocks_hero_celular_icone_decisor" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_hero_celular" ALTER COLUMN "icone_decisor" SET DATA TYPE "public"."enum__paginas_v_blocks_hero_celular_icone_decisor" USING "icone_decisor"::"public"."enum__paginas_v_blocks_hero_celular_icone_decisor";
  ALTER TABLE "_paginas_v_blocks_hero_fluxo_fluxo_etapas" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_hero_fluxo_fluxo_etapas_icone";
  CREATE TYPE "public"."enum__paginas_v_blocks_hero_fluxo_fluxo_etapas_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_hero_fluxo_fluxo_etapas" ALTER COLUMN "icone" SET DATA TYPE "public"."enum__paginas_v_blocks_hero_fluxo_fluxo_etapas_icone" USING "icone"::"public"."enum__paginas_v_blocks_hero_fluxo_fluxo_etapas_icone";
  ALTER TABLE "_paginas_v_blocks_faixa_numeros_itens" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_faixa_numeros_itens_icone";
  CREATE TYPE "public"."enum__paginas_v_blocks_faixa_numeros_itens_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_faixa_numeros_itens" ALTER COLUMN "icone" SET DATA TYPE "public"."enum__paginas_v_blocks_faixa_numeros_itens_icone" USING "icone"::"public"."enum__paginas_v_blocks_faixa_numeros_itens_icone";
  ALTER TABLE "_paginas_v_blocks_modulos_itens" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_modulos_itens_icone";
  CREATE TYPE "public"."enum__paginas_v_blocks_modulos_itens_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_modulos_itens" ALTER COLUMN "icone" SET DATA TYPE "public"."enum__paginas_v_blocks_modulos_itens_icone" USING "icone"::"public"."enum__paginas_v_blocks_modulos_itens_icone";
  ALTER TABLE "_paginas_v_blocks_cartoes_cartoes" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_cartoes_cartoes_icone";
  CREATE TYPE "public"."enum__paginas_v_blocks_cartoes_cartoes_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_cartoes_cartoes" ALTER COLUMN "icone" SET DATA TYPE "public"."enum__paginas_v_blocks_cartoes_cartoes_icone" USING "icone"::"public"."enum__paginas_v_blocks_cartoes_cartoes_icone";
  ALTER TABLE "_paginas_v_blocks_cartoes_segmento_cartoes" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_cartoes_segmento_cartoes_icone";
  CREATE TYPE "public"."enum__paginas_v_blocks_cartoes_segmento_cartoes_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_cartoes_segmento_cartoes" ALTER COLUMN "icone" SET DATA TYPE "public"."enum__paginas_v_blocks_cartoes_segmento_cartoes_icone" USING "icone"::"public"."enum__paginas_v_blocks_cartoes_segmento_cartoes_icone";
  ALTER TABLE "_paginas_v_blocks_destaque_itens" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_destaque_itens_icone";
  CREATE TYPE "public"."enum__paginas_v_blocks_destaque_itens_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_destaque_itens" ALTER COLUMN "icone" SET DATA TYPE "public"."enum__paginas_v_blocks_destaque_itens_icone" USING "icone"::"public"."enum__paginas_v_blocks_destaque_itens_icone";
  ALTER TABLE "_paginas_v_blocks_checklist" ALTER COLUMN "cartao_icone" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_checklist_cartao_icone";
  CREATE TYPE "public"."enum__paginas_v_blocks_checklist_cartao_icone" AS ENUM('Activity', 'ArrowRight', 'BadgePercent', 'BarChart3', 'BellRing', 'Bot', 'Boxes', 'Briefcase', 'Building2', 'Cable', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'CheckCircle2', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Cloud', 'Code', 'Code2', 'Cog', 'CreditCard', 'Database', 'Dumbbell', 'Eye', 'FileCheck', 'FileText', 'GaugeCircle', 'Gift', 'GitBranch', 'Hammer', 'Headphones', 'HeartPulse', 'Home', 'Layers', 'LayoutDashboard', 'Lock', 'Mail', 'Megaphone', 'MessageCircle', 'MessageSquare', 'PawPrint', 'PenLine', 'Phone', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'ScrollText', 'Search', 'ShieldAlert', 'ShieldCheck', 'Slack', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_checklist" ALTER COLUMN "cartao_icone" SET DATA TYPE "public"."enum__paginas_v_blocks_checklist_cartao_icone" USING "cartao_icone"::"public"."enum__paginas_v_blocks_checklist_cartao_icone";
  ALTER TABLE "paginas" ADD COLUMN "cartao_hub_nome" varchar;
  ALTER TABLE "paginas" ADD COLUMN "cartao_hub_mostrar_na_grade" boolean DEFAULT false;
  ALTER TABLE "paginas" ADD COLUMN "cartao_hub_icone" "enum_paginas_cartao_hub_icone";
  ALTER TABLE "paginas" ADD COLUMN "cartao_hub_estatistica" varchar;
  ALTER TABLE "paginas" ADD COLUMN "cartao_hub_texto" varchar;
  ALTER TABLE "_paginas_v" ADD COLUMN "version_cartao_hub_nome" varchar;
  ALTER TABLE "_paginas_v" ADD COLUMN "version_cartao_hub_mostrar_na_grade" boolean DEFAULT false;
  ALTER TABLE "_paginas_v" ADD COLUMN "version_cartao_hub_icone" "enum__paginas_v_version_cartao_hub_icone";
  ALTER TABLE "_paginas_v" ADD COLUMN "version_cartao_hub_estatistica" varchar;
  ALTER TABLE "_paginas_v" ADD COLUMN "version_cartao_hub_texto" varchar;
  ALTER TABLE "homepage_cabecalho_links" ADD CONSTRAINT "homepage_cabecalho_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_hero_plat_integracoes_itens" ADD CONSTRAINT "homepage_blocks_hero_plat_integracoes_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_hero_plat"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_hero_plat" ADD CONSTRAINT "homepage_blocks_hero_plat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_hero_cad_bullets" ADD CONSTRAINT "homepage_blocks_hero_cad_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_hero_cad"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_hero_cad" ADD CONSTRAINT "homepage_blocks_hero_cad_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_faixa_nomes" ADD CONSTRAINT "homepage_blocks_faixa_nomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_faixa_estat_itens" ADD CONSTRAINT "homepage_blocks_faixa_estat_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_faixa_estat"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_faixa_estat" ADD CONSTRAINT "homepage_blocks_faixa_estat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_grade_cartoes_itens" ADD CONSTRAINT "homepage_blocks_grade_cartoes_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_grade_cartoes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_grade_cartoes" ADD CONSTRAINT "homepage_blocks_grade_cartoes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_camadas_camadas" ADD CONSTRAINT "homepage_blocks_camadas_camadas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_camadas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_camadas" ADD CONSTRAINT "homepage_blocks_camadas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_publico_alvo" ADD CONSTRAINT "homepage_blocks_publico_alvo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_etapas_plat_etapas" ADD CONSTRAINT "homepage_blocks_etapas_plat_etapas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_etapas_plat"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_etapas_plat" ADD CONSTRAINT "homepage_blocks_etapas_plat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_passos_hub_passos" ADD CONSTRAINT "homepage_blocks_passos_hub_passos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_passos_hub"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_passos_hub" ADD CONSTRAINT "homepage_blocks_passos_hub_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_casos_uso_abas" ADD CONSTRAINT "homepage_blocks_casos_uso_abas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_casos_uso"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_casos_uso" ADD CONSTRAINT "homepage_blocks_casos_uso_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_metricas_secundarios" ADD CONSTRAINT "homepage_blocks_metricas_secundarios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_metricas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_metricas" ADD CONSTRAINT "homepage_blocks_metricas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_depoimento" ADD CONSTRAINT "homepage_blocks_depoimento_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_manifesto_linhas" ADD CONSTRAINT "homepage_blocks_manifesto_linhas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_manifesto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_manifesto" ADD CONSTRAINT "homepage_blocks_manifesto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_cartoes_link_cartoes" ADD CONSTRAINT "homepage_blocks_cartoes_link_cartoes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_cartoes_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_cartoes_link" ADD CONSTRAINT "homepage_blocks_cartoes_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_grade_nichos" ADD CONSTRAINT "homepage_blocks_grade_nichos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_faq_secao_itens" ADD CONSTRAINT "homepage_blocks_faq_secao_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_faq_secao"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_faq_secao" ADD CONSTRAINT "homepage_blocks_faq_secao_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_convite" ADD CONSTRAINT "homepage_blocks_convite_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_contato_itens" ADD CONSTRAINT "homepage_blocks_contato_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_contato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_contato_formulario_opcoes_volume" ADD CONSTRAINT "homepage_blocks_contato_formulario_opcoes_volume_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_blocks_contato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_contato" ADD CONSTRAINT "homepage_blocks_contato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_blocks_chamada_final" ADD CONSTRAINT "homepage_blocks_chamada_final_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rodape_colunas_links" ADD CONSTRAINT "homepage_rodape_colunas_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_rodape_colunas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rodape_colunas" ADD CONSTRAINT "homepage_rodape_colunas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_texts" ADD CONSTRAINT "homepage_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_cabecalho_links" ADD CONSTRAINT "_homepage_v_version_cabecalho_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_blocks_hero_plat_v_integracoes_itens" ADD CONSTRAINT "_homepage_blocks_hero_plat_v_integracoes_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_blocks_hero_plat_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_blocks_hero_plat_v" ADD CONSTRAINT "_homepage_blocks_hero_plat_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_blocks_hero_cad_v_bullets" ADD CONSTRAINT "_homepage_blocks_hero_cad_v_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_blocks_hero_cad_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_blocks_hero_cad_v" ADD CONSTRAINT "_homepage_blocks_hero_cad_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_faixa_nomes" ADD CONSTRAINT "_homepage_v_blocks_faixa_nomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_blocks_faixa_estat_v_itens" ADD CONSTRAINT "_homepage_blocks_faixa_estat_v_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_blocks_faixa_estat_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_blocks_faixa_estat_v" ADD CONSTRAINT "_homepage_blocks_faixa_estat_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_grade_cartoes_itens" ADD CONSTRAINT "_homepage_v_blocks_grade_cartoes_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_grade_cartoes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_grade_cartoes" ADD CONSTRAINT "_homepage_v_blocks_grade_cartoes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_camadas_camadas" ADD CONSTRAINT "_homepage_v_blocks_camadas_camadas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_camadas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_camadas" ADD CONSTRAINT "_homepage_v_blocks_camadas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_publico_alvo" ADD CONSTRAINT "_homepage_v_blocks_publico_alvo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_blocks_etapas_plat_v_etapas" ADD CONSTRAINT "_homepage_blocks_etapas_plat_v_etapas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_blocks_etapas_plat_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_blocks_etapas_plat_v" ADD CONSTRAINT "_homepage_blocks_etapas_plat_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_passos_hub_passos" ADD CONSTRAINT "_homepage_v_blocks_passos_hub_passos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_passos_hub"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_passos_hub" ADD CONSTRAINT "_homepage_v_blocks_passos_hub_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_casos_uso_abas" ADD CONSTRAINT "_homepage_v_blocks_casos_uso_abas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_casos_uso"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_casos_uso" ADD CONSTRAINT "_homepage_v_blocks_casos_uso_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_metricas_secundarios" ADD CONSTRAINT "_homepage_v_blocks_metricas_secundarios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_metricas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_metricas" ADD CONSTRAINT "_homepage_v_blocks_metricas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_blocks_depoimento_v" ADD CONSTRAINT "_homepage_blocks_depoimento_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_manifesto_linhas" ADD CONSTRAINT "_homepage_v_blocks_manifesto_linhas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_manifesto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_manifesto" ADD CONSTRAINT "_homepage_v_blocks_manifesto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_cartoes_link_cartoes" ADD CONSTRAINT "_homepage_v_blocks_cartoes_link_cartoes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_cartoes_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_cartoes_link" ADD CONSTRAINT "_homepage_v_blocks_cartoes_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_grade_nichos" ADD CONSTRAINT "_homepage_v_blocks_grade_nichos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_faq_secao_itens" ADD CONSTRAINT "_homepage_v_blocks_faq_secao_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_faq_secao"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_faq_secao" ADD CONSTRAINT "_homepage_v_blocks_faq_secao_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_convite" ADD CONSTRAINT "_homepage_v_blocks_convite_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_contato_itens" ADD CONSTRAINT "_homepage_v_blocks_contato_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_contato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_contato_formulario_opcoes_volume" ADD CONSTRAINT "_homepage_v_blocks_contato_formulario_opcoes_volume_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_blocks_contato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_blocks_contato" ADD CONSTRAINT "_homepage_v_blocks_contato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_blocks_chamada_final_v" ADD CONSTRAINT "_homepage_blocks_chamada_final_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_rodape_colunas_links" ADD CONSTRAINT "_homepage_v_version_rodape_colunas_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v_version_rodape_colunas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_rodape_colunas" ADD CONSTRAINT "_homepage_v_version_rodape_colunas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_texts" ADD CONSTRAINT "_homepage_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_hero_plat_integracoes_itens" ADD CONSTRAINT "parceiros_blocks_hero_plat_integracoes_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros_blocks_hero_plat"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_hero_plat" ADD CONSTRAINT "parceiros_blocks_hero_plat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_hero_cad_bullets" ADD CONSTRAINT "parceiros_blocks_hero_cad_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros_blocks_hero_cad"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_hero_cad" ADD CONSTRAINT "parceiros_blocks_hero_cad_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_faixa_nomes" ADD CONSTRAINT "parceiros_blocks_faixa_nomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_faixa_estat_itens" ADD CONSTRAINT "parceiros_blocks_faixa_estat_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros_blocks_faixa_estat"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_faixa_estat" ADD CONSTRAINT "parceiros_blocks_faixa_estat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_grade_cartoes_itens" ADD CONSTRAINT "parceiros_blocks_grade_cartoes_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros_blocks_grade_cartoes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_grade_cartoes" ADD CONSTRAINT "parceiros_blocks_grade_cartoes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_camadas_camadas" ADD CONSTRAINT "parceiros_blocks_camadas_camadas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros_blocks_camadas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_camadas" ADD CONSTRAINT "parceiros_blocks_camadas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_publico_alvo" ADD CONSTRAINT "parceiros_blocks_publico_alvo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_etapas_plat_etapas" ADD CONSTRAINT "parceiros_blocks_etapas_plat_etapas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros_blocks_etapas_plat"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_etapas_plat" ADD CONSTRAINT "parceiros_blocks_etapas_plat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_passos_hub_passos" ADD CONSTRAINT "parceiros_blocks_passos_hub_passos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros_blocks_passos_hub"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_passos_hub" ADD CONSTRAINT "parceiros_blocks_passos_hub_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_casos_uso_abas" ADD CONSTRAINT "parceiros_blocks_casos_uso_abas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros_blocks_casos_uso"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_casos_uso" ADD CONSTRAINT "parceiros_blocks_casos_uso_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_metricas_secundarios" ADD CONSTRAINT "parceiros_blocks_metricas_secundarios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros_blocks_metricas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_metricas" ADD CONSTRAINT "parceiros_blocks_metricas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_depoimento" ADD CONSTRAINT "parceiros_blocks_depoimento_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_manifesto_linhas" ADD CONSTRAINT "parceiros_blocks_manifesto_linhas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros_blocks_manifesto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_manifesto" ADD CONSTRAINT "parceiros_blocks_manifesto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_cartoes_link_cartoes" ADD CONSTRAINT "parceiros_blocks_cartoes_link_cartoes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros_blocks_cartoes_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_cartoes_link" ADD CONSTRAINT "parceiros_blocks_cartoes_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_grade_nichos" ADD CONSTRAINT "parceiros_blocks_grade_nichos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_faq_secao_itens" ADD CONSTRAINT "parceiros_blocks_faq_secao_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros_blocks_faq_secao"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_faq_secao" ADD CONSTRAINT "parceiros_blocks_faq_secao_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_convite" ADD CONSTRAINT "parceiros_blocks_convite_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_contato_itens" ADD CONSTRAINT "parceiros_blocks_contato_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros_blocks_contato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_contato_formulario_opcoes_volume" ADD CONSTRAINT "parceiros_blocks_contato_formulario_opcoes_volume_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros_blocks_contato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_contato" ADD CONSTRAINT "parceiros_blocks_contato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros_blocks_chamada_final" ADD CONSTRAINT "parceiros_blocks_chamada_final_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."parceiros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "parceiros" ADD CONSTRAINT "parceiros_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "parceiros_texts" ADD CONSTRAINT "parceiros_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."parceiros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_blocks_hero_plat_v_integracoes_itens" ADD CONSTRAINT "_parceiros_blocks_hero_plat_v_integracoes_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_blocks_hero_plat_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_blocks_hero_plat_v" ADD CONSTRAINT "_parceiros_blocks_hero_plat_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_blocks_hero_cad_v_bullets" ADD CONSTRAINT "_parceiros_blocks_hero_cad_v_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_blocks_hero_cad_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_blocks_hero_cad_v" ADD CONSTRAINT "_parceiros_blocks_hero_cad_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_faixa_nomes" ADD CONSTRAINT "_parceiros_v_blocks_faixa_nomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_blocks_faixa_estat_v_itens" ADD CONSTRAINT "_parceiros_blocks_faixa_estat_v_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_blocks_faixa_estat_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_blocks_faixa_estat_v" ADD CONSTRAINT "_parceiros_blocks_faixa_estat_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_grade_cartoes_itens" ADD CONSTRAINT "_parceiros_v_blocks_grade_cartoes_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v_blocks_grade_cartoes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_grade_cartoes" ADD CONSTRAINT "_parceiros_v_blocks_grade_cartoes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_camadas_camadas" ADD CONSTRAINT "_parceiros_v_blocks_camadas_camadas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v_blocks_camadas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_camadas" ADD CONSTRAINT "_parceiros_v_blocks_camadas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_publico_alvo" ADD CONSTRAINT "_parceiros_v_blocks_publico_alvo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_blocks_etapas_plat_v_etapas" ADD CONSTRAINT "_parceiros_blocks_etapas_plat_v_etapas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_blocks_etapas_plat_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_blocks_etapas_plat_v" ADD CONSTRAINT "_parceiros_blocks_etapas_plat_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_passos_hub_passos" ADD CONSTRAINT "_parceiros_v_blocks_passos_hub_passos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v_blocks_passos_hub"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_passos_hub" ADD CONSTRAINT "_parceiros_v_blocks_passos_hub_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_casos_uso_abas" ADD CONSTRAINT "_parceiros_v_blocks_casos_uso_abas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v_blocks_casos_uso"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_casos_uso" ADD CONSTRAINT "_parceiros_v_blocks_casos_uso_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_metricas_secundarios" ADD CONSTRAINT "_parceiros_v_blocks_metricas_secundarios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v_blocks_metricas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_metricas" ADD CONSTRAINT "_parceiros_v_blocks_metricas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_blocks_depoimento_v" ADD CONSTRAINT "_parceiros_blocks_depoimento_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_manifesto_linhas" ADD CONSTRAINT "_parceiros_v_blocks_manifesto_linhas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v_blocks_manifesto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_manifesto" ADD CONSTRAINT "_parceiros_v_blocks_manifesto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_cartoes_link_cartoes" ADD CONSTRAINT "_parceiros_v_blocks_cartoes_link_cartoes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v_blocks_cartoes_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_cartoes_link" ADD CONSTRAINT "_parceiros_v_blocks_cartoes_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_grade_nichos" ADD CONSTRAINT "_parceiros_v_blocks_grade_nichos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_faq_secao_itens" ADD CONSTRAINT "_parceiros_v_blocks_faq_secao_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v_blocks_faq_secao"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_faq_secao" ADD CONSTRAINT "_parceiros_v_blocks_faq_secao_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_convite" ADD CONSTRAINT "_parceiros_v_blocks_convite_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_contato_itens" ADD CONSTRAINT "_parceiros_v_blocks_contato_itens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v_blocks_contato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_contato_formulario_opcoes_volume" ADD CONSTRAINT "_parceiros_v_blocks_contato_formulario_opcoes_volume_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v_blocks_contato"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v_blocks_contato" ADD CONSTRAINT "_parceiros_v_blocks_contato_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_blocks_chamada_final_v" ADD CONSTRAINT "_parceiros_blocks_chamada_final_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_parceiros_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_parceiros_v" ADD CONSTRAINT "_parceiros_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_parceiros_v_texts" ADD CONSTRAINT "_parceiros_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_parceiros_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "homepage_cabecalho_links_order_idx" ON "homepage_cabecalho_links" USING btree ("_order");
  CREATE INDEX "homepage_cabecalho_links_parent_id_idx" ON "homepage_cabecalho_links" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_hero_plat_integracoes_itens_order_idx" ON "homepage_blocks_hero_plat_integracoes_itens" USING btree ("_order");
  CREATE INDEX "homepage_blocks_hero_plat_integracoes_itens_parent_id_idx" ON "homepage_blocks_hero_plat_integracoes_itens" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_hero_plat_order_idx" ON "homepage_blocks_hero_plat" USING btree ("_order");
  CREATE INDEX "homepage_blocks_hero_plat_parent_id_idx" ON "homepage_blocks_hero_plat" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_hero_plat_path_idx" ON "homepage_blocks_hero_plat" USING btree ("_path");
  CREATE INDEX "homepage_blocks_hero_cad_bullets_order_idx" ON "homepage_blocks_hero_cad_bullets" USING btree ("_order");
  CREATE INDEX "homepage_blocks_hero_cad_bullets_parent_id_idx" ON "homepage_blocks_hero_cad_bullets" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_hero_cad_order_idx" ON "homepage_blocks_hero_cad" USING btree ("_order");
  CREATE INDEX "homepage_blocks_hero_cad_parent_id_idx" ON "homepage_blocks_hero_cad" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_hero_cad_path_idx" ON "homepage_blocks_hero_cad" USING btree ("_path");
  CREATE INDEX "homepage_blocks_faixa_nomes_order_idx" ON "homepage_blocks_faixa_nomes" USING btree ("_order");
  CREATE INDEX "homepage_blocks_faixa_nomes_parent_id_idx" ON "homepage_blocks_faixa_nomes" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_faixa_nomes_path_idx" ON "homepage_blocks_faixa_nomes" USING btree ("_path");
  CREATE INDEX "homepage_blocks_faixa_estat_itens_order_idx" ON "homepage_blocks_faixa_estat_itens" USING btree ("_order");
  CREATE INDEX "homepage_blocks_faixa_estat_itens_parent_id_idx" ON "homepage_blocks_faixa_estat_itens" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_faixa_estat_order_idx" ON "homepage_blocks_faixa_estat" USING btree ("_order");
  CREATE INDEX "homepage_blocks_faixa_estat_parent_id_idx" ON "homepage_blocks_faixa_estat" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_faixa_estat_path_idx" ON "homepage_blocks_faixa_estat" USING btree ("_path");
  CREATE INDEX "homepage_blocks_grade_cartoes_itens_order_idx" ON "homepage_blocks_grade_cartoes_itens" USING btree ("_order");
  CREATE INDEX "homepage_blocks_grade_cartoes_itens_parent_id_idx" ON "homepage_blocks_grade_cartoes_itens" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_grade_cartoes_order_idx" ON "homepage_blocks_grade_cartoes" USING btree ("_order");
  CREATE INDEX "homepage_blocks_grade_cartoes_parent_id_idx" ON "homepage_blocks_grade_cartoes" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_grade_cartoes_path_idx" ON "homepage_blocks_grade_cartoes" USING btree ("_path");
  CREATE INDEX "homepage_blocks_camadas_camadas_order_idx" ON "homepage_blocks_camadas_camadas" USING btree ("_order");
  CREATE INDEX "homepage_blocks_camadas_camadas_parent_id_idx" ON "homepage_blocks_camadas_camadas" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_camadas_order_idx" ON "homepage_blocks_camadas" USING btree ("_order");
  CREATE INDEX "homepage_blocks_camadas_parent_id_idx" ON "homepage_blocks_camadas" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_camadas_path_idx" ON "homepage_blocks_camadas" USING btree ("_path");
  CREATE INDEX "homepage_blocks_publico_alvo_order_idx" ON "homepage_blocks_publico_alvo" USING btree ("_order");
  CREATE INDEX "homepage_blocks_publico_alvo_parent_id_idx" ON "homepage_blocks_publico_alvo" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_publico_alvo_path_idx" ON "homepage_blocks_publico_alvo" USING btree ("_path");
  CREATE INDEX "homepage_blocks_etapas_plat_etapas_order_idx" ON "homepage_blocks_etapas_plat_etapas" USING btree ("_order");
  CREATE INDEX "homepage_blocks_etapas_plat_etapas_parent_id_idx" ON "homepage_blocks_etapas_plat_etapas" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_etapas_plat_order_idx" ON "homepage_blocks_etapas_plat" USING btree ("_order");
  CREATE INDEX "homepage_blocks_etapas_plat_parent_id_idx" ON "homepage_blocks_etapas_plat" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_etapas_plat_path_idx" ON "homepage_blocks_etapas_plat" USING btree ("_path");
  CREATE INDEX "homepage_blocks_passos_hub_passos_order_idx" ON "homepage_blocks_passos_hub_passos" USING btree ("_order");
  CREATE INDEX "homepage_blocks_passos_hub_passos_parent_id_idx" ON "homepage_blocks_passos_hub_passos" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_passos_hub_order_idx" ON "homepage_blocks_passos_hub" USING btree ("_order");
  CREATE INDEX "homepage_blocks_passos_hub_parent_id_idx" ON "homepage_blocks_passos_hub" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_passos_hub_path_idx" ON "homepage_blocks_passos_hub" USING btree ("_path");
  CREATE INDEX "homepage_blocks_casos_uso_abas_order_idx" ON "homepage_blocks_casos_uso_abas" USING btree ("_order");
  CREATE INDEX "homepage_blocks_casos_uso_abas_parent_id_idx" ON "homepage_blocks_casos_uso_abas" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_casos_uso_order_idx" ON "homepage_blocks_casos_uso" USING btree ("_order");
  CREATE INDEX "homepage_blocks_casos_uso_parent_id_idx" ON "homepage_blocks_casos_uso" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_casos_uso_path_idx" ON "homepage_blocks_casos_uso" USING btree ("_path");
  CREATE INDEX "homepage_blocks_metricas_secundarios_order_idx" ON "homepage_blocks_metricas_secundarios" USING btree ("_order");
  CREATE INDEX "homepage_blocks_metricas_secundarios_parent_id_idx" ON "homepage_blocks_metricas_secundarios" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_metricas_order_idx" ON "homepage_blocks_metricas" USING btree ("_order");
  CREATE INDEX "homepage_blocks_metricas_parent_id_idx" ON "homepage_blocks_metricas" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_metricas_path_idx" ON "homepage_blocks_metricas" USING btree ("_path");
  CREATE INDEX "homepage_blocks_depoimento_order_idx" ON "homepage_blocks_depoimento" USING btree ("_order");
  CREATE INDEX "homepage_blocks_depoimento_parent_id_idx" ON "homepage_blocks_depoimento" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_depoimento_path_idx" ON "homepage_blocks_depoimento" USING btree ("_path");
  CREATE INDEX "homepage_blocks_manifesto_linhas_order_idx" ON "homepage_blocks_manifesto_linhas" USING btree ("_order");
  CREATE INDEX "homepage_blocks_manifesto_linhas_parent_id_idx" ON "homepage_blocks_manifesto_linhas" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_manifesto_order_idx" ON "homepage_blocks_manifesto" USING btree ("_order");
  CREATE INDEX "homepage_blocks_manifesto_parent_id_idx" ON "homepage_blocks_manifesto" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_manifesto_path_idx" ON "homepage_blocks_manifesto" USING btree ("_path");
  CREATE INDEX "homepage_blocks_cartoes_link_cartoes_order_idx" ON "homepage_blocks_cartoes_link_cartoes" USING btree ("_order");
  CREATE INDEX "homepage_blocks_cartoes_link_cartoes_parent_id_idx" ON "homepage_blocks_cartoes_link_cartoes" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_cartoes_link_order_idx" ON "homepage_blocks_cartoes_link" USING btree ("_order");
  CREATE INDEX "homepage_blocks_cartoes_link_parent_id_idx" ON "homepage_blocks_cartoes_link" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_cartoes_link_path_idx" ON "homepage_blocks_cartoes_link" USING btree ("_path");
  CREATE INDEX "homepage_blocks_grade_nichos_order_idx" ON "homepage_blocks_grade_nichos" USING btree ("_order");
  CREATE INDEX "homepage_blocks_grade_nichos_parent_id_idx" ON "homepage_blocks_grade_nichos" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_grade_nichos_path_idx" ON "homepage_blocks_grade_nichos" USING btree ("_path");
  CREATE INDEX "homepage_blocks_faq_secao_itens_order_idx" ON "homepage_blocks_faq_secao_itens" USING btree ("_order");
  CREATE INDEX "homepage_blocks_faq_secao_itens_parent_id_idx" ON "homepage_blocks_faq_secao_itens" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_faq_secao_order_idx" ON "homepage_blocks_faq_secao" USING btree ("_order");
  CREATE INDEX "homepage_blocks_faq_secao_parent_id_idx" ON "homepage_blocks_faq_secao" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_faq_secao_path_idx" ON "homepage_blocks_faq_secao" USING btree ("_path");
  CREATE INDEX "homepage_blocks_convite_order_idx" ON "homepage_blocks_convite" USING btree ("_order");
  CREATE INDEX "homepage_blocks_convite_parent_id_idx" ON "homepage_blocks_convite" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_convite_path_idx" ON "homepage_blocks_convite" USING btree ("_path");
  CREATE INDEX "homepage_blocks_contato_itens_order_idx" ON "homepage_blocks_contato_itens" USING btree ("_order");
  CREATE INDEX "homepage_blocks_contato_itens_parent_id_idx" ON "homepage_blocks_contato_itens" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_contato_formulario_opcoes_volume_order_idx" ON "homepage_blocks_contato_formulario_opcoes_volume" USING btree ("_order");
  CREATE INDEX "homepage_blocks_contato_formulario_opcoes_volume_parent_id_idx" ON "homepage_blocks_contato_formulario_opcoes_volume" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_contato_order_idx" ON "homepage_blocks_contato" USING btree ("_order");
  CREATE INDEX "homepage_blocks_contato_parent_id_idx" ON "homepage_blocks_contato" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_contato_path_idx" ON "homepage_blocks_contato" USING btree ("_path");
  CREATE INDEX "homepage_blocks_chamada_final_order_idx" ON "homepage_blocks_chamada_final" USING btree ("_order");
  CREATE INDEX "homepage_blocks_chamada_final_parent_id_idx" ON "homepage_blocks_chamada_final" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_chamada_final_path_idx" ON "homepage_blocks_chamada_final" USING btree ("_path");
  CREATE INDEX "homepage_rodape_colunas_links_order_idx" ON "homepage_rodape_colunas_links" USING btree ("_order");
  CREATE INDEX "homepage_rodape_colunas_links_parent_id_idx" ON "homepage_rodape_colunas_links" USING btree ("_parent_id");
  CREATE INDEX "homepage_rodape_colunas_order_idx" ON "homepage_rodape_colunas" USING btree ("_order");
  CREATE INDEX "homepage_rodape_colunas_parent_id_idx" ON "homepage_rodape_colunas" USING btree ("_parent_id");
  CREATE INDEX "homepage_seo_seo_og_image_idx" ON "homepage" USING btree ("seo_og_image_id");
  CREATE INDEX "homepage__status_idx" ON "homepage" USING btree ("_status");
  CREATE INDEX "homepage_texts_order_parent" ON "homepage_texts" USING btree ("order","parent_id");
  CREATE INDEX "_homepage_v_version_cabecalho_links_order_idx" ON "_homepage_v_version_cabecalho_links" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_cabecalho_links_parent_id_idx" ON "_homepage_v_version_cabecalho_links" USING btree ("_parent_id");
  CREATE INDEX "_homepage_blocks_hero_plat_v_integracoes_itens_order_idx" ON "_homepage_blocks_hero_plat_v_integracoes_itens" USING btree ("_order");
  CREATE INDEX "_homepage_blocks_hero_plat_v_integracoes_itens_parent_id_idx" ON "_homepage_blocks_hero_plat_v_integracoes_itens" USING btree ("_parent_id");
  CREATE INDEX "_homepage_blocks_hero_plat_v_order_idx" ON "_homepage_blocks_hero_plat_v" USING btree ("_order");
  CREATE INDEX "_homepage_blocks_hero_plat_v_parent_id_idx" ON "_homepage_blocks_hero_plat_v" USING btree ("_parent_id");
  CREATE INDEX "_homepage_blocks_hero_plat_v_path_idx" ON "_homepage_blocks_hero_plat_v" USING btree ("_path");
  CREATE INDEX "_homepage_blocks_hero_cad_v_bullets_order_idx" ON "_homepage_blocks_hero_cad_v_bullets" USING btree ("_order");
  CREATE INDEX "_homepage_blocks_hero_cad_v_bullets_parent_id_idx" ON "_homepage_blocks_hero_cad_v_bullets" USING btree ("_parent_id");
  CREATE INDEX "_homepage_blocks_hero_cad_v_order_idx" ON "_homepage_blocks_hero_cad_v" USING btree ("_order");
  CREATE INDEX "_homepage_blocks_hero_cad_v_parent_id_idx" ON "_homepage_blocks_hero_cad_v" USING btree ("_parent_id");
  CREATE INDEX "_homepage_blocks_hero_cad_v_path_idx" ON "_homepage_blocks_hero_cad_v" USING btree ("_path");
  CREATE INDEX "_homepage_v_blocks_faixa_nomes_order_idx" ON "_homepage_v_blocks_faixa_nomes" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_faixa_nomes_parent_id_idx" ON "_homepage_v_blocks_faixa_nomes" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_faixa_nomes_path_idx" ON "_homepage_v_blocks_faixa_nomes" USING btree ("_path");
  CREATE INDEX "_homepage_blocks_faixa_estat_v_itens_order_idx" ON "_homepage_blocks_faixa_estat_v_itens" USING btree ("_order");
  CREATE INDEX "_homepage_blocks_faixa_estat_v_itens_parent_id_idx" ON "_homepage_blocks_faixa_estat_v_itens" USING btree ("_parent_id");
  CREATE INDEX "_homepage_blocks_faixa_estat_v_order_idx" ON "_homepage_blocks_faixa_estat_v" USING btree ("_order");
  CREATE INDEX "_homepage_blocks_faixa_estat_v_parent_id_idx" ON "_homepage_blocks_faixa_estat_v" USING btree ("_parent_id");
  CREATE INDEX "_homepage_blocks_faixa_estat_v_path_idx" ON "_homepage_blocks_faixa_estat_v" USING btree ("_path");
  CREATE INDEX "_homepage_v_blocks_grade_cartoes_itens_order_idx" ON "_homepage_v_blocks_grade_cartoes_itens" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_grade_cartoes_itens_parent_id_idx" ON "_homepage_v_blocks_grade_cartoes_itens" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_grade_cartoes_order_idx" ON "_homepage_v_blocks_grade_cartoes" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_grade_cartoes_parent_id_idx" ON "_homepage_v_blocks_grade_cartoes" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_grade_cartoes_path_idx" ON "_homepage_v_blocks_grade_cartoes" USING btree ("_path");
  CREATE INDEX "_homepage_v_blocks_camadas_camadas_order_idx" ON "_homepage_v_blocks_camadas_camadas" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_camadas_camadas_parent_id_idx" ON "_homepage_v_blocks_camadas_camadas" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_camadas_order_idx" ON "_homepage_v_blocks_camadas" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_camadas_parent_id_idx" ON "_homepage_v_blocks_camadas" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_camadas_path_idx" ON "_homepage_v_blocks_camadas" USING btree ("_path");
  CREATE INDEX "_homepage_v_blocks_publico_alvo_order_idx" ON "_homepage_v_blocks_publico_alvo" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_publico_alvo_parent_id_idx" ON "_homepage_v_blocks_publico_alvo" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_publico_alvo_path_idx" ON "_homepage_v_blocks_publico_alvo" USING btree ("_path");
  CREATE INDEX "_homepage_blocks_etapas_plat_v_etapas_order_idx" ON "_homepage_blocks_etapas_plat_v_etapas" USING btree ("_order");
  CREATE INDEX "_homepage_blocks_etapas_plat_v_etapas_parent_id_idx" ON "_homepage_blocks_etapas_plat_v_etapas" USING btree ("_parent_id");
  CREATE INDEX "_homepage_blocks_etapas_plat_v_order_idx" ON "_homepage_blocks_etapas_plat_v" USING btree ("_order");
  CREATE INDEX "_homepage_blocks_etapas_plat_v_parent_id_idx" ON "_homepage_blocks_etapas_plat_v" USING btree ("_parent_id");
  CREATE INDEX "_homepage_blocks_etapas_plat_v_path_idx" ON "_homepage_blocks_etapas_plat_v" USING btree ("_path");
  CREATE INDEX "_homepage_v_blocks_passos_hub_passos_order_idx" ON "_homepage_v_blocks_passos_hub_passos" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_passos_hub_passos_parent_id_idx" ON "_homepage_v_blocks_passos_hub_passos" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_passos_hub_order_idx" ON "_homepage_v_blocks_passos_hub" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_passos_hub_parent_id_idx" ON "_homepage_v_blocks_passos_hub" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_passos_hub_path_idx" ON "_homepage_v_blocks_passos_hub" USING btree ("_path");
  CREATE INDEX "_homepage_v_blocks_casos_uso_abas_order_idx" ON "_homepage_v_blocks_casos_uso_abas" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_casos_uso_abas_parent_id_idx" ON "_homepage_v_blocks_casos_uso_abas" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_casos_uso_order_idx" ON "_homepage_v_blocks_casos_uso" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_casos_uso_parent_id_idx" ON "_homepage_v_blocks_casos_uso" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_casos_uso_path_idx" ON "_homepage_v_blocks_casos_uso" USING btree ("_path");
  CREATE INDEX "_homepage_v_blocks_metricas_secundarios_order_idx" ON "_homepage_v_blocks_metricas_secundarios" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_metricas_secundarios_parent_id_idx" ON "_homepage_v_blocks_metricas_secundarios" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_metricas_order_idx" ON "_homepage_v_blocks_metricas" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_metricas_parent_id_idx" ON "_homepage_v_blocks_metricas" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_metricas_path_idx" ON "_homepage_v_blocks_metricas" USING btree ("_path");
  CREATE INDEX "_homepage_blocks_depoimento_v_order_idx" ON "_homepage_blocks_depoimento_v" USING btree ("_order");
  CREATE INDEX "_homepage_blocks_depoimento_v_parent_id_idx" ON "_homepage_blocks_depoimento_v" USING btree ("_parent_id");
  CREATE INDEX "_homepage_blocks_depoimento_v_path_idx" ON "_homepage_blocks_depoimento_v" USING btree ("_path");
  CREATE INDEX "_homepage_v_blocks_manifesto_linhas_order_idx" ON "_homepage_v_blocks_manifesto_linhas" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_manifesto_linhas_parent_id_idx" ON "_homepage_v_blocks_manifesto_linhas" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_manifesto_order_idx" ON "_homepage_v_blocks_manifesto" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_manifesto_parent_id_idx" ON "_homepage_v_blocks_manifesto" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_manifesto_path_idx" ON "_homepage_v_blocks_manifesto" USING btree ("_path");
  CREATE INDEX "_homepage_v_blocks_cartoes_link_cartoes_order_idx" ON "_homepage_v_blocks_cartoes_link_cartoes" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_cartoes_link_cartoes_parent_id_idx" ON "_homepage_v_blocks_cartoes_link_cartoes" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_cartoes_link_order_idx" ON "_homepage_v_blocks_cartoes_link" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_cartoes_link_parent_id_idx" ON "_homepage_v_blocks_cartoes_link" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_cartoes_link_path_idx" ON "_homepage_v_blocks_cartoes_link" USING btree ("_path");
  CREATE INDEX "_homepage_v_blocks_grade_nichos_order_idx" ON "_homepage_v_blocks_grade_nichos" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_grade_nichos_parent_id_idx" ON "_homepage_v_blocks_grade_nichos" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_grade_nichos_path_idx" ON "_homepage_v_blocks_grade_nichos" USING btree ("_path");
  CREATE INDEX "_homepage_v_blocks_faq_secao_itens_order_idx" ON "_homepage_v_blocks_faq_secao_itens" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_faq_secao_itens_parent_id_idx" ON "_homepage_v_blocks_faq_secao_itens" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_faq_secao_order_idx" ON "_homepage_v_blocks_faq_secao" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_faq_secao_parent_id_idx" ON "_homepage_v_blocks_faq_secao" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_faq_secao_path_idx" ON "_homepage_v_blocks_faq_secao" USING btree ("_path");
  CREATE INDEX "_homepage_v_blocks_convite_order_idx" ON "_homepage_v_blocks_convite" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_convite_parent_id_idx" ON "_homepage_v_blocks_convite" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_convite_path_idx" ON "_homepage_v_blocks_convite" USING btree ("_path");
  CREATE INDEX "_homepage_v_blocks_contato_itens_order_idx" ON "_homepage_v_blocks_contato_itens" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_contato_itens_parent_id_idx" ON "_homepage_v_blocks_contato_itens" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_contato_formulario_opcoes_volume_order_idx" ON "_homepage_v_blocks_contato_formulario_opcoes_volume" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_contato_formulario_opcoes_volume_parent_id_idx" ON "_homepage_v_blocks_contato_formulario_opcoes_volume" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_contato_order_idx" ON "_homepage_v_blocks_contato" USING btree ("_order");
  CREATE INDEX "_homepage_v_blocks_contato_parent_id_idx" ON "_homepage_v_blocks_contato" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_blocks_contato_path_idx" ON "_homepage_v_blocks_contato" USING btree ("_path");
  CREATE INDEX "_homepage_blocks_chamada_final_v_order_idx" ON "_homepage_blocks_chamada_final_v" USING btree ("_order");
  CREATE INDEX "_homepage_blocks_chamada_final_v_parent_id_idx" ON "_homepage_blocks_chamada_final_v" USING btree ("_parent_id");
  CREATE INDEX "_homepage_blocks_chamada_final_v_path_idx" ON "_homepage_blocks_chamada_final_v" USING btree ("_path");
  CREATE INDEX "_homepage_v_version_rodape_colunas_links_order_idx" ON "_homepage_v_version_rodape_colunas_links" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_rodape_colunas_links_parent_id_idx" ON "_homepage_v_version_rodape_colunas_links" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_version_rodape_colunas_order_idx" ON "_homepage_v_version_rodape_colunas" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_rodape_colunas_parent_id_idx" ON "_homepage_v_version_rodape_colunas" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_version_seo_version_seo_og_image_idx" ON "_homepage_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_homepage_v_version_version__status_idx" ON "_homepage_v" USING btree ("version__status");
  CREATE INDEX "_homepage_v_created_at_idx" ON "_homepage_v" USING btree ("created_at");
  CREATE INDEX "_homepage_v_updated_at_idx" ON "_homepage_v" USING btree ("updated_at");
  CREATE INDEX "_homepage_v_latest_idx" ON "_homepage_v" USING btree ("latest");
  CREATE INDEX "_homepage_v_texts_order_parent" ON "_homepage_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "parceiros_blocks_hero_plat_integracoes_itens_order_idx" ON "parceiros_blocks_hero_plat_integracoes_itens" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_hero_plat_integracoes_itens_parent_id_idx" ON "parceiros_blocks_hero_plat_integracoes_itens" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_hero_plat_order_idx" ON "parceiros_blocks_hero_plat" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_hero_plat_parent_id_idx" ON "parceiros_blocks_hero_plat" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_hero_plat_path_idx" ON "parceiros_blocks_hero_plat" USING btree ("_path");
  CREATE INDEX "parceiros_blocks_hero_cad_bullets_order_idx" ON "parceiros_blocks_hero_cad_bullets" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_hero_cad_bullets_parent_id_idx" ON "parceiros_blocks_hero_cad_bullets" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_hero_cad_order_idx" ON "parceiros_blocks_hero_cad" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_hero_cad_parent_id_idx" ON "parceiros_blocks_hero_cad" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_hero_cad_path_idx" ON "parceiros_blocks_hero_cad" USING btree ("_path");
  CREATE INDEX "parceiros_blocks_faixa_nomes_order_idx" ON "parceiros_blocks_faixa_nomes" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_faixa_nomes_parent_id_idx" ON "parceiros_blocks_faixa_nomes" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_faixa_nomes_path_idx" ON "parceiros_blocks_faixa_nomes" USING btree ("_path");
  CREATE INDEX "parceiros_blocks_faixa_estat_itens_order_idx" ON "parceiros_blocks_faixa_estat_itens" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_faixa_estat_itens_parent_id_idx" ON "parceiros_blocks_faixa_estat_itens" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_faixa_estat_order_idx" ON "parceiros_blocks_faixa_estat" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_faixa_estat_parent_id_idx" ON "parceiros_blocks_faixa_estat" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_faixa_estat_path_idx" ON "parceiros_blocks_faixa_estat" USING btree ("_path");
  CREATE INDEX "parceiros_blocks_grade_cartoes_itens_order_idx" ON "parceiros_blocks_grade_cartoes_itens" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_grade_cartoes_itens_parent_id_idx" ON "parceiros_blocks_grade_cartoes_itens" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_grade_cartoes_order_idx" ON "parceiros_blocks_grade_cartoes" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_grade_cartoes_parent_id_idx" ON "parceiros_blocks_grade_cartoes" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_grade_cartoes_path_idx" ON "parceiros_blocks_grade_cartoes" USING btree ("_path");
  CREATE INDEX "parceiros_blocks_camadas_camadas_order_idx" ON "parceiros_blocks_camadas_camadas" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_camadas_camadas_parent_id_idx" ON "parceiros_blocks_camadas_camadas" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_camadas_order_idx" ON "parceiros_blocks_camadas" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_camadas_parent_id_idx" ON "parceiros_blocks_camadas" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_camadas_path_idx" ON "parceiros_blocks_camadas" USING btree ("_path");
  CREATE INDEX "parceiros_blocks_publico_alvo_order_idx" ON "parceiros_blocks_publico_alvo" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_publico_alvo_parent_id_idx" ON "parceiros_blocks_publico_alvo" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_publico_alvo_path_idx" ON "parceiros_blocks_publico_alvo" USING btree ("_path");
  CREATE INDEX "parceiros_blocks_etapas_plat_etapas_order_idx" ON "parceiros_blocks_etapas_plat_etapas" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_etapas_plat_etapas_parent_id_idx" ON "parceiros_blocks_etapas_plat_etapas" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_etapas_plat_order_idx" ON "parceiros_blocks_etapas_plat" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_etapas_plat_parent_id_idx" ON "parceiros_blocks_etapas_plat" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_etapas_plat_path_idx" ON "parceiros_blocks_etapas_plat" USING btree ("_path");
  CREATE INDEX "parceiros_blocks_passos_hub_passos_order_idx" ON "parceiros_blocks_passos_hub_passos" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_passos_hub_passos_parent_id_idx" ON "parceiros_blocks_passos_hub_passos" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_passos_hub_order_idx" ON "parceiros_blocks_passos_hub" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_passos_hub_parent_id_idx" ON "parceiros_blocks_passos_hub" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_passos_hub_path_idx" ON "parceiros_blocks_passos_hub" USING btree ("_path");
  CREATE INDEX "parceiros_blocks_casos_uso_abas_order_idx" ON "parceiros_blocks_casos_uso_abas" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_casos_uso_abas_parent_id_idx" ON "parceiros_blocks_casos_uso_abas" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_casos_uso_order_idx" ON "parceiros_blocks_casos_uso" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_casos_uso_parent_id_idx" ON "parceiros_blocks_casos_uso" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_casos_uso_path_idx" ON "parceiros_blocks_casos_uso" USING btree ("_path");
  CREATE INDEX "parceiros_blocks_metricas_secundarios_order_idx" ON "parceiros_blocks_metricas_secundarios" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_metricas_secundarios_parent_id_idx" ON "parceiros_blocks_metricas_secundarios" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_metricas_order_idx" ON "parceiros_blocks_metricas" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_metricas_parent_id_idx" ON "parceiros_blocks_metricas" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_metricas_path_idx" ON "parceiros_blocks_metricas" USING btree ("_path");
  CREATE INDEX "parceiros_blocks_depoimento_order_idx" ON "parceiros_blocks_depoimento" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_depoimento_parent_id_idx" ON "parceiros_blocks_depoimento" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_depoimento_path_idx" ON "parceiros_blocks_depoimento" USING btree ("_path");
  CREATE INDEX "parceiros_blocks_manifesto_linhas_order_idx" ON "parceiros_blocks_manifesto_linhas" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_manifesto_linhas_parent_id_idx" ON "parceiros_blocks_manifesto_linhas" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_manifesto_order_idx" ON "parceiros_blocks_manifesto" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_manifesto_parent_id_idx" ON "parceiros_blocks_manifesto" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_manifesto_path_idx" ON "parceiros_blocks_manifesto" USING btree ("_path");
  CREATE INDEX "parceiros_blocks_cartoes_link_cartoes_order_idx" ON "parceiros_blocks_cartoes_link_cartoes" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_cartoes_link_cartoes_parent_id_idx" ON "parceiros_blocks_cartoes_link_cartoes" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_cartoes_link_order_idx" ON "parceiros_blocks_cartoes_link" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_cartoes_link_parent_id_idx" ON "parceiros_blocks_cartoes_link" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_cartoes_link_path_idx" ON "parceiros_blocks_cartoes_link" USING btree ("_path");
  CREATE INDEX "parceiros_blocks_grade_nichos_order_idx" ON "parceiros_blocks_grade_nichos" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_grade_nichos_parent_id_idx" ON "parceiros_blocks_grade_nichos" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_grade_nichos_path_idx" ON "parceiros_blocks_grade_nichos" USING btree ("_path");
  CREATE INDEX "parceiros_blocks_faq_secao_itens_order_idx" ON "parceiros_blocks_faq_secao_itens" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_faq_secao_itens_parent_id_idx" ON "parceiros_blocks_faq_secao_itens" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_faq_secao_order_idx" ON "parceiros_blocks_faq_secao" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_faq_secao_parent_id_idx" ON "parceiros_blocks_faq_secao" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_faq_secao_path_idx" ON "parceiros_blocks_faq_secao" USING btree ("_path");
  CREATE INDEX "parceiros_blocks_convite_order_idx" ON "parceiros_blocks_convite" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_convite_parent_id_idx" ON "parceiros_blocks_convite" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_convite_path_idx" ON "parceiros_blocks_convite" USING btree ("_path");
  CREATE INDEX "parceiros_blocks_contato_itens_order_idx" ON "parceiros_blocks_contato_itens" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_contato_itens_parent_id_idx" ON "parceiros_blocks_contato_itens" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_contato_formulario_opcoes_volume_order_idx" ON "parceiros_blocks_contato_formulario_opcoes_volume" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_contato_formulario_opcoes_volume_parent_id_idx" ON "parceiros_blocks_contato_formulario_opcoes_volume" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_contato_order_idx" ON "parceiros_blocks_contato" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_contato_parent_id_idx" ON "parceiros_blocks_contato" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_contato_path_idx" ON "parceiros_blocks_contato" USING btree ("_path");
  CREATE INDEX "parceiros_blocks_chamada_final_order_idx" ON "parceiros_blocks_chamada_final" USING btree ("_order");
  CREATE INDEX "parceiros_blocks_chamada_final_parent_id_idx" ON "parceiros_blocks_chamada_final" USING btree ("_parent_id");
  CREATE INDEX "parceiros_blocks_chamada_final_path_idx" ON "parceiros_blocks_chamada_final" USING btree ("_path");
  CREATE INDEX "parceiros_seo_seo_og_image_idx" ON "parceiros" USING btree ("seo_og_image_id");
  CREATE INDEX "parceiros__status_idx" ON "parceiros" USING btree ("_status");
  CREATE INDEX "parceiros_texts_order_parent" ON "parceiros_texts" USING btree ("order","parent_id");
  CREATE INDEX "_parceiros_blocks_hero_plat_v_integracoes_itens_order_idx" ON "_parceiros_blocks_hero_plat_v_integracoes_itens" USING btree ("_order");
  CREATE INDEX "_parceiros_blocks_hero_plat_v_integracoes_itens_parent_id_idx" ON "_parceiros_blocks_hero_plat_v_integracoes_itens" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_blocks_hero_plat_v_order_idx" ON "_parceiros_blocks_hero_plat_v" USING btree ("_order");
  CREATE INDEX "_parceiros_blocks_hero_plat_v_parent_id_idx" ON "_parceiros_blocks_hero_plat_v" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_blocks_hero_plat_v_path_idx" ON "_parceiros_blocks_hero_plat_v" USING btree ("_path");
  CREATE INDEX "_parceiros_blocks_hero_cad_v_bullets_order_idx" ON "_parceiros_blocks_hero_cad_v_bullets" USING btree ("_order");
  CREATE INDEX "_parceiros_blocks_hero_cad_v_bullets_parent_id_idx" ON "_parceiros_blocks_hero_cad_v_bullets" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_blocks_hero_cad_v_order_idx" ON "_parceiros_blocks_hero_cad_v" USING btree ("_order");
  CREATE INDEX "_parceiros_blocks_hero_cad_v_parent_id_idx" ON "_parceiros_blocks_hero_cad_v" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_blocks_hero_cad_v_path_idx" ON "_parceiros_blocks_hero_cad_v" USING btree ("_path");
  CREATE INDEX "_parceiros_v_blocks_faixa_nomes_order_idx" ON "_parceiros_v_blocks_faixa_nomes" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_faixa_nomes_parent_id_idx" ON "_parceiros_v_blocks_faixa_nomes" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_faixa_nomes_path_idx" ON "_parceiros_v_blocks_faixa_nomes" USING btree ("_path");
  CREATE INDEX "_parceiros_blocks_faixa_estat_v_itens_order_idx" ON "_parceiros_blocks_faixa_estat_v_itens" USING btree ("_order");
  CREATE INDEX "_parceiros_blocks_faixa_estat_v_itens_parent_id_idx" ON "_parceiros_blocks_faixa_estat_v_itens" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_blocks_faixa_estat_v_order_idx" ON "_parceiros_blocks_faixa_estat_v" USING btree ("_order");
  CREATE INDEX "_parceiros_blocks_faixa_estat_v_parent_id_idx" ON "_parceiros_blocks_faixa_estat_v" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_blocks_faixa_estat_v_path_idx" ON "_parceiros_blocks_faixa_estat_v" USING btree ("_path");
  CREATE INDEX "_parceiros_v_blocks_grade_cartoes_itens_order_idx" ON "_parceiros_v_blocks_grade_cartoes_itens" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_grade_cartoes_itens_parent_id_idx" ON "_parceiros_v_blocks_grade_cartoes_itens" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_grade_cartoes_order_idx" ON "_parceiros_v_blocks_grade_cartoes" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_grade_cartoes_parent_id_idx" ON "_parceiros_v_blocks_grade_cartoes" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_grade_cartoes_path_idx" ON "_parceiros_v_blocks_grade_cartoes" USING btree ("_path");
  CREATE INDEX "_parceiros_v_blocks_camadas_camadas_order_idx" ON "_parceiros_v_blocks_camadas_camadas" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_camadas_camadas_parent_id_idx" ON "_parceiros_v_blocks_camadas_camadas" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_camadas_order_idx" ON "_parceiros_v_blocks_camadas" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_camadas_parent_id_idx" ON "_parceiros_v_blocks_camadas" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_camadas_path_idx" ON "_parceiros_v_blocks_camadas" USING btree ("_path");
  CREATE INDEX "_parceiros_v_blocks_publico_alvo_order_idx" ON "_parceiros_v_blocks_publico_alvo" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_publico_alvo_parent_id_idx" ON "_parceiros_v_blocks_publico_alvo" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_publico_alvo_path_idx" ON "_parceiros_v_blocks_publico_alvo" USING btree ("_path");
  CREATE INDEX "_parceiros_blocks_etapas_plat_v_etapas_order_idx" ON "_parceiros_blocks_etapas_plat_v_etapas" USING btree ("_order");
  CREATE INDEX "_parceiros_blocks_etapas_plat_v_etapas_parent_id_idx" ON "_parceiros_blocks_etapas_plat_v_etapas" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_blocks_etapas_plat_v_order_idx" ON "_parceiros_blocks_etapas_plat_v" USING btree ("_order");
  CREATE INDEX "_parceiros_blocks_etapas_plat_v_parent_id_idx" ON "_parceiros_blocks_etapas_plat_v" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_blocks_etapas_plat_v_path_idx" ON "_parceiros_blocks_etapas_plat_v" USING btree ("_path");
  CREATE INDEX "_parceiros_v_blocks_passos_hub_passos_order_idx" ON "_parceiros_v_blocks_passos_hub_passos" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_passos_hub_passos_parent_id_idx" ON "_parceiros_v_blocks_passos_hub_passos" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_passos_hub_order_idx" ON "_parceiros_v_blocks_passos_hub" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_passos_hub_parent_id_idx" ON "_parceiros_v_blocks_passos_hub" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_passos_hub_path_idx" ON "_parceiros_v_blocks_passos_hub" USING btree ("_path");
  CREATE INDEX "_parceiros_v_blocks_casos_uso_abas_order_idx" ON "_parceiros_v_blocks_casos_uso_abas" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_casos_uso_abas_parent_id_idx" ON "_parceiros_v_blocks_casos_uso_abas" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_casos_uso_order_idx" ON "_parceiros_v_blocks_casos_uso" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_casos_uso_parent_id_idx" ON "_parceiros_v_blocks_casos_uso" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_casos_uso_path_idx" ON "_parceiros_v_blocks_casos_uso" USING btree ("_path");
  CREATE INDEX "_parceiros_v_blocks_metricas_secundarios_order_idx" ON "_parceiros_v_blocks_metricas_secundarios" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_metricas_secundarios_parent_id_idx" ON "_parceiros_v_blocks_metricas_secundarios" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_metricas_order_idx" ON "_parceiros_v_blocks_metricas" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_metricas_parent_id_idx" ON "_parceiros_v_blocks_metricas" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_metricas_path_idx" ON "_parceiros_v_blocks_metricas" USING btree ("_path");
  CREATE INDEX "_parceiros_blocks_depoimento_v_order_idx" ON "_parceiros_blocks_depoimento_v" USING btree ("_order");
  CREATE INDEX "_parceiros_blocks_depoimento_v_parent_id_idx" ON "_parceiros_blocks_depoimento_v" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_blocks_depoimento_v_path_idx" ON "_parceiros_blocks_depoimento_v" USING btree ("_path");
  CREATE INDEX "_parceiros_v_blocks_manifesto_linhas_order_idx" ON "_parceiros_v_blocks_manifesto_linhas" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_manifesto_linhas_parent_id_idx" ON "_parceiros_v_blocks_manifesto_linhas" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_manifesto_order_idx" ON "_parceiros_v_blocks_manifesto" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_manifesto_parent_id_idx" ON "_parceiros_v_blocks_manifesto" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_manifesto_path_idx" ON "_parceiros_v_blocks_manifesto" USING btree ("_path");
  CREATE INDEX "_parceiros_v_blocks_cartoes_link_cartoes_order_idx" ON "_parceiros_v_blocks_cartoes_link_cartoes" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_cartoes_link_cartoes_parent_id_idx" ON "_parceiros_v_blocks_cartoes_link_cartoes" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_cartoes_link_order_idx" ON "_parceiros_v_blocks_cartoes_link" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_cartoes_link_parent_id_idx" ON "_parceiros_v_blocks_cartoes_link" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_cartoes_link_path_idx" ON "_parceiros_v_blocks_cartoes_link" USING btree ("_path");
  CREATE INDEX "_parceiros_v_blocks_grade_nichos_order_idx" ON "_parceiros_v_blocks_grade_nichos" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_grade_nichos_parent_id_idx" ON "_parceiros_v_blocks_grade_nichos" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_grade_nichos_path_idx" ON "_parceiros_v_blocks_grade_nichos" USING btree ("_path");
  CREATE INDEX "_parceiros_v_blocks_faq_secao_itens_order_idx" ON "_parceiros_v_blocks_faq_secao_itens" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_faq_secao_itens_parent_id_idx" ON "_parceiros_v_blocks_faq_secao_itens" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_faq_secao_order_idx" ON "_parceiros_v_blocks_faq_secao" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_faq_secao_parent_id_idx" ON "_parceiros_v_blocks_faq_secao" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_faq_secao_path_idx" ON "_parceiros_v_blocks_faq_secao" USING btree ("_path");
  CREATE INDEX "_parceiros_v_blocks_convite_order_idx" ON "_parceiros_v_blocks_convite" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_convite_parent_id_idx" ON "_parceiros_v_blocks_convite" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_convite_path_idx" ON "_parceiros_v_blocks_convite" USING btree ("_path");
  CREATE INDEX "_parceiros_v_blocks_contato_itens_order_idx" ON "_parceiros_v_blocks_contato_itens" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_contato_itens_parent_id_idx" ON "_parceiros_v_blocks_contato_itens" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_contato_formulario_opcoes_volume_order_idx" ON "_parceiros_v_blocks_contato_formulario_opcoes_volume" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_contato_formulario_opcoes_volume_parent_id_idx" ON "_parceiros_v_blocks_contato_formulario_opcoes_volume" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_contato_order_idx" ON "_parceiros_v_blocks_contato" USING btree ("_order");
  CREATE INDEX "_parceiros_v_blocks_contato_parent_id_idx" ON "_parceiros_v_blocks_contato" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_v_blocks_contato_path_idx" ON "_parceiros_v_blocks_contato" USING btree ("_path");
  CREATE INDEX "_parceiros_blocks_chamada_final_v_order_idx" ON "_parceiros_blocks_chamada_final_v" USING btree ("_order");
  CREATE INDEX "_parceiros_blocks_chamada_final_v_parent_id_idx" ON "_parceiros_blocks_chamada_final_v" USING btree ("_parent_id");
  CREATE INDEX "_parceiros_blocks_chamada_final_v_path_idx" ON "_parceiros_blocks_chamada_final_v" USING btree ("_path");
  CREATE INDEX "_parceiros_v_version_seo_version_seo_og_image_idx" ON "_parceiros_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_parceiros_v_version_version__status_idx" ON "_parceiros_v" USING btree ("version__status");
  CREATE INDEX "_parceiros_v_created_at_idx" ON "_parceiros_v" USING btree ("created_at");
  CREATE INDEX "_parceiros_v_updated_at_idx" ON "_parceiros_v" USING btree ("updated_at");
  CREATE INDEX "_parceiros_v_latest_idx" ON "_parceiros_v" USING btree ("latest");
  CREATE INDEX "_parceiros_v_texts_order_parent" ON "_parceiros_v_texts" USING btree ("order","parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "homepage_cabecalho_links" CASCADE;
  DROP TABLE "homepage_blocks_hero_plat_integracoes_itens" CASCADE;
  DROP TABLE "homepage_blocks_hero_plat" CASCADE;
  DROP TABLE "homepage_blocks_hero_cad_bullets" CASCADE;
  DROP TABLE "homepage_blocks_hero_cad" CASCADE;
  DROP TABLE "homepage_blocks_faixa_nomes" CASCADE;
  DROP TABLE "homepage_blocks_faixa_estat_itens" CASCADE;
  DROP TABLE "homepage_blocks_faixa_estat" CASCADE;
  DROP TABLE "homepage_blocks_grade_cartoes_itens" CASCADE;
  DROP TABLE "homepage_blocks_grade_cartoes" CASCADE;
  DROP TABLE "homepage_blocks_camadas_camadas" CASCADE;
  DROP TABLE "homepage_blocks_camadas" CASCADE;
  DROP TABLE "homepage_blocks_publico_alvo" CASCADE;
  DROP TABLE "homepage_blocks_etapas_plat_etapas" CASCADE;
  DROP TABLE "homepage_blocks_etapas_plat" CASCADE;
  DROP TABLE "homepage_blocks_passos_hub_passos" CASCADE;
  DROP TABLE "homepage_blocks_passos_hub" CASCADE;
  DROP TABLE "homepage_blocks_casos_uso_abas" CASCADE;
  DROP TABLE "homepage_blocks_casos_uso" CASCADE;
  DROP TABLE "homepage_blocks_metricas_secundarios" CASCADE;
  DROP TABLE "homepage_blocks_metricas" CASCADE;
  DROP TABLE "homepage_blocks_depoimento" CASCADE;
  DROP TABLE "homepage_blocks_manifesto_linhas" CASCADE;
  DROP TABLE "homepage_blocks_manifesto" CASCADE;
  DROP TABLE "homepage_blocks_cartoes_link_cartoes" CASCADE;
  DROP TABLE "homepage_blocks_cartoes_link" CASCADE;
  DROP TABLE "homepage_blocks_grade_nichos" CASCADE;
  DROP TABLE "homepage_blocks_faq_secao_itens" CASCADE;
  DROP TABLE "homepage_blocks_faq_secao" CASCADE;
  DROP TABLE "homepage_blocks_convite" CASCADE;
  DROP TABLE "homepage_blocks_contato_itens" CASCADE;
  DROP TABLE "homepage_blocks_contato_formulario_opcoes_volume" CASCADE;
  DROP TABLE "homepage_blocks_contato" CASCADE;
  DROP TABLE "homepage_blocks_chamada_final" CASCADE;
  DROP TABLE "homepage_rodape_colunas_links" CASCADE;
  DROP TABLE "homepage_rodape_colunas" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "homepage_texts" CASCADE;
  DROP TABLE "_homepage_v_version_cabecalho_links" CASCADE;
  DROP TABLE "_homepage_blocks_hero_plat_v_integracoes_itens" CASCADE;
  DROP TABLE "_homepage_blocks_hero_plat_v" CASCADE;
  DROP TABLE "_homepage_blocks_hero_cad_v_bullets" CASCADE;
  DROP TABLE "_homepage_blocks_hero_cad_v" CASCADE;
  DROP TABLE "_homepage_v_blocks_faixa_nomes" CASCADE;
  DROP TABLE "_homepage_blocks_faixa_estat_v_itens" CASCADE;
  DROP TABLE "_homepage_blocks_faixa_estat_v" CASCADE;
  DROP TABLE "_homepage_v_blocks_grade_cartoes_itens" CASCADE;
  DROP TABLE "_homepage_v_blocks_grade_cartoes" CASCADE;
  DROP TABLE "_homepage_v_blocks_camadas_camadas" CASCADE;
  DROP TABLE "_homepage_v_blocks_camadas" CASCADE;
  DROP TABLE "_homepage_v_blocks_publico_alvo" CASCADE;
  DROP TABLE "_homepage_blocks_etapas_plat_v_etapas" CASCADE;
  DROP TABLE "_homepage_blocks_etapas_plat_v" CASCADE;
  DROP TABLE "_homepage_v_blocks_passos_hub_passos" CASCADE;
  DROP TABLE "_homepage_v_blocks_passos_hub" CASCADE;
  DROP TABLE "_homepage_v_blocks_casos_uso_abas" CASCADE;
  DROP TABLE "_homepage_v_blocks_casos_uso" CASCADE;
  DROP TABLE "_homepage_v_blocks_metricas_secundarios" CASCADE;
  DROP TABLE "_homepage_v_blocks_metricas" CASCADE;
  DROP TABLE "_homepage_blocks_depoimento_v" CASCADE;
  DROP TABLE "_homepage_v_blocks_manifesto_linhas" CASCADE;
  DROP TABLE "_homepage_v_blocks_manifesto" CASCADE;
  DROP TABLE "_homepage_v_blocks_cartoes_link_cartoes" CASCADE;
  DROP TABLE "_homepage_v_blocks_cartoes_link" CASCADE;
  DROP TABLE "_homepage_v_blocks_grade_nichos" CASCADE;
  DROP TABLE "_homepage_v_blocks_faq_secao_itens" CASCADE;
  DROP TABLE "_homepage_v_blocks_faq_secao" CASCADE;
  DROP TABLE "_homepage_v_blocks_convite" CASCADE;
  DROP TABLE "_homepage_v_blocks_contato_itens" CASCADE;
  DROP TABLE "_homepage_v_blocks_contato_formulario_opcoes_volume" CASCADE;
  DROP TABLE "_homepage_v_blocks_contato" CASCADE;
  DROP TABLE "_homepage_blocks_chamada_final_v" CASCADE;
  DROP TABLE "_homepage_v_version_rodape_colunas_links" CASCADE;
  DROP TABLE "_homepage_v_version_rodape_colunas" CASCADE;
  DROP TABLE "_homepage_v" CASCADE;
  DROP TABLE "_homepage_v_texts" CASCADE;
  DROP TABLE "parceiros_blocks_hero_plat_integracoes_itens" CASCADE;
  DROP TABLE "parceiros_blocks_hero_plat" CASCADE;
  DROP TABLE "parceiros_blocks_hero_cad_bullets" CASCADE;
  DROP TABLE "parceiros_blocks_hero_cad" CASCADE;
  DROP TABLE "parceiros_blocks_faixa_nomes" CASCADE;
  DROP TABLE "parceiros_blocks_faixa_estat_itens" CASCADE;
  DROP TABLE "parceiros_blocks_faixa_estat" CASCADE;
  DROP TABLE "parceiros_blocks_grade_cartoes_itens" CASCADE;
  DROP TABLE "parceiros_blocks_grade_cartoes" CASCADE;
  DROP TABLE "parceiros_blocks_camadas_camadas" CASCADE;
  DROP TABLE "parceiros_blocks_camadas" CASCADE;
  DROP TABLE "parceiros_blocks_publico_alvo" CASCADE;
  DROP TABLE "parceiros_blocks_etapas_plat_etapas" CASCADE;
  DROP TABLE "parceiros_blocks_etapas_plat" CASCADE;
  DROP TABLE "parceiros_blocks_passos_hub_passos" CASCADE;
  DROP TABLE "parceiros_blocks_passos_hub" CASCADE;
  DROP TABLE "parceiros_blocks_casos_uso_abas" CASCADE;
  DROP TABLE "parceiros_blocks_casos_uso" CASCADE;
  DROP TABLE "parceiros_blocks_metricas_secundarios" CASCADE;
  DROP TABLE "parceiros_blocks_metricas" CASCADE;
  DROP TABLE "parceiros_blocks_depoimento" CASCADE;
  DROP TABLE "parceiros_blocks_manifesto_linhas" CASCADE;
  DROP TABLE "parceiros_blocks_manifesto" CASCADE;
  DROP TABLE "parceiros_blocks_cartoes_link_cartoes" CASCADE;
  DROP TABLE "parceiros_blocks_cartoes_link" CASCADE;
  DROP TABLE "parceiros_blocks_grade_nichos" CASCADE;
  DROP TABLE "parceiros_blocks_faq_secao_itens" CASCADE;
  DROP TABLE "parceiros_blocks_faq_secao" CASCADE;
  DROP TABLE "parceiros_blocks_convite" CASCADE;
  DROP TABLE "parceiros_blocks_contato_itens" CASCADE;
  DROP TABLE "parceiros_blocks_contato_formulario_opcoes_volume" CASCADE;
  DROP TABLE "parceiros_blocks_contato" CASCADE;
  DROP TABLE "parceiros_blocks_chamada_final" CASCADE;
  DROP TABLE "parceiros" CASCADE;
  DROP TABLE "parceiros_texts" CASCADE;
  DROP TABLE "_parceiros_blocks_hero_plat_v_integracoes_itens" CASCADE;
  DROP TABLE "_parceiros_blocks_hero_plat_v" CASCADE;
  DROP TABLE "_parceiros_blocks_hero_cad_v_bullets" CASCADE;
  DROP TABLE "_parceiros_blocks_hero_cad_v" CASCADE;
  DROP TABLE "_parceiros_v_blocks_faixa_nomes" CASCADE;
  DROP TABLE "_parceiros_blocks_faixa_estat_v_itens" CASCADE;
  DROP TABLE "_parceiros_blocks_faixa_estat_v" CASCADE;
  DROP TABLE "_parceiros_v_blocks_grade_cartoes_itens" CASCADE;
  DROP TABLE "_parceiros_v_blocks_grade_cartoes" CASCADE;
  DROP TABLE "_parceiros_v_blocks_camadas_camadas" CASCADE;
  DROP TABLE "_parceiros_v_blocks_camadas" CASCADE;
  DROP TABLE "_parceiros_v_blocks_publico_alvo" CASCADE;
  DROP TABLE "_parceiros_blocks_etapas_plat_v_etapas" CASCADE;
  DROP TABLE "_parceiros_blocks_etapas_plat_v" CASCADE;
  DROP TABLE "_parceiros_v_blocks_passos_hub_passos" CASCADE;
  DROP TABLE "_parceiros_v_blocks_passos_hub" CASCADE;
  DROP TABLE "_parceiros_v_blocks_casos_uso_abas" CASCADE;
  DROP TABLE "_parceiros_v_blocks_casos_uso" CASCADE;
  DROP TABLE "_parceiros_v_blocks_metricas_secundarios" CASCADE;
  DROP TABLE "_parceiros_v_blocks_metricas" CASCADE;
  DROP TABLE "_parceiros_blocks_depoimento_v" CASCADE;
  DROP TABLE "_parceiros_v_blocks_manifesto_linhas" CASCADE;
  DROP TABLE "_parceiros_v_blocks_manifesto" CASCADE;
  DROP TABLE "_parceiros_v_blocks_cartoes_link_cartoes" CASCADE;
  DROP TABLE "_parceiros_v_blocks_cartoes_link" CASCADE;
  DROP TABLE "_parceiros_v_blocks_grade_nichos" CASCADE;
  DROP TABLE "_parceiros_v_blocks_faq_secao_itens" CASCADE;
  DROP TABLE "_parceiros_v_blocks_faq_secao" CASCADE;
  DROP TABLE "_parceiros_v_blocks_convite" CASCADE;
  DROP TABLE "_parceiros_v_blocks_contato_itens" CASCADE;
  DROP TABLE "_parceiros_v_blocks_contato_formulario_opcoes_volume" CASCADE;
  DROP TABLE "_parceiros_v_blocks_contato" CASCADE;
  DROP TABLE "_parceiros_blocks_chamada_final_v" CASCADE;
  DROP TABLE "_parceiros_v" CASCADE;
  DROP TABLE "_parceiros_v_texts" CASCADE;
  ALTER TABLE "paginas_blocks_hero_celular" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_hero_celular_icone";
  CREATE TYPE "public"."enum_paginas_blocks_hero_celular_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_hero_celular" ALTER COLUMN "icone" SET DATA TYPE "public"."enum_paginas_blocks_hero_celular_icone" USING "icone"::"public"."enum_paginas_blocks_hero_celular_icone";
  ALTER TABLE "paginas_blocks_hero_celular" ALTER COLUMN "icone_decisor" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_hero_celular_icone_decisor";
  CREATE TYPE "public"."enum_paginas_blocks_hero_celular_icone_decisor" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_hero_celular" ALTER COLUMN "icone_decisor" SET DATA TYPE "public"."enum_paginas_blocks_hero_celular_icone_decisor" USING "icone_decisor"::"public"."enum_paginas_blocks_hero_celular_icone_decisor";
  ALTER TABLE "paginas_blocks_hero_fluxo_fluxo_etapas" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_hero_fluxo_fluxo_etapas_icone";
  CREATE TYPE "public"."enum_paginas_blocks_hero_fluxo_fluxo_etapas_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_hero_fluxo_fluxo_etapas" ALTER COLUMN "icone" SET DATA TYPE "public"."enum_paginas_blocks_hero_fluxo_fluxo_etapas_icone" USING "icone"::"public"."enum_paginas_blocks_hero_fluxo_fluxo_etapas_icone";
  ALTER TABLE "paginas_blocks_faixa_numeros_itens" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_faixa_numeros_itens_icone";
  CREATE TYPE "public"."enum_paginas_blocks_faixa_numeros_itens_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_faixa_numeros_itens" ALTER COLUMN "icone" SET DATA TYPE "public"."enum_paginas_blocks_faixa_numeros_itens_icone" USING "icone"::"public"."enum_paginas_blocks_faixa_numeros_itens_icone";
  ALTER TABLE "paginas_blocks_modulos_itens" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_modulos_itens_icone";
  CREATE TYPE "public"."enum_paginas_blocks_modulos_itens_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_modulos_itens" ALTER COLUMN "icone" SET DATA TYPE "public"."enum_paginas_blocks_modulos_itens_icone" USING "icone"::"public"."enum_paginas_blocks_modulos_itens_icone";
  ALTER TABLE "paginas_blocks_cartoes_cartoes" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_cartoes_cartoes_icone";
  CREATE TYPE "public"."enum_paginas_blocks_cartoes_cartoes_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_cartoes_cartoes" ALTER COLUMN "icone" SET DATA TYPE "public"."enum_paginas_blocks_cartoes_cartoes_icone" USING "icone"::"public"."enum_paginas_blocks_cartoes_cartoes_icone";
  ALTER TABLE "paginas_blocks_cartoes_segmento_cartoes" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_cartoes_segmento_cartoes_icone";
  CREATE TYPE "public"."enum_paginas_blocks_cartoes_segmento_cartoes_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_cartoes_segmento_cartoes" ALTER COLUMN "icone" SET DATA TYPE "public"."enum_paginas_blocks_cartoes_segmento_cartoes_icone" USING "icone"::"public"."enum_paginas_blocks_cartoes_segmento_cartoes_icone";
  ALTER TABLE "paginas_blocks_destaque_itens" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_destaque_itens_icone";
  CREATE TYPE "public"."enum_paginas_blocks_destaque_itens_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_destaque_itens" ALTER COLUMN "icone" SET DATA TYPE "public"."enum_paginas_blocks_destaque_itens_icone" USING "icone"::"public"."enum_paginas_blocks_destaque_itens_icone";
  ALTER TABLE "paginas_blocks_checklist" ALTER COLUMN "cartao_icone" SET DATA TYPE text;
  DROP TYPE "public"."enum_paginas_blocks_checklist_cartao_icone";
  CREATE TYPE "public"."enum_paginas_blocks_checklist_cartao_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "paginas_blocks_checklist" ALTER COLUMN "cartao_icone" SET DATA TYPE "public"."enum_paginas_blocks_checklist_cartao_icone" USING "cartao_icone"::"public"."enum_paginas_blocks_checklist_cartao_icone";
  ALTER TABLE "_paginas_v_blocks_hero_celular" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_hero_celular_icone";
  CREATE TYPE "public"."enum__paginas_v_blocks_hero_celular_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_hero_celular" ALTER COLUMN "icone" SET DATA TYPE "public"."enum__paginas_v_blocks_hero_celular_icone" USING "icone"::"public"."enum__paginas_v_blocks_hero_celular_icone";
  ALTER TABLE "_paginas_v_blocks_hero_celular" ALTER COLUMN "icone_decisor" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_hero_celular_icone_decisor";
  CREATE TYPE "public"."enum__paginas_v_blocks_hero_celular_icone_decisor" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_hero_celular" ALTER COLUMN "icone_decisor" SET DATA TYPE "public"."enum__paginas_v_blocks_hero_celular_icone_decisor" USING "icone_decisor"::"public"."enum__paginas_v_blocks_hero_celular_icone_decisor";
  ALTER TABLE "_paginas_v_blocks_hero_fluxo_fluxo_etapas" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_hero_fluxo_fluxo_etapas_icone";
  CREATE TYPE "public"."enum__paginas_v_blocks_hero_fluxo_fluxo_etapas_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_hero_fluxo_fluxo_etapas" ALTER COLUMN "icone" SET DATA TYPE "public"."enum__paginas_v_blocks_hero_fluxo_fluxo_etapas_icone" USING "icone"::"public"."enum__paginas_v_blocks_hero_fluxo_fluxo_etapas_icone";
  ALTER TABLE "_paginas_v_blocks_faixa_numeros_itens" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_faixa_numeros_itens_icone";
  CREATE TYPE "public"."enum__paginas_v_blocks_faixa_numeros_itens_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_faixa_numeros_itens" ALTER COLUMN "icone" SET DATA TYPE "public"."enum__paginas_v_blocks_faixa_numeros_itens_icone" USING "icone"::"public"."enum__paginas_v_blocks_faixa_numeros_itens_icone";
  ALTER TABLE "_paginas_v_blocks_modulos_itens" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_modulos_itens_icone";
  CREATE TYPE "public"."enum__paginas_v_blocks_modulos_itens_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_modulos_itens" ALTER COLUMN "icone" SET DATA TYPE "public"."enum__paginas_v_blocks_modulos_itens_icone" USING "icone"::"public"."enum__paginas_v_blocks_modulos_itens_icone";
  ALTER TABLE "_paginas_v_blocks_cartoes_cartoes" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_cartoes_cartoes_icone";
  CREATE TYPE "public"."enum__paginas_v_blocks_cartoes_cartoes_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_cartoes_cartoes" ALTER COLUMN "icone" SET DATA TYPE "public"."enum__paginas_v_blocks_cartoes_cartoes_icone" USING "icone"::"public"."enum__paginas_v_blocks_cartoes_cartoes_icone";
  ALTER TABLE "_paginas_v_blocks_cartoes_segmento_cartoes" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_cartoes_segmento_cartoes_icone";
  CREATE TYPE "public"."enum__paginas_v_blocks_cartoes_segmento_cartoes_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_cartoes_segmento_cartoes" ALTER COLUMN "icone" SET DATA TYPE "public"."enum__paginas_v_blocks_cartoes_segmento_cartoes_icone" USING "icone"::"public"."enum__paginas_v_blocks_cartoes_segmento_cartoes_icone";
  ALTER TABLE "_paginas_v_blocks_destaque_itens" ALTER COLUMN "icone" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_destaque_itens_icone";
  CREATE TYPE "public"."enum__paginas_v_blocks_destaque_itens_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_destaque_itens" ALTER COLUMN "icone" SET DATA TYPE "public"."enum__paginas_v_blocks_destaque_itens_icone" USING "icone"::"public"."enum__paginas_v_blocks_destaque_itens_icone";
  ALTER TABLE "_paginas_v_blocks_checklist" ALTER COLUMN "cartao_icone" SET DATA TYPE text;
  DROP TYPE "public"."enum__paginas_v_blocks_checklist_cartao_icone";
  CREATE TYPE "public"."enum__paginas_v_blocks_checklist_cartao_icone" AS ENUM('BadgePercent', 'BarChart3', 'BellRing', 'Briefcase', 'Building2', 'Calculator', 'CalendarCheck', 'CalendarClock', 'Car', 'CarFront', 'ClipboardCheck', 'ClipboardList', 'Clock', 'Code', 'CreditCard', 'Dumbbell', 'FileCheck', 'FileText', 'Gift', 'HeartPulse', 'Layers', 'Home', 'Megaphone', 'MessageCircle', 'PawPrint', 'PiggyBank', 'Plug', 'Receipt', 'Repeat', 'RotateCcw', 'Scissors', 'Search', 'ShieldCheck', 'Smile', 'Sparkles', 'Stethoscope', 'Store', 'Syringe', 'TrendingDown', 'TrendingUp', 'Trophy', 'UserPlus', 'Users', 'UtensilsCrossed', 'Wallet', 'Workflow', 'Wrench', 'Zap');
  ALTER TABLE "_paginas_v_blocks_checklist" ALTER COLUMN "cartao_icone" SET DATA TYPE "public"."enum__paginas_v_blocks_checklist_cartao_icone" USING "cartao_icone"::"public"."enum__paginas_v_blocks_checklist_cartao_icone";
  ALTER TABLE "paginas" DROP COLUMN "cartao_hub_nome";
  ALTER TABLE "paginas" DROP COLUMN "cartao_hub_mostrar_na_grade";
  ALTER TABLE "paginas" DROP COLUMN "cartao_hub_icone";
  ALTER TABLE "paginas" DROP COLUMN "cartao_hub_estatistica";
  ALTER TABLE "paginas" DROP COLUMN "cartao_hub_texto";
  ALTER TABLE "_paginas_v" DROP COLUMN "version_cartao_hub_nome";
  ALTER TABLE "_paginas_v" DROP COLUMN "version_cartao_hub_mostrar_na_grade";
  ALTER TABLE "_paginas_v" DROP COLUMN "version_cartao_hub_icone";
  ALTER TABLE "_paginas_v" DROP COLUMN "version_cartao_hub_estatistica";
  ALTER TABLE "_paginas_v" DROP COLUMN "version_cartao_hub_texto";
  DROP TYPE "public"."enum_paginas_cartao_hub_icone";
  DROP TYPE "public"."enum__paginas_v_version_cartao_hub_icone";
  DROP TYPE "public"."enum_homepage_blocks_hero_plat_integracoes_itens_icone";
  DROP TYPE "public"."enum_homepage_blocks_hero_cad_bullets_icone";
  DROP TYPE "public"."enum_homepage_blocks_grade_cartoes_itens_icone";
  DROP TYPE "public"."estilo";
  DROP TYPE "public"."enum_homepage_blocks_grade_cartoes_variante";
  DROP TYPE "public"."enum_homepage_blocks_camadas_camadas_icone";
  DROP TYPE "public"."enum_homepage_blocks_camadas_camadas_cor";
  DROP TYPE "public"."enum_homepage_blocks_etapas_plat_etapas_icone";
  DROP TYPE "public"."enum_homepage_blocks_passos_hub_passos_icone";
  DROP TYPE "public"."enum_homepage_blocks_faq_secao_variante";
  DROP TYPE "public"."enum_homepage_status";
  DROP TYPE "public"."enum__homepage_blocks_hero_plat_v_integracoes_itens_icone";
  DROP TYPE "public"."enum__homepage_blocks_hero_cad_v_bullets_icone";
  DROP TYPE "public"."enum__homepage_v_blocks_grade_cartoes_itens_icone";
  DROP TYPE "public"."enum__homepage_v_blocks_grade_cartoes_variante";
  DROP TYPE "public"."enum__homepage_v_blocks_camadas_camadas_icone";
  DROP TYPE "public"."enum__homepage_v_blocks_camadas_camadas_cor";
  DROP TYPE "public"."enum__homepage_blocks_etapas_plat_v_etapas_icone";
  DROP TYPE "public"."enum__homepage_v_blocks_passos_hub_passos_icone";
  DROP TYPE "public"."enum__homepage_v_blocks_faq_secao_variante";
  DROP TYPE "public"."enum__homepage_v_version_status";
  DROP TYPE "public"."enum_parceiros_blocks_hero_plat_integracoes_itens_icone";
  DROP TYPE "public"."enum_parceiros_blocks_hero_cad_bullets_icone";
  DROP TYPE "public"."enum_parceiros_blocks_grade_cartoes_itens_icone";
  DROP TYPE "public"."enum_parceiros_blocks_grade_cartoes_variante";
  DROP TYPE "public"."enum_parceiros_blocks_camadas_camadas_icone";
  DROP TYPE "public"."enum_parceiros_blocks_camadas_camadas_cor";
  DROP TYPE "public"."enum_parceiros_blocks_etapas_plat_etapas_icone";
  DROP TYPE "public"."enum_parceiros_blocks_passos_hub_passos_icone";
  DROP TYPE "public"."enum_parceiros_blocks_faq_secao_variante";
  DROP TYPE "public"."enum_parceiros_status";
  DROP TYPE "public"."enum__parceiros_blocks_hero_plat_v_integracoes_itens_icone";
  DROP TYPE "public"."enum__parceiros_blocks_hero_cad_v_bullets_icone";
  DROP TYPE "public"."enum__parceiros_v_blocks_grade_cartoes_itens_icone";
  DROP TYPE "public"."enum__parceiros_v_blocks_grade_cartoes_variante";
  DROP TYPE "public"."enum__parceiros_v_blocks_camadas_camadas_icone";
  DROP TYPE "public"."enum__parceiros_v_blocks_camadas_camadas_cor";
  DROP TYPE "public"."enum__parceiros_blocks_etapas_plat_v_etapas_icone";
  DROP TYPE "public"."enum__parceiros_v_blocks_passos_hub_passos_icone";
  DROP TYPE "public"."enum__parceiros_v_blocks_faq_secao_variante";
  DROP TYPE "public"."enum__parceiros_v_version_status";`)
}
