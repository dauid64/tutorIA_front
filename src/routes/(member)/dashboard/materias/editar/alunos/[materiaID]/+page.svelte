<script lang="ts">
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import type { Aluno } from '$lib/server/models/aluno.js';

    export let data

    $: alunosNotRegistered = data.alunosNotRegistered as Aluno[]
    $: alunosRegistered = data.alunosRegistered as Aluno[]

</script>

<div class="h-1/2 mx-6 flex flex-col">
    <div class="my-2">
        <h3 class="font-bold h3">Alunos Cadastrados</h3>
        <hr class="!border-t-2" />
    </div>
    <!-- Responsive Container (recommended) -->
    <div class="table-container">
        <!-- Native Table Element -->
        <table class="table table-hover table-compact">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>
                {#each alunosRegistered as alunoRegistered (alunoRegistered.id)}
                    <tr>
                        <td>{ alunoRegistered.nome }</td>
                        <td>
                            <form method="POST" action="?/unregisterAluno" use:enhance>
                                <input type="hidden" name="alunoID" value="{alunoRegistered.id}">
                                <button class="btn btn-sm variant-filled-error">Descadastrar</button>
                            </form>
                        </td>
                    </tr>
                {:else}
                    <tr>
                        <td colspan="2">Nenhum aluno encontrado</td>
                    </tr>
                {/each}
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="1">Total cadastrados</th>
                    <td>{ alunosRegistered.length }</td>
                </tr>
            </tfoot>
        </table>
    </div>
</div>
<div class="h-1/2 mx-6 flex flex-col">
    <div class="my-2">
        <h3 class="font-bold h3">Alunos Não Cadastrados</h3>
        <hr class="!border-t-2" />
    </div>
    <!-- Responsive Container (recommended) -->
    <div class="table-container">
        <!-- Native Table Element -->
        <table class="table table-hover table-compact">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>
                {#each alunosNotRegistered as alunoNotRegistered (alunoNotRegistered.id)}
                    <tr>
                        <td>{ alunoNotRegistered.nome }</td>
                        <td>
                            <form method="POST" action="?/registerAluno" use:enhance>
                                <input type="hidden" name="alunoID" value="{alunoNotRegistered.id}">
                                <button class="btn btn-sm variant-filled-secondary">Cadastrar</button>
                            </form>
                        </td>
                    </tr>
                {:else}
                    <tr>
                        <td colspan="2">Nenhum aluno encontrado</td>
                    </tr>
                {/each}
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="1">Total não cadastrados</th>
                    <td>{ alunosNotRegistered.length }</td>
                </tr>
            </tfoot>
        </table>
    </div>
</div>