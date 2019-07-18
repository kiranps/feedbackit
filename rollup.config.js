import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

const config = {
  input: "src/index.js",
  output: [
    {
      file: "build/index.js",
      format: "umd",
      name: "feedbacklib"
      //globals: {
      //react: 'React',
      //'prop-types': 'PropTypes',
      //},
    }
    //{
    //file: 'build/index.cjs.js',
    //format: 'cjs',
    //name: 'dood',
    //},
    //{
    //file: 'build/index.esm.js',
    //format: 'es',
    //},
  ],
  //external: [
  //'react',
  //'react-dom',
  //'prop-types',
  //],
  plugins: [
    //peerDepsExternal(),
    resolve(),
    babel({ exclude: "node_modules/**" }),
    //localResolve(),
    commonjs()
    //minify(),
    //terser(),
    //filesize(),
  ]
};

export default config;
