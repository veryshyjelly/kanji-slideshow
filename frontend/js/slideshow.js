let draw = document.getElementById("draw");
let heading = document.getElementById("heading");
let story = document.getElementById("story");

async function get_data(id) {
    let data = await fetch(`/data?id=${id}`).then(r => r.json());
    console.log(data);
    return data;
}

function draw_it(kanji) {
    draw.innerHTML = "";
    new Dmak(kanji, { 'element': "draw" }, main, 200);
}

let index = 0;

async function main() {
    var data = await get_data(index);
    heading.innerText = data.keyword;
    // story.innerText = data.story;
    draw_it(data.kanji);
    index += 1;
}

main()