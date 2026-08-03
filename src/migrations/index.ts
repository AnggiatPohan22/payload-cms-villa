import * as migration_20260731_134304_initial_schema from './20260731_134304_initial_schema';
import * as migration_20260801_011752_add_frontend_content_schema from './20260801_011752_add_frontend_content_schema';
import * as migration_20260802_135950_phase_7_5_content_coverage_admin_ux from './20260802_135950_phase_7_5_content_coverage_admin_ux';
import * as migration_20260803_094917_phase_7_7_home_page_clean_content_alignment from './20260803_094917_phase_7_7_home_page_clean_content_alignment';
import * as migration_20260803_140325_phase_7_8_about_rooms_content_alignment from './20260803_140325_phase_7_8_about_rooms_content_alignment';
import * as migration_20260803_145500_phase_7_9_services_contact_content_alignment from './20260803_145500_phase_7_9_services_contact_content_alignment';

export const migrations = [
  {
    up: migration_20260731_134304_initial_schema.up,
    down: migration_20260731_134304_initial_schema.down,
    name: '20260731_134304_initial_schema',
  },
  {
    up: migration_20260801_011752_add_frontend_content_schema.up,
    down: migration_20260801_011752_add_frontend_content_schema.down,
    name: '20260801_011752_add_frontend_content_schema',
  },
  {
    up: migration_20260802_135950_phase_7_5_content_coverage_admin_ux.up,
    down: migration_20260802_135950_phase_7_5_content_coverage_admin_ux.down,
    name: '20260802_135950_phase_7_5_content_coverage_admin_ux',
  },
  {
    up: migration_20260803_094917_phase_7_7_home_page_clean_content_alignment.up,
    down: migration_20260803_094917_phase_7_7_home_page_clean_content_alignment.down,
    name: '20260803_094917_phase_7_7_home_page_clean_content_alignment',
  },
  {
    up: migration_20260803_140325_phase_7_8_about_rooms_content_alignment.up,
    down: migration_20260803_140325_phase_7_8_about_rooms_content_alignment.down,
    name: '20260803_140325_phase_7_8_about_rooms_content_alignment',
  },
  {
    up: migration_20260803_145500_phase_7_9_services_contact_content_alignment.up,
    down: migration_20260803_145500_phase_7_9_services_contact_content_alignment.down,
    name: '20260803_145500_phase_7_9_services_contact_content_alignment',
  },
];
