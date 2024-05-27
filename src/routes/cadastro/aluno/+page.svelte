<script>
    import { enhance } from '$app/forms';
</script>

<div class="h-screen w-screen flex flex-col justify-center items-center">
	<div class="card p-4">
        <header class="card-header">Cadastro de Aluno</header>
        <form method="POST" use:enhance>
            <section class="p-4">
                <label class="label p-1">
                    <span>Nome de usuário</span>
                    <input class="input" type="text" name="username" placeholder="Input" />
                </label>
                <label class="label p-1">
                    <span>Senha</span>
                    <input class="input" type="text" name="pwd" placeholder="Input" />
                </label>
                <label class="label p-1">
                    <span>Nome Completo</span>
                    <input class="input" type="text" name="name" placeholder="Input" />
                </label>
            </section>
            <footer class="card-footer">
                <button class="btn variant-filled-secondary">Cadastrar</button>
            </footer>
        </form>
    </div>
</div>