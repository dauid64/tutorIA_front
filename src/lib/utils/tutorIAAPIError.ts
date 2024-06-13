import { fail } from "@sveltejs/kit"
import { setFlash } from "sveltekit-flash-message/server"

export async function handleAPIError(cookies: any, response: any, default_message: string) {
    const data = await response.json()
    const errorDetail = data.error.data.detail
    if (errorDetail) {
        setFlash({ type: 'error', message: `${errorDetail}`}, cookies)
    } else {
        setFlash({ type: 'error', message: default_message}, cookies)
    }
    return fail(400)
}