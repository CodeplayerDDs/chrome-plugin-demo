const log = (...args) => chrome.devtools.inspectedWindow.eval(`
    console.log(...${JSON.stringify(args)});
`);

const SOURCE_TYPE_MAP = {
    document: 'document',
    xhr: 'xhr',
    stylesheet: 'stylesheet',
    script: 'script',
    image: 'image',
    other: 'other'
}

log(1111);

let imgRe = /.{jpg, jpeg, png}$/g;
let scriptRe = /.js$/g;

let documentBox = $('#document'),
    xhrBox = $('#xhr'),
    stylesheetBox = $('#stylesheet'),
    scriptBox = $('#script'),
    imageBox = $('#image'),
    otherBox = $('#other');

let sMap = {
    document: [],
    xhr: [],
    stylesheet: [],
    script: [],
    image: [],
    other: []
};

let typeMap = {};
chrome.devtools.network.onRequestFinished.addListener((data) => {
    let url = data.request.url;
    let sourceTy = data._resourceType;
    let oP = `<span>${url}</span></br>`;

    typeMap[sourceTy] = sourceTy;

    switch (sourceTy) {
        case SOURCE_TYPE_MAP.image:
            sMap.image.push(data);
            imageBox && imageBox.append(oP);
            break;

        case SOURCE_TYPE_MAP.script:
            sMap.script.push(data);
            scriptBox && scriptBox.append(oP);
            break;

        case SOURCE_TYPE_MAP.document:
            sMap.document.push(data);
            documentBox && documentBox.append(oP);
            break;

        case SOURCE_TYPE_MAP.xhr:
            sMap.xhr.push(data);
            xhrBox && xhrBox.append(oP);
            break;

        case SOURCE_TYPE_MAP.other:
            sMap.other.push(data);
            otherBox && otherBox.append(oP);
            break;

        default :
    }

    if (['xhr', 'other', 'document'].includes(sourceTy)) {
        log(sourceTy);
        log(data);
    }
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