import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// As 11 LPs de nicho que existiam quando o tracking entrou.
const LPS_SEM_BANNER = [
  'academias',
  'agencia-marketing',
  'beleza',
  'contabilidade',
  'imobiliarias',
  'odontologia',
  'oficinas',
  'pet',
  'restaurantes',
  'saude',
  'varejo',
]

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tracking_tags_platform" AS ENUM('meta', 'ga4', 'googleAds');
  CREATE TYPE "public"."enum_tracking_events_triggers_type" AS ENUM('pageView', 'linkClick', 'formSubmit', 'scroll', 'manual', 'server');
  CREATE TYPE "public"."enum_tracking_events_triggers_match_operator" AS ENUM('equals', 'startsWith', 'contains');
  CREATE TYPE "public"."enum_tracking_events_triggers_field" AS ENUM('id', 'name', 'action');
  CREATE TYPE "public"."enum_tracking_events_triggers_page_match_operator" AS ENUM('startsWith', 'equals', 'contains');
  CREATE TYPE "public"."enum_tracking_events_destinations_server_conversion_mode" AS ENUM('fonteAdicional', 'offline');
  CREATE TYPE "public"."enum_tracking_events_commerce_type" AS ENUM('view_item_list', 'select_item', 'view_item', 'search', 'add_to_wishlist', 'add_to_cart', 'remove_from_cart', 'view_cart', 'begin_checkout', 'add_shipping_info', 'add_payment_info', 'purchase', 'lead', 'schedule');
  CREATE TYPE "public"."enum_tracking_events_frequency" AS ENUM('page', 'session', 'always');
  CREATE TYPE "public"."enum_tracking_deliveries_status" AS ENUM('pending', 'leased', 'delivered', 'retryable', 'cancelled', 'dead');
  CREATE TYPE "public"."enum_tracking_deliveries_consent_basis" AS ENUM('consent', 'page_policy_none');
  CREATE TABLE "tracking_tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"platform" "enum_tracking_tags_platform" NOT NULL,
  	"meta_pixel_id" varchar,
  	"meta_capi_token" varchar,
  	"meta_test_event_code" varchar,
  	"meta_clear_capi_token" boolean,
  	"meta_clear_test_event_code" boolean,
  	"ga4_measurement_id" varchar,
  	"ga4_api_secret" varchar,
  	"ga4_clear_api_secret" boolean,
  	"google_ads_tag_id" varchar,
  	"google_ads_merchant_id" varchar,
  	"google_ads_feed_country" varchar,
  	"google_ads_feed_language" varchar,
  	"google_ads_customer_id" varchar,
  	"google_ads_login_customer_id" varchar,
  	"google_ads_service_account" varchar,
  	"google_ads_clear_service_account" boolean,
  	"google_ads_validate_only" boolean DEFAULT false,
  	"credentials_configured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tracking_events_triggers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_tracking_events_triggers_type" NOT NULL,
  	"include_query" boolean DEFAULT false,
  	"match_operator" "enum_tracking_events_triggers_match_operator",
  	"match_value" varchar,
  	"field" "enum_tracking_events_triggers_field",
  	"value" varchar,
  	"percentage" numeric,
  	"key" varchar,
  	"page_enabled" boolean DEFAULT false,
  	"page_match_operator" "enum_tracking_events_triggers_page_match_operator" DEFAULT 'startsWith',
  	"page_match_value" varchar,
  	"page_include_query" boolean DEFAULT false
  );
  
  CREATE TABLE "tracking_events_destinations_params" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "tracking_events_destinations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag_id" integer NOT NULL,
  	"event_name" varchar,
  	"conversion_label" varchar,
  	"conversion_action_id" varchar,
  	"server_conversion_mode" "enum_tracking_events_destinations_server_conversion_mode",
  	"enabled" boolean DEFAULT true
  );
  
  CREATE TABLE "tracking_events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"key" varchar NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"commerce_type" "enum_tracking_events_commerce_type",
  	"frequency" "enum_tracking_events_frequency" DEFAULT 'page' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tracking_deliveries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"event_key" varchar NOT NULL,
  	"status" "enum_tracking_deliveries_status" DEFAULT 'pending' NOT NULL,
  	"idempotency_key" varchar NOT NULL,
  	"order_key" varchar,
  	"destination_id" varchar NOT NULL,
  	"event_id" varchar NOT NULL,
  	"subject_id" varchar NOT NULL,
  	"snapshot" varchar,
  	"attempts" numeric DEFAULT 0,
  	"leased_until" timestamp(3) with time zone,
  	"next_attempt_at" timestamp(3) with time zone,
  	"last_error" varchar,
  	"last_latency_ms" numeric,
  	"consent_basis" "enum_tracking_deliveries_consent_basis",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tracking_vault" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"entry_id" varchar NOT NULL,
  	"tag_id" varchar NOT NULL,
  	"credential_type" varchar NOT NULL,
  	"envelope" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "paginas" ADD COLUMN "tracking_consent_required" boolean DEFAULT true;
  ALTER TABLE "_paginas_v" ADD COLUMN "version_tracking_consent_required" boolean DEFAULT true;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tracking_tags_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tracking_events_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tracking_deliveries_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tracking_vault_id" integer;
  ALTER TABLE "tracking_events_triggers" ADD CONSTRAINT "tracking_events_triggers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tracking_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tracking_events_destinations_params" ADD CONSTRAINT "tracking_events_destinations_params_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tracking_events_destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tracking_events_destinations" ADD CONSTRAINT "tracking_events_destinations_tag_id_tracking_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tracking_tags"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tracking_events_destinations" ADD CONSTRAINT "tracking_events_destinations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tracking_events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "tracking_tags_updated_at_idx" ON "tracking_tags" USING btree ("updated_at");
  CREATE INDEX "tracking_tags_created_at_idx" ON "tracking_tags" USING btree ("created_at");
  CREATE INDEX "tracking_events_triggers_order_idx" ON "tracking_events_triggers" USING btree ("_order");
  CREATE INDEX "tracking_events_triggers_parent_id_idx" ON "tracking_events_triggers" USING btree ("_parent_id");
  CREATE INDEX "tracking_events_destinations_params_order_idx" ON "tracking_events_destinations_params" USING btree ("_order");
  CREATE INDEX "tracking_events_destinations_params_parent_id_idx" ON "tracking_events_destinations_params" USING btree ("_parent_id");
  CREATE INDEX "tracking_events_destinations_order_idx" ON "tracking_events_destinations" USING btree ("_order");
  CREATE INDEX "tracking_events_destinations_parent_id_idx" ON "tracking_events_destinations" USING btree ("_parent_id");
  CREATE INDEX "tracking_events_destinations_tag_idx" ON "tracking_events_destinations" USING btree ("tag_id");
  CREATE UNIQUE INDEX "tracking_events_key_idx" ON "tracking_events" USING btree ("key");
  CREATE INDEX "tracking_events_updated_at_idx" ON "tracking_events" USING btree ("updated_at");
  CREATE INDEX "tracking_events_created_at_idx" ON "tracking_events" USING btree ("created_at");
  CREATE INDEX "tracking_deliveries_event_key_idx" ON "tracking_deliveries" USING btree ("event_key");
  CREATE INDEX "tracking_deliveries_status_idx" ON "tracking_deliveries" USING btree ("status");
  CREATE UNIQUE INDEX "tracking_deliveries_idempotency_key_idx" ON "tracking_deliveries" USING btree ("idempotency_key");
  CREATE UNIQUE INDEX "tracking_deliveries_order_key_idx" ON "tracking_deliveries" USING btree ("order_key");
  CREATE INDEX "tracking_deliveries_destination_id_idx" ON "tracking_deliveries" USING btree ("destination_id");
  CREATE INDEX "tracking_deliveries_subject_id_idx" ON "tracking_deliveries" USING btree ("subject_id");
  CREATE INDEX "tracking_deliveries_next_attempt_at_idx" ON "tracking_deliveries" USING btree ("next_attempt_at");
  CREATE INDEX "tracking_deliveries_consent_basis_idx" ON "tracking_deliveries" USING btree ("consent_basis");
  CREATE INDEX "tracking_deliveries_updated_at_idx" ON "tracking_deliveries" USING btree ("updated_at");
  CREATE INDEX "tracking_deliveries_created_at_idx" ON "tracking_deliveries" USING btree ("created_at");
  CREATE UNIQUE INDEX "tracking_vault_entry_id_idx" ON "tracking_vault" USING btree ("entry_id");
  CREATE INDEX "tracking_vault_tag_id_idx" ON "tracking_vault" USING btree ("tag_id");
  CREATE INDEX "tracking_vault_updated_at_idx" ON "tracking_vault" USING btree ("updated_at");
  CREATE INDEX "tracking_vault_created_at_idx" ON "tracking_vault" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tracking_tags_fk" FOREIGN KEY ("tracking_tags_id") REFERENCES "public"."tracking_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tracking_events_fk" FOREIGN KEY ("tracking_events_id") REFERENCES "public"."tracking_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tracking_deliveries_fk" FOREIGN KEY ("tracking_deliveries_id") REFERENCES "public"."tracking_deliveries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tracking_vault_fk" FOREIGN KEY ("tracking_vault_id") REFERENCES "public"."tracking_vault"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_tracking_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tracking_tags_id");
  CREATE INDEX "payload_locked_documents_rels_tracking_events_id_idx" ON "payload_locked_documents_rels" USING btree ("tracking_events_id");
  CREATE INDEX "payload_locked_documents_rels_tracking_deliveries_id_idx" ON "payload_locked_documents_rels" USING btree ("tracking_deliveries_id");
  CREATE INDEX "payload_locked_documents_rels_tracking_vault_id_idx" ON "payload_locked_documents_rels" USING btree ("tracking_vault_id");`)

  // Dados: as 11 LPs de campanha disparam sem banner (decisão do Filipe). A
  // coluna nasce true (exigir) para qualquer outra página, atual ou futura.
  await db.execute(sql`
  UPDATE "paginas" SET "tracking_consent_required" = false WHERE "slug" IN (${sql.join(
    LPS_SEM_BANNER.map((slug) => sql`${slug}`),
    sql`, `,
  )})`)
  await db.execute(sql`
  UPDATE "_paginas_v" SET "version_tracking_consent_required" = false WHERE "version_slug" IN (${sql.join(
    LPS_SEM_BANNER.map((slug) => sql`${slug}`),
    sql`, `,
  )})`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tracking_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tracking_events_triggers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tracking_events_destinations_params" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tracking_events_destinations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tracking_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tracking_deliveries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tracking_vault" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "tracking_tags" CASCADE;
  DROP TABLE "tracking_events_triggers" CASCADE;
  DROP TABLE "tracking_events_destinations_params" CASCADE;
  DROP TABLE "tracking_events_destinations" CASCADE;
  DROP TABLE "tracking_events" CASCADE;
  DROP TABLE "tracking_deliveries" CASCADE;
  DROP TABLE "tracking_vault" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tracking_tags_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tracking_events_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tracking_deliveries_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tracking_vault_fk";
  
  DROP INDEX "payload_locked_documents_rels_tracking_tags_id_idx";
  DROP INDEX "payload_locked_documents_rels_tracking_events_id_idx";
  DROP INDEX "payload_locked_documents_rels_tracking_deliveries_id_idx";
  DROP INDEX "payload_locked_documents_rels_tracking_vault_id_idx";
  ALTER TABLE "paginas" DROP COLUMN "tracking_consent_required";
  ALTER TABLE "_paginas_v" DROP COLUMN "version_tracking_consent_required";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tracking_tags_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tracking_events_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tracking_deliveries_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tracking_vault_id";
  DROP TYPE "public"."enum_tracking_tags_platform";
  DROP TYPE "public"."enum_tracking_events_triggers_type";
  DROP TYPE "public"."enum_tracking_events_triggers_match_operator";
  DROP TYPE "public"."enum_tracking_events_triggers_field";
  DROP TYPE "public"."enum_tracking_events_triggers_page_match_operator";
  DROP TYPE "public"."enum_tracking_events_destinations_server_conversion_mode";
  DROP TYPE "public"."enum_tracking_events_commerce_type";
  DROP TYPE "public"."enum_tracking_events_frequency";
  DROP TYPE "public"."enum_tracking_deliveries_status";
  DROP TYPE "public"."enum_tracking_deliveries_consent_basis";`)
}
