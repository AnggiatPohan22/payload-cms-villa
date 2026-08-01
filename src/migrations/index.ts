import * as migration_20260731_134304_initial_schema from './20260731_134304_initial_schema';
import * as migration_20260801_011752_add_frontend_content_schema from './20260801_011752_add_frontend_content_schema';

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
];
