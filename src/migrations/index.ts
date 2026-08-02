import * as migration_20260731_134304_initial_schema from './20260731_134304_initial_schema';
import * as migration_20260801_011752_add_frontend_content_schema from './20260801_011752_add_frontend_content_schema';
import * as migration_20260802_135950_phase_7_5_content_coverage_admin_ux from './20260802_135950_phase_7_5_content_coverage_admin_ux';

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
];
