/**
 * @type {import("@rtk-query/codegen-openapi").ConfigFile}
 */
const config = {
	schemaFile: '../../apis/cms/profile.yml',
	apiFile: '../src/features/profile/apis/profile.api.ts',
	apiImport: 'profileApi',
	outputFile: '../src/features/profile/apis/profile.api-gen.ts',
	exportName: 'profileGenApi',
	hooks: true,
}

export default config;