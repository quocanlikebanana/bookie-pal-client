/**
 * @type {import("@rtk-query/codegen-openapi").ConfigFile}
 */
const config = {
	// schemaFile: '../../../apis/client/store.yml',
	schemaFile: '../../../apis/cms/booking.yml',
	apiFile: '../features/store/apis/store.api.ts',
	apiImport: 'storeApi',
	outputFile: '../features/store/apis/store.api-gen.ts',
	exportName: 'storeGenApi',
	hooks: true,
}

export default config;