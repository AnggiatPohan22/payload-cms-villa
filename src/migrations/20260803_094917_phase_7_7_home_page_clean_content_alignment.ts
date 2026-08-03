import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_home_page_signature_experiences_button_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum_home_page_journal_preview_button_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__home_page_v_version_signature_experiences_button_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__home_page_v_version_journal_preview_button_variant" AS ENUM('primary', 'secondary', 'text');
  ALTER TABLE "home_page" DROP CONSTRAINT "home_page_final_c_t_a_background_image_id_media_id_fk";
  
  ALTER TABLE "home_page_rels" DROP CONSTRAINT "home_page_rels_facilities_fk";
  
  ALTER TABLE "home_page_rels" DROP CONSTRAINT "home_page_rels_gallery_fk";
  
  ALTER TABLE "home_page_rels" DROP CONSTRAINT "home_page_rels_promotions_fk";
  
  ALTER TABLE "_home_page_v" DROP CONSTRAINT "_home_page_v_version_final_c_t_a_background_image_id_media_id_fk";
  
  ALTER TABLE "_home_page_v_rels" DROP CONSTRAINT "_home_page_v_rels_facilities_fk";
  
  ALTER TABLE "_home_page_v_rels" DROP CONSTRAINT "_home_page_v_rels_gallery_fk";
  
  ALTER TABLE "_home_page_v_rels" DROP CONSTRAINT "_home_page_v_rels_promotions_fk";
  
  DROP INDEX "home_page_final_c_t_a_final_c_t_a_background_image_idx";
  DROP INDEX "home_page_rels_facilities_id_idx";
  DROP INDEX "home_page_rels_gallery_id_idx";
  DROP INDEX "home_page_rels_promotions_id_idx";
  DROP INDEX "_home_page_v_version_final_c_t_a_version_final_c_t_a_bac_idx";
  DROP INDEX "_home_page_v_rels_facilities_id_idx";
  DROP INDEX "_home_page_v_rels_gallery_id_idx";
  DROP INDEX "_home_page_v_rels_promotions_id_idx";
  ALTER TABLE "home_page" ADD COLUMN "hero_section_name" varchar;
  ALTER TABLE "home_page" ADD COLUMN "booking_preview_section_name" varchar;
  ALTER TABLE "home_page" ADD COLUMN "booking_preview_section_aria_label" varchar DEFAULT 'Booking preview';
  ALTER TABLE "home_page" ADD COLUMN "booking_preview_form_aria_label" varchar DEFAULT 'Availability search';
  ALTER TABLE "home_page" ADD COLUMN "booking_preview_check_in_label" varchar DEFAULT 'Check-in';
  ALTER TABLE "home_page" ADD COLUMN "booking_preview_check_out_label" varchar DEFAULT 'Check-out';
  ALTER TABLE "home_page" ADD COLUMN "booking_preview_guests_label" varchar DEFAULT 'Guests';
  ALTER TABLE "home_page" ADD COLUMN "booking_preview_promotion_link_label" varchar DEFAULT 'Have a promotion code?';
  ALTER TABLE "home_page" ADD COLUMN "booking_preview_promotion_link_u_r_l" varchar DEFAULT '/reservation';
  ALTER TABLE "home_page" ADD COLUMN "booking_preview_submit_button_label" varchar DEFAULT 'Check Availability';
  ALTER TABLE "home_page" ADD COLUMN "booking_preview_submit_button_u_r_l" varchar DEFAULT '/reservation';
  ALTER TABLE "home_page" ADD COLUMN "booking_preview_active" boolean DEFAULT true;
  ALTER TABLE "home_page" ADD COLUMN "booking_preview_sort_order" numeric DEFAULT 0;
  ALTER TABLE "home_page" ADD COLUMN "introduction_section_name" varchar;
  ALTER TABLE "home_page" ADD COLUMN "introduction_eyebrow" varchar;
  ALTER TABLE "home_page" ADD COLUMN "signature_experiences_section_name" varchar;
  ALTER TABLE "home_page" ADD COLUMN "signature_experiences_eyebrow" varchar;
  ALTER TABLE "home_page" ADD COLUMN "signature_experiences_button_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "signature_experiences_button_url" varchar;
  ALTER TABLE "home_page" ADD COLUMN "signature_experiences_button_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "home_page" ADD COLUMN "signature_experiences_button_variant" "enum_home_page_signature_experiences_button_variant" DEFAULT 'primary';
  ALTER TABLE "home_page" ADD COLUMN "type_of_rooms_section_name" varchar;
  ALTER TABLE "home_page" ADD COLUMN "type_of_rooms_eyebrow" varchar;
  ALTER TABLE "home_page" ADD COLUMN "type_of_rooms_heading" varchar;
  ALTER TABLE "home_page" ADD COLUMN "type_of_rooms_description" varchar;
  ALTER TABLE "home_page" ADD COLUMN "type_of_rooms_active" boolean DEFAULT true;
  ALTER TABLE "home_page" ADD COLUMN "type_of_rooms_sort_order" numeric DEFAULT 0;
  ALTER TABLE "home_page" ADD COLUMN "testimonial_note_section_name" varchar;
  ALTER TABLE "home_page" ADD COLUMN "testimonial_note_note" varchar DEFAULT 'Frontend testimonial section is intentionally not editable from CMS yet. It will be connected later to Google Reviews or another review platform.';
  ALTER TABLE "home_page" ADD COLUMN "testimonial_note_active" boolean DEFAULT true;
  ALTER TABLE "home_page" ADD COLUMN "testimonial_note_sort_order" numeric DEFAULT 0;
  ALTER TABLE "home_page" ADD COLUMN "journal_preview_section_name" varchar;
  ALTER TABLE "home_page" ADD COLUMN "journal_preview_eyebrow" varchar;
  ALTER TABLE "home_page" ADD COLUMN "journal_preview_button_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "journal_preview_button_url" varchar;
  ALTER TABLE "home_page" ADD COLUMN "journal_preview_button_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "home_page" ADD COLUMN "journal_preview_button_variant" "enum_home_page_journal_preview_button_variant" DEFAULT 'primary';
  ALTER TABLE "home_page" ADD COLUMN "contact_preview_section_name" varchar;
  ALTER TABLE "home_page" ADD COLUMN "contact_preview_eyebrow" varchar;
  ALTER TABLE "home_page" ADD COLUMN "contact_preview_heading" varchar;
  ALTER TABLE "home_page" ADD COLUMN "contact_preview_description" varchar;
  ALTER TABLE "home_page" ADD COLUMN "contact_preview_location_heading" varchar;
  ALTER TABLE "home_page" ADD COLUMN "contact_preview_address" varchar;
  ALTER TABLE "home_page" ADD COLUMN "contact_preview_email_label" varchar DEFAULT 'Email:';
  ALTER TABLE "home_page" ADD COLUMN "contact_preview_email" varchar;
  ALTER TABLE "home_page" ADD COLUMN "contact_preview_phone_label" varchar DEFAULT 'Call directly:';
  ALTER TABLE "home_page" ADD COLUMN "contact_preview_phone" varchar;
  ALTER TABLE "home_page" ADD COLUMN "contact_preview_map_embed_u_r_l" varchar;
  ALTER TABLE "home_page" ADD COLUMN "contact_preview_active" boolean DEFAULT true;
  ALTER TABLE "home_page" ADD COLUMN "contact_preview_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_hero_section_name" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_booking_preview_section_name" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_booking_preview_section_aria_label" varchar DEFAULT 'Booking preview';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_booking_preview_form_aria_label" varchar DEFAULT 'Availability search';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_booking_preview_check_in_label" varchar DEFAULT 'Check-in';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_booking_preview_check_out_label" varchar DEFAULT 'Check-out';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_booking_preview_guests_label" varchar DEFAULT 'Guests';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_booking_preview_promotion_link_label" varchar DEFAULT 'Have a promotion code?';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_booking_preview_promotion_link_u_r_l" varchar DEFAULT '/reservation';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_booking_preview_submit_button_label" varchar DEFAULT 'Check Availability';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_booking_preview_submit_button_u_r_l" varchar DEFAULT '/reservation';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_booking_preview_active" boolean DEFAULT true;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_booking_preview_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_introduction_section_name" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_introduction_eyebrow" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_signature_experiences_section_name" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_signature_experiences_eyebrow" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_signature_experiences_button_label" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_signature_experiences_button_url" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_signature_experiences_button_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_signature_experiences_button_variant" "enum__home_page_v_version_signature_experiences_button_variant" DEFAULT 'primary';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_type_of_rooms_section_name" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_type_of_rooms_eyebrow" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_type_of_rooms_heading" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_type_of_rooms_description" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_type_of_rooms_active" boolean DEFAULT true;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_type_of_rooms_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_testimonial_note_section_name" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_testimonial_note_note" varchar DEFAULT 'Frontend testimonial section is intentionally not editable from CMS yet. It will be connected later to Google Reviews or another review platform.';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_testimonial_note_active" boolean DEFAULT true;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_testimonial_note_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_journal_preview_section_name" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_journal_preview_eyebrow" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_journal_preview_button_label" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_journal_preview_button_url" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_journal_preview_button_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_journal_preview_button_variant" "enum__home_page_v_version_journal_preview_button_variant" DEFAULT 'primary';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_contact_preview_section_name" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_contact_preview_eyebrow" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_contact_preview_heading" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_contact_preview_description" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_contact_preview_location_heading" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_contact_preview_address" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_contact_preview_email_label" varchar DEFAULT 'Email:';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_contact_preview_email" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_contact_preview_phone_label" varchar DEFAULT 'Call directly:';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_contact_preview_phone" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_contact_preview_map_embed_u_r_l" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_contact_preview_active" boolean DEFAULT true;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_contact_preview_sort_order" numeric DEFAULT 0;
  UPDATE "home_page"
  SET
    "hero_section_name" = COALESCE("hero_section_name", 'Hero'),
    "booking_preview_section_name" = COALESCE("booking_preview_section_name", 'Booking Preview Bar'),
    "introduction_section_name" = COALESCE("introduction_section_name", 'Ocean-side Comfort Intro'),
    "introduction_eyebrow" = COALESCE("introduction_eyebrow", 'Little About Us'),
    "signature_experiences_section_name" = COALESCE("signature_experiences_section_name", 'Signature Experiences'),
    "signature_experiences_eyebrow" = COALESCE("signature_experiences_eyebrow", 'SERVICES'),
    "signature_experiences_button_label" = COALESCE("signature_experiences_button_label", 'All Signature Service'),
    "signature_experiences_button_url" = COALESCE("signature_experiences_button_url", '/services'),
    "signature_experiences_button_variant" = COALESCE("signature_experiences_button_variant", 'text'::"enum_home_page_signature_experiences_button_variant"),
    "type_of_rooms_section_name" = COALESCE("type_of_rooms_section_name", 'Type of Room'),
    "type_of_rooms_eyebrow" = COALESCE("type_of_rooms_eyebrow", 'OUR ROOMS'),
    "type_of_rooms_heading" = COALESCE("type_of_rooms_heading", "featured_rooms_heading"),
    "type_of_rooms_description" = COALESCE("type_of_rooms_description", "featured_rooms_description"),
    "type_of_rooms_active" = COALESCE("type_of_rooms_active", "featured_rooms_active"),
    "type_of_rooms_sort_order" = COALESCE("type_of_rooms_sort_order", "featured_rooms_sort_order"),
    "testimonial_note_section_name" = COALESCE("testimonial_note_section_name", 'Testimonial'),
    "journal_preview_section_name" = COALESCE("journal_preview_section_name", 'Latest Journal Preview'),
    "journal_preview_eyebrow" = COALESCE("journal_preview_eyebrow", 'JOURNAL'),
    "journal_preview_button_label" = COALESCE("journal_preview_button_label", "journal_preview_cta_label"),
    "journal_preview_button_url" = COALESCE("journal_preview_button_url", "journal_preview_cta_url"),
    "journal_preview_button_open_in_new_tab" = COALESCE("journal_preview_button_open_in_new_tab", "journal_preview_cta_open_in_new_tab"),
    "journal_preview_button_variant" = COALESCE("journal_preview_button_variant", "journal_preview_cta_variant"::text::"enum_home_page_journal_preview_button_variant"),
    "contact_preview_section_name" = COALESCE("contact_preview_section_name", 'Contact Us Preview'),
    "contact_preview_eyebrow" = COALESCE("contact_preview_eyebrow", 'CONTACT'),
    "contact_preview_heading" = COALESCE("contact_preview_heading", 'Contact Us'),
    "contact_preview_description" = COALESCE("contact_preview_description", 'Reach our villa team directly for reservation questions, arrival details, and island stay planning.'),
    "contact_preview_location_heading" = COALESCE("contact_preview_location_heading", 'Villa Ceningan'),
    "contact_preview_email_label" = COALESCE("contact_preview_email_label", 'Email:'),
    "contact_preview_phone_label" = COALESCE("contact_preview_phone_label", 'Call directly:')
  WHERE "id" IS NOT NULL;
  UPDATE "_home_page_v"
  SET
    "version_hero_section_name" = COALESCE("version_hero_section_name", 'Hero'),
    "version_booking_preview_section_name" = COALESCE("version_booking_preview_section_name", 'Booking Preview Bar'),
    "version_introduction_section_name" = COALESCE("version_introduction_section_name", 'Ocean-side Comfort Intro'),
    "version_introduction_eyebrow" = COALESCE("version_introduction_eyebrow", 'Little About Us'),
    "version_signature_experiences_section_name" = COALESCE("version_signature_experiences_section_name", 'Signature Experiences'),
    "version_signature_experiences_eyebrow" = COALESCE("version_signature_experiences_eyebrow", 'SERVICES'),
    "version_signature_experiences_button_label" = COALESCE("version_signature_experiences_button_label", 'All Signature Service'),
    "version_signature_experiences_button_url" = COALESCE("version_signature_experiences_button_url", '/services'),
    "version_signature_experiences_button_variant" = COALESCE("version_signature_experiences_button_variant", 'text'::"enum__home_page_v_version_signature_experiences_button_variant"),
    "version_type_of_rooms_section_name" = COALESCE("version_type_of_rooms_section_name", 'Type of Room'),
    "version_type_of_rooms_eyebrow" = COALESCE("version_type_of_rooms_eyebrow", 'OUR ROOMS'),
    "version_type_of_rooms_heading" = COALESCE("version_type_of_rooms_heading", "version_featured_rooms_heading"),
    "version_type_of_rooms_description" = COALESCE("version_type_of_rooms_description", "version_featured_rooms_description"),
    "version_type_of_rooms_active" = COALESCE("version_type_of_rooms_active", "version_featured_rooms_active"),
    "version_type_of_rooms_sort_order" = COALESCE("version_type_of_rooms_sort_order", "version_featured_rooms_sort_order"),
    "version_testimonial_note_section_name" = COALESCE("version_testimonial_note_section_name", 'Testimonial'),
    "version_journal_preview_section_name" = COALESCE("version_journal_preview_section_name", 'Latest Journal Preview'),
    "version_journal_preview_eyebrow" = COALESCE("version_journal_preview_eyebrow", 'JOURNAL'),
    "version_journal_preview_button_label" = COALESCE("version_journal_preview_button_label", "version_journal_preview_cta_label"),
    "version_journal_preview_button_url" = COALESCE("version_journal_preview_button_url", "version_journal_preview_cta_url"),
    "version_journal_preview_button_open_in_new_tab" = COALESCE("version_journal_preview_button_open_in_new_tab", "version_journal_preview_cta_open_in_new_tab"),
    "version_journal_preview_button_variant" = COALESCE("version_journal_preview_button_variant", "version_journal_preview_cta_variant"::text::"enum__home_page_v_version_journal_preview_button_variant"),
    "version_contact_preview_section_name" = COALESCE("version_contact_preview_section_name", 'Contact Us Preview'),
    "version_contact_preview_eyebrow" = COALESCE("version_contact_preview_eyebrow", 'CONTACT'),
    "version_contact_preview_heading" = COALESCE("version_contact_preview_heading", 'Contact Us'),
    "version_contact_preview_description" = COALESCE("version_contact_preview_description", 'Reach our villa team directly for reservation questions, arrival details, and island stay planning.'),
    "version_contact_preview_location_heading" = COALESCE("version_contact_preview_location_heading", 'Villa Ceningan'),
    "version_contact_preview_email_label" = COALESCE("version_contact_preview_email_label", 'Email:'),
    "version_contact_preview_phone_label" = COALESCE("version_contact_preview_phone_label", 'Call directly:')
  WHERE "id" IS NOT NULL;
  UPDATE "home_page_rels"
  SET "path" = 'typeOfRooms.selectedRooms'
  WHERE "path" = 'featuredRooms.selectedRooms';
  UPDATE "_home_page_v_rels"
  SET "path" = 'typeOfRooms.selectedRooms'
  WHERE "path" = 'featuredRooms.selectedRooms';
  DELETE FROM "home_page_rels"
  WHERE "path" IN (
    'facilitiesOverview.selectedFacilities',
    'galleryPreview.selectedGalleryItems',
    'promotionSection.selectedPromotions'
  );
  DELETE FROM "_home_page_v_rels"
  WHERE "path" IN (
    'facilitiesOverview.selectedFacilities',
    'galleryPreview.selectedGalleryItems',
    'promotionSection.selectedPromotions'
  );
  ALTER TABLE "home_page" DROP COLUMN "introduction_cta_label";
  ALTER TABLE "home_page" DROP COLUMN "introduction_cta_url";
  ALTER TABLE "home_page" DROP COLUMN "introduction_cta_open_in_new_tab";
  ALTER TABLE "home_page" DROP COLUMN "introduction_cta_variant";
  ALTER TABLE "home_page" DROP COLUMN "featured_rooms_heading";
  ALTER TABLE "home_page" DROP COLUMN "featured_rooms_description";
  ALTER TABLE "home_page" DROP COLUMN "featured_rooms_active";
  ALTER TABLE "home_page" DROP COLUMN "featured_rooms_sort_order";
  ALTER TABLE "home_page" DROP COLUMN "facilities_overview_heading";
  ALTER TABLE "home_page" DROP COLUMN "facilities_overview_description";
  ALTER TABLE "home_page" DROP COLUMN "facilities_overview_active";
  ALTER TABLE "home_page" DROP COLUMN "facilities_overview_sort_order";
  ALTER TABLE "home_page" DROP COLUMN "gallery_preview_heading";
  ALTER TABLE "home_page" DROP COLUMN "gallery_preview_description";
  ALTER TABLE "home_page" DROP COLUMN "gallery_preview_cta_label";
  ALTER TABLE "home_page" DROP COLUMN "gallery_preview_cta_url";
  ALTER TABLE "home_page" DROP COLUMN "gallery_preview_cta_open_in_new_tab";
  ALTER TABLE "home_page" DROP COLUMN "gallery_preview_cta_variant";
  ALTER TABLE "home_page" DROP COLUMN "gallery_preview_active";
  ALTER TABLE "home_page" DROP COLUMN "gallery_preview_sort_order";
  ALTER TABLE "home_page" DROP COLUMN "promotion_section_heading";
  ALTER TABLE "home_page" DROP COLUMN "promotion_section_description";
  ALTER TABLE "home_page" DROP COLUMN "promotion_section_active";
  ALTER TABLE "home_page" DROP COLUMN "promotion_section_sort_order";
  ALTER TABLE "home_page" DROP COLUMN "journal_preview_cta_label";
  ALTER TABLE "home_page" DROP COLUMN "journal_preview_cta_url";
  ALTER TABLE "home_page" DROP COLUMN "journal_preview_cta_open_in_new_tab";
  ALTER TABLE "home_page" DROP COLUMN "journal_preview_cta_variant";
  ALTER TABLE "home_page" DROP COLUMN "final_c_t_a_heading";
  ALTER TABLE "home_page" DROP COLUMN "final_c_t_a_description";
  ALTER TABLE "home_page" DROP COLUMN "final_c_t_a_button_label";
  ALTER TABLE "home_page" DROP COLUMN "final_c_t_a_button_u_r_l";
  ALTER TABLE "home_page" DROP COLUMN "final_c_t_a_background_image_id";
  ALTER TABLE "home_page" DROP COLUMN "final_c_t_a_active";
  ALTER TABLE "home_page" DROP COLUMN "final_c_t_a_sort_order";
  ALTER TABLE "home_page_rels" DROP COLUMN "facilities_id";
  ALTER TABLE "home_page_rels" DROP COLUMN "gallery_id";
  ALTER TABLE "home_page_rels" DROP COLUMN "promotions_id";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_introduction_cta_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_introduction_cta_url";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_introduction_cta_open_in_new_tab";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_introduction_cta_variant";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_featured_rooms_heading";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_featured_rooms_description";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_featured_rooms_active";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_featured_rooms_sort_order";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_facilities_overview_heading";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_facilities_overview_description";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_facilities_overview_active";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_facilities_overview_sort_order";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_gallery_preview_heading";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_gallery_preview_description";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_gallery_preview_cta_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_gallery_preview_cta_url";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_gallery_preview_cta_open_in_new_tab";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_gallery_preview_cta_variant";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_gallery_preview_active";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_gallery_preview_sort_order";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_promotion_section_heading";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_promotion_section_description";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_promotion_section_active";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_promotion_section_sort_order";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_journal_preview_cta_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_journal_preview_cta_url";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_journal_preview_cta_open_in_new_tab";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_journal_preview_cta_variant";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_final_c_t_a_heading";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_final_c_t_a_description";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_final_c_t_a_button_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_final_c_t_a_button_u_r_l";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_final_c_t_a_background_image_id";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_final_c_t_a_active";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_final_c_t_a_sort_order";
  ALTER TABLE "_home_page_v_rels" DROP COLUMN "facilities_id";
  ALTER TABLE "_home_page_v_rels" DROP COLUMN "gallery_id";
  ALTER TABLE "_home_page_v_rels" DROP COLUMN "promotions_id";
  DROP TYPE "public"."enum_home_page_introduction_cta_variant";
  DROP TYPE "public"."enum_home_page_gallery_preview_cta_variant";
  DROP TYPE "public"."enum_home_page_journal_preview_cta_variant";
  DROP TYPE "public"."enum__home_page_v_version_introduction_cta_variant";
  DROP TYPE "public"."enum__home_page_v_version_gallery_preview_cta_variant";
  DROP TYPE "public"."enum__home_page_v_version_journal_preview_cta_variant";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_home_page_introduction_cta_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum_home_page_gallery_preview_cta_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum_home_page_journal_preview_cta_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__home_page_v_version_introduction_cta_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__home_page_v_version_gallery_preview_cta_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__home_page_v_version_journal_preview_cta_variant" AS ENUM('primary', 'secondary', 'text');
  ALTER TABLE "home_page" ADD COLUMN "introduction_cta_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "introduction_cta_url" varchar;
  ALTER TABLE "home_page" ADD COLUMN "introduction_cta_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "home_page" ADD COLUMN "introduction_cta_variant" "enum_home_page_introduction_cta_variant" DEFAULT 'primary';
  ALTER TABLE "home_page" ADD COLUMN "featured_rooms_heading" varchar;
  ALTER TABLE "home_page" ADD COLUMN "featured_rooms_description" varchar;
  ALTER TABLE "home_page" ADD COLUMN "featured_rooms_active" boolean DEFAULT true;
  ALTER TABLE "home_page" ADD COLUMN "featured_rooms_sort_order" numeric DEFAULT 0;
  ALTER TABLE "home_page" ADD COLUMN "facilities_overview_heading" varchar;
  ALTER TABLE "home_page" ADD COLUMN "facilities_overview_description" varchar;
  ALTER TABLE "home_page" ADD COLUMN "facilities_overview_active" boolean DEFAULT true;
  ALTER TABLE "home_page" ADD COLUMN "facilities_overview_sort_order" numeric DEFAULT 0;
  ALTER TABLE "home_page" ADD COLUMN "gallery_preview_heading" varchar;
  ALTER TABLE "home_page" ADD COLUMN "gallery_preview_description" varchar;
  ALTER TABLE "home_page" ADD COLUMN "gallery_preview_cta_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "gallery_preview_cta_url" varchar;
  ALTER TABLE "home_page" ADD COLUMN "gallery_preview_cta_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "home_page" ADD COLUMN "gallery_preview_cta_variant" "enum_home_page_gallery_preview_cta_variant" DEFAULT 'primary';
  ALTER TABLE "home_page" ADD COLUMN "gallery_preview_active" boolean DEFAULT true;
  ALTER TABLE "home_page" ADD COLUMN "gallery_preview_sort_order" numeric DEFAULT 0;
  ALTER TABLE "home_page" ADD COLUMN "promotion_section_heading" varchar;
  ALTER TABLE "home_page" ADD COLUMN "promotion_section_description" varchar;
  ALTER TABLE "home_page" ADD COLUMN "promotion_section_active" boolean DEFAULT true;
  ALTER TABLE "home_page" ADD COLUMN "promotion_section_sort_order" numeric DEFAULT 0;
  ALTER TABLE "home_page" ADD COLUMN "journal_preview_cta_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "journal_preview_cta_url" varchar;
  ALTER TABLE "home_page" ADD COLUMN "journal_preview_cta_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "home_page" ADD COLUMN "journal_preview_cta_variant" "enum_home_page_journal_preview_cta_variant" DEFAULT 'primary';
  ALTER TABLE "home_page" ADD COLUMN "final_c_t_a_heading" varchar;
  ALTER TABLE "home_page" ADD COLUMN "final_c_t_a_description" varchar;
  ALTER TABLE "home_page" ADD COLUMN "final_c_t_a_button_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "final_c_t_a_button_u_r_l" varchar;
  ALTER TABLE "home_page" ADD COLUMN "final_c_t_a_background_image_id" integer;
  ALTER TABLE "home_page" ADD COLUMN "final_c_t_a_active" boolean DEFAULT true;
  ALTER TABLE "home_page" ADD COLUMN "final_c_t_a_sort_order" numeric DEFAULT 0;
  ALTER TABLE "home_page_rels" ADD COLUMN "facilities_id" integer;
  ALTER TABLE "home_page_rels" ADD COLUMN "gallery_id" integer;
  ALTER TABLE "home_page_rels" ADD COLUMN "promotions_id" integer;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_introduction_cta_label" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_introduction_cta_url" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_introduction_cta_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_introduction_cta_variant" "enum__home_page_v_version_introduction_cta_variant" DEFAULT 'primary';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_featured_rooms_heading" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_featured_rooms_description" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_featured_rooms_active" boolean DEFAULT true;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_featured_rooms_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_facilities_overview_heading" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_facilities_overview_description" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_facilities_overview_active" boolean DEFAULT true;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_facilities_overview_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_gallery_preview_heading" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_gallery_preview_description" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_gallery_preview_cta_label" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_gallery_preview_cta_url" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_gallery_preview_cta_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_gallery_preview_cta_variant" "enum__home_page_v_version_gallery_preview_cta_variant" DEFAULT 'primary';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_gallery_preview_active" boolean DEFAULT true;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_gallery_preview_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_promotion_section_heading" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_promotion_section_description" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_promotion_section_active" boolean DEFAULT true;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_promotion_section_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_journal_preview_cta_label" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_journal_preview_cta_url" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_journal_preview_cta_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_journal_preview_cta_variant" "enum__home_page_v_version_journal_preview_cta_variant" DEFAULT 'primary';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_final_c_t_a_heading" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_final_c_t_a_description" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_final_c_t_a_button_label" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_final_c_t_a_button_u_r_l" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_final_c_t_a_background_image_id" integer;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_final_c_t_a_active" boolean DEFAULT true;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_final_c_t_a_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_home_page_v_rels" ADD COLUMN "facilities_id" integer;
  ALTER TABLE "_home_page_v_rels" ADD COLUMN "gallery_id" integer;
  ALTER TABLE "_home_page_v_rels" ADD COLUMN "promotions_id" integer;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_final_c_t_a_background_image_id_media_id_fk" FOREIGN KEY ("final_c_t_a_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_facilities_fk" FOREIGN KEY ("facilities_id") REFERENCES "public"."facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_gallery_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_promotions_fk" FOREIGN KEY ("promotions_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_final_c_t_a_background_image_id_media_id_fk" FOREIGN KEY ("version_final_c_t_a_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_facilities_fk" FOREIGN KEY ("facilities_id") REFERENCES "public"."facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_gallery_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_promotions_fk" FOREIGN KEY ("promotions_id") REFERENCES "public"."promotions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_final_c_t_a_final_c_t_a_background_image_idx" ON "home_page" USING btree ("final_c_t_a_background_image_id");
  CREATE INDEX "home_page_rels_facilities_id_idx" ON "home_page_rels" USING btree ("facilities_id");
  CREATE INDEX "home_page_rels_gallery_id_idx" ON "home_page_rels" USING btree ("gallery_id");
  CREATE INDEX "home_page_rels_promotions_id_idx" ON "home_page_rels" USING btree ("promotions_id");
  CREATE INDEX "_home_page_v_version_final_c_t_a_version_final_c_t_a_bac_idx" ON "_home_page_v" USING btree ("version_final_c_t_a_background_image_id");
  CREATE INDEX "_home_page_v_rels_facilities_id_idx" ON "_home_page_v_rels" USING btree ("facilities_id");
  CREATE INDEX "_home_page_v_rels_gallery_id_idx" ON "_home_page_v_rels" USING btree ("gallery_id");
  CREATE INDEX "_home_page_v_rels_promotions_id_idx" ON "_home_page_v_rels" USING btree ("promotions_id");
  ALTER TABLE "home_page" DROP COLUMN "hero_section_name";
  ALTER TABLE "home_page" DROP COLUMN "booking_preview_section_name";
  ALTER TABLE "home_page" DROP COLUMN "booking_preview_section_aria_label";
  ALTER TABLE "home_page" DROP COLUMN "booking_preview_form_aria_label";
  ALTER TABLE "home_page" DROP COLUMN "booking_preview_check_in_label";
  ALTER TABLE "home_page" DROP COLUMN "booking_preview_check_out_label";
  ALTER TABLE "home_page" DROP COLUMN "booking_preview_guests_label";
  ALTER TABLE "home_page" DROP COLUMN "booking_preview_promotion_link_label";
  ALTER TABLE "home_page" DROP COLUMN "booking_preview_promotion_link_u_r_l";
  ALTER TABLE "home_page" DROP COLUMN "booking_preview_submit_button_label";
  ALTER TABLE "home_page" DROP COLUMN "booking_preview_submit_button_u_r_l";
  ALTER TABLE "home_page" DROP COLUMN "booking_preview_active";
  ALTER TABLE "home_page" DROP COLUMN "booking_preview_sort_order";
  ALTER TABLE "home_page" DROP COLUMN "introduction_section_name";
  ALTER TABLE "home_page" DROP COLUMN "introduction_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "signature_experiences_section_name";
  ALTER TABLE "home_page" DROP COLUMN "signature_experiences_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "signature_experiences_button_label";
  ALTER TABLE "home_page" DROP COLUMN "signature_experiences_button_url";
  ALTER TABLE "home_page" DROP COLUMN "signature_experiences_button_open_in_new_tab";
  ALTER TABLE "home_page" DROP COLUMN "signature_experiences_button_variant";
  ALTER TABLE "home_page" DROP COLUMN "type_of_rooms_section_name";
  ALTER TABLE "home_page" DROP COLUMN "type_of_rooms_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "type_of_rooms_heading";
  ALTER TABLE "home_page" DROP COLUMN "type_of_rooms_description";
  ALTER TABLE "home_page" DROP COLUMN "type_of_rooms_active";
  ALTER TABLE "home_page" DROP COLUMN "type_of_rooms_sort_order";
  ALTER TABLE "home_page" DROP COLUMN "testimonial_note_section_name";
  ALTER TABLE "home_page" DROP COLUMN "testimonial_note_note";
  ALTER TABLE "home_page" DROP COLUMN "testimonial_note_active";
  ALTER TABLE "home_page" DROP COLUMN "testimonial_note_sort_order";
  ALTER TABLE "home_page" DROP COLUMN "journal_preview_section_name";
  ALTER TABLE "home_page" DROP COLUMN "journal_preview_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "journal_preview_button_label";
  ALTER TABLE "home_page" DROP COLUMN "journal_preview_button_url";
  ALTER TABLE "home_page" DROP COLUMN "journal_preview_button_open_in_new_tab";
  ALTER TABLE "home_page" DROP COLUMN "journal_preview_button_variant";
  ALTER TABLE "home_page" DROP COLUMN "contact_preview_section_name";
  ALTER TABLE "home_page" DROP COLUMN "contact_preview_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "contact_preview_heading";
  ALTER TABLE "home_page" DROP COLUMN "contact_preview_description";
  ALTER TABLE "home_page" DROP COLUMN "contact_preview_location_heading";
  ALTER TABLE "home_page" DROP COLUMN "contact_preview_address";
  ALTER TABLE "home_page" DROP COLUMN "contact_preview_email_label";
  ALTER TABLE "home_page" DROP COLUMN "contact_preview_email";
  ALTER TABLE "home_page" DROP COLUMN "contact_preview_phone_label";
  ALTER TABLE "home_page" DROP COLUMN "contact_preview_phone";
  ALTER TABLE "home_page" DROP COLUMN "contact_preview_map_embed_u_r_l";
  ALTER TABLE "home_page" DROP COLUMN "contact_preview_active";
  ALTER TABLE "home_page" DROP COLUMN "contact_preview_sort_order";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_hero_section_name";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_booking_preview_section_name";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_booking_preview_section_aria_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_booking_preview_form_aria_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_booking_preview_check_in_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_booking_preview_check_out_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_booking_preview_guests_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_booking_preview_promotion_link_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_booking_preview_promotion_link_u_r_l";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_booking_preview_submit_button_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_booking_preview_submit_button_u_r_l";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_booking_preview_active";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_booking_preview_sort_order";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_introduction_section_name";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_introduction_eyebrow";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_signature_experiences_section_name";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_signature_experiences_eyebrow";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_signature_experiences_button_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_signature_experiences_button_url";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_signature_experiences_button_open_in_new_tab";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_signature_experiences_button_variant";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_type_of_rooms_section_name";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_type_of_rooms_eyebrow";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_type_of_rooms_heading";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_type_of_rooms_description";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_type_of_rooms_active";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_type_of_rooms_sort_order";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_testimonial_note_section_name";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_testimonial_note_note";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_testimonial_note_active";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_testimonial_note_sort_order";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_journal_preview_section_name";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_journal_preview_eyebrow";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_journal_preview_button_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_journal_preview_button_url";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_journal_preview_button_open_in_new_tab";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_journal_preview_button_variant";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_contact_preview_section_name";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_contact_preview_eyebrow";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_contact_preview_heading";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_contact_preview_description";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_contact_preview_location_heading";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_contact_preview_address";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_contact_preview_email_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_contact_preview_email";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_contact_preview_phone_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_contact_preview_phone";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_contact_preview_map_embed_u_r_l";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_contact_preview_active";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_contact_preview_sort_order";
  DROP TYPE "public"."enum_home_page_signature_experiences_button_variant";
  DROP TYPE "public"."enum_home_page_journal_preview_button_variant";
  DROP TYPE "public"."enum__home_page_v_version_signature_experiences_button_variant";
  DROP TYPE "public"."enum__home_page_v_version_journal_preview_button_variant";`)
}
