import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('super-admin', 'admin', 'editor');
  CREATE TYPE "public"."enum_media_category" AS ENUM('general', 'hero', 'room', 'facility', 'gallery', 'promotion', 'logo');
  CREATE TYPE "public"."enum_media_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_rooms_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__rooms_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_facilities_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__facilities_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_gallery_category" AS ENUM('resort', 'room', 'facility', 'restaurant', 'experience', 'surrounding');
  CREATE TYPE "public"."enum_gallery_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_promotions_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__promotions_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_testimonials_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_faqs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_site_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_header_navigation_items_page_u_r_l" AS ENUM('/', '/about', '/rooms', '/facilities', '/gallery', '/promotions', '/contact');
  CREATE TYPE "public"."enum_header_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__header_v_version_navigation_items_page_u_r_l" AS ENUM('/', '/about', '/rooms', '/facilities', '/gallery', '/promotions', '/contact');
  CREATE TYPE "public"."enum__header_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_footer_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__footer_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_home_page_hero_primary_c_t_a_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum_home_page_hero_secondary_c_t_a_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum_home_page_introduction_cta_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum_home_page_gallery_preview_cta_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum_home_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_page_v_version_hero_primary_c_t_a_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__home_page_v_version_hero_secondary_c_t_a_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__home_page_v_version_introduction_cta_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__home_page_v_version_gallery_preview_cta_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__home_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_about_page_final_c_t_a_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum_about_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_version_final_c_t_a_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__about_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_contact_page_final_c_t_a_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum_contact_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_page_v_version_final_c_t_a_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__contact_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"category" "enum_media_category" DEFAULT 'general' NOT NULL,
  	"uploaded_by_id" integer,
  	"status" "enum_media_status" DEFAULT 'published' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_desktop_url" varchar,
  	"sizes_desktop_width" numeric,
  	"sizes_desktop_height" numeric,
  	"sizes_desktop_mime_type" varchar,
  	"sizes_desktop_filesize" numeric,
  	"sizes_desktop_filename" varchar
  );
  
  CREATE TABLE "rooms_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"caption" varchar
  );
  
  CREATE TABLE "rooms_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "rooms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"short_description" varchar,
  	"description" jsonb,
  	"featured_image_id" integer,
  	"capacity" numeric,
  	"bed_type" varchar,
  	"room_size" varchar,
  	"view" varchar,
  	"starting_price" numeric,
  	"currency" varchar DEFAULT 'IDR',
  	"booking_u_r_l" varchar,
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"status" "enum_rooms_status" DEFAULT 'draft',
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
  	"_status" "enum_rooms_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_rooms_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_rooms_v_version_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_rooms_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_short_description" varchar,
  	"version_description" jsonb,
  	"version_featured_image_id" integer,
  	"version_capacity" numeric,
  	"version_bed_type" varchar,
  	"version_room_size" varchar,
  	"version_view" varchar,
  	"version_starting_price" numeric,
  	"version_currency" varchar DEFAULT 'IDR',
  	"version_booking_u_r_l" varchar,
  	"version_featured" boolean DEFAULT false,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_status" "enum__rooms_v_version_status" DEFAULT 'draft',
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
  	"version__status" "enum__rooms_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "facilities_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"caption" varchar
  );
  
  CREATE TABLE "facilities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"short_description" varchar,
  	"description" jsonb,
  	"icon" varchar,
  	"featured_image_id" integer,
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"status" "enum_facilities_status" DEFAULT 'draft',
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
  	"_status" "enum_facilities_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_facilities_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_facilities_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_short_description" varchar,
  	"version_description" jsonb,
  	"version_icon" varchar,
  	"version_featured_image_id" integer,
  	"version_featured" boolean DEFAULT false,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_status" "enum__facilities_v_version_status" DEFAULT 'draft',
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
  	"version__status" "enum__facilities_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "gallery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"category" "enum_gallery_category" DEFAULT 'resort' NOT NULL,
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"status" "enum_gallery_status" DEFAULT 'draft' NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"updated_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "promotions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"short_description" varchar,
  	"description" jsonb,
  	"desktop_image_id" integer,
  	"mobile_image_id" integer,
  	"cta_label" varchar,
  	"cta_u_r_l" varchar,
  	"promo_code" varchar,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"status" "enum_promotions_status" DEFAULT 'draft',
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
  	"_status" "enum_promotions_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_promotions_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_short_description" varchar,
  	"version_description" jsonb,
  	"version_desktop_image_id" integer,
  	"version_mobile_image_id" integer,
  	"version_cta_label" varchar,
  	"version_cta_u_r_l" varchar,
  	"version_promo_code" varchar,
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_featured" boolean DEFAULT false,
  	"version_sort_order" numeric DEFAULT 0,
  	"version_status" "enum__promotions_v_version_status" DEFAULT 'draft',
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
  	"version__status" "enum__promotions_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"guest_name" varchar NOT NULL,
  	"guest_location" varchar,
  	"rating" numeric NOT NULL,
  	"review" varchar NOT NULL,
  	"source" varchar,
  	"source_u_r_l" varchar,
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"status" "enum_testimonials_status" DEFAULT 'draft' NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"updated_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"category" varchar DEFAULT 'general',
  	"sort_order" numeric DEFAULT 0,
  	"status" "enum_faqs_status" DEFAULT 'draft' NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"updated_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"rooms_id" integer,
  	"facilities_id" integer,
  	"gallery_id" integer,
  	"promotions_id" integer,
  	"testimonials_id" integer,
  	"faqs_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Villa Resort',
  	"short_description" varchar,
  	"logo_dark_id" integer,
  	"logo_light_id" integer,
  	"favicon_id" integer,
  	"default_s_e_o_title" varchar,
  	"default_s_e_o_description" varchar,
  	"default_open_graph_image_id" integer,
  	"contact_email" varchar,
  	"phone" varchar,
  	"whats_app_number" varchar,
  	"address" varchar,
  	"google_maps_u_r_l" varchar,
  	"instagram_u_r_l" varchar,
  	"facebook_u_r_l" varchar,
  	"you_tube_u_r_l" varchar,
  	"booking_u_r_l" varchar,
  	"default_locale" varchar DEFAULT 'en',
  	"timezone" varchar DEFAULT 'Asia/Makassar',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_open_graph_image_id" integer,
  	"seo_canonical_u_r_l" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"_status" "enum_site_settings_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_site_name" varchar DEFAULT 'Villa Resort',
  	"version_short_description" varchar,
  	"version_logo_dark_id" integer,
  	"version_logo_light_id" integer,
  	"version_favicon_id" integer,
  	"version_default_s_e_o_title" varchar,
  	"version_default_s_e_o_description" varchar,
  	"version_default_open_graph_image_id" integer,
  	"version_contact_email" varchar,
  	"version_phone" varchar,
  	"version_whats_app_number" varchar,
  	"version_address" varchar,
  	"version_google_maps_u_r_l" varchar,
  	"version_instagram_u_r_l" varchar,
  	"version_facebook_u_r_l" varchar,
  	"version_you_tube_u_r_l" varchar,
  	"version_booking_u_r_l" varchar,
  	"version_default_locale" varchar DEFAULT 'en',
  	"version_timezone" varchar DEFAULT 'Asia/Makassar',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_open_graph_image_id" integer,
  	"version_seo_canonical_u_r_l" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_seo_no_follow" boolean DEFAULT false,
  	"version__status" "enum__site_settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "header_navigation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"page_u_r_l" "enum_header_navigation_items_page_u_r_l",
  	"active" boolean DEFAULT true
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"primary_c_t_a_label" varchar,
  	"primary_c_t_a_url" varchar,
  	"primary_c_t_a_open_in_new_tab" boolean DEFAULT false,
  	"_status" "enum_header_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_header_v_version_navigation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"page_u_r_l" "enum__header_v_version_navigation_items_page_u_r_l",
  	"active" boolean DEFAULT true,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_header_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_logo_id" integer,
  	"version_primary_c_t_a_label" varchar,
  	"version_primary_c_t_a_url" varchar,
  	"version_primary_c_t_a_open_in_new_tab" boolean DEFAULT false,
  	"version__status" "enum__header_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_quick_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"short_description" varchar,
  	"contact_information_phone" varchar,
  	"contact_information_email" varchar,
  	"contact_information_whats_app" varchar,
  	"contact_information_address" varchar,
  	"copyright_text" varchar,
  	"terms_u_r_l" varchar,
  	"privacy_u_r_l" varchar,
  	"_status" "enum_footer_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_footer_v_version_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v_version_quick_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_short_description" varchar,
  	"version_contact_information_phone" varchar,
  	"version_contact_information_email" varchar,
  	"version_contact_information_whats_app" varchar,
  	"version_contact_information_address" varchar,
  	"version_copyright_text" varchar,
  	"version_terms_u_r_l" varchar,
  	"version_privacy_u_r_l" varchar,
  	"version__status" "enum__footer_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_heading" varchar,
  	"hero_description" varchar,
  	"hero_background_image_id" integer,
  	"hero_primary_c_t_a_label" varchar,
  	"hero_primary_c_t_a_url" varchar,
  	"hero_primary_c_t_a_open_in_new_tab" boolean DEFAULT false,
  	"hero_primary_c_t_a_variant" "enum_home_page_hero_primary_c_t_a_variant" DEFAULT 'primary',
  	"hero_secondary_c_t_a_label" varchar,
  	"hero_secondary_c_t_a_url" varchar,
  	"hero_secondary_c_t_a_open_in_new_tab" boolean DEFAULT false,
  	"hero_secondary_c_t_a_variant" "enum_home_page_hero_secondary_c_t_a_variant" DEFAULT 'primary',
  	"hero_overlay_intensity" numeric DEFAULT 40,
  	"hero_active" boolean DEFAULT true,
  	"hero_sort_order" numeric DEFAULT 0,
  	"introduction_heading" varchar,
  	"introduction_description" varchar,
  	"introduction_image_id" integer,
  	"introduction_cta_label" varchar,
  	"introduction_cta_url" varchar,
  	"introduction_cta_open_in_new_tab" boolean DEFAULT false,
  	"introduction_cta_variant" "enum_home_page_introduction_cta_variant" DEFAULT 'primary',
  	"introduction_active" boolean DEFAULT true,
  	"introduction_sort_order" numeric DEFAULT 0,
  	"featured_rooms_heading" varchar,
  	"featured_rooms_description" varchar,
  	"featured_rooms_active" boolean DEFAULT true,
  	"featured_rooms_sort_order" numeric DEFAULT 0,
  	"facilities_overview_heading" varchar,
  	"facilities_overview_description" varchar,
  	"facilities_overview_active" boolean DEFAULT true,
  	"facilities_overview_sort_order" numeric DEFAULT 0,
  	"gallery_preview_heading" varchar,
  	"gallery_preview_description" varchar,
  	"gallery_preview_cta_label" varchar,
  	"gallery_preview_cta_url" varchar,
  	"gallery_preview_cta_open_in_new_tab" boolean DEFAULT false,
  	"gallery_preview_cta_variant" "enum_home_page_gallery_preview_cta_variant" DEFAULT 'primary',
  	"gallery_preview_active" boolean DEFAULT true,
  	"gallery_preview_sort_order" numeric DEFAULT 0,
  	"promotion_section_heading" varchar,
  	"promotion_section_description" varchar,
  	"promotion_section_active" boolean DEFAULT true,
  	"promotion_section_sort_order" numeric DEFAULT 0,
  	"final_c_t_a_heading" varchar,
  	"final_c_t_a_description" varchar,
  	"final_c_t_a_button_label" varchar,
  	"final_c_t_a_button_u_r_l" varchar,
  	"final_c_t_a_background_image_id" integer,
  	"final_c_t_a_active" boolean DEFAULT true,
  	"final_c_t_a_sort_order" numeric DEFAULT 0,
  	"_status" "enum_home_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"rooms_id" integer,
  	"facilities_id" integer,
  	"gallery_id" integer,
  	"promotions_id" integer
  );
  
  CREATE TABLE "_home_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_heading" varchar,
  	"version_hero_description" varchar,
  	"version_hero_background_image_id" integer,
  	"version_hero_primary_c_t_a_label" varchar,
  	"version_hero_primary_c_t_a_url" varchar,
  	"version_hero_primary_c_t_a_open_in_new_tab" boolean DEFAULT false,
  	"version_hero_primary_c_t_a_variant" "enum__home_page_v_version_hero_primary_c_t_a_variant" DEFAULT 'primary',
  	"version_hero_secondary_c_t_a_label" varchar,
  	"version_hero_secondary_c_t_a_url" varchar,
  	"version_hero_secondary_c_t_a_open_in_new_tab" boolean DEFAULT false,
  	"version_hero_secondary_c_t_a_variant" "enum__home_page_v_version_hero_secondary_c_t_a_variant" DEFAULT 'primary',
  	"version_hero_overlay_intensity" numeric DEFAULT 40,
  	"version_hero_active" boolean DEFAULT true,
  	"version_hero_sort_order" numeric DEFAULT 0,
  	"version_introduction_heading" varchar,
  	"version_introduction_description" varchar,
  	"version_introduction_image_id" integer,
  	"version_introduction_cta_label" varchar,
  	"version_introduction_cta_url" varchar,
  	"version_introduction_cta_open_in_new_tab" boolean DEFAULT false,
  	"version_introduction_cta_variant" "enum__home_page_v_version_introduction_cta_variant" DEFAULT 'primary',
  	"version_introduction_active" boolean DEFAULT true,
  	"version_introduction_sort_order" numeric DEFAULT 0,
  	"version_featured_rooms_heading" varchar,
  	"version_featured_rooms_description" varchar,
  	"version_featured_rooms_active" boolean DEFAULT true,
  	"version_featured_rooms_sort_order" numeric DEFAULT 0,
  	"version_facilities_overview_heading" varchar,
  	"version_facilities_overview_description" varchar,
  	"version_facilities_overview_active" boolean DEFAULT true,
  	"version_facilities_overview_sort_order" numeric DEFAULT 0,
  	"version_gallery_preview_heading" varchar,
  	"version_gallery_preview_description" varchar,
  	"version_gallery_preview_cta_label" varchar,
  	"version_gallery_preview_cta_url" varchar,
  	"version_gallery_preview_cta_open_in_new_tab" boolean DEFAULT false,
  	"version_gallery_preview_cta_variant" "enum__home_page_v_version_gallery_preview_cta_variant" DEFAULT 'primary',
  	"version_gallery_preview_active" boolean DEFAULT true,
  	"version_gallery_preview_sort_order" numeric DEFAULT 0,
  	"version_promotion_section_heading" varchar,
  	"version_promotion_section_description" varchar,
  	"version_promotion_section_active" boolean DEFAULT true,
  	"version_promotion_section_sort_order" numeric DEFAULT 0,
  	"version_final_c_t_a_heading" varchar,
  	"version_final_c_t_a_description" varchar,
  	"version_final_c_t_a_button_label" varchar,
  	"version_final_c_t_a_button_u_r_l" varchar,
  	"version_final_c_t_a_background_image_id" integer,
  	"version_final_c_t_a_active" boolean DEFAULT true,
  	"version_final_c_t_a_sort_order" numeric DEFAULT 0,
  	"version__status" "enum__home_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_home_page_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"rooms_id" integer,
  	"facilities_id" integer,
  	"gallery_id" integer,
  	"promotions_id" integer
  );
  
  CREATE TABLE "about_page_supporting_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"caption" varchar
  );
  
  CREATE TABLE "about_page_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_heading" varchar,
  	"hero_description" varchar,
  	"hero_image_id" integer,
  	"introduction_heading" varchar,
  	"introduction_content" jsonb,
  	"story_content" jsonb,
  	"final_c_t_a_label" varchar,
  	"final_c_t_a_url" varchar,
  	"final_c_t_a_open_in_new_tab" boolean DEFAULT false,
  	"final_c_t_a_variant" "enum_about_page_final_c_t_a_variant" DEFAULT 'primary',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_open_graph_image_id" integer,
  	"seo_canonical_u_r_l" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"_status" "enum_about_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_about_page_v_version_supporting_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_heading" varchar,
  	"version_hero_description" varchar,
  	"version_hero_image_id" integer,
  	"version_introduction_heading" varchar,
  	"version_introduction_content" jsonb,
  	"version_story_content" jsonb,
  	"version_final_c_t_a_label" varchar,
  	"version_final_c_t_a_url" varchar,
  	"version_final_c_t_a_open_in_new_tab" boolean DEFAULT false,
  	"version_final_c_t_a_variant" "enum__about_page_v_version_final_c_t_a_variant" DEFAULT 'primary',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_open_graph_image_id" integer,
  	"version_seo_canonical_u_r_l" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_seo_no_follow" boolean DEFAULT false,
  	"version__status" "enum__about_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "contact_page_operational_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"hours" varchar
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_heading" varchar,
  	"hero_description" varchar,
  	"hero_image_id" integer,
  	"contact_heading" varchar,
  	"contact_description" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"whats_app" varchar,
  	"address" varchar,
  	"map_embed_u_r_l" varchar,
  	"final_c_t_a_label" varchar,
  	"final_c_t_a_url" varchar,
  	"final_c_t_a_open_in_new_tab" boolean DEFAULT false,
  	"final_c_t_a_variant" "enum_contact_page_final_c_t_a_variant" DEFAULT 'primary',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_open_graph_image_id" integer,
  	"seo_canonical_u_r_l" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"_status" "enum_contact_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contact_page_v_version_operational_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"hours" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contact_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_heading" varchar,
  	"version_hero_description" varchar,
  	"version_hero_image_id" integer,
  	"version_contact_heading" varchar,
  	"version_contact_description" varchar,
  	"version_phone" varchar,
  	"version_email" varchar,
  	"version_whats_app" varchar,
  	"version_address" varchar,
  	"version_map_embed_u_r_l" varchar,
  	"version_final_c_t_a_label" varchar,
  	"version_final_c_t_a_url" varchar,
  	"version_final_c_t_a_open_in_new_tab" boolean DEFAULT false,
  	"version_final_c_t_a_variant" "enum__contact_page_v_version_final_c_t_a_variant" DEFAULT 'primary',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_open_graph_image_id" integer,
  	"version_seo_canonical_u_r_l" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_seo_no_follow" boolean DEFAULT false,
  	"version__status" "enum__contact_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_uploaded_by_id_users_id_fk" FOREIGN KEY ("uploaded_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rooms_gallery" ADD CONSTRAINT "rooms_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rooms_gallery" ADD CONSTRAINT "rooms_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms_amenities" ADD CONSTRAINT "rooms_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "rooms" ADD CONSTRAINT "rooms_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rooms" ADD CONSTRAINT "rooms_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "rooms" ADD CONSTRAINT "rooms_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_gallery" ADD CONSTRAINT "_rooms_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_gallery" ADD CONSTRAINT "_rooms_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v_version_amenities" ADD CONSTRAINT "_rooms_v_version_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_rooms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_rooms_v" ADD CONSTRAINT "_rooms_v_parent_id_rooms_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rooms_v" ADD CONSTRAINT "_rooms_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rooms_v" ADD CONSTRAINT "_rooms_v_version_updated_by_id_users_id_fk" FOREIGN KEY ("version_updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_rooms_v" ADD CONSTRAINT "_rooms_v_version_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "facilities_gallery" ADD CONSTRAINT "facilities_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "facilities_gallery" ADD CONSTRAINT "facilities_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "facilities" ADD CONSTRAINT "facilities_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "facilities" ADD CONSTRAINT "facilities_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "facilities" ADD CONSTRAINT "facilities_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_facilities_v_version_gallery" ADD CONSTRAINT "_facilities_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_facilities_v_version_gallery" ADD CONSTRAINT "_facilities_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_facilities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_facilities_v" ADD CONSTRAINT "_facilities_v_parent_id_facilities_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."facilities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_facilities_v" ADD CONSTRAINT "_facilities_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_facilities_v" ADD CONSTRAINT "_facilities_v_version_updated_by_id_users_id_fk" FOREIGN KEY ("version_updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_facilities_v" ADD CONSTRAINT "_facilities_v_version_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "promotions" ADD CONSTRAINT "promotions_desktop_image_id_media_id_fk" FOREIGN KEY ("desktop_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "promotions" ADD CONSTRAINT "promotions_mobile_image_id_media_id_fk" FOREIGN KEY ("mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "promotions" ADD CONSTRAINT "promotions_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "promotions" ADD CONSTRAINT "promotions_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_promotions_v" ADD CONSTRAINT "_promotions_v_parent_id_promotions_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."promotions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_promotions_v" ADD CONSTRAINT "_promotions_v_version_desktop_image_id_media_id_fk" FOREIGN KEY ("version_desktop_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_promotions_v" ADD CONSTRAINT "_promotions_v_version_mobile_image_id_media_id_fk" FOREIGN KEY ("version_mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_promotions_v" ADD CONSTRAINT "_promotions_v_version_updated_by_id_users_id_fk" FOREIGN KEY ("version_updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_promotions_v" ADD CONSTRAINT "_promotions_v_version_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faqs" ADD CONSTRAINT "faqs_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rooms_fk" FOREIGN KEY ("rooms_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_facilities_fk" FOREIGN KEY ("facilities_id") REFERENCES "public"."facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_promotions_fk" FOREIGN KEY ("promotions_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_dark_id_media_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_light_id_media_id_fk" FOREIGN KEY ("logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_open_graph_image_id_media_id_fk" FOREIGN KEY ("default_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_logo_dark_id_media_id_fk" FOREIGN KEY ("version_logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_logo_light_id_media_id_fk" FOREIGN KEY ("version_logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_favicon_id_media_id_fk" FOREIGN KEY ("version_favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_default_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_default_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_navigation_items" ADD CONSTRAINT "header_navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_header_v_version_navigation_items" ADD CONSTRAINT "_header_v_version_navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v" ADD CONSTRAINT "_header_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_quick_links" ADD CONSTRAINT "footer_quick_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_social_links" ADD CONSTRAINT "_footer_v_version_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_quick_links" ADD CONSTRAINT "_footer_v_version_quick_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_introduction_image_id_media_id_fk" FOREIGN KEY ("introduction_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_final_c_t_a_background_image_id_media_id_fk" FOREIGN KEY ("final_c_t_a_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_rooms_fk" FOREIGN KEY ("rooms_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_facilities_fk" FOREIGN KEY ("facilities_id") REFERENCES "public"."facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_gallery_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_promotions_fk" FOREIGN KEY ("promotions_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_hero_background_image_id_media_id_fk" FOREIGN KEY ("version_hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_introduction_image_id_media_id_fk" FOREIGN KEY ("version_introduction_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_final_c_t_a_background_image_id_media_id_fk" FOREIGN KEY ("version_final_c_t_a_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_rooms_fk" FOREIGN KEY ("rooms_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_facilities_fk" FOREIGN KEY ("facilities_id") REFERENCES "public"."facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_gallery_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_promotions_fk" FOREIGN KEY ("promotions_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_supporting_images" ADD CONSTRAINT "about_page_supporting_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_supporting_images" ADD CONSTRAINT "about_page_supporting_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_values" ADD CONSTRAINT "about_page_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_supporting_images" ADD CONSTRAINT "_about_page_v_version_supporting_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_supporting_images" ADD CONSTRAINT "_about_page_v_version_supporting_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_values" ADD CONSTRAINT "_about_page_v_version_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_operational_hours" ADD CONSTRAINT "contact_page_operational_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contact_page_v_version_operational_hours" ADD CONSTRAINT "_contact_page_v_version_operational_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_page_v" ADD CONSTRAINT "_contact_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contact_page_v" ADD CONSTRAINT "_contact_page_v_version_seo_open_graph_image_id_media_id_fk" FOREIGN KEY ("version_seo_open_graph_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_uploaded_by_idx" ON "media" USING btree ("uploaded_by_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_desktop_sizes_desktop_filename_idx" ON "media" USING btree ("sizes_desktop_filename");
  CREATE INDEX "rooms_gallery_order_idx" ON "rooms_gallery" USING btree ("_order");
  CREATE INDEX "rooms_gallery_parent_id_idx" ON "rooms_gallery" USING btree ("_parent_id");
  CREATE INDEX "rooms_gallery_image_idx" ON "rooms_gallery" USING btree ("image_id");
  CREATE INDEX "rooms_amenities_order_idx" ON "rooms_amenities" USING btree ("_order");
  CREATE INDEX "rooms_amenities_parent_id_idx" ON "rooms_amenities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "rooms_slug_idx" ON "rooms" USING btree ("slug");
  CREATE INDEX "rooms_featured_image_idx" ON "rooms" USING btree ("featured_image_id");
  CREATE INDEX "rooms_sort_order_idx" ON "rooms" USING btree ("sort_order");
  CREATE INDEX "rooms_updated_by_idx" ON "rooms" USING btree ("updated_by_id");
  CREATE INDEX "rooms_seo_seo_open_graph_image_idx" ON "rooms" USING btree ("seo_open_graph_image_id");
  CREATE INDEX "rooms_updated_at_idx" ON "rooms" USING btree ("updated_at");
  CREATE INDEX "rooms_created_at_idx" ON "rooms" USING btree ("created_at");
  CREATE INDEX "rooms__status_idx" ON "rooms" USING btree ("_status");
  CREATE INDEX "_rooms_v_version_gallery_order_idx" ON "_rooms_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_rooms_v_version_gallery_parent_id_idx" ON "_rooms_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_rooms_v_version_gallery_image_idx" ON "_rooms_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_rooms_v_version_amenities_order_idx" ON "_rooms_v_version_amenities" USING btree ("_order");
  CREATE INDEX "_rooms_v_version_amenities_parent_id_idx" ON "_rooms_v_version_amenities" USING btree ("_parent_id");
  CREATE INDEX "_rooms_v_parent_idx" ON "_rooms_v" USING btree ("parent_id");
  CREATE INDEX "_rooms_v_version_version_slug_idx" ON "_rooms_v" USING btree ("version_slug");
  CREATE INDEX "_rooms_v_version_version_featured_image_idx" ON "_rooms_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_rooms_v_version_version_sort_order_idx" ON "_rooms_v" USING btree ("version_sort_order");
  CREATE INDEX "_rooms_v_version_version_updated_by_idx" ON "_rooms_v" USING btree ("version_updated_by_id");
  CREATE INDEX "_rooms_v_version_seo_version_seo_open_graph_image_idx" ON "_rooms_v" USING btree ("version_seo_open_graph_image_id");
  CREATE INDEX "_rooms_v_version_version_updated_at_idx" ON "_rooms_v" USING btree ("version_updated_at");
  CREATE INDEX "_rooms_v_version_version_created_at_idx" ON "_rooms_v" USING btree ("version_created_at");
  CREATE INDEX "_rooms_v_version_version__status_idx" ON "_rooms_v" USING btree ("version__status");
  CREATE INDEX "_rooms_v_created_at_idx" ON "_rooms_v" USING btree ("created_at");
  CREATE INDEX "_rooms_v_updated_at_idx" ON "_rooms_v" USING btree ("updated_at");
  CREATE INDEX "_rooms_v_latest_idx" ON "_rooms_v" USING btree ("latest");
  CREATE INDEX "facilities_gallery_order_idx" ON "facilities_gallery" USING btree ("_order");
  CREATE INDEX "facilities_gallery_parent_id_idx" ON "facilities_gallery" USING btree ("_parent_id");
  CREATE INDEX "facilities_gallery_image_idx" ON "facilities_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "facilities_slug_idx" ON "facilities" USING btree ("slug");
  CREATE INDEX "facilities_featured_image_idx" ON "facilities" USING btree ("featured_image_id");
  CREATE INDEX "facilities_sort_order_idx" ON "facilities" USING btree ("sort_order");
  CREATE INDEX "facilities_updated_by_idx" ON "facilities" USING btree ("updated_by_id");
  CREATE INDEX "facilities_seo_seo_open_graph_image_idx" ON "facilities" USING btree ("seo_open_graph_image_id");
  CREATE INDEX "facilities_updated_at_idx" ON "facilities" USING btree ("updated_at");
  CREATE INDEX "facilities_created_at_idx" ON "facilities" USING btree ("created_at");
  CREATE INDEX "facilities__status_idx" ON "facilities" USING btree ("_status");
  CREATE INDEX "_facilities_v_version_gallery_order_idx" ON "_facilities_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_facilities_v_version_gallery_parent_id_idx" ON "_facilities_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_facilities_v_version_gallery_image_idx" ON "_facilities_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_facilities_v_parent_idx" ON "_facilities_v" USING btree ("parent_id");
  CREATE INDEX "_facilities_v_version_version_slug_idx" ON "_facilities_v" USING btree ("version_slug");
  CREATE INDEX "_facilities_v_version_version_featured_image_idx" ON "_facilities_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_facilities_v_version_version_sort_order_idx" ON "_facilities_v" USING btree ("version_sort_order");
  CREATE INDEX "_facilities_v_version_version_updated_by_idx" ON "_facilities_v" USING btree ("version_updated_by_id");
  CREATE INDEX "_facilities_v_version_seo_version_seo_open_graph_image_idx" ON "_facilities_v" USING btree ("version_seo_open_graph_image_id");
  CREATE INDEX "_facilities_v_version_version_updated_at_idx" ON "_facilities_v" USING btree ("version_updated_at");
  CREATE INDEX "_facilities_v_version_version_created_at_idx" ON "_facilities_v" USING btree ("version_created_at");
  CREATE INDEX "_facilities_v_version_version__status_idx" ON "_facilities_v" USING btree ("version__status");
  CREATE INDEX "_facilities_v_created_at_idx" ON "_facilities_v" USING btree ("created_at");
  CREATE INDEX "_facilities_v_updated_at_idx" ON "_facilities_v" USING btree ("updated_at");
  CREATE INDEX "_facilities_v_latest_idx" ON "_facilities_v" USING btree ("latest");
  CREATE INDEX "gallery_image_idx" ON "gallery" USING btree ("image_id");
  CREATE INDEX "gallery_sort_order_idx" ON "gallery" USING btree ("sort_order");
  CREATE INDEX "gallery_updated_by_idx" ON "gallery" USING btree ("updated_by_id");
  CREATE INDEX "gallery_updated_at_idx" ON "gallery" USING btree ("updated_at");
  CREATE INDEX "gallery_created_at_idx" ON "gallery" USING btree ("created_at");
  CREATE UNIQUE INDEX "promotions_slug_idx" ON "promotions" USING btree ("slug");
  CREATE INDEX "promotions_desktop_image_idx" ON "promotions" USING btree ("desktop_image_id");
  CREATE INDEX "promotions_mobile_image_idx" ON "promotions" USING btree ("mobile_image_id");
  CREATE INDEX "promotions_sort_order_idx" ON "promotions" USING btree ("sort_order");
  CREATE INDEX "promotions_updated_by_idx" ON "promotions" USING btree ("updated_by_id");
  CREATE INDEX "promotions_seo_seo_open_graph_image_idx" ON "promotions" USING btree ("seo_open_graph_image_id");
  CREATE INDEX "promotions_updated_at_idx" ON "promotions" USING btree ("updated_at");
  CREATE INDEX "promotions_created_at_idx" ON "promotions" USING btree ("created_at");
  CREATE INDEX "promotions__status_idx" ON "promotions" USING btree ("_status");
  CREATE INDEX "_promotions_v_parent_idx" ON "_promotions_v" USING btree ("parent_id");
  CREATE INDEX "_promotions_v_version_version_slug_idx" ON "_promotions_v" USING btree ("version_slug");
  CREATE INDEX "_promotions_v_version_version_desktop_image_idx" ON "_promotions_v" USING btree ("version_desktop_image_id");
  CREATE INDEX "_promotions_v_version_version_mobile_image_idx" ON "_promotions_v" USING btree ("version_mobile_image_id");
  CREATE INDEX "_promotions_v_version_version_sort_order_idx" ON "_promotions_v" USING btree ("version_sort_order");
  CREATE INDEX "_promotions_v_version_version_updated_by_idx" ON "_promotions_v" USING btree ("version_updated_by_id");
  CREATE INDEX "_promotions_v_version_seo_version_seo_open_graph_image_idx" ON "_promotions_v" USING btree ("version_seo_open_graph_image_id");
  CREATE INDEX "_promotions_v_version_version_updated_at_idx" ON "_promotions_v" USING btree ("version_updated_at");
  CREATE INDEX "_promotions_v_version_version_created_at_idx" ON "_promotions_v" USING btree ("version_created_at");
  CREATE INDEX "_promotions_v_version_version__status_idx" ON "_promotions_v" USING btree ("version__status");
  CREATE INDEX "_promotions_v_created_at_idx" ON "_promotions_v" USING btree ("created_at");
  CREATE INDEX "_promotions_v_updated_at_idx" ON "_promotions_v" USING btree ("updated_at");
  CREATE INDEX "_promotions_v_latest_idx" ON "_promotions_v" USING btree ("latest");
  CREATE INDEX "testimonials_sort_order_idx" ON "testimonials" USING btree ("sort_order");
  CREATE INDEX "testimonials_updated_by_idx" ON "testimonials" USING btree ("updated_by_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "faqs_category_idx" ON "faqs" USING btree ("category");
  CREATE INDEX "faqs_sort_order_idx" ON "faqs" USING btree ("sort_order");
  CREATE INDEX "faqs_updated_by_idx" ON "faqs" USING btree ("updated_by_id");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_rooms_id_idx" ON "payload_locked_documents_rels" USING btree ("rooms_id");
  CREATE INDEX "payload_locked_documents_rels_facilities_id_idx" ON "payload_locked_documents_rels" USING btree ("facilities_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_id");
  CREATE INDEX "payload_locked_documents_rels_promotions_id_idx" ON "payload_locked_documents_rels" USING btree ("promotions_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_logo_dark_idx" ON "site_settings" USING btree ("logo_dark_id");
  CREATE INDEX "site_settings_logo_light_idx" ON "site_settings" USING btree ("logo_light_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "site_settings_default_open_graph_image_idx" ON "site_settings" USING btree ("default_open_graph_image_id");
  CREATE INDEX "site_settings_seo_seo_open_graph_image_idx" ON "site_settings" USING btree ("seo_open_graph_image_id");
  CREATE INDEX "site_settings__status_idx" ON "site_settings" USING btree ("_status");
  CREATE INDEX "_site_settings_v_version_version_logo_dark_idx" ON "_site_settings_v" USING btree ("version_logo_dark_id");
  CREATE INDEX "_site_settings_v_version_version_logo_light_idx" ON "_site_settings_v" USING btree ("version_logo_light_id");
  CREATE INDEX "_site_settings_v_version_version_favicon_idx" ON "_site_settings_v" USING btree ("version_favicon_id");
  CREATE INDEX "_site_settings_v_version_version_default_open_graph_imag_idx" ON "_site_settings_v" USING btree ("version_default_open_graph_image_id");
  CREATE INDEX "_site_settings_v_version_seo_version_seo_open_graph_imag_idx" ON "_site_settings_v" USING btree ("version_seo_open_graph_image_id");
  CREATE INDEX "_site_settings_v_version_version__status_idx" ON "_site_settings_v" USING btree ("version__status");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");
  CREATE INDEX "_site_settings_v_latest_idx" ON "_site_settings_v" USING btree ("latest");
  CREATE INDEX "header_navigation_items_order_idx" ON "header_navigation_items" USING btree ("_order");
  CREATE INDEX "header_navigation_items_parent_id_idx" ON "header_navigation_items" USING btree ("_parent_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "header__status_idx" ON "header" USING btree ("_status");
  CREATE INDEX "_header_v_version_navigation_items_order_idx" ON "_header_v_version_navigation_items" USING btree ("_order");
  CREATE INDEX "_header_v_version_navigation_items_parent_id_idx" ON "_header_v_version_navigation_items" USING btree ("_parent_id");
  CREATE INDEX "_header_v_version_version_logo_idx" ON "_header_v" USING btree ("version_logo_id");
  CREATE INDEX "_header_v_version_version__status_idx" ON "_header_v" USING btree ("version__status");
  CREATE INDEX "_header_v_created_at_idx" ON "_header_v" USING btree ("created_at");
  CREATE INDEX "_header_v_updated_at_idx" ON "_header_v" USING btree ("updated_at");
  CREATE INDEX "_header_v_latest_idx" ON "_header_v" USING btree ("latest");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_quick_links_order_idx" ON "footer_quick_links" USING btree ("_order");
  CREATE INDEX "footer_quick_links_parent_id_idx" ON "footer_quick_links" USING btree ("_parent_id");
  CREATE INDEX "footer__status_idx" ON "footer" USING btree ("_status");
  CREATE INDEX "_footer_v_version_social_links_order_idx" ON "_footer_v_version_social_links" USING btree ("_order");
  CREATE INDEX "_footer_v_version_social_links_parent_id_idx" ON "_footer_v_version_social_links" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_quick_links_order_idx" ON "_footer_v_version_quick_links" USING btree ("_order");
  CREATE INDEX "_footer_v_version_quick_links_parent_id_idx" ON "_footer_v_version_quick_links" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_version__status_idx" ON "_footer_v" USING btree ("version__status");
  CREATE INDEX "_footer_v_created_at_idx" ON "_footer_v" USING btree ("created_at");
  CREATE INDEX "_footer_v_updated_at_idx" ON "_footer_v" USING btree ("updated_at");
  CREATE INDEX "_footer_v_latest_idx" ON "_footer_v" USING btree ("latest");
  CREATE INDEX "home_page_hero_hero_background_image_idx" ON "home_page" USING btree ("hero_background_image_id");
  CREATE INDEX "home_page_introduction_introduction_image_idx" ON "home_page" USING btree ("introduction_image_id");
  CREATE INDEX "home_page_final_c_t_a_final_c_t_a_background_image_idx" ON "home_page" USING btree ("final_c_t_a_background_image_id");
  CREATE INDEX "home_page__status_idx" ON "home_page" USING btree ("_status");
  CREATE INDEX "home_page_rels_order_idx" ON "home_page_rels" USING btree ("order");
  CREATE INDEX "home_page_rels_parent_idx" ON "home_page_rels" USING btree ("parent_id");
  CREATE INDEX "home_page_rels_path_idx" ON "home_page_rels" USING btree ("path");
  CREATE INDEX "home_page_rels_rooms_id_idx" ON "home_page_rels" USING btree ("rooms_id");
  CREATE INDEX "home_page_rels_facilities_id_idx" ON "home_page_rels" USING btree ("facilities_id");
  CREATE INDEX "home_page_rels_gallery_id_idx" ON "home_page_rels" USING btree ("gallery_id");
  CREATE INDEX "home_page_rels_promotions_id_idx" ON "home_page_rels" USING btree ("promotions_id");
  CREATE INDEX "_home_page_v_version_hero_version_hero_background_image_idx" ON "_home_page_v" USING btree ("version_hero_background_image_id");
  CREATE INDEX "_home_page_v_version_introduction_version_introduction_i_idx" ON "_home_page_v" USING btree ("version_introduction_image_id");
  CREATE INDEX "_home_page_v_version_final_c_t_a_version_final_c_t_a_bac_idx" ON "_home_page_v" USING btree ("version_final_c_t_a_background_image_id");
  CREATE INDEX "_home_page_v_version_version__status_idx" ON "_home_page_v" USING btree ("version__status");
  CREATE INDEX "_home_page_v_created_at_idx" ON "_home_page_v" USING btree ("created_at");
  CREATE INDEX "_home_page_v_updated_at_idx" ON "_home_page_v" USING btree ("updated_at");
  CREATE INDEX "_home_page_v_latest_idx" ON "_home_page_v" USING btree ("latest");
  CREATE INDEX "_home_page_v_rels_order_idx" ON "_home_page_v_rels" USING btree ("order");
  CREATE INDEX "_home_page_v_rels_parent_idx" ON "_home_page_v_rels" USING btree ("parent_id");
  CREATE INDEX "_home_page_v_rels_path_idx" ON "_home_page_v_rels" USING btree ("path");
  CREATE INDEX "_home_page_v_rels_rooms_id_idx" ON "_home_page_v_rels" USING btree ("rooms_id");
  CREATE INDEX "_home_page_v_rels_facilities_id_idx" ON "_home_page_v_rels" USING btree ("facilities_id");
  CREATE INDEX "_home_page_v_rels_gallery_id_idx" ON "_home_page_v_rels" USING btree ("gallery_id");
  CREATE INDEX "_home_page_v_rels_promotions_id_idx" ON "_home_page_v_rels" USING btree ("promotions_id");
  CREATE INDEX "about_page_supporting_images_order_idx" ON "about_page_supporting_images" USING btree ("_order");
  CREATE INDEX "about_page_supporting_images_parent_id_idx" ON "about_page_supporting_images" USING btree ("_parent_id");
  CREATE INDEX "about_page_supporting_images_image_idx" ON "about_page_supporting_images" USING btree ("image_id");
  CREATE INDEX "about_page_values_order_idx" ON "about_page_values" USING btree ("_order");
  CREATE INDEX "about_page_values_parent_id_idx" ON "about_page_values" USING btree ("_parent_id");
  CREATE INDEX "about_page_hero_image_idx" ON "about_page" USING btree ("hero_image_id");
  CREATE INDEX "about_page_seo_seo_open_graph_image_idx" ON "about_page" USING btree ("seo_open_graph_image_id");
  CREATE INDEX "about_page__status_idx" ON "about_page" USING btree ("_status");
  CREATE INDEX "_about_page_v_version_supporting_images_order_idx" ON "_about_page_v_version_supporting_images" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_supporting_images_parent_id_idx" ON "_about_page_v_version_supporting_images" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_supporting_images_image_idx" ON "_about_page_v_version_supporting_images" USING btree ("image_id");
  CREATE INDEX "_about_page_v_version_values_order_idx" ON "_about_page_v_version_values" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_values_parent_id_idx" ON "_about_page_v_version_values" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_version_hero_image_idx" ON "_about_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_about_page_v_version_seo_version_seo_open_graph_image_idx" ON "_about_page_v" USING btree ("version_seo_open_graph_image_id");
  CREATE INDEX "_about_page_v_version_version__status_idx" ON "_about_page_v" USING btree ("version__status");
  CREATE INDEX "_about_page_v_created_at_idx" ON "_about_page_v" USING btree ("created_at");
  CREATE INDEX "_about_page_v_updated_at_idx" ON "_about_page_v" USING btree ("updated_at");
  CREATE INDEX "_about_page_v_latest_idx" ON "_about_page_v" USING btree ("latest");
  CREATE INDEX "contact_page_operational_hours_order_idx" ON "contact_page_operational_hours" USING btree ("_order");
  CREATE INDEX "contact_page_operational_hours_parent_id_idx" ON "contact_page_operational_hours" USING btree ("_parent_id");
  CREATE INDEX "contact_page_hero_image_idx" ON "contact_page" USING btree ("hero_image_id");
  CREATE INDEX "contact_page_seo_seo_open_graph_image_idx" ON "contact_page" USING btree ("seo_open_graph_image_id");
  CREATE INDEX "contact_page__status_idx" ON "contact_page" USING btree ("_status");
  CREATE INDEX "_contact_page_v_version_operational_hours_order_idx" ON "_contact_page_v_version_operational_hours" USING btree ("_order");
  CREATE INDEX "_contact_page_v_version_operational_hours_parent_id_idx" ON "_contact_page_v_version_operational_hours" USING btree ("_parent_id");
  CREATE INDEX "_contact_page_v_version_version_hero_image_idx" ON "_contact_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_contact_page_v_version_seo_version_seo_open_graph_image_idx" ON "_contact_page_v" USING btree ("version_seo_open_graph_image_id");
  CREATE INDEX "_contact_page_v_version_version__status_idx" ON "_contact_page_v" USING btree ("version__status");
  CREATE INDEX "_contact_page_v_created_at_idx" ON "_contact_page_v" USING btree ("created_at");
  CREATE INDEX "_contact_page_v_updated_at_idx" ON "_contact_page_v" USING btree ("updated_at");
  CREATE INDEX "_contact_page_v_latest_idx" ON "_contact_page_v" USING btree ("latest");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "rooms_gallery" CASCADE;
  DROP TABLE "rooms_amenities" CASCADE;
  DROP TABLE "rooms" CASCADE;
  DROP TABLE "_rooms_v_version_gallery" CASCADE;
  DROP TABLE "_rooms_v_version_amenities" CASCADE;
  DROP TABLE "_rooms_v" CASCADE;
  DROP TABLE "facilities_gallery" CASCADE;
  DROP TABLE "facilities" CASCADE;
  DROP TABLE "_facilities_v_version_gallery" CASCADE;
  DROP TABLE "_facilities_v" CASCADE;
  DROP TABLE "gallery" CASCADE;
  DROP TABLE "promotions" CASCADE;
  DROP TABLE "_promotions_v" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TABLE "header_navigation_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "_header_v_version_navigation_items" CASCADE;
  DROP TABLE "_header_v" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "footer_quick_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "_footer_v_version_social_links" CASCADE;
  DROP TABLE "_footer_v_version_quick_links" CASCADE;
  DROP TABLE "_footer_v" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_rels" CASCADE;
  DROP TABLE "_home_page_v" CASCADE;
  DROP TABLE "_home_page_v_rels" CASCADE;
  DROP TABLE "about_page_supporting_images" CASCADE;
  DROP TABLE "about_page_values" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "_about_page_v_version_supporting_images" CASCADE;
  DROP TABLE "_about_page_v_version_values" CASCADE;
  DROP TABLE "_about_page_v" CASCADE;
  DROP TABLE "contact_page_operational_hours" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "_contact_page_v_version_operational_hours" CASCADE;
  DROP TABLE "_contact_page_v" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_media_category";
  DROP TYPE "public"."enum_media_status";
  DROP TYPE "public"."enum_rooms_status";
  DROP TYPE "public"."enum__rooms_v_version_status";
  DROP TYPE "public"."enum_facilities_status";
  DROP TYPE "public"."enum__facilities_v_version_status";
  DROP TYPE "public"."enum_gallery_category";
  DROP TYPE "public"."enum_gallery_status";
  DROP TYPE "public"."enum_promotions_status";
  DROP TYPE "public"."enum__promotions_v_version_status";
  DROP TYPE "public"."enum_testimonials_status";
  DROP TYPE "public"."enum_faqs_status";
  DROP TYPE "public"."enum_site_settings_status";
  DROP TYPE "public"."enum__site_settings_v_version_status";
  DROP TYPE "public"."enum_header_navigation_items_page_u_r_l";
  DROP TYPE "public"."enum_header_status";
  DROP TYPE "public"."enum__header_v_version_navigation_items_page_u_r_l";
  DROP TYPE "public"."enum__header_v_version_status";
  DROP TYPE "public"."enum_footer_status";
  DROP TYPE "public"."enum__footer_v_version_status";
  DROP TYPE "public"."enum_home_page_hero_primary_c_t_a_variant";
  DROP TYPE "public"."enum_home_page_hero_secondary_c_t_a_variant";
  DROP TYPE "public"."enum_home_page_introduction_cta_variant";
  DROP TYPE "public"."enum_home_page_gallery_preview_cta_variant";
  DROP TYPE "public"."enum_home_page_status";
  DROP TYPE "public"."enum__home_page_v_version_hero_primary_c_t_a_variant";
  DROP TYPE "public"."enum__home_page_v_version_hero_secondary_c_t_a_variant";
  DROP TYPE "public"."enum__home_page_v_version_introduction_cta_variant";
  DROP TYPE "public"."enum__home_page_v_version_gallery_preview_cta_variant";
  DROP TYPE "public"."enum__home_page_v_version_status";
  DROP TYPE "public"."enum_about_page_final_c_t_a_variant";
  DROP TYPE "public"."enum_about_page_status";
  DROP TYPE "public"."enum__about_page_v_version_final_c_t_a_variant";
  DROP TYPE "public"."enum__about_page_v_version_status";
  DROP TYPE "public"."enum_contact_page_final_c_t_a_variant";
  DROP TYPE "public"."enum_contact_page_status";
  DROP TYPE "public"."enum__contact_page_v_version_final_c_t_a_variant";
  DROP TYPE "public"."enum__contact_page_v_version_status";`)
}
