import globals from 'globals'
import autoImportGlobals from './.eslintrc-auto-import.mjs'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  {
    ignores: ['**/node_modules', '**/dist', '**/public', '**/bin'],
  },
  {
    name: 'eslint-config-global',
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...autoImportGlobals.globals,
        MetaGis: true,
      },
    },
    rules: {
      // 组件名称至少两个单词，index 除外
      'vue/multi-word-component-names': [
        'off',
        {
          ignores: ['index'],
        },
      ],
    },
  },
  pluginJs.configs.recommended,
  // 使用 vue 推荐的所有规则
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      // 忽略部分 vue rules【与 prettier 冲突】
      'vue/html-closing-bracket-newline': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
      'vue/no-v-html': 'off',
    },
  },
]
