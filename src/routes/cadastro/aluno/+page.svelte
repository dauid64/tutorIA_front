<script lang="ts">
    import AlertError from "$lib/components/alerts/AlertError.svelte";
import { Icon, ExclamationTriangle } from "svelte-hero-icons";
    import { superForm } from 'sveltekit-superforms';

    export let data

    const { form, errors, constraints, message, enhance } = superForm(data.form)
</script>

<div class="h-screen w-screen flex flex-col justify-center items-center">
	<div class="card p-4">
        <header class="card-header">Cadastro de Aluno</header>
        <form method="POST" use:enhance>
            <section class="p-4">
                <label class="label p-1">
                    <span>Nome Completo</span>
                    <input class="input" type="text" name="nome" aria-invalid={$errors.nome ? 'true' : undefined} bind:value={$form.nome} {...$constraints.nome} />
                </label>
                {#if $errors.nome}
                    <AlertError message={$errors.nome}/>
                {/if}
                <label class="label p-1">
                    <span>Nome de usuário</span>
                    <input class="input" type="text" name="username" aria-invalid={$errors.username ? 'true' : undefined} bind:value={$form.username} {...$constraints.username} />
                </label>
                {#if $errors.username}
                    <AlertError message={$errors.username}/>
                {/if}
                <label class="label p-1">
                    <span>Senha</span>
                    <input class="input" type="password" name="pwd" aria-invalid={$errors.pwd ? 'true' : undefined} bind:value={$form.pwd} {...$constraints.pwd} />
                </label>
                {#if $errors.pwd}
                    <AlertError message={$errors.pwd}/>
                {/if}
            </section>
            <footer class="card-footer">
                <button class="btn variant-filled-secondary">Cadastrar</button>
            </footer>
        </form>
    </div>
</div>