<script lang="ts">
    import AlertError from "$lib/components/alerts/AlertError.svelte";
    import { filesProxy, superForm } from 'sveltekit-superforms';

    export let data

    const { form, errors, constraints, message, enhance } = superForm(data.form)

    const conteudos = filesProxy(form, 'conteudos')
</script>

<div class="h-screen w-screen flex flex-col justify-center items-center">
	<div class="card p-4 w-3/4 md:w-2/4 lg:w-1/3">
        <header class="card-header">Cadastro de Matéria</header>
        <form method="POST" use:enhance enctype="multipart/form-data">
            <section class="p-4">
                <label class="label p-1">
                    <span>Nome</span>
                    <input class="input" type="text" name="nome" aria-invalid={$errors.nome ? 'true' : undefined} bind:value={$form.nome} {...$constraints.nome} />
                </label>
                {#if $errors.nome}
                    <AlertError message={$errors.nome}/>
                {/if}
                <label class="label p-1">
                    <span>Descrição</span>
                    <textarea class="textarea" rows="4"  name="descricao" aria-invalid={$errors.descricao ? 'true' : undefined} bind:value={$form.descricao} {...$constraints.descricao}></textarea>
                </label>
                {#if $errors.descricao}
                    <AlertError message={$errors.descricao}/>
                {/if}
                <label class="label p-1">
                    <span>Conteúdos</span>
                    <input accept="application/pdf" class="input" name="conteudos" type="file" multiple aria-invalid={$errors.conteudos ? 'true' : undefined} bind:files={$conteudos} {...$constraints.conteudos} />
                </label>
                {#if $errors.conteudos}
                    <AlertError message={$errors.conteudos}/>
                {/if}
            </section>
            <footer class="card-footer">
                <button class="btn variant-filled-secondary">Cadastrar</button>
            </footer>
        </form>
    </div>
</div>