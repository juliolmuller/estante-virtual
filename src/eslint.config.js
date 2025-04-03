import anyConfig from 'eslint-config-any';
import { defineConfig } from 'eslint/config';

export default defineConfig([...anyConfig.vue], {
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
});
