import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel, getBabelOutputPlugin  } from '@rollup/plugin-babel';

export default {
    // 核心选项
    input: 'src/coutdown.js',     // 必须
    external: function (id) {
        console.error('external', id)
        return /^(react|lodash)/.test(id)
    },
    plugins: [
        nodeResolve({
            moduleDirectories: ['node_modules']
        }),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**', // 只编译我们的源代码
        }),
        commonjs(),
    ],
    //
    // // 额外选项
    // onwarn,
    //
    // // danger zone
    // acorn,
    // context,
    // moduleContext,
    // legacy,

    output: [{  // 必须 (如果要输出多个，可以是一个数组)
        // 核心选项
        file: 'src/dist/coutdown.esm.js',    // 必须
        format: 'esm',  // 必须
        // name:'dd',
        // globals,
        //
        // // 额外选项
        // paths,
        // banner,
        // footer,
        // intro,
        // outro,
        // sourcemap,
        // sourcemapFile,
        // interop,
        //
        // // 高危选项
        // exports,
        // amd,
        // indent,
        // strict
    }],
}