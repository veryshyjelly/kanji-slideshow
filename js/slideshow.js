const HEIGHT = 400;

let dmak;
let autoPlay = true;
let autoNext = true;
let playing = true;
let step = 0.01;

let index = 0;

var converter = new showdown.Converter();

function main() {
    let data = fullData.find(v => v['#'] == index);
    if (!data) {
        index += 1;
        return main();
    }
    heading.innerText = data.keyword;
    kanji.innerText = data.kanji;
    story.innerHTML = converter.makeHtml(data.story);
    draw.innerHTML = "";
    playing = autoPlay;
    dmak = new Dmak(data.kanji, {
        'element': "draw",
        "autoplay": autoPlay,
        "autonext": autoNext,
        "height": HEIGHT,
        "width": HEIGHT,
        "step": step
    },
        main, 1000);
    index += 1;
}

function fastF() {
    step = 0.001;
}

function slowF() {
    step = 0.01;
}

fast.onclick = fastF;
slow.onclick = slowF;

function gotoFunction() {
    dmak.pause();
    let target = gotoInput.value;
    gotoInput.value = "";
    let foundIndex = fullData.findIndex(v => v['#'] == target || v['kanji'] == target);
    if (foundIndex && foundIndex != -1) {
        index = foundIndex;
        main();
    } else if (index == 0) {
        index = 1;
        main();
    } else {
        index = 0;
        gotoFunction();
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