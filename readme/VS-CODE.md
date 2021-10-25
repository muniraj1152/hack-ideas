## VS Code Plugins

- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint "Stylelint")
- [TSlint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin "TSlint")
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint "ESLint")
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode "Prettier")
- [CodeSpellChecker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker "CodeSpellChecker")

### Replace / Modify the following workspace preferences in .vscode/Settings.json

```json
{
  "editor.tabSize": 2,
  "javascript.updateImportsOnFileMove.enabled": "always",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "typescript.updateImportsOnFileMove.enabled": "always",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
}
```