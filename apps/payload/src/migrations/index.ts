import * as migration_20261021_194535_initial from './20261021_194535_initial';
import * as migration_20261021_201555_paginas_e_globais from './20261021_201555_paginas_e_globais';
import * as migration_20261021_204804_simulador_textos from './20261021_204804_simulador_textos';
import * as migration_20261021_211137_agencia_blocos from './20261021_211137_agencia_blocos';
import * as migration_20261021_220422_homepage_parceiros from './20261021_220422_homepage_parceiros';

export const migrations = [
  {
    up: migration_20261021_194535_initial.up,
    down: migration_20261021_194535_initial.down,
    name: '20261021_194535_initial',
  },
  {
    up: migration_20261021_201555_paginas_e_globais.up,
    down: migration_20261021_201555_paginas_e_globais.down,
    name: '20261021_201555_paginas_e_globais',
  },
  {
    up: migration_20261021_204804_simulador_textos.up,
    down: migration_20261021_204804_simulador_textos.down,
    name: '20261021_204804_simulador_textos',
  },
  {
    up: migration_20261021_211137_agencia_blocos.up,
    down: migration_20261021_211137_agencia_blocos.down,
    name: '20261021_211137_agencia_blocos',
  },
  {
    up: migration_20261021_220422_homepage_parceiros.up,
    down: migration_20261021_220422_homepage_parceiros.down,
    name: '20261021_220422_homepage_parceiros'
  },
];
