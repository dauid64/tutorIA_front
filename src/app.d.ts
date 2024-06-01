// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type TutorIAAPI from "$lib/api";

// and what to do when importing types
declare global {
	namespace App {
		interface Locals {
			tutorIAAPI: TutorIAAPI
		}
		interface PageData {
			flash?: { type: 'success' | 'error'; message: string };
		}
	}
}
