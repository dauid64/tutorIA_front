<script lang="ts">
    import AlertError from "$lib/components/alerts/AlertError.svelte";
  import { signIn } from "@auth/sveltekit/client";
    
    import { superForm } from 'sveltekit-superforms';

    export let data

    let username = ""
    let password = ""

</script>

<div class="h-screen w-screen flex flex-col justify-center items-center">
	<div class="card p-4 w-3/4 md:w-2/4 lg:w-1/3">
        <header class="card-header">Login</header>
        <section class="p-4">
            <label class="label p-1">
                <span>Nome de usuário</span>
                <input class="input" type="text" name="username" bind:value={username}/>
            </label>
            <label class="label p-1">
                <span>Senha</span>
                <input class="input" type="password" name="pwd" bind:value={password}/>
            </label>
        </section>
        <footer class="card-footer">
            <button class="btn variant-filled-secondary" on:click={() => signIn("credentials", { username, password })}>Cadastrar</button>
        </footer>
    </div>
</div>