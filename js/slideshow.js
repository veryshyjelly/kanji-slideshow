const HEIGHT = 400;

let dmak;
let autoPlay = true;
let autoNext = true;
let playing = true;

let index = 0;

function main() {
    let data = fullData.find(v => v['#'] == index);
    heading.innerText = data.keyword;
    kanji.innerText = data.kanji;
    draw.innerHTML = "";
    playing = autoPlay;
    dmak = new Dmak(data.kanji, {
        'element': "draw",
        "autoplay": autoPlay,
        "autonext": autoNext,
        "height": HEIGHT,
        "width": HEIGHT
    },
        main, 1000);
    index += 1;
}

function gotoFunction() {
    dmak.pause();
    let target = gotoInput.value;
    gotoInput.value = "";
    let foundIndex = fullData.findIndex(v => v['#'] == target || v['kanji'] == target);
    if (foundIndex && foundIndex != -1) {
        index = foundIndex;
        main();
    }
}

document.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        gotoFunction();
    }

    if (event.key == "ArrowRight") {
        next();
    }

    if (event.key == "ArrowLeft") {
        prev();
    }

    if (event.key == " ") {
        if (playing) { pause() } else { play() }
    }
})

gotoButton.onclick = gotoFunction

main()