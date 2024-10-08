let draw = document.getElementById("draw");
let heading = document.getElementById("heading");
let story = document.getElementById("story");

var p = document.getElementById("p");
p.onclick = function () {
    dmak.eraseLastStrokes(1);
};
var s = document.getElementById("s");
s.onclick = function () {
    autoPlay = false;
    dmak.pause();
};
var g = document.getElementById("g");
g.onclick = function () {
    autoPlay = true;
    dmak.render();
};
var n = document.getElementById("n");
n.onclick = function () {
    dmak.renderNextStrokes(1);
};
var r = document.getElementById("r");
r.onclick = function () {
    dmak.erase();
};


async function get_data(id) {
    // let data = await fetch(`/data?id=${id}`).then(r => r.json());
    let data = fullData.find((v, i) => v['#'] == id);
    console.log(data);
    return data;
}

let dmak;
let autoPlay = true;

function draw_it(kanji) {
    draw.innerHTML = "";
    dmak = new Dmak(kanji, { 'element': "draw", "autoplay": autoPlay }, main, 1000);
}

let index = 0;

async function main() {
    var data = await get_data(index);
    heading.innerText = data.keyword;
    // story.innerText = data.story;
    draw_it(data.kanji);
    index += 1;
}

function prev() {
    dmak.pause();
    index -= 2;
    main();
}

function next() {
    dmak.pause();
    main()
}

main()