import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: 'http://localhost:3000/docs-json',
  apiFile: './src/redux/services/emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './src/redux/services/api.ts',
  exportName: 'api',
  hooks: true,
}

export default config