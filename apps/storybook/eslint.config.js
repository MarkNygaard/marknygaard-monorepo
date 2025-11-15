import { config } from '@workspace/eslint-config/react-internal';
import storybook from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'storybook-static'] },
  config,
  storybook.configs['flat/recommended']
);
