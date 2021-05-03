
function findLyrics(art, mus) {
    const key = '869b0c6b4ab8190f2ff3d000a48b943c'
    return fetch(`https://api.vagalume.com.br/search.php?art=${art}&mus=${mus}&apikey=${key}`)
}

const lyrics_el = document.querySelector("#lyrics");
const lyrics_titulo = document.querySelector("#titulo");
const artist = document.querySelector("#artist");
const song = document.querySelector("#song");

const form = document.querySelector('#lyrics_form');
form.addEventListener('submit', el => {
    el.preventDefault();
    doSubmit();
})

async function traduzir() {
    const lyricsResponse2 = await findLyrics(artist.value, song.value);
    const data2 = await lyricsResponse2.json();
    lyrics_el.innerHTML = data2.mus[0].translate[0].text;
}

async function doSubmit() {
    lyrics_el.innerHTML = 'Buscando, aguarde...'

    try {
        const lyricsResponse = await findLyrics(artist.value, song.value);
        const data = await lyricsResponse.json();

        if (data.mus[0].text) {

            lyrics_el.innerHTML = data.mus[0].text;
            lyrics_titulo.innerHTML = data.mus[0].translate[0].text.split(']').splice(1);
        }
        else
            lyrics_el.innerHTML = 'Nenhuma Letra encontrada com essas informações';

    } catch (err) {
        console.log(err);
    }
}

