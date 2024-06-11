<script lang="ts">
    import { page } from '$app/stores';
    import { signIn } from "@auth/sveltekit/client";
    import { invalidateAll } from '$app/navigation';
    import AlertError from "$lib/components/alerts/AlertError.svelte";

    const url = $page.url;

    let username = ""
    let password = ""
    let error: string | null;
    let isLoading = false;

    $: error = url.searchParams.get('error');

    const handleLogin = async (event: any) => {
        isLoading = true
        try {
            await signIn("credentials", {
                username,
                password
            })
        } catch ( error ) {
            await invalidateAll()
        } finally {
            isLoading = false
        }
    }

</script>

<div class="h-screen w-screen flex flex-col justify-center items-center">
	<div class="card p-4 w-3/4 md:w-2/4 lg:w-1/3">
        <form method="POST" on:submit|preventDefault={handleLogin}>
            <header class="card-header">Login</header>
            <section class="p-4">
                {#if error}
                    <AlertError message={"Credenciais inválidas"}/>
                {/if}
                <label class="label p-1">
                    <span>Nome de usuário</span>
                    <input required class="input" type="text" name="username" bind:value={username}/>
                </label>
                <label class="label p-1">
                    <span>Senha</span>
                    <input required class="input" type="password" name="pwd" bind:value={password} minlength="6"/>
                </label>
            </section>
            <footer class="card-footer">
                <button disabled={isLoading} class="btn variant-filled-secondary">Login</button>
            </footer>
        </form>
    </div>
</div>