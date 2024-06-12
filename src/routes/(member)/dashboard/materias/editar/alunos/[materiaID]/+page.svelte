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
                    <tr>
                        <td>Carlos David</td>
                        <td>
                            <button class="btn btn-sm variant-filled-error">Retirar</button>
                        </td>
                    </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="1">Total cadastrados</th>
                    <td>0</td>
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
                    <tr>
                        <td>Carlos David</td>
                        <td>
                            <button class="btn btn-sm variant-filled-secondary">Adicionar</button>
                        </td>
                    </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="1">Total não cadastrados</th>
                    <td>0</td>
                </tr>
            </tfoot>
        </table>
    </div>
</div>