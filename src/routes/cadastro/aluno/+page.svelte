<script lang="ts">
    import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
    import { Icon, ExclamationTriangle } from "svelte-hero-icons";

    let formErroMsg: String;

    const handleResult = ({ formElement, formData, action, cancel }) => {
        return async ({result}) => {
            if (result.data?.error) {
                formErroMsg = result.data.error.data.detail
            }
            if (result.type === 'redirect') {
                goto(result.location)
            }
        }
    }
</script>

{#if formErroMsg}
    <aside class="alert variant-filled-error">
        <div><Icon src="{ExclamationTriangle}" size="32" /></div>
        <div class="alert-message">
            <h3 class="h3">Erro</h3>
            <p>{formErroMsg}</p>
        </div>
    </aside>
{/if}
<div class="h-screen w-screen flex flex-col justify-center items-center">
	<div class="card p-4">
        <header class="card-header">Cadastro de Aluno</header>
        <form method="POST" use:enhance={handleResult}>
            <section class="p-4">
                <label class="label p-1">
                    <span>Nome Completo</span>
                    <input class="input" type="text" name="name" />
                </label>
                <label class="label p-1">
                    <span>Nome de usuário</span>
                    <input class="input" type="text" name="username" />
                </label>
                <label class="label p-1">
                    <span>Senha</span>
                    <input class="input" type="password" name="pwd" />
                </label>
            </section>
            <footer class="card-footer">
                <button class="btn variant-filled-secondary">Cadastrar</button>
            </footer>
        </form>
    </div>
</div>