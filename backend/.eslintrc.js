export default {
  env: {
    node: true, // Node.js global variables
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module' // Enable ES module syntax
  },
  rules: {
    // Your custom rules here
  }
};
