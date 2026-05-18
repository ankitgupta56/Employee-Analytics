import react from '@vitejs/plugin-react'

export default {
  rules: [
    {
      files: ['**/*.jsx'],
      ignores: ['node_modules'],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      plugins: {
        react,
      },
    },
  ],
}
