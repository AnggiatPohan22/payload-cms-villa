import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_cta_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_version_cta_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_blog_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_home_page_journal_preview_cta_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__home_page_v_version_journal_preview_cta_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum_reservation_page_whats_app_c_t_a_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum_reservation_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__reservation_page_v_version_whats_app_c_t_a_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__reservation_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_legal_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__legal_pages_v_version_status" AS ENUM('draft', 'published');
  ALTER TYPE "public"."enum_header_navigation_items_page_u_r_l" ADD VALUE '/about-us' BEFORE '/rooms';
  ALTER TYPE "public"."enum_header_navigation_items_page_u_r_l" ADD VALUE '/villa' BEFORE '/rooms';
  ALTER TYPE "public"."enum_header_navigation_items_page_u_r_l" ADD VALUE '/reservation' BEFORE '/facilities';
  ALTER TYPE "public"."enum_header_navigation_items_page_u_r_l" ADD VALUE '/services' BEFORE '/gallery';
  ALTER TYPE "public"."enum_header_navigation_items_page_u_r_l" ADD VALUE '/blog' BEFORE '/promotions';
  ALTER TYPE "public"."enum__header_v_version_navigation_items_page_u_r_l" ADD VALUE '/about-us' BEFORE '/rooms';
  ALTER TYPE "public"."enum__header_v_version_navigation_items_page_u_r_l" ADD VALUE '/villa' BEFORE '/rooms';
  ALTER TYPE "public"."enum__header_v_version_navigation_items_page_u_r_l" ADD VALUE '/reservation' BEFORE '/facilities';
  ALTER TYPE "public"."enum__header_v_version_navigation_items_page_u_r_l" ADD VALUE '/services' BEFORE '/gallery';
  ALTER TYPE "public"."enum__header_v_version_navigation_items_page_u_r_l" ADD VALUE '/blog' BEFORE '/promotions';
  CREATE TABLE "rooms_inclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "rooms_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "rooms_experiences" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "_rooms_v_version_inclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_rooms_v_version_standards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_rooms_v_version_experiences" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "services_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "services_rituals" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"category" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"duration" varchar,
  	"featured" boolean DEFAULT false
  );
  
  CREATE TABLE "services_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"caption" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"eyebrow" varchar,
  	"summary" varchar,
  	"description" jsonb,
  	"featured_image_id" integer,
  	"detail_image_id" integer,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_open_in_new_tab" boolean DEFAULT false,
  	"cta_variant" "enum_services_cta_variant" DEFAULT 'primary',
  	"duration" varchar,
  	"location" varchar,
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"status" "enum_services_status" DEFAULT 'draft',
  	"published_at" timestamp(3) with time zone,
  	"updated_by_id" integer,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_open_graph_image_id" integer,
  	"seo_canonical_u_r_l" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_services_v_version_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_rituals" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"category" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"duration" varchar,
  	"featured" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_eyebrow" varchar,
  	"version_summary" varchar,
  	"version_description" jsonb,
  	"version_featured_image_id" integer,
  	"version_detail_image_id" integer,
  	"version_cta_label" varchar,
  	"version_cta_url" varchar,
  	"version_cta_open_in_new_tab" boolean DEFAULT false,
  	"version_cta_variant" "enum__services_v_version_cta_variant" DEFAULT 'primary',
  	"version_duration" varchar,
  	"version_location" varchar,
  	"version_featured" boolean DEFAULT false,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_status" "enum__services_v_version_status" DEFAULT 'draft',
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_by_id" integer,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_open_graph_image_id" integer,
  	"version_seo_canonical_u_r_l" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_seo_no_follow" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "blog" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"category" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"featured_image_id" integer,
  	"read_time" varchar,
  	"article_date" timestamp(3) with time zone,
  	"featured" boolean DEFAULT false,
  	"curator_choice" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"status" "enum_blog_status" DEFAULT 'draft',
  	"published_at" timestamp(3) with time zone,
  	"updated_by_id" integer,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_open_graph_image_id" integer,
  	"seo_canonical_u_r_l" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_blog_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_blog_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_category" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_featured_image_id" integer,
  	"version_read_time" varchar,
  	"version_article_date" timestamp(3) with time zone,
  	"version_featured" boolean DEFAULT false,
  	"version_curator_choice" boolean DEFAULT false,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_status" "enum__blog_v_version_status" DEFAULT 'draft',
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_by_id" integer,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_open_graph_image_id" integer,
  	"version_seo_canonical_u_r_l" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_seo_no_follow" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__blog_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "reservation_page_search_preview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"detail" varchar
  );
  
  CREATE TABLE "reservation_page_booking_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "reservation_page_room_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"room_id" integer,
  	"reviews" varchar,
  	"availability_label" varchar,
  	"deposit" varchar,
  	"beds" varchar,
  	"passenger" varchar,
  	"breakfast" varchar,
  	"selected" boolean DEFAULT false,
  	"badge" varchar
  );
  
  CREATE TABLE "reservation_page_overview_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"room_id" integer,
  	"room_count" varchar,
  	"passenger" varchar,
  	"subtotal" varchar
  );
  
  CREATE TABLE "reservation_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_heading" varchar,
  	"hero_description" varchar,
  	"hero_image_id" integer,
  	"overview_arrival" varchar,
  	"overview_departure" varchar,
  	"overview_total" varchar,
  	"whats_app_c_t_a_label" varchar,
  	"whats_app_c_t_a_url" varchar,
  	"whats_app_c_t_a_open_in_new_tab" boolean DEFAULT false,
  	"whats_app_c_t_a_variant" "enum_reservation_page_whats_app_c_t_a_variant" DEFAULT 'primary',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_open_graph_image_id" integer,
  	"seo_canonical_u_r_l" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"_status" "enum_reservation_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_reservation_page_v_version_search_preview" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"detail" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_reservation_page_v_version_booking_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_reservation_page_v_version_room_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"room_id" integer,
  	"reviews" varchar,
  	"availability_label" varchar,
  	"deposit" varchar,
  	"beds" varchar,
  	"passenger" varchar,
  	"breakfast" varchar,
  	"selected" boolean DEFAULT false,
  	"badge" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_reservation_page_v_version_overview_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"room_id" integer,
  	"room_count" varchar,
  	"passenger" varchar,
  	"subtotal" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_reservation_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_heading" varchar,
  	"version_hero_description" varchar,
  	"version_hero_image_id" integer,
  	"version_overview_arrival" varchar,
  	"version_overview_departure" varchar,
  	"version_overview_total" varchar,
  	"version_whats_app_c_t_a_label" varchar,
  	"version_whats_app_c_t_a_url" varchar,
  	"version_whats_app_c_t_a_open_in_new_tab" boolean DEFAULT false,
  	"version_whats_app_c_t_a_variant" "enum__reservation_page_v_version_whats_app_c_t_a_variant" DEFAULT 'primary',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_open_graph_image_id" integer,
  	"version_seo_canonical_u_r_l" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_seo_no_follow" boolean DEFAULT false,
  	"version__status" "enum__reservation_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "legal_pages_terms_sections_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"paragraph" varchar
  );
  
  CREATE TABLE "legal_pages_terms_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "legal_pages_privacy_sections_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"paragraph" varchar
  );
  
  CREATE TABLE "legal_pages_privacy_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "legal_pages_cookies_sections_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"paragraph" varchar
  );
  
  CREATE TABLE "legal_pages_cookies_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "legal_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"terms_eyebrow" varchar,
  	"terms_title" varchar,
  	"terms_summary" varchar,
  	"terms_updated_at_label" varchar,
  	"terms_seo_meta_title" varchar,
  	"terms_seo_meta_description" varchar,
  	"terms_seo_open_graph_image_id" integer,
  	"terms_seo_canonical_u_r_l" varchar,
  	"terms_seo_no_index" boolean DEFAULT false,
  	"terms_seo_no_follow" boolean DEFAULT false,
  	"privacy_eyebrow" varchar,
  	"privacy_title" varchar,
  	"privacy_summary" varchar,
  	"privacy_updated_at_label" varchar,
  	"privacy_seo_meta_title" varchar,
  	"privacy_seo_meta_description" varchar,
  	"privacy_seo_open_graph_image_id" integer,
  	"privacy_seo_canonical_u_r_l" varchar,
  	"privacy_seo_no_index" boolean DEFAULT false,
  	"privacy_seo_no_follow" boolean DEFAULT false,
  	"cookies_eyebrow" varchar,
  	"cookies_title" varchar,
  	"cookies_summary" varchar,
  	"cookies_updated_at_label" varchar,
  	"cookies_seo_meta_title" varchar,
  	"cookies_seo_meta_description" varchar,
  	"cookies_seo_open_graph_image_id" integer,
  	"cookies_seo_canonical_u_r_l" varchar,
  	"cookies_seo_no_index" boolean DEFAULT false,
  	"cookies_seo_no_follow" boolean DEFAULT false,
  	"_status" "enum_legal_pages_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_legal_pages_v_version_terms_sections_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"paragraph" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_legal_pages_v_version_terms_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_legal_pages_v_version_privacy_sections_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"paragraph" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_legal_pages_v_version_privacy_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_legal_pages_v_version_cookies_sections_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"paragraph" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_legal_pages_v_version_cookies_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_legal_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_terms_eyebrow" varchar,
  	"version_terms_title" varchar,
  	"version_terms_summary" varchar,
  	"version_terms_updated_at_label" varchar,
  	"version_terms_seo_meta_title" varchar,
  	"version_terms_seo_meta_description" varchar,
  	"version_terms_seo_open_graph_image_id" integer,
  	"version_terms_seo_canonical_u_r_l" varchar,
  	"version_terms_seo_no_index" boolean DEFAULT false,
  	"version_terms_seo_no_follow" boolean DEFAULT false,
  	"version_privacy_eyebrow" varchar,
  	"version_privacy_title" varchar,
  	"version_privacy_summary" varchar,
  	"version_privacy_updated_at_label" varchar,
  	"version_privacy_seo_meta_title" varchar,
  	"version_privacy_seo_meta_description" varchar,
  	"version_privacy_seo_open_graph_image_id" integer,
  	"version_privacy_seo_canonical_u_r_l" varchar,
  	"version_privacy_seo_no_index" boolean DEFAULT false,
  	"version_privacy_seo_no_follow" boolean DEFAULT false,
  	"version_cookies_eyebrow" varchar,
  	"version_cookies_title" varchar,
  	"version_cookies_summary" varchar,
  	"version_cookies_updated_at_label" varchar,
  	"version_cookies_seo_meta_title" varchar,
  	"version_cookies_seo_meta_description" varchar,
  	"version_cookies_seo_open_graph_image_id" integer,
  	"version_cookies_seo_canonical_u_r_l" varchar,
  	"version_cookies_seo_no_index" boolean DEFAULT false,
  	"version_cookies_seo_no_follow" boolean DEFAULT false,
  	"version__status" "enum__legal_pages_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "rooms" ADD COLUMN "category" varchar;
  ALTER TABLE "rooms" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "rooms" ADD COLUMN "capacity_label" varchar;
  ALTER TABLE "rooms" ADD COLUMN "rate_note" varchar;
  ALTER TABLE "rooms" ADD COLUMN "reviews_label" varchar;
  ALTER TABLE "rooms" ADD COLUMN "availability_label" varchar;
  ALTER TABLE "rooms" ADD COLUMN "deposit_label" varchar;
  ALTER TABLE "rooms" ADD COLUMN "passenger_label" varchar;
  ALTER TABLE "rooms" ADD COLUMN "best_for" varchar;
  ALTER TABLE "_rooms_v" ADD COLUMN "version_category" varchar;
  ALTER TABLE "_rooms_v" ADD COLUMN "version_hero_image_id" integer;
  ALTER TABLE "_rooms_v" ADD COLUMN "version_capacity_label" varchar;
  ALTER TABLE "_rooms_v" ADD COLUMN "version_rate_note" varchar;
  ALTER TABLE "_rooms_v" ADD COLUMN "version_reviews_label" varchar;
  ALTER TABLE "_rooms_v" ADD COLUMN "version_availability_label" varchar;
  ALTER TABLE "_rooms_v" ADD COLUMN "version_deposit_label" varchar;
  ALTER TABLE "_rooms_v" ADD COLUMN "version_passenger_label" varchar;
  ALTER TABLE "_rooms_v" ADD COLUMN "version_best_for" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "blog_id" integer;
  ALTER TABLE "home_page" ADD COLUMN "signature_experiences_heading" varchar;
  ALTER TABLE "home_page" ADD COLUMN "signature_experiences_description" varchar;
  ALTER TABLE "home_page" ADD COLUMN "signature_experiences_active" boolean DEFAULT true;
  ALTER TABLE "home_page" ADD COLUMN "signature_experiences_sort_order" numeric DEFAULT 0;
  ALTER TABLE "home_page" ADD COLUMN "journal_preview_heading" varchar;
  ALTER TABLE "home_page" ADD COLUMN "journal_preview_description" varchar;
  ALTER TABLE "home_page" ADD COLUMN "journal_preview_cta_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "journal_preview_cta_url" varchar;
  ALTER TABLE "home_page" ADD COLUMN "journal_preview_cta_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "home_page" ADD COLUMN "journal_preview_cta_variant" "enum_home_page_journal_preview_cta_variant" DEFAULT 'primary';
  ALTER TABLE "home_page" ADD COLUMN "journal_preview_active" boolean DEFAULT true;
  ALTER TABLE "home_page" ADD COLUMN "journal_preview_sort_order" numeric DEFAULT 0;
  ALTER TABLE "home_page_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "home_page_rels" ADD COLUMN "blog_id" integer;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_signature_experiences_heading" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_signature_experiences_description" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_signature_experiences_active" boolean DEFAULT true;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_signature_experiences_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_journal_preview_heading" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_journal_preview_description" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_journal_preview_cta_label" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_journal_preview_cta_url" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_journal_preview_cta_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_journal_preview_cta_variant" "enum__home_page_v_version_journal_preview_cta_variant" DEFAULT 'primary';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_journal_preview_active" boolean DEFAULT true;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_journal_preview_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_home_page_v_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "_home_page_v_rels" ADD COLUMN "blog_id" integer;
  ALTER TABLE "rooms_inclusions" ADD CONSTRAINT "rooms_inclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_standards" ADD CONSTRAINT "rooms_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_experiences" ADD CONSTRAINT "rooms_experiences_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rooms_experiences" ADD CONSTRAINT "rooms_experiences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_inclusions" ADD CONSTRAINT "_rooms_v_version_inclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_standards" ADD CONSTRAINT "_rooms_v_version_standards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_experiences" ADD CONSTRAINT "_rooms_v_version_experiences_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_experiences" ADD CONSTRAINT "_rooms_v_version_experiences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_stats" ADD CONSTRAINT "services_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rituals" ADD CONSTRAINT "services_rituals_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_rituals" ADD CONSTRAINT "services_rituals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_gallery" ADD CONSTRAINT "services_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_gallery" ADD CONSTRAINT "services_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_detail_image_id_media_id_fk" FOREIGN KEY ("detail_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_version_stats" ADD CONSTRAINT "_services_v_version_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_rituals" ADD CONSTRAINT "_services_v_version_rituals_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_version_rituals" ADD CONSTRAINT "_services_v_version_rituals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_gallery" ADD CONSTRAINT "_services_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_version_gallery" ADD CONSTRAINT "_services_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_detail_image_id_media_id_fk" FOREIGN KEY ("version_detail_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_updated_by_id_users_id_fk" FOREIGN KEY ("version_updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog" ADD CONSTRAINT "blog_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog" ADD CONSTRAINT "blog_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog" ADD CONSTRAINT "blog_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_parent_id_blog_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_version_updated_by_id_users_id_fk" FOREIGN KEY ("version_updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_version_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reservation_page_search_preview" ADD CONSTRAINT "reservation_page_search_preview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reservation_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reservation_page_booking_benefits" ADD CONSTRAINT "reservation_page_booking_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reservation_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reservation_page_room_details" ADD CONSTRAINT "reservation_page_room_details_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reservation_page_room_details" ADD CONSTRAINT "reservation_page_room_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reservation_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reservation_page_overview_items" ADD CONSTRAINT "reservation_page_overview_items_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reservation_page_overview_items" ADD CONSTRAINT "reservation_page_overview_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reservation_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reservation_page" ADD CONSTRAINT "reservation_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reservation_page" ADD CONSTRAINT "reservation_page_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_reservation_page_v_version_search_preview" ADD CONSTRAINT "_reservation_page_v_version_search_preview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reservation_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reservation_page_v_version_booking_benefits" ADD CONSTRAINT "_reservation_page_v_version_booking_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reservation_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reservation_page_v_version_room_details" ADD CONSTRAINT "_reservation_page_v_version_room_details_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_reservation_page_v_version_room_details" ADD CONSTRAINT "_reservation_page_v_version_room_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reservation_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reservation_page_v_version_overview_items" ADD CONSTRAINT "_reservation_page_v_version_overview_items_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_reservation_page_v_version_overview_items" ADD CONSTRAINT "_reservation_page_v_version_overview_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reservation_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reservation_page_v" ADD CONSTRAINT "_reservation_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_reservation_page_v" ADD CONSTRAINT "_reservation_page_v_version_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "legal_pages_terms_sections_body" ADD CONSTRAINT "legal_pages_terms_sections_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_pages_terms_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_pages_terms_sections" ADD CONSTRAINT "legal_pages_terms_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_pages_privacy_sections_body" ADD CONSTRAINT "legal_pages_privacy_sections_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_pages_privacy_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_pages_privacy_sections" ADD CONSTRAINT "legal_pages_privacy_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_pages_cookies_sections_body" ADD CONSTRAINT "legal_pages_cookies_sections_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_pages_cookies_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_pages_cookies_sections" ADD CONSTRAINT "legal_pages_cookies_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_pages" ADD CONSTRAINT "legal_pages_terms_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("terms_seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "legal_pages" ADD CONSTRAINT "legal_pages_privacy_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("privacy_seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "legal_pages" ADD CONSTRAINT "legal_pages_cookies_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("cookies_seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_legal_pages_v_version_terms_sections_body" ADD CONSTRAINT "_legal_pages_v_version_terms_sections_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_legal_pages_v_version_terms_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_legal_pages_v_version_terms_sections" ADD CONSTRAINT "_legal_pages_v_version_terms_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_legal_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_legal_pages_v_version_privacy_sections_body" ADD CONSTRAINT "_legal_pages_v_version_privacy_sections_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_legal_pages_v_version_privacy_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_legal_pages_v_version_privacy_sections" ADD CONSTRAINT "_legal_pages_v_version_privacy_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_legal_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_legal_pages_v_version_cookies_sections_body" ADD CONSTRAINT "_legal_pages_v_version_cookies_sections_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_legal_pages_v_version_cookies_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_legal_pages_v_version_cookies_sections" ADD CONSTRAINT "_legal_pages_v_version_cookies_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_legal_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_legal_pages_v" ADD CONSTRAINT "_legal_pages_v_version_terms_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_terms_seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_legal_pages_v" ADD CONSTRAINT "_legal_pages_v_version_privacy_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_privacy_seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_legal_pages_v" ADD CONSTRAINT "_legal_pages_v_version_cookies_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_cookies_seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "rooms_inclusions_order_idx" ON "rooms_inclusions" USING btree ("_order");
  CREATE INDEX "rooms_inclusions_parent_id_idx" ON "rooms_inclusions" USING btree ("_parent_id");
  CREATE INDEX "rooms_standards_order_idx" ON "rooms_standards" USING btree ("_order");
  CREATE INDEX "rooms_standards_parent_id_idx" ON "rooms_standards" USING btree ("_parent_id");
  CREATE INDEX "rooms_experiences_order_idx" ON "rooms_experiences" USING btree ("_order");
  CREATE INDEX "rooms_experiences_parent_id_idx" ON "rooms_experiences" USING btree ("_parent_id");
  CREATE INDEX "rooms_experiences_image_idx" ON "rooms_experiences" USING btree ("image_id");
  CREATE INDEX "_rooms_v_version_inclusions_order_idx" ON "_rooms_v_version_inclusions" USING btree ("_order");
  CREATE INDEX "_rooms_v_version_inclusions_parent_id_idx" ON "_rooms_v_version_inclusions" USING btree ("_parent_id");
  CREATE INDEX "_rooms_v_version_standards_order_idx" ON "_rooms_v_version_standards" USING btree ("_order");
  CREATE INDEX "_rooms_v_version_standards_parent_id_idx" ON "_rooms_v_version_standards" USING btree ("_parent_id");
  CREATE INDEX "_rooms_v_version_experiences_order_idx" ON "_rooms_v_version_experiences" USING btree ("_order");
  CREATE INDEX "_rooms_v_version_experiences_parent_id_idx" ON "_rooms_v_version_experiences" USING btree ("_parent_id");
  CREATE INDEX "_rooms_v_version_experiences_image_idx" ON "_rooms_v_version_experiences" USING btree ("image_id");
  CREATE INDEX "services_stats_order_idx" ON "services_stats" USING btree ("_order");
  CREATE INDEX "services_stats_parent_id_idx" ON "services_stats" USING btree ("_parent_id");
  CREATE INDEX "services_rituals_order_idx" ON "services_rituals" USING btree ("_order");
  CREATE INDEX "services_rituals_parent_id_idx" ON "services_rituals" USING btree ("_parent_id");
  CREATE INDEX "services_rituals_image_idx" ON "services_rituals" USING btree ("image_id");
  CREATE INDEX "services_gallery_order_idx" ON "services_gallery" USING btree ("_order");
  CREATE INDEX "services_gallery_parent_id_idx" ON "services_gallery" USING btree ("_parent_id");
  CREATE INDEX "services_gallery_image_idx" ON "services_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_featured_image_idx" ON "services" USING btree ("featured_image_id");
  CREATE INDEX "services_detail_image_idx" ON "services" USING btree ("detail_image_id");
  CREATE INDEX "services_sort_order_idx" ON "services" USING btree ("sort_order");
  CREATE INDEX "services_updated_by_idx" ON "services" USING btree ("updated_by_id");
  CREATE INDEX "services_seo_seo_open_graph_image_idx" ON "services" USING btree ("seo_open_graph_image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE INDEX "_services_v_version_stats_order_idx" ON "_services_v_version_stats" USING btree ("_order");
  CREATE INDEX "_services_v_version_stats_parent_id_idx" ON "_services_v_version_stats" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_rituals_order_idx" ON "_services_v_version_rituals" USING btree ("_order");
  CREATE INDEX "_services_v_version_rituals_parent_id_idx" ON "_services_v_version_rituals" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_rituals_image_idx" ON "_services_v_version_rituals" USING btree ("image_id");
  CREATE INDEX "_services_v_version_gallery_order_idx" ON "_services_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_services_v_version_gallery_parent_id_idx" ON "_services_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_services_v_version_gallery_image_idx" ON "_services_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_featured_image_idx" ON "_services_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_services_v_version_version_detail_image_idx" ON "_services_v" USING btree ("version_detail_image_id");
  CREATE INDEX "_services_v_version_version_sort_order_idx" ON "_services_v" USING btree ("version_sort_order");
  CREATE INDEX "_services_v_version_version_updated_by_idx" ON "_services_v" USING btree ("version_updated_by_id");
  CREATE INDEX "_services_v_version_seo_version_seo_open_graph_image_idx" ON "_services_v" USING btree ("version_seo_open_graph_image_id");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE UNIQUE INDEX "blog_slug_idx" ON "blog" USING btree ("slug");
  CREATE INDEX "blog_category_idx" ON "blog" USING btree ("category");
  CREATE INDEX "blog_featured_image_idx" ON "blog" USING btree ("featured_image_id");
  CREATE INDEX "blog_sort_order_idx" ON "blog" USING btree ("sort_order");
  CREATE INDEX "blog_updated_by_idx" ON "blog" USING btree ("updated_by_id");
  CREATE INDEX "blog_seo_seo_open_graph_image_idx" ON "blog" USING btree ("seo_open_graph_image_id");
  CREATE INDEX "blog_updated_at_idx" ON "blog" USING btree ("updated_at");
  CREATE INDEX "blog_created_at_idx" ON "blog" USING btree ("created_at");
  CREATE INDEX "blog__status_idx" ON "blog" USING btree ("_status");
  CREATE INDEX "_blog_v_parent_idx" ON "_blog_v" USING btree ("parent_id");
  CREATE INDEX "_blog_v_version_version_slug_idx" ON "_blog_v" USING btree ("version_slug");
  CREATE INDEX "_blog_v_version_version_category_idx" ON "_blog_v" USING btree ("version_category");
  CREATE INDEX "_blog_v_version_version_featured_image_idx" ON "_blog_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_blog_v_version_version_sort_order_idx" ON "_blog_v" USING btree ("version_sort_order");
  CREATE INDEX "_blog_v_version_version_updated_by_idx" ON "_blog_v" USING btree ("version_updated_by_id");
  CREATE INDEX "_blog_v_version_seo_version_seo_open_graph_image_idx" ON "_blog_v" USING btree ("version_seo_open_graph_image_id");
  CREATE INDEX "_blog_v_version_version_updated_at_idx" ON "_blog_v" USING btree ("version_updated_at");
  CREATE INDEX "_blog_v_version_version_created_at_idx" ON "_blog_v" USING btree ("version_created_at");
  CREATE INDEX "_blog_v_version_version__status_idx" ON "_blog_v" USING btree ("version__status");
  CREATE INDEX "_blog_v_created_at_idx" ON "_blog_v" USING btree ("created_at");
  CREATE INDEX "_blog_v_updated_at_idx" ON "_blog_v" USING btree ("updated_at");
  CREATE INDEX "_blog_v_latest_idx" ON "_blog_v" USING btree ("latest");
  CREATE INDEX "reservation_page_search_preview_order_idx" ON "reservation_page_search_preview" USING btree ("_order");
  CREATE INDEX "reservation_page_search_preview_parent_id_idx" ON "reservation_page_search_preview" USING btree ("_parent_id");
  CREATE INDEX "reservation_page_booking_benefits_order_idx" ON "reservation_page_booking_benefits" USING btree ("_order");
  CREATE INDEX "reservation_page_booking_benefits_parent_id_idx" ON "reservation_page_booking_benefits" USING btree ("_parent_id");
  CREATE INDEX "reservation_page_room_details_order_idx" ON "reservation_page_room_details" USING btree ("_order");
  CREATE INDEX "reservation_page_room_details_parent_id_idx" ON "reservation_page_room_details" USING btree ("_parent_id");
  CREATE INDEX "reservation_page_room_details_room_idx" ON "reservation_page_room_details" USING btree ("room_id");
  CREATE INDEX "reservation_page_overview_items_order_idx" ON "reservation_page_overview_items" USING btree ("_order");
  CREATE INDEX "reservation_page_overview_items_parent_id_idx" ON "reservation_page_overview_items" USING btree ("_parent_id");
  CREATE INDEX "reservation_page_overview_items_room_idx" ON "reservation_page_overview_items" USING btree ("room_id");
  CREATE INDEX "reservation_page_hero_image_idx" ON "reservation_page" USING btree ("hero_image_id");
  CREATE INDEX "reservation_page_seo_seo_open_graph_image_idx" ON "reservation_page" USING btree ("seo_open_graph_image_id");
  CREATE INDEX "reservation_page__status_idx" ON "reservation_page" USING btree ("_status");
  CREATE INDEX "_reservation_page_v_version_search_preview_order_idx" ON "_reservation_page_v_version_search_preview" USING btree ("_order");
  CREATE INDEX "_reservation_page_v_version_search_preview_parent_id_idx" ON "_reservation_page_v_version_search_preview" USING btree ("_parent_id");
  CREATE INDEX "_reservation_page_v_version_booking_benefits_order_idx" ON "_reservation_page_v_version_booking_benefits" USING btree ("_order");
  CREATE INDEX "_reservation_page_v_version_booking_benefits_parent_id_idx" ON "_reservation_page_v_version_booking_benefits" USING btree ("_parent_id");
  CREATE INDEX "_reservation_page_v_version_room_details_order_idx" ON "_reservation_page_v_version_room_details" USING btree ("_order");
  CREATE INDEX "_reservation_page_v_version_room_details_parent_id_idx" ON "_reservation_page_v_version_room_details" USING btree ("_parent_id");
  CREATE INDEX "_reservation_page_v_version_room_details_room_idx" ON "_reservation_page_v_version_room_details" USING btree ("room_id");
  CREATE INDEX "_reservation_page_v_version_overview_items_order_idx" ON "_reservation_page_v_version_overview_items" USING btree ("_order");
  CREATE INDEX "_reservation_page_v_version_overview_items_parent_id_idx" ON "_reservation_page_v_version_overview_items" USING btree ("_parent_id");
  CREATE INDEX "_reservation_page_v_version_overview_items_room_idx" ON "_reservation_page_v_version_overview_items" USING btree ("room_id");
  CREATE INDEX "_reservation_page_v_version_version_hero_image_idx" ON "_reservation_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_reservation_page_v_version_seo_version_seo_open_graph_i_idx" ON "_reservation_page_v" USING btree ("version_seo_open_graph_image_id");
  CREATE INDEX "_reservation_page_v_version_version__status_idx" ON "_reservation_page_v" USING btree ("version__status");
  CREATE INDEX "_reservation_page_v_created_at_idx" ON "_reservation_page_v" USING btree ("created_at");
  CREATE INDEX "_reservation_page_v_updated_at_idx" ON "_reservation_page_v" USING btree ("updated_at");
  CREATE INDEX "_reservation_page_v_latest_idx" ON "_reservation_page_v" USING btree ("latest");
  CREATE INDEX "legal_pages_terms_sections_body_order_idx" ON "legal_pages_terms_sections_body" USING btree ("_order");
  CREATE INDEX "legal_pages_terms_sections_body_parent_id_idx" ON "legal_pages_terms_sections_body" USING btree ("_parent_id");
  CREATE INDEX "legal_pages_terms_sections_order_idx" ON "legal_pages_terms_sections" USING btree ("_order");
  CREATE INDEX "legal_pages_terms_sections_parent_id_idx" ON "legal_pages_terms_sections" USING btree ("_parent_id");
  CREATE INDEX "legal_pages_privacy_sections_body_order_idx" ON "legal_pages_privacy_sections_body" USING btree ("_order");
  CREATE INDEX "legal_pages_privacy_sections_body_parent_id_idx" ON "legal_pages_privacy_sections_body" USING btree ("_parent_id");
  CREATE INDEX "legal_pages_privacy_sections_order_idx" ON "legal_pages_privacy_sections" USING btree ("_order");
  CREATE INDEX "legal_pages_privacy_sections_parent_id_idx" ON "legal_pages_privacy_sections" USING btree ("_parent_id");
  CREATE INDEX "legal_pages_cookies_sections_body_order_idx" ON "legal_pages_cookies_sections_body" USING btree ("_order");
  CREATE INDEX "legal_pages_cookies_sections_body_parent_id_idx" ON "legal_pages_cookies_sections_body" USING btree ("_parent_id");
  CREATE INDEX "legal_pages_cookies_sections_order_idx" ON "legal_pages_cookies_sections" USING btree ("_order");
  CREATE INDEX "legal_pages_cookies_sections_parent_id_idx" ON "legal_pages_cookies_sections" USING btree ("_parent_id");
  CREATE INDEX "legal_pages_terms_seo_terms_seo_open_graph_image_idx" ON "legal_pages" USING btree ("terms_seo_open_graph_image_id");
  CREATE INDEX "legal_pages_privacy_seo_privacy_seo_open_graph_image_idx" ON "legal_pages" USING btree ("privacy_seo_open_graph_image_id");
  CREATE INDEX "legal_pages_cookies_seo_cookies_seo_open_graph_image_idx" ON "legal_pages" USING btree ("cookies_seo_open_graph_image_id");
  CREATE INDEX "legal_pages__status_idx" ON "legal_pages" USING btree ("_status");
  CREATE INDEX "_legal_pages_v_version_terms_sections_body_order_idx" ON "_legal_pages_v_version_terms_sections_body" USING btree ("_order");
  CREATE INDEX "_legal_pages_v_version_terms_sections_body_parent_id_idx" ON "_legal_pages_v_version_terms_sections_body" USING btree ("_parent_id");
  CREATE INDEX "_legal_pages_v_version_terms_sections_order_idx" ON "_legal_pages_v_version_terms_sections" USING btree ("_order");
  CREATE INDEX "_legal_pages_v_version_terms_sections_parent_id_idx" ON "_legal_pages_v_version_terms_sections" USING btree ("_parent_id");
  CREATE INDEX "_legal_pages_v_version_privacy_sections_body_order_idx" ON "_legal_pages_v_version_privacy_sections_body" USING btree ("_order");
  CREATE INDEX "_legal_pages_v_version_privacy_sections_body_parent_id_idx" ON "_legal_pages_v_version_privacy_sections_body" USING btree ("_parent_id");
  CREATE INDEX "_legal_pages_v_version_privacy_sections_order_idx" ON "_legal_pages_v_version_privacy_sections" USING btree ("_order");
  CREATE INDEX "_legal_pages_v_version_privacy_sections_parent_id_idx" ON "_legal_pages_v_version_privacy_sections" USING btree ("_parent_id");
  CREATE INDEX "_legal_pages_v_version_cookies_sections_body_order_idx" ON "_legal_pages_v_version_cookies_sections_body" USING btree ("_order");
  CREATE INDEX "_legal_pages_v_version_cookies_sections_body_parent_id_idx" ON "_legal_pages_v_version_cookies_sections_body" USING btree ("_parent_id");
  CREATE INDEX "_legal_pages_v_version_cookies_sections_order_idx" ON "_legal_pages_v_version_cookies_sections" USING btree ("_order");
  CREATE INDEX "_legal_pages_v_version_cookies_sections_parent_id_idx" ON "_legal_pages_v_version_cookies_sections" USING btree ("_parent_id");
  CREATE INDEX "_legal_pages_v_version_terms_seo_version_terms_seo_open__idx" ON "_legal_pages_v" USING btree ("version_terms_seo_open_graph_image_id");
  CREATE INDEX "_legal_pages_v_version_privacy_seo_version_privacy_seo_o_idx" ON "_legal_pages_v" USING btree ("version_privacy_seo_open_graph_image_id");
  CREATE INDEX "_legal_pages_v_version_cookies_seo_version_cookies_seo_o_idx" ON "_legal_pages_v" USING btree ("version_cookies_seo_open_graph_image_id");
  CREATE INDEX "_legal_pages_v_version_version__status_idx" ON "_legal_pages_v" USING btree ("version__status");
  CREATE INDEX "_legal_pages_v_created_at_idx" ON "_legal_pages_v" USING btree ("created_at");
  CREATE INDEX "_legal_pages_v_updated_at_idx" ON "_legal_pages_v" USING btree ("updated_at");
  CREATE INDEX "_legal_pages_v_latest_idx" ON "_legal_pages_v" USING btree ("latest");
  ALTER TABLE "rooms" ADD CONSTRAINT "rooms_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rooms_v" ADD CONSTRAINT "_rooms_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "rooms_hero_image_idx" ON "rooms" USING btree ("hero_image_id");
  CREATE INDEX "_rooms_v_version_version_hero_image_idx" ON "_rooms_v" USING btree ("version_hero_image_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_blog_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_id");
  CREATE INDEX "home_page_rels_services_id_idx" ON "home_page_rels" USING btree ("services_id");
  CREATE INDEX "home_page_rels_blog_id_idx" ON "home_page_rels" USING btree ("blog_id");
  CREATE INDEX "_home_page_v_rels_services_id_idx" ON "_home_page_v_rels" USING btree ("services_id");
  CREATE INDEX "_home_page_v_rels_blog_id_idx" ON "_home_page_v_rels" USING btree ("blog_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "rooms_inclusions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rooms_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rooms_experiences" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_rooms_v_version_inclusions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_rooms_v_version_standards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_rooms_v_version_experiences" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_rituals" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_rituals" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reservation_page_search_preview" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reservation_page_booking_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reservation_page_room_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reservation_page_overview_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reservation_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_reservation_page_v_version_search_preview" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_reservation_page_v_version_booking_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_reservation_page_v_version_room_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_reservation_page_v_version_overview_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_reservation_page_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "legal_pages_terms_sections_body" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "legal_pages_terms_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "legal_pages_privacy_sections_body" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "legal_pages_privacy_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "legal_pages_cookies_sections_body" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "legal_pages_cookies_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "legal_pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_legal_pages_v_version_terms_sections_body" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_legal_pages_v_version_terms_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_legal_pages_v_version_privacy_sections_body" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_legal_pages_v_version_privacy_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_legal_pages_v_version_cookies_sections_body" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_legal_pages_v_version_cookies_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_legal_pages_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "rooms_inclusions" CASCADE;
  DROP TABLE "rooms_standards" CASCADE;
  DROP TABLE "rooms_experiences" CASCADE;
  DROP TABLE "_rooms_v_version_inclusions" CASCADE;
  DROP TABLE "_rooms_v_version_standards" CASCADE;
  DROP TABLE "_rooms_v_version_experiences" CASCADE;
  DROP TABLE "services_stats" CASCADE;
  DROP TABLE "services_rituals" CASCADE;
  DROP TABLE "services_gallery" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "_services_v_version_stats" CASCADE;
  DROP TABLE "_services_v_version_rituals" CASCADE;
  DROP TABLE "_services_v_version_gallery" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "blog" CASCADE;
  DROP TABLE "_blog_v" CASCADE;
  DROP TABLE "reservation_page_search_preview" CASCADE;
  DROP TABLE "reservation_page_booking_benefits" CASCADE;
  DROP TABLE "reservation_page_room_details" CASCADE;
  DROP TABLE "reservation_page_overview_items" CASCADE;
  DROP TABLE "reservation_page" CASCADE;
  DROP TABLE "_reservation_page_v_version_search_preview" CASCADE;
  DROP TABLE "_reservation_page_v_version_booking_benefits" CASCADE;
  DROP TABLE "_reservation_page_v_version_room_details" CASCADE;
  DROP TABLE "_reservation_page_v_version_overview_items" CASCADE;
  DROP TABLE "_reservation_page_v" CASCADE;
  DROP TABLE "legal_pages_terms_sections_body" CASCADE;
  DROP TABLE "legal_pages_terms_sections" CASCADE;
  DROP TABLE "legal_pages_privacy_sections_body" CASCADE;
  DROP TABLE "legal_pages_privacy_sections" CASCADE;
  DROP TABLE "legal_pages_cookies_sections_body" CASCADE;
  DROP TABLE "legal_pages_cookies_sections" CASCADE;
  DROP TABLE "legal_pages" CASCADE;
  DROP TABLE "_legal_pages_v_version_terms_sections_body" CASCADE;
  DROP TABLE "_legal_pages_v_version_terms_sections" CASCADE;
  DROP TABLE "_legal_pages_v_version_privacy_sections_body" CASCADE;
  DROP TABLE "_legal_pages_v_version_privacy_sections" CASCADE;
  DROP TABLE "_legal_pages_v_version_cookies_sections_body" CASCADE;
  DROP TABLE "_legal_pages_v_version_cookies_sections" CASCADE;
  DROP TABLE "_legal_pages_v" CASCADE;
  ALTER TABLE "rooms" DROP CONSTRAINT "rooms_hero_image_id_media_id_fk";
  
  ALTER TABLE "_rooms_v" DROP CONSTRAINT "_rooms_v_version_hero_image_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_services_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_blog_fk";
  
  ALTER TABLE "home_page_rels" DROP CONSTRAINT "home_page_rels_services_fk";
  
  ALTER TABLE "home_page_rels" DROP CONSTRAINT "home_page_rels_blog_fk";
  
  ALTER TABLE "_home_page_v_rels" DROP CONSTRAINT "_home_page_v_rels_services_fk";
  
  ALTER TABLE "_home_page_v_rels" DROP CONSTRAINT "_home_page_v_rels_blog_fk";
  
  ALTER TABLE "header_navigation_items" ALTER COLUMN "page_u_r_l" SET DATA TYPE text;
  DROP TYPE "public"."enum_header_navigation_items_page_u_r_l";
  CREATE TYPE "public"."enum_header_navigation_items_page_u_r_l" AS ENUM('/', '/about', '/rooms', '/facilities', '/gallery', '/promotions', '/contact');
  ALTER TABLE "header_navigation_items" ALTER COLUMN "page_u_r_l" SET DATA TYPE "public"."enum_header_navigation_items_page_u_r_l" USING "page_u_r_l"::"public"."enum_header_navigation_items_page_u_r_l";
  ALTER TABLE "_header_v_version_navigation_items" ALTER COLUMN "page_u_r_l" SET DATA TYPE text;
  DROP TYPE "public"."enum__header_v_version_navigation_items_page_u_r_l";
  CREATE TYPE "public"."enum__header_v_version_navigation_items_page_u_r_l" AS ENUM('/', '/about', '/rooms', '/facilities', '/gallery', '/promotions', '/contact');
  ALTER TABLE "_header_v_version_navigation_items" ALTER COLUMN "page_u_r_l" SET DATA TYPE "public"."enum__header_v_version_navigation_items_page_u_r_l" USING "page_u_r_l"::"public"."enum__header_v_version_navigation_items_page_u_r_l";
  DROP INDEX "rooms_hero_image_idx";
  DROP INDEX "_rooms_v_version_version_hero_image_idx";
  DROP INDEX "payload_locked_documents_rels_services_id_idx";
  DROP INDEX "payload_locked_documents_rels_blog_id_idx";
  DROP INDEX "home_page_rels_services_id_idx";
  DROP INDEX "home_page_rels_blog_id_idx";
  DROP INDEX "_home_page_v_rels_services_id_idx";
  DROP INDEX "_home_page_v_rels_blog_id_idx";
  ALTER TABLE "rooms" DROP COLUMN "category";
  ALTER TABLE "rooms" DROP COLUMN "hero_image_id";
  ALTER TABLE "rooms" DROP COLUMN "capacity_label";
  ALTER TABLE "rooms" DROP COLUMN "rate_note";
  ALTER TABLE "rooms" DROP COLUMN "reviews_label";
  ALTER TABLE "rooms" DROP COLUMN "availability_label";
  ALTER TABLE "rooms" DROP COLUMN "deposit_label";
  ALTER TABLE "rooms" DROP COLUMN "passenger_label";
  ALTER TABLE "rooms" DROP COLUMN "best_for";
  ALTER TABLE "_rooms_v" DROP COLUMN "version_category";
  ALTER TABLE "_rooms_v" DROP COLUMN "version_hero_image_id";
  ALTER TABLE "_rooms_v" DROP COLUMN "version_capacity_label";
  ALTER TABLE "_rooms_v" DROP COLUMN "version_rate_note";
  ALTER TABLE "_rooms_v" DROP COLUMN "version_reviews_label";
  ALTER TABLE "_rooms_v" DROP COLUMN "version_availability_label";
  ALTER TABLE "_rooms_v" DROP COLUMN "version_deposit_label";
  ALTER TABLE "_rooms_v" DROP COLUMN "version_passenger_label";
  ALTER TABLE "_rooms_v" DROP COLUMN "version_best_for";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "services_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "blog_id";
  ALTER TABLE "home_page" DROP COLUMN "signature_experiences_heading";
  ALTER TABLE "home_page" DROP COLUMN "signature_experiences_description";
  ALTER TABLE "home_page" DROP COLUMN "signature_experiences_active";
  ALTER TABLE "home_page" DROP COLUMN "signature_experiences_sort_order";
  ALTER TABLE "home_page" DROP COLUMN "journal_preview_heading";
  ALTER TABLE "home_page" DROP COLUMN "journal_preview_description";
  ALTER TABLE "home_page" DROP COLUMN "journal_preview_cta_label";
  ALTER TABLE "home_page" DROP COLUMN "journal_preview_cta_url";
  ALTER TABLE "home_page" DROP COLUMN "journal_preview_cta_open_in_new_tab";
  ALTER TABLE "home_page" DROP COLUMN "journal_preview_cta_variant";
  ALTER TABLE "home_page" DROP COLUMN "journal_preview_active";
  ALTER TABLE "home_page" DROP COLUMN "journal_preview_sort_order";
  ALTER TABLE "home_page_rels" DROP COLUMN "services_id";
  ALTER TABLE "home_page_rels" DROP COLUMN "blog_id";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_signature_experiences_heading";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_signature_experiences_description";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_signature_experiences_active";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_signature_experiences_sort_order";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_journal_preview_heading";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_journal_preview_description";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_journal_preview_cta_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_journal_preview_cta_url";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_journal_preview_cta_open_in_new_tab";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_journal_preview_cta_variant";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_journal_preview_active";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_journal_preview_sort_order";
  ALTER TABLE "_home_page_v_rels" DROP COLUMN "services_id";
  ALTER TABLE "_home_page_v_rels" DROP COLUMN "blog_id";
  DROP TYPE "public"."enum_services_cta_variant";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_version_cta_variant";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum_blog_status";
  DROP TYPE "public"."enum__blog_v_version_status";
  DROP TYPE "public"."enum_home_page_journal_preview_cta_variant";
  DROP TYPE "public"."enum__home_page_v_version_journal_preview_cta_variant";
  DROP TYPE "public"."enum_reservation_page_whats_app_c_t_a_variant";
  DROP TYPE "public"."enum_reservation_page_status";
  DROP TYPE "public"."enum__reservation_page_v_version_whats_app_c_t_a_variant";
  DROP TYPE "public"."enum__reservation_page_v_version_status";
  DROP TYPE "public"."enum_legal_pages_status";
  DROP TYPE "public"."enum__legal_pages_v_version_status";`)
}
