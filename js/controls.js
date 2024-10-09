const backStroke = () => {
    dmak.eraseLastStrokes(1);
}

const nextStroke = () => {
    dmak.renderNextStrokes(1);
}

const pause = () => {
    playing = false;
    autoPlay = false;
    dmak.pause();
}

const play = () => {
    playing = true;
    autoNext = true;
    dmak.options.autonext = true;
    autoPlay = true;
    dmak.render();
}

p.onclick = backStroke;
s.onclick = pause;
g.onclick = play;
n.onclick = nextStroke;
r.onclick = () => dmak.erase();


function prev() {
    autoNext = false;
    dmak.pause();
    index -= 2;
    main();
}

function next() {
    autoNext = false;
    dmak.pause();
    main();
}