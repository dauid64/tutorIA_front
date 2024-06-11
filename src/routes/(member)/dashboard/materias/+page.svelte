<script lang="ts">
  import type { Materia } from '$lib/server/models/materia';
  import { isoDateStringForFormatBR } from '$lib/utils/formatDate';

    export let data

    let materias = data.materias as Materia[]
</script>

<div class="grow m-8 md:m-24">
    <div class="flex-col md:flex-row md:flex container justify-between items-center">
        <div class="flex-col md:flex md:flex-row">
            <input type="text" class="input p-1 md:p-2 mb-2" placeholder="Procurar...">
            <button type="button" class="btn-sm md:btn variant-filled-secondary w-full md:w-fit mb-2">Pesquisar</button>
        </div>
        <div class="flex">
            <a href="/cadastro/materia" class="btn-sm md:btn variant-filled-secondary w-full text-center">Cadastrar Matéria</a>
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
                            <th>Qtd. alunos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each materias as materia (materia.id)}
                            <tr>
                                <td>{ isoDateStringForFormatBR(materia.created_at) }</td>
                                <td>{ materia.nome }</td>
                                <td>{ materia.qtd_alunos }</td>
                            </tr>
                        {:else}
                        <tr>
                            <td colspan="4">Nenhuma matéria encontrado</td>
                        </tr>
                        {/each}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colspan="2">Total de Matérias</th>
                            <td>{ materias.length }</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</div>