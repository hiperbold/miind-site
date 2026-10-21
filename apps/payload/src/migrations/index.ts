import * as migration_20261021_194535_initial from './20261021_194535_initial';
import * as migration_20261021_201555_paginas_e_globais from './20261021_201555_paginas_e_globais';

export const migrations = [
  {
    up: migration_20261021_194535_initial.up,
    down: migration_20261021_194535_initial.down,
    name: '20261021_194535_initial',
  },
  {
    up: migration_20261021_201555_paginas_e_globais.up,
    down: migration_20261021_201555_paginas_e_globais.down,
    name: '20261021_201555_paginas_e_globais'
  },
];
