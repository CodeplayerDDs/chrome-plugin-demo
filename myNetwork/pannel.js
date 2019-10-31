const log = (...args) => chrome.devtools.inspectedWindow.eval(`
    console.log(...${JSON.stringify(args)});
`);

log(1111);

let imgRe = /.{jpg, jpeg, png}$/g;
let imgBox = document.getElementById('img');
let scriptRe = /.js$/g;
let scriptBox = document.getElementById('html');

let sMap = {
    img: [],
    script: []
};
chrome.devtools.network.onRequestFinished.addListener((data) => {
    let url = data.request.url;
    let oP = document.createElement('P');
    oP.innerHTML = url;
    if (imgRe.test(url)) {
        sMap.img.push(data);
        imgBox && imgBox.appendChild(oP);
    }
    if (scriptRe.test(url)) {
        sMap.script.push(data);
        scriptBox && scriptBox.appendChild(oP);
    }
    log(data);
    log(sMap);
});

// me.devtools.network.onRequestFinished.addListener(async(...args) => {
//     try {
//         const [{
//             requset: { method, queryString, url },
//             getContent,
//         }] = args;
//         log(method, queryString, url);

//         const content = await Promise((res, rej) => getContent(res));
//         log(content);
//     } catch (err) {
//         log(err.stack || err.toString());
//     }
// });