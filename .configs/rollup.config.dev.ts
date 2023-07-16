import { nodeResolve } from '@rollup/plugin-node-resolve';
import readPackage from 'read-pkg';
import ts from 'rollup-plugin-ts';

const pkg = readPackage.sync();

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        format: 'cjs',
        file: 'dist/cjs/index.cjs',
        sourcemap: true,
      },
      {
        format: 'esm',
        file: 'dist/esm/index.mjs',
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve({
        resolveOnly: (module) => {
          return module === 'date-fns'
            ? true
            : pkg?.dependencies?.[module] == null &&
                pkg?.devDependencies?.[module] == null &&
                pkg?.peerDependencies?.[module] == null;
        },
      }),
      ts({ tsconfig: 'tsconfig.json' }),
    ],
  },
];
