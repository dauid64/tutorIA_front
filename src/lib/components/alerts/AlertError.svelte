<script>

  import { ExclamationTriangle, Icon } from "svelte-hero-icons";

  export let message;

</script>


<aside class="alert variant-filled-error m-1">
    <div><Icon src={ExclamationTriangle} size=24></Icon></div>
    <div class="alert-message">
        <p>{message}</p>
    </div>
</aside>