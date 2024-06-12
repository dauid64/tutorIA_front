<script lang="ts">
	import '../app.postcss';
	import { getFlash } from 'sveltekit-flash-message';
  	import { page } from '$app/stores';
	import { initializeStores, Toast, type ToastSettings, Modal } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

	initializeStores();

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	const flash = getFlash(page);

	const toastStore = getToastStore();

	$: if ($flash) {
		let t: ToastSettings

		switch ($flash.type) {
			case 'success':
				break;
			case 'error':
				break;
			default:
				break;
		}

		t = {
			message: $flash.message,
			background: $flash.type == 'success' ? 'variant-filled-success' : 'variant-filled-error'
		};

		toastStore.trigger(t);
	}
</script>

<Toast />
<Modal />
<slot />
