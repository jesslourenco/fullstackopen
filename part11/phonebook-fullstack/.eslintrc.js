module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true,
    "es6": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:cypress/recommended"
  ],
  "overrides": [
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react", "cypress"
  ],
  "rules": {
    'indent': [
      'error',
      2
    ],
    "react/prop-types": 0,
  },
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },
}
