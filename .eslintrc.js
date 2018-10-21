module.exports = {
    "env": {
      "browser": true,
      "es6": true,
      "node": true
    },
    "extends": [
      "eslint:recommended",
      'plugin:jest/recommended',
    ],
    "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module"
    },
    'plugins': [ 'jest' ],
    "rules": {
      "indent": [
        "error",
        2,
        {
          "SwitchCase": 1
        }
      ],
      "linebreak-style": [
        "error",
        "unix"
      ]
    }
  };
