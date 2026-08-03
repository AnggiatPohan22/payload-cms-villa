import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_about_page_final_c_t_a_button_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__about_page_v_version_final_c_t_a_button_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum_rooms_page_room_collection_button_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__rooms_page_v_version_room_collection_button_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TABLE "about_page_story_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "about_page_principles_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "about_page_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"description" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "_about_page_v_version_story_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_principles_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  DROP INDEX "about_page_hero_image_idx";
  DROP INDEX "_about_page_v_version_version_hero_image_idx";
  DROP INDEX "rooms_page_hero_image_idx";
  DROP INDEX "_rooms_page_v_version_version_hero_image_idx";
  ALTER TABLE "about_page" ADD COLUMN "hero_section_name" varchar;
  ALTER TABLE "about_page" ADD COLUMN "hero_eyebrow" varchar;
  ALTER TABLE "about_page" ADD COLUMN "hero_scroll_cue_label" varchar DEFAULT 'Scroll to our story';
  ALTER TABLE "about_page" ADD COLUMN "hero_active" boolean DEFAULT true;
  ALTER TABLE "about_page" ADD COLUMN "hero_sort_order" numeric DEFAULT 0;
  ALTER TABLE "about_page" ADD COLUMN "story_section_name" varchar;
  ALTER TABLE "about_page" ADD COLUMN "story_eyebrow" varchar;
  ALTER TABLE "about_page" ADD COLUMN "story_heading" varchar;
  ALTER TABLE "about_page" ADD COLUMN "story_image_id" integer;
  ALTER TABLE "about_page" ADD COLUMN "story_active" boolean DEFAULT true;
  ALTER TABLE "about_page" ADD COLUMN "story_sort_order" numeric DEFAULT 0;
  ALTER TABLE "about_page" ADD COLUMN "principles_section_name" varchar;
  ALTER TABLE "about_page" ADD COLUMN "principles_eyebrow" varchar;
  ALTER TABLE "about_page" ADD COLUMN "principles_heading" varchar;
  ALTER TABLE "about_page" ADD COLUMN "principles_description" varchar;
  ALTER TABLE "about_page" ADD COLUMN "principles_active" boolean DEFAULT true;
  ALTER TABLE "about_page" ADD COLUMN "principles_sort_order" numeric DEFAULT 0;
  ALTER TABLE "about_page" ADD COLUMN "team_section_name" varchar;
  ALTER TABLE "about_page" ADD COLUMN "team_heading" varchar;
  ALTER TABLE "about_page" ADD COLUMN "team_quote" varchar;
  ALTER TABLE "about_page" ADD COLUMN "team_active" boolean DEFAULT true;
  ALTER TABLE "about_page" ADD COLUMN "team_sort_order" numeric DEFAULT 0;
  ALTER TABLE "about_page" ADD COLUMN "final_c_t_a_section_name" varchar;
  ALTER TABLE "about_page" ADD COLUMN "final_c_t_a_heading" varchar;
  ALTER TABLE "about_page" ADD COLUMN "final_c_t_a_image_id" integer;
  ALTER TABLE "about_page" ADD COLUMN "final_c_t_a_button_label" varchar;
  ALTER TABLE "about_page" ADD COLUMN "final_c_t_a_button_url" varchar;
  ALTER TABLE "about_page" ADD COLUMN "final_c_t_a_button_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "about_page" ADD COLUMN "final_c_t_a_button_variant" "enum_about_page_final_c_t_a_button_variant" DEFAULT 'primary';
  ALTER TABLE "about_page" ADD COLUMN "final_c_t_a_active" boolean DEFAULT true;
  ALTER TABLE "about_page" ADD COLUMN "final_c_t_a_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_hero_section_name" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_hero_eyebrow" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_hero_scroll_cue_label" varchar DEFAULT 'Scroll to our story';
  ALTER TABLE "_about_page_v" ADD COLUMN "version_hero_active" boolean DEFAULT true;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_hero_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_story_section_name" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_story_eyebrow" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_story_heading" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_story_image_id" integer;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_story_active" boolean DEFAULT true;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_story_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_principles_section_name" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_principles_eyebrow" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_principles_heading" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_principles_description" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_principles_active" boolean DEFAULT true;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_principles_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_team_section_name" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_team_heading" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_team_quote" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_team_active" boolean DEFAULT true;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_team_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_final_c_t_a_section_name" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_final_c_t_a_heading" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_final_c_t_a_image_id" integer;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_final_c_t_a_button_label" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_final_c_t_a_button_url" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_final_c_t_a_button_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_final_c_t_a_button_variant" "enum__about_page_v_version_final_c_t_a_button_variant" DEFAULT 'primary';
  ALTER TABLE "_about_page_v" ADD COLUMN "version_final_c_t_a_active" boolean DEFAULT true;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_final_c_t_a_sort_order" numeric DEFAULT 0;
  ALTER TABLE "rooms_page" ADD COLUMN "hero_section_name" varchar;
  ALTER TABLE "rooms_page" ADD COLUMN "hero_active" boolean DEFAULT true;
  ALTER TABLE "rooms_page" ADD COLUMN "hero_sort_order" numeric DEFAULT 0;
  ALTER TABLE "rooms_page" ADD COLUMN "availability_bar_section_name" varchar;
  ALTER TABLE "rooms_page" ADD COLUMN "availability_bar_section_aria_label" varchar DEFAULT 'Booking preview';
  ALTER TABLE "rooms_page" ADD COLUMN "availability_bar_form_aria_label" varchar DEFAULT 'Availability search';
  ALTER TABLE "rooms_page" ADD COLUMN "availability_bar_check_in_label" varchar DEFAULT 'Check-in';
  ALTER TABLE "rooms_page" ADD COLUMN "availability_bar_check_out_label" varchar DEFAULT 'Check-out';
  ALTER TABLE "rooms_page" ADD COLUMN "availability_bar_guests_label" varchar DEFAULT 'Guests';
  ALTER TABLE "rooms_page" ADD COLUMN "availability_bar_promotion_link_label" varchar DEFAULT 'Have a promotion code?';
  ALTER TABLE "rooms_page" ADD COLUMN "availability_bar_promotion_link_u_r_l" varchar DEFAULT '/reservation';
  ALTER TABLE "rooms_page" ADD COLUMN "availability_bar_submit_button_label" varchar DEFAULT 'Check Availability';
  ALTER TABLE "rooms_page" ADD COLUMN "availability_bar_submit_button_u_r_l" varchar DEFAULT '/reservation';
  ALTER TABLE "rooms_page" ADD COLUMN "availability_bar_active" boolean DEFAULT true;
  ALTER TABLE "rooms_page" ADD COLUMN "availability_bar_sort_order" numeric DEFAULT 0;
  ALTER TABLE "rooms_page" ADD COLUMN "room_collection_section_name" varchar;
  ALTER TABLE "rooms_page" ADD COLUMN "room_collection_eyebrow" varchar;
  ALTER TABLE "rooms_page" ADD COLUMN "room_collection_heading" varchar;
  ALTER TABLE "rooms_page" ADD COLUMN "room_collection_description" varchar;
  ALTER TABLE "rooms_page" ADD COLUMN "room_collection_rating_symbol" varchar DEFAULT '* * * * *';
  ALTER TABLE "rooms_page" ADD COLUMN "room_collection_start_from_label" varchar DEFAULT 'Start from';
  ALTER TABLE "rooms_page" ADD COLUMN "room_collection_night_suffix_label" varchar DEFAULT '/ night';
  ALTER TABLE "rooms_page" ADD COLUMN "room_collection_status_label" varchar DEFAULT 'Status';
  ALTER TABLE "rooms_page" ADD COLUMN "room_collection_deposit_label" varchar DEFAULT 'Deposit';
  ALTER TABLE "rooms_page" ADD COLUMN "room_collection_beds_label" varchar DEFAULT 'Beds';
  ALTER TABLE "rooms_page" ADD COLUMN "room_collection_passenger_label" varchar DEFAULT 'Passenger';
  ALTER TABLE "rooms_page" ADD COLUMN "room_collection_detail_button_label" varchar DEFAULT 'View Detail';
  ALTER TABLE "rooms_page" ADD COLUMN "room_collection_button_label" varchar;
  ALTER TABLE "rooms_page" ADD COLUMN "room_collection_button_url" varchar;
  ALTER TABLE "rooms_page" ADD COLUMN "room_collection_button_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "rooms_page" ADD COLUMN "room_collection_button_variant" "enum_rooms_page_room_collection_button_variant" DEFAULT 'primary';
  ALTER TABLE "rooms_page" ADD COLUMN "room_collection_active" boolean DEFAULT true;
  ALTER TABLE "rooms_page" ADD COLUMN "room_collection_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_hero_section_name" varchar;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_hero_active" boolean DEFAULT true;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_hero_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_availability_bar_section_name" varchar;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_availability_bar_section_aria_label" varchar DEFAULT 'Booking preview';
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_availability_bar_form_aria_label" varchar DEFAULT 'Availability search';
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_availability_bar_check_in_label" varchar DEFAULT 'Check-in';
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_availability_bar_check_out_label" varchar DEFAULT 'Check-out';
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_availability_bar_guests_label" varchar DEFAULT 'Guests';
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_availability_bar_promotion_link_label" varchar DEFAULT 'Have a promotion code?';
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_availability_bar_promotion_link_u_r_l" varchar DEFAULT '/reservation';
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_availability_bar_submit_button_label" varchar DEFAULT 'Check Availability';
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_availability_bar_submit_button_u_r_l" varchar DEFAULT '/reservation';
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_availability_bar_active" boolean DEFAULT true;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_availability_bar_sort_order" numeric DEFAULT 0;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_room_collection_section_name" varchar;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_room_collection_eyebrow" varchar;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_room_collection_heading" varchar;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_room_collection_description" varchar;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_room_collection_rating_symbol" varchar DEFAULT '* * * * *';
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_room_collection_start_from_label" varchar DEFAULT 'Start from';
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_room_collection_night_suffix_label" varchar DEFAULT '/ night';
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_room_collection_status_label" varchar DEFAULT 'Status';
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_room_collection_deposit_label" varchar DEFAULT 'Deposit';
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_room_collection_beds_label" varchar DEFAULT 'Beds';
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_room_collection_passenger_label" varchar DEFAULT 'Passenger';
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_room_collection_detail_button_label" varchar DEFAULT 'View Detail';
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_room_collection_button_label" varchar;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_room_collection_button_url" varchar;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_room_collection_button_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_room_collection_button_variant" "enum__rooms_page_v_version_room_collection_button_variant" DEFAULT 'primary';
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_room_collection_active" boolean DEFAULT true;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_room_collection_sort_order" numeric DEFAULT 0;
  ALTER TABLE "about_page_story_paragraphs" ADD CONSTRAINT "about_page_story_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_principles_items" ADD CONSTRAINT "about_page_principles_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_principles_items" ADD CONSTRAINT "about_page_principles_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_team_members" ADD CONSTRAINT "about_page_team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_team_members" ADD CONSTRAINT "about_page_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_story_paragraphs" ADD CONSTRAINT "_about_page_v_version_story_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_principles_items" ADD CONSTRAINT "_about_page_v_version_principles_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_principles_items" ADD CONSTRAINT "_about_page_v_version_principles_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_team_members" ADD CONSTRAINT "_about_page_v_version_team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_team_members" ADD CONSTRAINT "_about_page_v_version_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "about_page_story_paragraphs_order_idx" ON "about_page_story_paragraphs" USING btree ("_order");
  CREATE INDEX "about_page_story_paragraphs_parent_id_idx" ON "about_page_story_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "about_page_principles_items_order_idx" ON "about_page_principles_items" USING btree ("_order");
  CREATE INDEX "about_page_principles_items_parent_id_idx" ON "about_page_principles_items" USING btree ("_parent_id");
  CREATE INDEX "about_page_principles_items_image_idx" ON "about_page_principles_items" USING btree ("image_id");
  CREATE INDEX "about_page_team_members_order_idx" ON "about_page_team_members" USING btree ("_order");
  CREATE INDEX "about_page_team_members_parent_id_idx" ON "about_page_team_members" USING btree ("_parent_id");
  CREATE INDEX "about_page_team_members_image_idx" ON "about_page_team_members" USING btree ("image_id");
  CREATE INDEX "_about_page_v_version_story_paragraphs_order_idx" ON "_about_page_v_version_story_paragraphs" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_story_paragraphs_parent_id_idx" ON "_about_page_v_version_story_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_principles_items_order_idx" ON "_about_page_v_version_principles_items" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_principles_items_parent_id_idx" ON "_about_page_v_version_principles_items" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_principles_items_image_idx" ON "_about_page_v_version_principles_items" USING btree ("image_id");
  CREATE INDEX "_about_page_v_version_team_members_order_idx" ON "_about_page_v_version_team_members" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_team_members_parent_id_idx" ON "_about_page_v_version_team_members" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_team_members_image_idx" ON "_about_page_v_version_team_members" USING btree ("image_id");
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_story_image_id_media_id_fk" FOREIGN KEY ("story_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_final_c_t_a_image_id_media_id_fk" FOREIGN KEY ("final_c_t_a_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_story_image_id_media_id_fk" FOREIGN KEY ("version_story_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_final_c_t_a_image_id_media_id_fk" FOREIGN KEY ("version_final_c_t_a_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "about_page_hero_hero_image_idx" ON "about_page" USING btree ("hero_image_id");
  CREATE INDEX "about_page_story_story_image_idx" ON "about_page" USING btree ("story_image_id");
  CREATE INDEX "about_page_final_c_t_a_final_c_t_a_image_idx" ON "about_page" USING btree ("final_c_t_a_image_id");
  CREATE INDEX "_about_page_v_version_hero_version_hero_image_idx" ON "_about_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_about_page_v_version_story_version_story_image_idx" ON "_about_page_v" USING btree ("version_story_image_id");
  CREATE INDEX "_about_page_v_version_final_c_t_a_version_final_c_t_a_im_idx" ON "_about_page_v" USING btree ("version_final_c_t_a_image_id");
  CREATE INDEX "rooms_page_hero_hero_image_idx" ON "rooms_page" USING btree ("hero_image_id");
  CREATE INDEX "_rooms_page_v_version_hero_version_hero_image_idx" ON "_rooms_page_v" USING btree ("version_hero_image_id");
  UPDATE "about_page"
  SET
    "hero_section_name" = COALESCE("hero_section_name", 'Hero'),
    "hero_eyebrow" = COALESCE("hero_eyebrow", 'Est. island mornings'),
    "hero_scroll_cue_label" = COALESCE("hero_scroll_cue_label", 'Scroll to our story'),
    "hero_active" = COALESCE("hero_active", true),
    "hero_sort_order" = COALESCE("hero_sort_order", 1),
    "story_section_name" = COALESCE("story_section_name", 'Our Story'),
    "story_eyebrow" = COALESCE("story_eyebrow", 'Nusa Ceningan, Bali'),
    "story_heading" = COALESCE("story_heading", "introduction_heading", 'Our Story'),
    "story_image_id" = COALESCE(
      "story_image_id",
      (SELECT "image_id" FROM "about_page_supporting_images" WHERE "_parent_id" = "about_page"."id" ORDER BY "_order" LIMIT 1),
      "hero_image_id"
    ),
    "story_active" = COALESCE("story_active", true),
    "story_sort_order" = COALESCE("story_sort_order", 2),
    "principles_section_name" = COALESCE("principles_section_name", 'Principles'),
    "principles_eyebrow" = COALESCE("principles_eyebrow", 'Sustainable Luxury'),
    "principles_heading" = COALESCE("principles_heading", 'Luxury is a responsibility.'),
    "principles_description" = COALESCE(
      "principles_description",
      'Our commitment is woven into details guests can feel: calm spaces, local care, and less excess.'
    ),
    "principles_active" = COALESCE("principles_active", true),
    "principles_sort_order" = COALESCE("principles_sort_order", 3),
    "team_section_name" = COALESCE("team_section_name", 'Team'),
    "team_heading" = COALESCE("team_heading", 'The Stewards of Villa Ceningan'),
    "team_quote" = COALESCE(
      "team_quote",
      'We do not design hospitality around noise. We design it around attention, timing, and small comforts that make guests feel expected.'
    ),
    "team_active" = COALESCE("team_active", true),
    "team_sort_order" = COALESCE("team_sort_order", 4),
    "final_c_t_a_section_name" = COALESCE("final_c_t_a_section_name", 'Final CTA'),
    "final_c_t_a_heading" = COALESCE("final_c_t_a_heading", 'Reconnect with your island rhythm.'),
    "final_c_t_a_image_id" = COALESCE("final_c_t_a_image_id", "hero_image_id"),
    "final_c_t_a_button_label" = COALESCE("final_c_t_a_button_label", "final_c_t_a_label"),
    "final_c_t_a_button_url" = COALESCE("final_c_t_a_button_url", "final_c_t_a_url"),
    "final_c_t_a_button_open_in_new_tab" = COALESCE("final_c_t_a_button_open_in_new_tab", "final_c_t_a_open_in_new_tab"),
    "final_c_t_a_button_variant" = COALESCE("final_c_t_a_button_variant", "final_c_t_a_variant"::text::"enum_about_page_final_c_t_a_button_variant"),
    "final_c_t_a_active" = COALESCE("final_c_t_a_active", true),
    "final_c_t_a_sort_order" = COALESCE("final_c_t_a_sort_order", 5)
  WHERE "id" IS NOT NULL;
  INSERT INTO "about_page_story_paragraphs" ("_order", "_parent_id", "id", "text")
  SELECT
    ROW_NUMBER() OVER (PARTITION BY page."id" ORDER BY text_item.ordinality)::integer,
    page."id",
    md5(page."id"::text || '-story-' || text_item.ordinality::text),
    text_item.value #>> '{}'
  FROM "about_page" page
  CROSS JOIN LATERAL jsonb_path_query(
    COALESCE(page."story_content", page."introduction_content"),
    '$.root.children[*].children[*].text'
  ) WITH ORDINALITY AS text_item(value, ordinality)
  WHERE text_item.value #>> '{}' IS NOT NULL
    AND text_item.value #>> '{}' <> ''
    AND NOT EXISTS (
      SELECT 1 FROM "about_page_story_paragraphs" existing
      WHERE existing."_parent_id" = page."id"
    );
  INSERT INTO "about_page_story_paragraphs" ("_order", "_parent_id", "id", "text")
  SELECT
    1,
    page."id",
    md5(page."id"::text || '-story-fallback'),
    page."hero_description"
  FROM "about_page" page
  WHERE page."hero_description" IS NOT NULL
    AND NOT EXISTS (
      SELECT 1 FROM "about_page_story_paragraphs" existing
      WHERE existing."_parent_id" = page."id"
    );
  INSERT INTO "about_page_principles_items" ("_order", "_parent_id", "id", "title", "description", "image_id")
  SELECT
    value."_order",
    value."_parent_id",
    value."id",
    value."title",
    value."description",
    image."image_id"
  FROM "about_page_values" value
  LEFT JOIN "about_page_supporting_images" image
    ON image."_parent_id" = value."_parent_id"
    AND (image."alt" = value."title" OR image."caption" = value."description")
  WHERE value."title" IS NOT NULL
    AND NOT EXISTS (
      SELECT 1 FROM "about_page_principles_items" existing
      WHERE existing."_parent_id" = value."_parent_id"
    );
  INSERT INTO "about_page_team_members" ("_order", "_parent_id", "id", "name", "role", "description", "image_id")
  SELECT
    1,
    page."id",
    md5(page."id"::text || '-team-1'),
    'Villa Ceningan Team',
    'Guest Experience',
    'Preparing daily details, stay requests, and WhatsApp support before guests need to ask.',
    page."hero_image_id"
  FROM "about_page" page
  WHERE NOT EXISTS (
    SELECT 1 FROM "about_page_team_members" existing
    WHERE existing."_parent_id" = page."id"
  );
  UPDATE "rooms_page"
  SET
    "hero_section_name" = COALESCE("hero_section_name", 'Hero'),
    "hero_active" = COALESCE("hero_active", true),
    "hero_sort_order" = COALESCE("hero_sort_order", 1),
    "availability_bar_section_name" = COALESCE("availability_bar_section_name", 'Availability Bar'),
    "availability_bar_section_aria_label" = COALESCE("availability_bar_section_aria_label", 'Booking preview'),
    "availability_bar_form_aria_label" = COALESCE("availability_bar_form_aria_label", 'Availability search'),
    "availability_bar_check_in_label" = COALESCE("availability_bar_check_in_label", 'Check-in'),
    "availability_bar_check_out_label" = COALESCE("availability_bar_check_out_label", 'Check-out'),
    "availability_bar_guests_label" = COALESCE("availability_bar_guests_label", 'Guests'),
    "availability_bar_promotion_link_label" = COALESCE("availability_bar_promotion_link_label", 'Have a promotion code?'),
    "availability_bar_promotion_link_u_r_l" = COALESCE("availability_bar_promotion_link_u_r_l", '/reservation'),
    "availability_bar_submit_button_label" = COALESCE("availability_bar_submit_button_label", 'Check Availability'),
    "availability_bar_submit_button_u_r_l" = COALESCE("availability_bar_submit_button_u_r_l", '/reservation'),
    "availability_bar_active" = COALESCE("availability_bar_active", true),
    "availability_bar_sort_order" = COALESCE("availability_bar_sort_order", 2),
    "room_collection_section_name" = COALESCE("room_collection_section_name", 'Type of Room'),
    "room_collection_eyebrow" = COALESCE("room_collection_eyebrow", "hero_eyebrow", 'Signature Collection'),
    "room_collection_heading" = COALESCE("room_collection_heading", "listing_heading", "intro_heading"),
    "room_collection_description" = COALESCE("room_collection_description", "listing_description", "intro_description"),
    "room_collection_rating_symbol" = COALESCE("room_collection_rating_symbol", '* * * * *'),
    "room_collection_start_from_label" = COALESCE("room_collection_start_from_label", 'Start from'),
    "room_collection_night_suffix_label" = COALESCE("room_collection_night_suffix_label", '/ night'),
    "room_collection_status_label" = COALESCE("room_collection_status_label", 'Status'),
    "room_collection_deposit_label" = COALESCE("room_collection_deposit_label", 'Deposit'),
    "room_collection_beds_label" = COALESCE("room_collection_beds_label", 'Beds'),
    "room_collection_passenger_label" = COALESCE("room_collection_passenger_label", 'Passenger'),
    "room_collection_detail_button_label" = COALESCE("room_collection_detail_button_label", 'View Detail'),
    "room_collection_button_label" = COALESCE("room_collection_button_label", "listing_c_t_a_label"),
    "room_collection_button_url" = COALESCE("room_collection_button_url", "listing_c_t_a_url"),
    "room_collection_button_open_in_new_tab" = COALESCE("room_collection_button_open_in_new_tab", "listing_c_t_a_open_in_new_tab"),
    "room_collection_button_variant" = COALESCE("room_collection_button_variant", "listing_c_t_a_variant"::text::"enum_rooms_page_room_collection_button_variant"),
    "room_collection_active" = COALESCE("room_collection_active", true),
    "room_collection_sort_order" = COALESCE("room_collection_sort_order", 3)
  WHERE "id" IS NOT NULL;
  ALTER TABLE "about_page_supporting_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_supporting_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_values" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "about_page_supporting_images" CASCADE;
  DROP TABLE "about_page_values" CASCADE;
  DROP TABLE "_about_page_v_version_supporting_images" CASCADE;
  DROP TABLE "_about_page_v_version_values" CASCADE;
  ALTER TABLE "about_page" DROP COLUMN "introduction_heading";
  ALTER TABLE "about_page" DROP COLUMN "introduction_content";
  ALTER TABLE "about_page" DROP COLUMN "story_content";
  ALTER TABLE "about_page" DROP COLUMN "final_c_t_a_label";
  ALTER TABLE "about_page" DROP COLUMN "final_c_t_a_url";
  ALTER TABLE "about_page" DROP COLUMN "final_c_t_a_open_in_new_tab";
  ALTER TABLE "about_page" DROP COLUMN "final_c_t_a_variant";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_introduction_heading";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_introduction_content";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_story_content";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_final_c_t_a_label";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_final_c_t_a_url";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_final_c_t_a_open_in_new_tab";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_final_c_t_a_variant";
  ALTER TABLE "rooms_page" DROP COLUMN "hero_eyebrow";
  ALTER TABLE "rooms_page" DROP COLUMN "intro_heading";
  ALTER TABLE "rooms_page" DROP COLUMN "intro_description";
  ALTER TABLE "rooms_page" DROP COLUMN "listing_heading";
  ALTER TABLE "rooms_page" DROP COLUMN "listing_description";
  ALTER TABLE "rooms_page" DROP COLUMN "listing_c_t_a_label";
  ALTER TABLE "rooms_page" DROP COLUMN "listing_c_t_a_url";
  ALTER TABLE "rooms_page" DROP COLUMN "listing_c_t_a_open_in_new_tab";
  ALTER TABLE "rooms_page" DROP COLUMN "listing_c_t_a_variant";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_hero_eyebrow";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_intro_heading";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_intro_description";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_listing_heading";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_listing_description";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_listing_c_t_a_label";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_listing_c_t_a_url";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_listing_c_t_a_open_in_new_tab";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_listing_c_t_a_variant";
  DROP TYPE "public"."enum_about_page_final_c_t_a_variant";
  DROP TYPE "public"."enum__about_page_v_version_final_c_t_a_variant";
  DROP TYPE "public"."enum_rooms_page_listing_c_t_a_variant";
  DROP TYPE "public"."enum__rooms_page_v_version_listing_c_t_a_variant";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_about_page_final_c_t_a_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__about_page_v_version_final_c_t_a_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum_rooms_page_listing_c_t_a_variant" AS ENUM('primary', 'secondary', 'text');
  CREATE TYPE "public"."enum__rooms_page_v_version_listing_c_t_a_variant" AS ENUM('primary', 'secondary', 'text');
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
  
  ALTER TABLE "about_page_story_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_principles_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_story_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_principles_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_about_page_v_version_team_members" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "about_page_story_paragraphs" CASCADE;
  DROP TABLE "about_page_principles_items" CASCADE;
  DROP TABLE "about_page_team_members" CASCADE;
  DROP TABLE "_about_page_v_version_story_paragraphs" CASCADE;
  DROP TABLE "_about_page_v_version_principles_items" CASCADE;
  DROP TABLE "_about_page_v_version_team_members" CASCADE;
  ALTER TABLE "about_page" DROP CONSTRAINT "about_page_story_image_id_media_id_fk";
  
  ALTER TABLE "about_page" DROP CONSTRAINT "about_page_final_c_t_a_image_id_media_id_fk";
  
  ALTER TABLE "_about_page_v" DROP CONSTRAINT "_about_page_v_version_story_image_id_media_id_fk";
  
  ALTER TABLE "_about_page_v" DROP CONSTRAINT "_about_page_v_version_final_c_t_a_image_id_media_id_fk";
  
  DROP INDEX "about_page_hero_hero_image_idx";
  DROP INDEX "about_page_story_story_image_idx";
  DROP INDEX "about_page_final_c_t_a_final_c_t_a_image_idx";
  DROP INDEX "_about_page_v_version_hero_version_hero_image_idx";
  DROP INDEX "_about_page_v_version_story_version_story_image_idx";
  DROP INDEX "_about_page_v_version_final_c_t_a_version_final_c_t_a_im_idx";
  DROP INDEX "rooms_page_hero_hero_image_idx";
  DROP INDEX "_rooms_page_v_version_hero_version_hero_image_idx";
  ALTER TABLE "about_page" ADD COLUMN "introduction_heading" varchar;
  ALTER TABLE "about_page" ADD COLUMN "introduction_content" jsonb;
  ALTER TABLE "about_page" ADD COLUMN "story_content" jsonb;
  ALTER TABLE "about_page" ADD COLUMN "final_c_t_a_label" varchar;
  ALTER TABLE "about_page" ADD COLUMN "final_c_t_a_url" varchar;
  ALTER TABLE "about_page" ADD COLUMN "final_c_t_a_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "about_page" ADD COLUMN "final_c_t_a_variant" "enum_about_page_final_c_t_a_variant" DEFAULT 'primary';
  ALTER TABLE "_about_page_v" ADD COLUMN "version_introduction_heading" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_introduction_content" jsonb;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_story_content" jsonb;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_final_c_t_a_label" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_final_c_t_a_url" varchar;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_final_c_t_a_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_about_page_v" ADD COLUMN "version_final_c_t_a_variant" "enum__about_page_v_version_final_c_t_a_variant" DEFAULT 'primary';
  ALTER TABLE "rooms_page" ADD COLUMN "hero_eyebrow" varchar;
  ALTER TABLE "rooms_page" ADD COLUMN "intro_heading" varchar;
  ALTER TABLE "rooms_page" ADD COLUMN "intro_description" varchar;
  ALTER TABLE "rooms_page" ADD COLUMN "listing_heading" varchar;
  ALTER TABLE "rooms_page" ADD COLUMN "listing_description" varchar;
  ALTER TABLE "rooms_page" ADD COLUMN "listing_c_t_a_label" varchar;
  ALTER TABLE "rooms_page" ADD COLUMN "listing_c_t_a_url" varchar;
  ALTER TABLE "rooms_page" ADD COLUMN "listing_c_t_a_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "rooms_page" ADD COLUMN "listing_c_t_a_variant" "enum_rooms_page_listing_c_t_a_variant" DEFAULT 'primary';
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_hero_eyebrow" varchar;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_intro_heading" varchar;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_intro_description" varchar;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_listing_heading" varchar;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_listing_description" varchar;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_listing_c_t_a_label" varchar;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_listing_c_t_a_url" varchar;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_listing_c_t_a_open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "_rooms_page_v" ADD COLUMN "version_listing_c_t_a_variant" "enum__rooms_page_v_version_listing_c_t_a_variant" DEFAULT 'primary';
  ALTER TABLE "about_page_supporting_images" ADD CONSTRAINT "about_page_supporting_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_supporting_images" ADD CONSTRAINT "about_page_supporting_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_values" ADD CONSTRAINT "about_page_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_supporting_images" ADD CONSTRAINT "_about_page_v_version_supporting_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_supporting_images" ADD CONSTRAINT "_about_page_v_version_supporting_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_values" ADD CONSTRAINT "_about_page_v_version_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "about_page_supporting_images_order_idx" ON "about_page_supporting_images" USING btree ("_order");
  CREATE INDEX "about_page_supporting_images_parent_id_idx" ON "about_page_supporting_images" USING btree ("_parent_id");
  CREATE INDEX "about_page_supporting_images_image_idx" ON "about_page_supporting_images" USING btree ("image_id");
  CREATE INDEX "about_page_values_order_idx" ON "about_page_values" USING btree ("_order");
  CREATE INDEX "about_page_values_parent_id_idx" ON "about_page_values" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_supporting_images_order_idx" ON "_about_page_v_version_supporting_images" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_supporting_images_parent_id_idx" ON "_about_page_v_version_supporting_images" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_supporting_images_image_idx" ON "_about_page_v_version_supporting_images" USING btree ("image_id");
  CREATE INDEX "_about_page_v_version_values_order_idx" ON "_about_page_v_version_values" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_values_parent_id_idx" ON "_about_page_v_version_values" USING btree ("_parent_id");
  CREATE INDEX "about_page_hero_image_idx" ON "about_page" USING btree ("hero_image_id");
  CREATE INDEX "_about_page_v_version_version_hero_image_idx" ON "_about_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "rooms_page_hero_image_idx" ON "rooms_page" USING btree ("hero_image_id");
  CREATE INDEX "_rooms_page_v_version_version_hero_image_idx" ON "_rooms_page_v" USING btree ("version_hero_image_id");
  ALTER TABLE "about_page" DROP COLUMN "hero_section_name";
  ALTER TABLE "about_page" DROP COLUMN "hero_eyebrow";
  ALTER TABLE "about_page" DROP COLUMN "hero_scroll_cue_label";
  ALTER TABLE "about_page" DROP COLUMN "hero_active";
  ALTER TABLE "about_page" DROP COLUMN "hero_sort_order";
  ALTER TABLE "about_page" DROP COLUMN "story_section_name";
  ALTER TABLE "about_page" DROP COLUMN "story_eyebrow";
  ALTER TABLE "about_page" DROP COLUMN "story_heading";
  ALTER TABLE "about_page" DROP COLUMN "story_image_id";
  ALTER TABLE "about_page" DROP COLUMN "story_active";
  ALTER TABLE "about_page" DROP COLUMN "story_sort_order";
  ALTER TABLE "about_page" DROP COLUMN "principles_section_name";
  ALTER TABLE "about_page" DROP COLUMN "principles_eyebrow";
  ALTER TABLE "about_page" DROP COLUMN "principles_heading";
  ALTER TABLE "about_page" DROP COLUMN "principles_description";
  ALTER TABLE "about_page" DROP COLUMN "principles_active";
  ALTER TABLE "about_page" DROP COLUMN "principles_sort_order";
  ALTER TABLE "about_page" DROP COLUMN "team_section_name";
  ALTER TABLE "about_page" DROP COLUMN "team_heading";
  ALTER TABLE "about_page" DROP COLUMN "team_quote";
  ALTER TABLE "about_page" DROP COLUMN "team_active";
  ALTER TABLE "about_page" DROP COLUMN "team_sort_order";
  ALTER TABLE "about_page" DROP COLUMN "final_c_t_a_section_name";
  ALTER TABLE "about_page" DROP COLUMN "final_c_t_a_heading";
  ALTER TABLE "about_page" DROP COLUMN "final_c_t_a_image_id";
  ALTER TABLE "about_page" DROP COLUMN "final_c_t_a_button_label";
  ALTER TABLE "about_page" DROP COLUMN "final_c_t_a_button_url";
  ALTER TABLE "about_page" DROP COLUMN "final_c_t_a_button_open_in_new_tab";
  ALTER TABLE "about_page" DROP COLUMN "final_c_t_a_button_variant";
  ALTER TABLE "about_page" DROP COLUMN "final_c_t_a_active";
  ALTER TABLE "about_page" DROP COLUMN "final_c_t_a_sort_order";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_hero_section_name";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_hero_eyebrow";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_hero_scroll_cue_label";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_hero_active";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_hero_sort_order";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_story_section_name";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_story_eyebrow";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_story_heading";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_story_image_id";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_story_active";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_story_sort_order";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_principles_section_name";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_principles_eyebrow";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_principles_heading";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_principles_description";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_principles_active";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_principles_sort_order";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_team_section_name";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_team_heading";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_team_quote";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_team_active";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_team_sort_order";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_final_c_t_a_section_name";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_final_c_t_a_heading";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_final_c_t_a_image_id";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_final_c_t_a_button_label";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_final_c_t_a_button_url";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_final_c_t_a_button_open_in_new_tab";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_final_c_t_a_button_variant";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_final_c_t_a_active";
  ALTER TABLE "_about_page_v" DROP COLUMN "version_final_c_t_a_sort_order";
  ALTER TABLE "rooms_page" DROP COLUMN "hero_section_name";
  ALTER TABLE "rooms_page" DROP COLUMN "hero_active";
  ALTER TABLE "rooms_page" DROP COLUMN "hero_sort_order";
  ALTER TABLE "rooms_page" DROP COLUMN "availability_bar_section_name";
  ALTER TABLE "rooms_page" DROP COLUMN "availability_bar_section_aria_label";
  ALTER TABLE "rooms_page" DROP COLUMN "availability_bar_form_aria_label";
  ALTER TABLE "rooms_page" DROP COLUMN "availability_bar_check_in_label";
  ALTER TABLE "rooms_page" DROP COLUMN "availability_bar_check_out_label";
  ALTER TABLE "rooms_page" DROP COLUMN "availability_bar_guests_label";
  ALTER TABLE "rooms_page" DROP COLUMN "availability_bar_promotion_link_label";
  ALTER TABLE "rooms_page" DROP COLUMN "availability_bar_promotion_link_u_r_l";
  ALTER TABLE "rooms_page" DROP COLUMN "availability_bar_submit_button_label";
  ALTER TABLE "rooms_page" DROP COLUMN "availability_bar_submit_button_u_r_l";
  ALTER TABLE "rooms_page" DROP COLUMN "availability_bar_active";
  ALTER TABLE "rooms_page" DROP COLUMN "availability_bar_sort_order";
  ALTER TABLE "rooms_page" DROP COLUMN "room_collection_section_name";
  ALTER TABLE "rooms_page" DROP COLUMN "room_collection_eyebrow";
  ALTER TABLE "rooms_page" DROP COLUMN "room_collection_heading";
  ALTER TABLE "rooms_page" DROP COLUMN "room_collection_description";
  ALTER TABLE "rooms_page" DROP COLUMN "room_collection_rating_symbol";
  ALTER TABLE "rooms_page" DROP COLUMN "room_collection_start_from_label";
  ALTER TABLE "rooms_page" DROP COLUMN "room_collection_night_suffix_label";
  ALTER TABLE "rooms_page" DROP COLUMN "room_collection_status_label";
  ALTER TABLE "rooms_page" DROP COLUMN "room_collection_deposit_label";
  ALTER TABLE "rooms_page" DROP COLUMN "room_collection_beds_label";
  ALTER TABLE "rooms_page" DROP COLUMN "room_collection_passenger_label";
  ALTER TABLE "rooms_page" DROP COLUMN "room_collection_detail_button_label";
  ALTER TABLE "rooms_page" DROP COLUMN "room_collection_button_label";
  ALTER TABLE "rooms_page" DROP COLUMN "room_collection_button_url";
  ALTER TABLE "rooms_page" DROP COLUMN "room_collection_button_open_in_new_tab";
  ALTER TABLE "rooms_page" DROP COLUMN "room_collection_button_variant";
  ALTER TABLE "rooms_page" DROP COLUMN "room_collection_active";
  ALTER TABLE "rooms_page" DROP COLUMN "room_collection_sort_order";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_hero_section_name";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_hero_active";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_hero_sort_order";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_availability_bar_section_name";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_availability_bar_section_aria_label";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_availability_bar_form_aria_label";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_availability_bar_check_in_label";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_availability_bar_check_out_label";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_availability_bar_guests_label";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_availability_bar_promotion_link_label";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_availability_bar_promotion_link_u_r_l";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_availability_bar_submit_button_label";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_availability_bar_submit_button_u_r_l";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_availability_bar_active";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_availability_bar_sort_order";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_room_collection_section_name";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_room_collection_eyebrow";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_room_collection_heading";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_room_collection_description";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_room_collection_rating_symbol";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_room_collection_start_from_label";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_room_collection_night_suffix_label";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_room_collection_status_label";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_room_collection_deposit_label";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_room_collection_beds_label";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_room_collection_passenger_label";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_room_collection_detail_button_label";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_room_collection_button_label";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_room_collection_button_url";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_room_collection_button_open_in_new_tab";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_room_collection_button_variant";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_room_collection_active";
  ALTER TABLE "_rooms_page_v" DROP COLUMN "version_room_collection_sort_order";
  DROP TYPE "public"."enum_about_page_final_c_t_a_button_variant";
  DROP TYPE "public"."enum__about_page_v_version_final_c_t_a_button_variant";
  DROP TYPE "public"."enum_rooms_page_room_collection_button_variant";
  DROP TYPE "public"."enum__rooms_page_v_version_room_collection_button_variant";`)
}
