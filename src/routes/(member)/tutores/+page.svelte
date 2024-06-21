<script lang="ts">
    let elemTutores: HTMLDivElement

    function multiColumnLeft(): void {
        let x = elemTutores.scrollWidth;
        if (elemTutores.scrollLeft !== 0) x = elemTutores.scrollLeft - elemTutores.clientWidth;
        elemTutores.scroll(x, 0);
    }

    function multiColumnRight(): void {
        let x = 0;
        // -1 is used because different browsers use different methods to round scrollWidth pixels.
        if (elemTutores.scrollLeft < elemTutores.scrollWidth - elemTutores.clientWidth - 1) x = elemTutores.scrollLeft + elemTutores.clientWidth;
        elemTutores.scroll(x, 0);
    }
</script>

<!-- <div class="h-screen w-screen flex flex-col justify-center items-center">
    <div class="card w-1/4 h-2/3">
        <img src="/icon_tutor.png" alt="Imagem do tutor" class="w-full h-2/6">
        <header class="card-header">Tutor 1</header>
        <section class="p-4">
            Lorem ipsum dolor sit amet consectetur 
            adipisicing elit. Hic fugiat in ratione 
            neque at molestias, nihil dolore vel 
            atque debitis labore, nemo explicabo 
            itaque earum error mollitia? Qui, eaque esse.
        </section>
        <footer class="card-footer">
            <a href="#" class="btn variant-filled-primary">Conversar</a>
        </footer>
    </div>
</div> -->

<div class="h-screen w-screen flex flex-col justify-center items-center">
    <h1 class="h1 underline mb-3">Tutores</h1>
    <div class="grid grid-cols-[auto_1fr_auto] gap-4 items-center">
        <!-- Button: Left -->
        <button type="button" class="btn-icon variant-filled" on:click={multiColumnLeft}>
            <i class="fa-solid fa-arrow-left" />
        </button>
        <!-- Carousel -->
        <div bind:this={elemTutores} class="snap-x snap-mandatory scroll-smooth flex gap-2 pb-2 overflow-x-auto">
            <a href="#" target="_blank" class="shrink-0 w-[50%] md:w-[30%] lg:w-[20%] snap-start">
                <div class="card">
                    <img src="/icon_tutor.png" alt="Imagem do tutor">
                    <header class="card-header">Tutor 1</header>
                    <section class="p-4">
                        <p>
                            Lorem ipsum dolor sit amet consectetur 
                            adipisicing elit. Hic fugiat in ratione 
                            neque at molestias, nihil dolore vel 
                            atque debitis labore, nemo explicabo 
                            itaque earum error mollitia? Qui, eaque esse.
                        </p>
                    </section>
                    <footer class="card-footer">
                        <a href="#" class="btn variant-filled-primary">Conversar</a>
                    </footer>
                </div>
            </a>
            <a href="#" target="_blank" class="shrink-0 w-[50%] md:w-[30%] lg:w-[20%] snap-start">
                <div class="card">
                    <img src="/icon_tutor.png" alt="Imagem do tutor" class="w-full">
                    <header class="card-header">Tutor 1</header>
                    <section class="p-4">
                        <p>
                            Lorem ipsum dolor sit amet consectetur 
                            adipisicing elit. Hic fugiat in ratione 
                            neque at molestias, nihil dolore vel 
                            atque debitis labore, nemo explicabo 
                            itaque earum error mollitia? Qui, eaque esse.
                        </p>
                    </section>
                    <footer class="card-footer">
                        <a href="#" class="btn variant-filled-primary">Conversar</a>
                    </footer>
                </div>
            </a>
            <a href="#" target="_blank" class="shrink-0 w-[50%] md:w-[30%] lg:w-[20%] snap-start">
                <div class="card">
                    <img src="/icon_tutor.png" alt="Imagem do tutor" class="w-full">
                    <header class="card-header">Tutor 1</header>
                    <section class="p-4">
                        <p>
                            Lorem ipsum dolor sit amet consectetur 
                            adipisicing elit. Hic fugiat in ratione 
                            neque at molestias, nihil dolore vel 
                            atque debitis labore, nemo explicabo 
                            itaque earum error mollitia? Qui, eaque esse.
                        </p>
                    </section>
                    <footer class="card-footer">
                        <a href="#" class="btn variant-filled-primary">Conversar</a>
                    </footer>
                </div>
            </a>
        </div>
        <!-- Button-Right -->
        <button type="button" class="btn-icon variant-filled" on:click={multiColumnRight}>
            <i class="fa-solid fa-arrow-right" />
        </button>
    </div>
</div>