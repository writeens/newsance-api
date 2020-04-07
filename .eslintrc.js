module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": ["airbnb-typescript"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "project": "./tsconfig.json"
    },
    "parser":"@typescript-eslint/parser",
    "plugins": [
        '@typescript-eslint',
      ],
    "rules": {
        "import/prefer-default-export": 0,
        "@typescript-eslint/no-use-before-define": 0,
        "func-names": 0
    }
};