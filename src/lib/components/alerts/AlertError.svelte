<script>

  import { ExclamationTriangle, Icon } from "svelte-hero-icons";

  export let message;

</script>


<aside class="alert variant-filled-error m-1">
    <div class="flex flex-row items-center gap-2">
        <Icon src={ExclamationTriangle} class="w-4 md:w-5 lg:w-6"></Icon>
        <p class="text-xs md:text-sm lg:text-base">{message}</p>
    </div>
</aside>