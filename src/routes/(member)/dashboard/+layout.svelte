<script lang="ts">
    import { AppRail, AppRailAnchor, AppShell, type ModalSettings } from '@skeletonlabs/skeleton';
    import { Icon, BookOpen, UserGroup, Cog6Tooth, ArrowLeftEndOnRectangle } from "svelte-hero-icons";
    import { page } from '$app/stores';
    import { getModalStore } from '@skeletonlabs/skeleton';
    import { signOut } from "@auth/sveltekit/client"

    const modalStore = getModalStore();

    const modalLogout: ModalSettings = {
        type: "confirm",
        title: "Por favor, confirme",
        body: "Você tem certeza que quer deslogar?",

        response: (r: boolean) => {
            if (r) {
                signOut()
            }
        }
    }
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
                <AppRailAnchor on:click={() => modalStore.trigger(modalLogout)} target="_self" title="Configurações">
                    <div class="flex items-center justify-center">
                        <Icon src="{ArrowLeftEndOnRectangle}" size="32" />
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
