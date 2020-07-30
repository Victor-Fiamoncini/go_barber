module.exports = {
	env: {
		browser: true,
		es2020: true,
		jest: true,
	},
	extends: 'eslint:recommended',
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		ecmaVersion: 11,
		sourceType: 'module',
	},
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
		process: true,
		module: true,
		export: true,
		__dirname: true,
		require: true,
	},
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'no-unused-vars': 'off',
		'no-undef': 'off',
	},
}
