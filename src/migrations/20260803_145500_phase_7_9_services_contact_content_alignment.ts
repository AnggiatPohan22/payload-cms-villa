import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "hero_section_name" varchar;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "hero_scroll_cue_label" varchar DEFAULT 'Scroll to services';
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "hero_active" boolean DEFAULT true;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "hero_sort_order" numeric DEFAULT 0;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "intro_section_name" varchar;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "intro_eyebrow" varchar;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "intro_active" boolean DEFAULT true;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "intro_sort_order" numeric DEFAULT 0;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "signature_services_section_name" varchar;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "signature_services_aria_label" varchar DEFAULT 'Signature services';
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "signature_services_active" boolean DEFAULT true;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "signature_services_sort_order" numeric DEFAULT 0;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "tailored_moment_section_name" varchar;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "tailored_moment_meta_label_one" varchar DEFAULT 'Island route';
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "tailored_moment_meta_label_two" varchar DEFAULT 'Concierge timing';
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "tailored_moment_active" boolean DEFAULT true;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "tailored_moment_sort_order" numeric DEFAULT 0;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "final_c_t_a_section_name" varchar;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "final_c_t_a_heading" varchar;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "final_c_t_a_description" varchar;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "final_c_t_a_primary_label" varchar;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "final_c_t_a_primary_url" varchar;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "final_c_t_a_primary_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "final_c_t_a_secondary_label" varchar;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "final_c_t_a_secondary_url" varchar;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "final_c_t_a_secondary_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "final_c_t_a_active" boolean DEFAULT true;
  ALTER TABLE "services_page" ADD COLUMN IF NOT EXISTS "final_c_t_a_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_hero_section_name" varchar;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_hero_scroll_cue_label" varchar DEFAULT 'Scroll to services';
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_hero_active" boolean DEFAULT true;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_hero_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_intro_section_name" varchar;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_intro_eyebrow" varchar;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_intro_active" boolean DEFAULT true;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_intro_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_signature_services_section_name" varchar;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_signature_services_aria_label" varchar DEFAULT 'Signature services';
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_signature_services_active" boolean DEFAULT true;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_signature_services_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_tailored_moment_section_name" varchar;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_tailored_moment_meta_label_one" varchar DEFAULT 'Island route';
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_tailored_moment_meta_label_two" varchar DEFAULT 'Concierge timing';
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_tailored_moment_active" boolean DEFAULT true;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_tailored_moment_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_final_c_t_a_section_name" varchar;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_final_c_t_a_heading" varchar;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_final_c_t_a_description" varchar;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_final_c_t_a_primary_label" varchar;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_final_c_t_a_primary_url" varchar;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_final_c_t_a_primary_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_final_c_t_a_secondary_label" varchar;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_final_c_t_a_secondary_url" varchar;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_final_c_t_a_secondary_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_final_c_t_a_active" boolean DEFAULT true;
  ALTER TABLE "_services_page_v" ADD COLUMN IF NOT EXISTS "version_final_c_t_a_sort_order" numeric DEFAULT 0;

  UPDATE "services_page"
  SET
    "hero_section_name" = COALESCE("hero_section_name", 'Hero'),
    "hero_scroll_cue_label" = COALESCE("hero_scroll_cue_label", 'Scroll to services'),
    "hero_active" = COALESCE("hero_active", true),
    "hero_sort_order" = COALESCE("hero_sort_order", 1),
    "intro_section_name" = COALESCE("intro_section_name", 'Intro'),
    "intro_eyebrow" = COALESCE("intro_eyebrow", "hero_eyebrow", 'The Villa Ceningan Way'),
    "intro_active" = COALESCE("intro_active", true),
    "intro_sort_order" = COALESCE("intro_sort_order", 2),
    "signature_services_section_name" = COALESCE("signature_services_section_name", 'Signature Services'),
    "signature_services_aria_label" = COALESCE("signature_services_aria_label", 'Signature services'),
    "signature_services_active" = COALESCE("signature_services_active", true),
    "signature_services_sort_order" = COALESCE("signature_services_sort_order", 3),
    "tailored_moment_section_name" = COALESCE("tailored_moment_section_name", 'Tailored Moment'),
    "tailored_moment_meta_label_one" = COALESCE("tailored_moment_meta_label_one", 'Island route'),
    "tailored_moment_meta_label_two" = COALESCE("tailored_moment_meta_label_two", 'Concierge timing'),
    "tailored_moment_active" = COALESCE("tailored_moment_active", true),
    "tailored_moment_sort_order" = COALESCE("tailored_moment_sort_order", 4),
    "final_c_t_a_section_name" = COALESCE("final_c_t_a_section_name", 'Final CTA'),
    "final_c_t_a_heading" = COALESCE("final_c_t_a_heading", "listing_heading", 'Enhance Your Stay'),
    "final_c_t_a_description" = COALESCE("final_c_t_a_description", "listing_description"),
    "final_c_t_a_primary_label" = COALESCE("final_c_t_a_primary_label", "final_c_t_a_label"),
    "final_c_t_a_primary_url" = COALESCE("final_c_t_a_primary_url", "final_c_t_a_url"),
    "final_c_t_a_primary_open_in_new_tab" = COALESCE("final_c_t_a_primary_open_in_new_tab", "final_c_t_a_open_in_new_tab"),
    "final_c_t_a_secondary_label" = COALESCE("final_c_t_a_secondary_label", 'Contact Concierge'),
    "final_c_t_a_secondary_url" = COALESCE("final_c_t_a_secondary_url", '/contact'),
    "final_c_t_a_secondary_open_in_new_tab" = COALESCE("final_c_t_a_secondary_open_in_new_tab", false),
    "final_c_t_a_active" = COALESCE("final_c_t_a_active", true),
    "final_c_t_a_sort_order" = COALESCE("final_c_t_a_sort_order", 5)
  WHERE "id" IS NOT NULL;

  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "hero_section_name" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "hero_active" boolean DEFAULT true;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "hero_sort_order" numeric DEFAULT 0;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_inquiry_section_name" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_inquiry_heading" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_inquiry_description" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_inquiry_location_label" varchar DEFAULT 'Villa Location';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_inquiry_location_text" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_inquiry_whats_app_label" varchar DEFAULT 'WhatsApp Concierge';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_inquiry_whats_app_text" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_inquiry_email_label" varchar DEFAULT 'Reservations';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_inquiry_email_text" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_inquiry_concierge_aria_label" varchar DEFAULT 'Concierge assistance';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_inquiry_concierge_heading" varchar DEFAULT 'Concierge Assistance';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_inquiry_button_label" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_inquiry_button_url" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_inquiry_button_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_inquiry_phone" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_inquiry_email" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_inquiry_whats_app" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_inquiry_address" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_inquiry_active" boolean DEFAULT true;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_inquiry_sort_order" numeric DEFAULT 0;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_form_section_name" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_form_aria_label" varchar DEFAULT 'Contact inquiry';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_form_heading" varchar DEFAULT 'Send an Inquiry';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_form_description" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_form_name_label" varchar DEFAULT 'Name';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_form_name_placeholder" varchar DEFAULT 'Your full name';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_form_email_label" varchar DEFAULT 'Email';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_form_email_placeholder" varchar DEFAULT 'email@example.com';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_form_subject_label" varchar DEFAULT 'Subject';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_form_subject_option_one" varchar DEFAULT 'General Inquiry';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_form_subject_option_two" varchar DEFAULT 'Availability Request';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_form_subject_option_three" varchar DEFAULT 'Villa Services';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_form_subject_option_four" varchar DEFAULT 'Special Request';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_form_message_label" varchar DEFAULT 'Message';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_form_message_placeholder" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_form_submit_button_label" varchar DEFAULT 'Submit Inquiry';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_form_submitting_button_label" varchar DEFAULT 'Opening WhatsApp...';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_form_whats_app_message_intro" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_form_active" boolean DEFAULT true;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "contact_form_sort_order" numeric DEFAULT 0;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "map_section_section_name" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "map_section_heading" varchar DEFAULT 'A Hidden Gem';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "map_section_description" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "map_section_location_heading" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "map_section_map_title" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "map_section_map_embed_u_r_l" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "map_section_button_label" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "map_section_button_url" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "map_section_button_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "map_section_active" boolean DEFAULT true;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "map_section_sort_order" numeric DEFAULT 0;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "quote_section_name" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "quote_aria_label" varchar DEFAULT 'Villa Ceningan quote';
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "quote_text" varchar;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "quote_active" boolean DEFAULT true;
  ALTER TABLE "contact_page" ADD COLUMN IF NOT EXISTS "quote_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_hero_section_name" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_hero_active" boolean DEFAULT true;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_hero_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_inquiry_section_name" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_inquiry_heading" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_inquiry_description" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_inquiry_location_label" varchar DEFAULT 'Villa Location';
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_inquiry_location_text" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_inquiry_whats_app_label" varchar DEFAULT 'WhatsApp Concierge';
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_inquiry_whats_app_text" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_inquiry_email_label" varchar DEFAULT 'Reservations';
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_inquiry_email_text" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_inquiry_concierge_aria_label" varchar DEFAULT 'Concierge assistance';
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_inquiry_concierge_heading" varchar DEFAULT 'Concierge Assistance';
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_inquiry_button_label" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_inquiry_button_url" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_inquiry_button_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_inquiry_phone" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_inquiry_email" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_inquiry_whats_app" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_inquiry_address" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_inquiry_active" boolean DEFAULT true;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_inquiry_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_form_section_name" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_form_aria_label" varchar DEFAULT 'Contact inquiry';
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_form_heading" varchar DEFAULT 'Send an Inquiry';
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_form_description" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_form_name_label" varchar DEFAULT 'Name';
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_form_name_placeholder" varchar DEFAULT 'Your full name';
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_form_email_label" varchar DEFAULT 'Email';
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_form_email_placeholder" varchar DEFAULT 'email@example.com';
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_form_subject_label" varchar DEFAULT 'Subject';
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_form_subject_option_one" varchar DEFAULT 'General Inquiry';
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_form_subject_option_two" varchar DEFAULT 'Availability Request';
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_form_subject_option_three" varchar DEFAULT 'Villa Services';
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_form_subject_option_four" varchar DEFAULT 'Special Request';
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_form_message_label" varchar DEFAULT 'Message';
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_form_message_placeholder" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_form_submit_button_label" varchar DEFAULT 'Submit Inquiry';
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_form_submitting_button_label" varchar DEFAULT 'Opening WhatsApp...';
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_form_whats_app_message_intro" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_form_active" boolean DEFAULT true;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_contact_form_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_map_section_section_name" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_map_section_heading" varchar DEFAULT 'A Hidden Gem';
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_map_section_description" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_map_section_location_heading" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_map_section_map_title" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_map_section_map_embed_u_r_l" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_map_section_button_label" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_map_section_button_url" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_map_section_button_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_map_section_active" boolean DEFAULT true;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_map_section_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_quote_section_name" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_quote_aria_label" varchar DEFAULT 'Villa Ceningan quote';
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_quote_text" varchar;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_quote_active" boolean DEFAULT true;
  ALTER TABLE "_contact_page_v" ADD COLUMN IF NOT EXISTS "version_quote_sort_order" numeric DEFAULT 0;

  UPDATE "contact_page"
  SET
    "hero_section_name" = COALESCE("hero_section_name", 'Hero'),
    "hero_active" = COALESCE("hero_active", true),
    "hero_sort_order" = COALESCE("hero_sort_order", 1),
    "contact_inquiry_section_name" = COALESCE("contact_inquiry_section_name", 'Contact Inquiry'),
    "contact_inquiry_heading" = COALESCE("contact_inquiry_heading", "contact_heading"),
    "contact_inquiry_description" = COALESCE("contact_inquiry_description", "contact_description"),
    "contact_inquiry_location_label" = COALESCE("contact_inquiry_location_label", 'Villa Location'),
    "contact_inquiry_location_text" = COALESCE("contact_inquiry_location_text", 'Nusa Ceningan, Klungkung, Bali'),
    "contact_inquiry_whats_app_label" = COALESCE("contact_inquiry_whats_app_label", 'WhatsApp Concierge'),
    "contact_inquiry_whats_app_text" = COALESCE("contact_inquiry_whats_app_text", 'Direct inquiries for dates, arrivals, and stay details.'),
    "contact_inquiry_email_label" = COALESCE("contact_inquiry_email_label", 'Reservations'),
    "contact_inquiry_email_text" = COALESCE("contact_inquiry_email_text", 'Email us for longer stay requests or detailed arrangements.'),
    "contact_inquiry_concierge_aria_label" = COALESCE("contact_inquiry_concierge_aria_label", 'Concierge assistance'),
    "contact_inquiry_concierge_heading" = COALESCE("contact_inquiry_concierge_heading", 'Concierge Assistance'),
    "contact_inquiry_button_label" = COALESCE("contact_inquiry_button_label", "final_c_t_a_label"),
    "contact_inquiry_button_url" = COALESCE("contact_inquiry_button_url", "final_c_t_a_url"),
    "contact_inquiry_button_open_in_new_tab" = COALESCE("contact_inquiry_button_open_in_new_tab", "final_c_t_a_open_in_new_tab"),
    "contact_inquiry_phone" = COALESCE("contact_inquiry_phone", "phone"),
    "contact_inquiry_email" = COALESCE("contact_inquiry_email", "email"),
    "contact_inquiry_whats_app" = COALESCE("contact_inquiry_whats_app", "whats_app"),
    "contact_inquiry_address" = COALESCE("contact_inquiry_address", "address"),
    "contact_inquiry_active" = COALESCE("contact_inquiry_active", true),
    "contact_inquiry_sort_order" = COALESCE("contact_inquiry_sort_order", 2),
    "contact_form_section_name" = COALESCE("contact_form_section_name", 'Contact Form'),
    "contact_form_description" = COALESCE("contact_form_description", 'Share your stay preferences and our concierge will continue the conversation directly.'),
    "contact_form_message_placeholder" = COALESCE("contact_form_message_placeholder", 'Tell us about your island stay, arrival plan, or special request.'),
    "contact_form_whats_app_message_intro" = COALESCE("contact_form_whats_app_message_intro", 'Hello Villa Ceningan, I would like to send a contact inquiry.'),
    "contact_form_active" = COALESCE("contact_form_active", true),
    "contact_form_sort_order" = COALESCE("contact_form_sort_order", 3),
    "map_section_section_name" = COALESCE("map_section_section_name", 'Map Section'),
    "map_section_heading" = COALESCE("map_section_heading", 'A Hidden Gem'),
    "map_section_description" = COALESCE("map_section_description", 'Set in the rhythm of Nusa Ceningan, close enough to island life and quiet enough to fully slow down.'),
    "map_section_location_heading" = COALESCE("map_section_location_heading", "address"),
    "map_section_map_title" = COALESCE("map_section_map_title", 'Villa Ceningan map'),
    "map_section_map_embed_u_r_l" = COALESCE("map_section_map_embed_u_r_l", "map_embed_u_r_l"),
    "map_section_button_label" = COALESCE("map_section_button_label", "final_c_t_a_label"),
    "map_section_button_url" = COALESCE("map_section_button_url", "final_c_t_a_url"),
    "map_section_button_open_in_new_tab" = COALESCE("map_section_button_open_in_new_tab", "final_c_t_a_open_in_new_tab"),
    "map_section_active" = COALESCE("map_section_active", true),
    "map_section_sort_order" = COALESCE("map_section_sort_order", 4),
    "quote_section_name" = COALESCE("quote_section_name", 'Quote'),
    "quote_aria_label" = COALESCE("quote_aria_label", 'Villa Ceningan quote'),
    "quote_text" = COALESCE("quote_text", 'Peace is found in simple arrivals, warm care, and the feeling that every detail is already prepared.'),
    "quote_active" = COALESCE("quote_active", true),
    "quote_sort_order" = COALESCE("quote_sort_order", 5)
  WHERE "id" IS NOT NULL;

  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "hero_eyebrow";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "listing_heading";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "listing_description";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "final_c_t_a_label";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "final_c_t_a_url";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "final_c_t_a_open_in_new_tab";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "final_c_t_a_variant";
  ALTER TABLE "_services_page_v" DROP COLUMN IF EXISTS "version_hero_eyebrow";
  ALTER TABLE "_services_page_v" DROP COLUMN IF EXISTS "version_listing_heading";
  ALTER TABLE "_services_page_v" DROP COLUMN IF EXISTS "version_listing_description";
  ALTER TABLE "_services_page_v" DROP COLUMN IF EXISTS "version_final_c_t_a_label";
  ALTER TABLE "_services_page_v" DROP COLUMN IF EXISTS "version_final_c_t_a_url";
  ALTER TABLE "_services_page_v" DROP COLUMN IF EXISTS "version_final_c_t_a_open_in_new_tab";
  ALTER TABLE "_services_page_v" DROP COLUMN IF EXISTS "version_final_c_t_a_variant";
  DROP TYPE IF EXISTS "public"."enum_services_page_final_c_t_a_variant";
  DROP TYPE IF EXISTS "public"."enum__services_page_v_version_final_c_t_a_variant";

  ALTER TABLE "contact_page_operational_hours" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contact_page_v_version_operational_hours" DISABLE ROW LEVEL SECURITY;
  DROP TABLE IF EXISTS "contact_page_operational_hours" CASCADE;
  DROP TABLE IF EXISTS "_contact_page_v_version_operational_hours" CASCADE;
  ALTER TABLE "contact_page" DROP COLUMN IF EXISTS "contact_heading";
  ALTER TABLE "contact_page" DROP COLUMN IF EXISTS "contact_description";
  ALTER TABLE "contact_page" DROP COLUMN IF EXISTS "phone";
  ALTER TABLE "contact_page" DROP COLUMN IF EXISTS "email";
  ALTER TABLE "contact_page" DROP COLUMN IF EXISTS "whats_app";
  ALTER TABLE "contact_page" DROP COLUMN IF EXISTS "address";
  ALTER TABLE "contact_page" DROP COLUMN IF EXISTS "map_embed_u_r_l";
  ALTER TABLE "contact_page" DROP COLUMN IF EXISTS "final_c_t_a_label";
  ALTER TABLE "contact_page" DROP COLUMN IF EXISTS "final_c_t_a_url";
  ALTER TABLE "contact_page" DROP COLUMN IF EXISTS "final_c_t_a_open_in_new_tab";
  ALTER TABLE "contact_page" DROP COLUMN IF EXISTS "final_c_t_a_variant";
  ALTER TABLE "_contact_page_v" DROP COLUMN IF EXISTS "version_contact_heading";
  ALTER TABLE "_contact_page_v" DROP COLUMN IF EXISTS "version_contact_description";
  ALTER TABLE "_contact_page_v" DROP COLUMN IF EXISTS "version_phone";
  ALTER TABLE "_contact_page_v" DROP COLUMN IF EXISTS "version_email";
  ALTER TABLE "_contact_page_v" DROP COLUMN IF EXISTS "version_whats_app";
  ALTER TABLE "_contact_page_v" DROP COLUMN IF EXISTS "version_address";
  ALTER TABLE "_contact_page_v" DROP COLUMN IF EXISTS "version_map_embed_u_r_l";
  ALTER TABLE "_contact_page_v" DROP COLUMN IF EXISTS "version_final_c_t_a_label";
  ALTER TABLE "_contact_page_v" DROP COLUMN IF EXISTS "version_final_c_t_a_url";
  ALTER TABLE "_contact_page_v" DROP COLUMN IF EXISTS "version_final_c_t_a_open_in_new_tab";
  ALTER TABLE "_contact_page_v" DROP COLUMN IF EXISTS "version_final_c_t_a_variant";
  DROP TYPE IF EXISTS "public"."enum_contact_page_final_c_t_a_variant";
  DROP TYPE IF EXISTS "public"."enum__contact_page_v_version_final_c_t_a_variant";
`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "hero_section_name";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "hero_scroll_cue_label";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "hero_active";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "hero_sort_order";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "intro_section_name";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "intro_eyebrow";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "intro_active";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "intro_sort_order";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "signature_services_section_name";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "signature_services_aria_label";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "signature_services_active";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "signature_services_sort_order";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "tailored_moment_section_name";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "tailored_moment_meta_label_one";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "tailored_moment_meta_label_two";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "tailored_moment_active";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "tailored_moment_sort_order";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "final_c_t_a_section_name";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "final_c_t_a_heading";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "final_c_t_a_description";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "final_c_t_a_primary_label";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "final_c_t_a_primary_url";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "final_c_t_a_primary_open_in_new_tab";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "final_c_t_a_secondary_label";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "final_c_t_a_secondary_url";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "final_c_t_a_secondary_open_in_new_tab";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "final_c_t_a_active";
  ALTER TABLE "services_page" DROP COLUMN IF EXISTS "final_c_t_a_sort_order";
`)
}
