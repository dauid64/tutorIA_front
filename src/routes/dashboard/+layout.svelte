<script lang="ts">
    import { AppRail, AppRailTile, AppRailAnchor, AppShell } from '@skeletonlabs/skeleton';
    import { Icon, BookOpen, UserGroup, Cog6Tooth } from "svelte-hero-icons";
    import { page } from '$app/stores';
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
        <AppRail>
            <svelte:fragment slot="lead">
                <AppRailAnchor href="/dashboard" selected={$page.url.pathname === '/dashboard'}>
                    <h1>TutorIA</h1>
                </AppRailAnchor>
            </svelte:fragment>
            <AppRailAnchor href="/dashboard/alunos" selected={$page.url.pathname === '/dashboard/alunos'} target="_self" title="Alunos">
                <svelte:fragment slot="lead">
                    <div class="flex items-center justify-center">
                        <Icon src="{UserGroup}" size="32" />
                    </div>
                </svelte:fragment>
                <span>Alunos</span>
            </AppRailAnchor>
            <AppRailAnchor href="/dashboard/materias" selected={$page.url.pathname === '/dashboard/materias'} target="_self" title="Materias">
                <svelte:fragment slot="lead">
                    <div class="flex items-center justify-center">
                        <Icon src="{BookOpen}" size="32" />
                    </div>
                </svelte:fragment>
                <span>Matérias</span>
            </AppRailAnchor>
            <svelte:fragment slot="trail">
                <AppRailAnchor href="/dashboard/configuracao" selected={$page.url.pathname === '/dashboard/configuracao'} target="_self" title="Configurações">
                    <div class="flex items-center justify-center">
                        <Icon src="{Cog6Tooth}" size="32" />
                    </div>
                </AppRailAnchor>
            </svelte:fragment>
        </AppRail>
    </svelte:fragment>

	<slot />

	<svelte:fragment slot="pageFooter">
        <div class="text-center">
            TutorIA @ Carlos David
        </div>
    </svelte:fragment>
</AppShell>
