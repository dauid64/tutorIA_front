<script lang="ts">
  import type { Aluno } from '$lib/server/models/aluno.js';
  import { isoDateStringForFormatBR } from '$lib/utils/formatDate.js';

    export let data

    let alunos = data.alunos as Aluno[]
</script>

<div class="grow m-8 md:m-24">
    <div class="flex-col md:flex-row md:flex container justify-between items-center">
        <div class="flex-col md:flex md:flex-row">
            <input type="text" class="input p-1 md:p-2 mb-2" placeholder="Procurar...">
            <button type="button" class="btn-sm md:btn variant-filled-secondary w-full md:w-fit mb-2">Pesquisar</button>
        </div>
        <div class="flex">
            <a href="/cadastro/aluno" class="btn-sm md:btn variant-filled-secondary w-full text-center">Cadastrar Aluno</a>
        </div>
    </div>
    
    <div class="flex mt-7">
        <div class="container">
            <div class="table-container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Criado em</th>
                            <th>Nome</th>
                            <th>Nome de usuário</th>
                            <th>Matéria</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each alunos as aluno (aluno.id)}
                            <tr>
                                <td>{ isoDateStringForFormatBR(aluno.created_at) }</td>
                                <td>{ aluno.nome }</td>
                                <td>{ aluno.username }</td>
                                <td>?</td>
                            </tr>
                        {:else}
                        <tr>
                            <td colspan="4">Nenhum aluno encontrado</td>
                        </tr>
                        {/each}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colspan="3">Total de Alunos</th>
                            <td>{ alunos.length }</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</div>
