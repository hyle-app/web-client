module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: { project: ['./tsconfig.json'] },
	root: true,
	plugins: ['effector', '@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:effector/recommended',
		'plugin:effector/scope',
		'plugin:effector/react',
		'plugin:effector/future'
	],
	rules: {
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',

		'effector/prefer-sample-over-forward-with-mapping': 'off',
		// 👆 this is replaced by effector/future

		'@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
		'effector/prefer-useUnit': 'error'
	}
};
