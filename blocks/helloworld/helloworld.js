import ffetch from '../../scripts/ffetch.js';
async function queryDemoUsingFetch() {

    const offset = 0;
    const limit = 20;
    const api = new URL('https://main--wkndhlx--varunmitra.hlx.live/query-index.json?sheet=default');
    api.searchParams.append("offset", JSON.stringify(offset));
    api.searchParams.append("limit", limit);
    const response = await fetch(api, {});
    const result = await response.json();
    const table = document.createElement('table');
    result.data.forEach(async (post) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${post.title}</td><td>${post.description}</td><td>${post.path}</td>`;
        table.append(tr);
    });
    return table;
}


async function queryDemoUsingFFetch() {
    const limit = 20;
    const entries = ffetch('/query-index.json').sheet('default').limit(limit);
    const table = document.createElement('table');
    for await (const post of entries) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${post.title}</td><td>${post.description}</td>`;
        table.append(tr);
    }
    return table;
}


export default async function decorate(block) {
    //const table = await queryDemoUsingFetch();
    const table = await queryDemoUsingFFetch();
    [...block.children].forEach((row) => {
        const image = row.getElementsByTagName('img')[0];
        row.innerHTML = `<div><img src = ${image.src}></img><br/><p>${row.innerText}</p></div>`;
        
    });
    block.append(table);
  
}

