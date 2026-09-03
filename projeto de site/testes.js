console.log("teste.js carregado com sucesso!");

const categorias = document.getElementById("categorias");
const subcategorias = document.getElementsByClassName("subcategorias")[0];
const botaoDefault = document.getElementById("default");
const epic = document.getElementById("epic");
const menus = document.getElementById("menus");
const epicSagas = document.querySelectorAll(".epicSagas");
const categoriasDeMusicas = document.querySelectorAll(".menus > [id]");


categorias.addEventListener("click", function() {
    const aberto = !subcategorias.hidden;

    subcategorias.hidden = aberto;
    categorias.setAttribute("aria-expanded", String(!aberto));
});

epic.addEventListener("click", function() {
    const modoEpic = epic.classList.toggle("ativo");

   menus.hidden = modoEpic;
    
    for (const saga of epicSagas) {
        saga.hidden = !modoEpic;
    }

    subcategorias.hidden = true;
    categorias.setAttribute("aria-expanded", "false");
    epic.setAttribute("aria-expanded", String(modoEpic));
});

botaoDefault.addEventListener("click", function() {
    for (const categoria of categoriasDeMusicas) {
        categoria.hidden = false;
    }

    menus.hidden = false;

    for (const saga of epicSagas) {
        saga.hidden = true;
    }

    epic.classList.remove("ativo");
    epic.setAttribute("aria-expanded", "false");
    subcategorias.hidden = true;
    categorias.setAttribute("aria-expanded", "false");
});

document.querySelectorAll(".subcategorias a").forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        const categoriaSelecionada = this.className;

        for (const categoria of categoriasDeMusicas) {
            categoria.hidden = categoria.id !== categoriaSelecionada;
        }

        subcategorias.hidden = true;
        categorias.setAttribute("aria-expanded", "false");
    });
});

const linksDoYouTube = document.querySelectorAll('a[href*="youtu.be"], a[href*="youtube.com"]');
const dispositivoMovel = window.matchMedia("(pointer: coarse)").matches;

if (dispositivoMovel) {
    for (const link of linksDoYouTube) {
        link.removeAttribute("target");
    }
}