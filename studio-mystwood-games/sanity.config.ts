import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { presentationTool } from 'sanity/presentation' // for previews
import {schemaTypes} from './schemaTypes'

export default defineConfig({
	name: 'default',
	title: 'Mystwood Games',

	projectId: 'zksdr418',
	dataset: 'production',

	plugins: [structureTool(), visionTool(), 
		presentationTool({
			title: 'Live Preview',
			previewUrl: {
				// Points to local development server running React app
				origin: 'http://localhost:3000/blog/', 
				
				// // This maps specific post documents directly to their URL route patterns
				// previewMode: {
				// 	enable: '/api/draft', // Optional: if using framework-level draft tokens later
				// },
			},
			// Automatically resolves the right page path based on document properties
			resolve: {
				mainDocuments: [
				{
					route: '/blog/:slug',
					filter: `_type == "post" && slug.current == $slug`,
				},
				],
			},
		})
	],

	schema: {
		types: schemaTypes,
	},
})
