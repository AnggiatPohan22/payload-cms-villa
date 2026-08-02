import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('instagram', 'facebook', 'youtube', 'whatsapp', 'email', 'other');
  CREATE TYPE "public"."enum_footer_booking_cta_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__footer_v_version_social_links_platform" AS ENUM('instagram', 'facebook', 'youtube', 'whatsapp', 'email', 'other');
  CREATE TYPE "public"."enum__footer_v_version_booking_cta_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum_rooms_page_listing_c_t_a_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum_rooms_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__rooms_page_v_version_listing_c_t_a_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__rooms_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_page_final_c_t_a_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum_services_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_page_v_version_final_c_t_a_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__services_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_blog_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "footer_navigation_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_navigation_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "_footer_v_version_navigation_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v_version_navigation_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v_version_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "rooms_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_heading" varchar,
  	"hero_description" varchar,
  	"hero_image_id" integer,
  	"intro_heading" varchar,
  	"intro_description" varchar,
  	"listing_heading" varchar,
  	"listing_description" varchar,
  	"listing_c_t_a_label" varchar,
  	"listing_c_t_a_url" varchar,
  	"listing_c_t_a_open_in_new_tab" boolean DEFAULT false,
  	"listing_c_t_a_variant" "enum_rooms_page_listing_c_t_a_variant" DEFAULT 'primary',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_open_graph_image_id" integer,
  	"seo_canonical_u_r_l" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"_status" "enum_rooms_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_rooms_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_heading" varchar,
  	"version_hero_description" varchar,
  	"version_hero_image_id" integer,
  	"version_intro_heading" varchar,
  	"version_intro_description" varchar,
  	"version_listing_heading" varchar,
  	"version_listing_description" varchar,
  	"version_listing_c_t_a_label" varchar,
  	"version_listing_c_t_a_url" varchar,
  	"version_listing_c_t_a_open_in_new_tab" boolean DEFAULT false,
  	"version_listing_c_t_a_variant" "enum__rooms_page_v_version_listing_c_t_a_variant" DEFAULT 'primary',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_open_graph_image_id" integer,
  	"version_seo_canonical_u_r_l" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_seo_no_follow" boolean DEFAULT false,
  	"version__status" "enum__rooms_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "services_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_heading" varchar,
  	"hero_description" varchar,
  	"hero_image_id" integer,
  	"intro_heading" varchar,
  	"intro_description" varchar,
  	"listing_heading" varchar,
  	"listing_description" varchar,
  	"final_c_t_a_label" varchar,
  	"final_c_t_a_url" varchar,
  	"final_c_t_a_open_in_new_tab" boolean DEFAULT false,
  	"final_c_t_a_variant" "enum_services_page_final_c_t_a_variant" DEFAULT 'primary',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_open_graph_image_id" integer,
  	"seo_canonical_u_r_l" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"_status" "enum_services_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_services_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_heading" varchar,
  	"version_hero_description" varchar,
  	"version_hero_image_id" integer,
  	"version_intro_heading" varchar,
  	"version_intro_description" varchar,
  	"version_listing_heading" varchar,
  	"version_listing_description" varchar,
  	"version_final_c_t_a_label" varchar,
  	"version_final_c_t_a_url" varchar,
  	"version_final_c_t_a_open_in_new_tab" boolean DEFAULT false,
  	"version_final_c_t_a_variant" "enum__services_page_v_version_final_c_t_a_variant" DEFAULT 'primary',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_open_graph_image_id" integer,
  	"version_seo_canonical_u_r_l" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_seo_no_follow" boolean DEFAULT false,
  	"version__status" "enum__services_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "blog_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_heading" varchar,
  	"hero_description" varchar,
  	"hero_image_id" integer,
  	"intro_heading" varchar,
  	"intro_description" varchar,
  	"listing_heading" varchar,
  	"listing_description" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_open_graph_image_id" integer,
  	"seo_canonical_u_r_l" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"_status" "enum_blog_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_blog_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_heading" varchar,
  	"version_hero_description" varchar,
  	"version_hero_image_id" integer,
  	"version_intro_heading" varchar,
  	"version_intro_description" varchar,
  	"version_listing_heading" varchar,
  	"version_listing_description" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_open_graph_image_id" integer,
  	"version_seo_canonical_u_r_l" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_seo_no_follow" boolean DEFAULT false,
  	"version__status" "enum__blog_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "footer_social_links" ADD COLUMN "platform" "enum_footer_social_links_platform";
  ALTER TABLE "footer" ADD COLUMN "brand_logo_id" integer;
  ALTER TABLE "footer" ADD COLUMN "brand_description" varchar;
  ALTER TABLE "footer" ADD COLUMN "brand_tagline" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_phone" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_whatsapp" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_email" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_address" varchar;
  ALTER TABLE "footer" ADD COLUMN "booking_cta_label" varchar;
  ALTER TABLE "footer" ADD COLUMN "booking_cta_url" varchar;
  ALTER TABLE "footer" ADD COLUMN "booking_cta_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "footer" ADD COLUMN "booking_cta_variant" "enum_footer_booking_cta_variant" DEFAULT 'primary';
  ALTER TABLE "_footer_v_version_social_links" ADD COLUMN "platform" "enum__footer_v_version_social_links_platform";
  ALTER TABLE "_footer_v" ADD COLUMN "version_brand_logo_id" integer;
  ALTER TABLE "_footer_v" ADD COLUMN "version_brand_description" varchar;
  ALTER TABLE "_footer_v" ADD COLUMN "version_brand_tagline" varchar;
  ALTER TABLE "_footer_v" ADD COLUMN "version_contact_phone" varchar;
  ALTER TABLE "_footer_v" ADD COLUMN "version_contact_whatsapp" varchar;
  ALTER TABLE "_footer_v" ADD COLUMN "version_contact_email" varchar;
  ALTER TABLE "_footer_v" ADD COLUMN "version_contact_address" varchar;
  ALTER TABLE "_footer_v" ADD COLUMN "version_booking_cta_label" varchar;
  ALTER TABLE "_footer_v" ADD COLUMN "version_booking_cta_url" varchar;
  ALTER TABLE "_footer_v" ADD COLUMN "version_booking_cta_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_footer_v" ADD COLUMN "version_booking_cta_variant" "enum__footer_v_version_booking_cta_variant" DEFAULT 'primary';
  ALTER TABLE "legal_pages" ADD COLUMN "terms_updated_at" timestamp(3) with time zone;
  ALTER TABLE "legal_pages" ADD COLUMN "privacy_updated_at" timestamp(3) with time zone;
  ALTER TABLE "legal_pages" ADD COLUMN "cookies_updated_at" timestamp(3) with time zone;
  ALTER TABLE "_legal_pages_v" ADD COLUMN "version_terms_updated_at" timestamp(3) with time zone;
  ALTER TABLE "_legal_pages_v" ADD COLUMN "version_privacy_updated_at" timestamp(3) with time zone;
  ALTER TABLE "_legal_pages_v" ADD COLUMN "version_cookies_updated_at" timestamp(3) with time zone;
  ALTER TABLE "footer_navigation_columns_links" ADD CONSTRAINT "footer_navigation_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_navigation_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_navigation_columns" ADD CONSTRAINT "footer_navigation_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_navigation_columns_links" ADD CONSTRAINT "_footer_v_version_navigation_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v_version_navigation_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_navigation_columns" ADD CONSTRAINT "_footer_v_version_navigation_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_legal_links" ADD CONSTRAINT "_footer_v_version_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_page" ADD CONSTRAINT "rooms_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rooms_page" ADD CONSTRAINT "rooms_page_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rooms_page_v" ADD CONSTRAINT "_rooms_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rooms_page_v" ADD CONSTRAINT "_rooms_page_v_version_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page" ADD CONSTRAINT "services_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_page" ADD CONSTRAINT "services_page_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_page_v" ADD CONSTRAINT "_services_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_page_v" ADD CONSTRAINT "_services_page_v_version_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page" ADD CONSTRAINT "blog_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page" ADD CONSTRAINT "blog_page_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_page_v" ADD CONSTRAINT "_blog_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_page_v" ADD CONSTRAINT "_blog_page_v_version_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "footer_navigation_columns_links_order_idx" ON "footer_navigation_columns_links" USING btree ("_order");
  CREATE INDEX "footer_navigation_columns_links_parent_id_idx" ON "footer_navigation_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_navigation_columns_order_idx" ON "footer_navigation_columns" USING btree ("_order");
  CREATE INDEX "footer_navigation_columns_parent_id_idx" ON "footer_navigation_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_navigation_columns_links_order_idx" ON "_footer_v_version_navigation_columns_links" USING btree ("_order");
  CREATE INDEX "_footer_v_version_navigation_columns_links_parent_id_idx" ON "_footer_v_version_navigation_columns_links" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_navigation_columns_order_idx" ON "_footer_v_version_navigation_columns" USING btree ("_order");
  CREATE INDEX "_footer_v_version_navigation_columns_parent_id_idx" ON "_footer_v_version_navigation_columns" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_legal_links_order_idx" ON "_footer_v_version_legal_links" USING btree ("_order");
  CREATE INDEX "_footer_v_version_legal_links_parent_id_idx" ON "_footer_v_version_legal_links" USING btree ("_parent_id");
  CREATE INDEX "rooms_page_hero_image_idx" ON "rooms_page" USING btree ("hero_image_id");
  CREATE INDEX "rooms_page_seo_seo_open_graph_image_idx" ON "rooms_page" USING btree ("seo_open_graph_image_id");
  CREATE INDEX "rooms_page__status_idx" ON "rooms_page" USING btree ("_status");
  CREATE INDEX "_rooms_page_v_version_version_hero_image_idx" ON "_rooms_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_rooms_page_v_version_seo_version_seo_open_graph_image_idx" ON "_rooms_page_v" USING btree ("version_seo_open_graph_image_id");
  CREATE INDEX "_rooms_page_v_version_version__status_idx" ON "_rooms_page_v" USING btree ("version__status");
  CREATE INDEX "_rooms_page_v_created_at_idx" ON "_rooms_page_v" USING btree ("created_at");
  CREATE INDEX "_rooms_page_v_updated_at_idx" ON "_rooms_page_v" USING btree ("updated_at");
  CREATE INDEX "_rooms_page_v_latest_idx" ON "_rooms_page_v" USING btree ("latest");
  CREATE INDEX "services_page_hero_image_idx" ON "services_page" USING btree ("hero_image_id");
  CREATE INDEX "services_page_seo_seo_open_graph_image_idx" ON "services_page" USING btree ("seo_open_graph_image_id");
  CREATE INDEX "services_page__status_idx" ON "services_page" USING btree ("_status");
  CREATE INDEX "_services_page_v_version_version_hero_image_idx" ON "_services_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_services_page_v_version_seo_version_seo_open_graph_imag_idx" ON "_services_page_v" USING btree ("version_seo_open_graph_image_id");
  CREATE INDEX "_services_page_v_version_version__status_idx" ON "_services_page_v" USING btree ("version__status");
  CREATE INDEX "_services_page_v_created_at_idx" ON "_services_page_v" USING btree ("created_at");
  CREATE INDEX "_services_page_v_updated_at_idx" ON "_services_page_v" USING btree ("updated_at");
  CREATE INDEX "_services_page_v_latest_idx" ON "_services_page_v" USING btree ("latest");
  CREATE INDEX "blog_page_hero_image_idx" ON "blog_page" USING btree ("hero_image_id");
  CREATE INDEX "blog_page_seo_seo_open_graph_image_idx" ON "blog_page" USING btree ("seo_open_graph_image_id");
  CREATE INDEX "blog_page__status_idx" ON "blog_page" USING btree ("_status");
  CREATE INDEX "_blog_page_v_version_version_hero_image_idx" ON "_blog_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_blog_page_v_version_seo_version_seo_open_graph_image_idx" ON "_blog_page_v" USING btree ("version_seo_open_graph_image_id");
  CREATE INDEX "_blog_page_v_version_version__status_idx" ON "_blog_page_v" USING btree ("version__status");
  CREATE INDEX "_blog_page_v_created_at_idx" ON "_blog_page_v" USING btree ("created_at");
  CREATE INDEX "_blog_page_v_updated_at_idx" ON "_blog_page_v" USING btree ("updated_at");
  CREATE INDEX "_blog_page_v_latest_idx" ON "_blog_page_v" USING btree ("latest");
  ALTER TABLE "footer" ADD CONSTRAINT "footer_brand_logo_id_media_id_fk" FOREIGN KEY ("brand_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_footer_v" ADD CONSTRAINT "_footer_v_version_brand_logo_id_media_id_fk" FOREIGN KEY ("version_brand_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "footer_brand_brand_logo_idx" ON "footer" USING btree ("brand_logo_id");
  CREATE INDEX "_footer_v_version_brand_version_brand_logo_idx" ON "_footer_v" USING btree ("version_brand_logo_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "footer_navigation_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_navigation_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_legal_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_v_version_navigation_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_v_version_navigation_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_v_version_legal_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rooms_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_rooms_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_page_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "footer_navigation_columns_links" CASCADE;
  DROP TABLE "footer_navigation_columns" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "_footer_v_version_navigation_columns_links" CASCADE;
  DROP TABLE "_footer_v_version_navigation_columns" CASCADE;
  DROP TABLE "_footer_v_version_legal_links" CASCADE;
  DROP TABLE "rooms_page" CASCADE;
  DROP TABLE "_rooms_page_v" CASCADE;
  DROP TABLE "services_page" CASCADE;
  DROP TABLE "_services_page_v" CASCADE;
  DROP TABLE "blog_page" CASCADE;
  DROP TABLE "_blog_page_v" CASCADE;
  ALTER TABLE "footer" DROP CONSTRAINT "footer_brand_logo_id_media_id_fk";
  
  ALTER TABLE "_footer_v" DROP CONSTRAINT "_footer_v_version_brand_logo_id_media_id_fk";
  
  DROP INDEX "footer_brand_brand_logo_idx";
  DROP INDEX "_footer_v_version_brand_version_brand_logo_idx";
  ALTER TABLE "footer_social_links" DROP COLUMN "platform";
  ALTER TABLE "footer" DROP COLUMN "brand_logo_id";
  ALTER TABLE "footer" DROP COLUMN "brand_description";
  ALTER TABLE "footer" DROP COLUMN "brand_tagline";
  ALTER TABLE "footer" DROP COLUMN "contact_phone";
  ALTER TABLE "footer" DROP COLUMN "contact_whatsapp";
  ALTER TABLE "footer" DROP COLUMN "contact_email";
  ALTER TABLE "footer" DROP COLUMN "contact_address";
  ALTER TABLE "footer" DROP COLUMN "booking_cta_label";
  ALTER TABLE "footer" DROP COLUMN "booking_cta_url";
  ALTER TABLE "footer" DROP COLUMN "booking_cta_open_in_new_tab";
  ALTER TABLE "footer" DROP COLUMN "booking_cta_variant";
  ALTER TABLE "_footer_v_version_social_links" DROP COLUMN "platform";
  ALTER TABLE "_footer_v" DROP COLUMN "version_brand_logo_id";
  ALTER TABLE "_footer_v" DROP COLUMN "version_brand_description";
  ALTER TABLE "_footer_v" DROP COLUMN "version_brand_tagline";
  ALTER TABLE "_footer_v" DROP COLUMN "version_contact_phone";
  ALTER TABLE "_footer_v" DROP COLUMN "version_contact_whatsapp";
  ALTER TABLE "_footer_v" DROP COLUMN "version_contact_email";
  ALTER TABLE "_footer_v" DROP COLUMN "version_contact_address";
  ALTER TABLE "_footer_v" DROP COLUMN "version_booking_cta_label";
  ALTER TABLE "_footer_v" DROP COLUMN "version_booking_cta_url";
  ALTER TABLE "_footer_v" DROP COLUMN "version_booking_cta_open_in_new_tab";
  ALTER TABLE "_footer_v" DROP COLUMN "version_booking_cta_variant";
  ALTER TABLE "legal_pages" DROP COLUMN "terms_updated_at";
  ALTER TABLE "legal_pages" DROP COLUMN "privacy_updated_at";
  ALTER TABLE "legal_pages" DROP COLUMN "cookies_updated_at";
  ALTER TABLE "_legal_pages_v" DROP COLUMN "version_terms_updated_at";
  ALTER TABLE "_legal_pages_v" DROP COLUMN "version_privacy_updated_at";
  ALTER TABLE "_legal_pages_v" DROP COLUMN "version_cookies_updated_at";
  DROP TYPE "public"."enum_footer_social_links_platform";
  DROP TYPE "public"."enum_footer_booking_cta_variant";
  DROP TYPE "public"."enum__footer_v_version_social_links_platform";
  DROP TYPE "public"."enum__footer_v_version_booking_cta_variant";
  DROP TYPE "public"."enum_rooms_page_listing_c_t_a_variant";
  DROP TYPE "public"."enum_rooms_page_status";
  DROP TYPE "public"."enum__rooms_page_v_version_listing_c_t_a_variant";
  DROP TYPE "public"."enum__rooms_page_v_version_status";
  DROP TYPE "public"."enum_services_page_final_c_t_a_variant";
  DROP TYPE "public"."enum_services_page_status";
  DROP TYPE "public"."enum__services_page_v_version_final_c_t_a_variant";
  DROP TYPE "public"."enum__services_page_v_version_status";
  DROP TYPE "public"."enum_blog_page_status";
  DROP TYPE "public"."enum__blog_page_v_version_status";`)
}
