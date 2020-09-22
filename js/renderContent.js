// RENDER MOVIES
function renderContent(content, container, loadImage, baseImgUrl) {
    return content?.map(({
        title, 
        name, 
        original_name, 
        backdrop_path, 
        poster_path
    }) => {
        title = title || name || original_name;
        container.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="content">
                <h2>${title}</h2>
                <img 
                    style=${loadImage ? '' : 'display: none'}
                    src=${baseImgUrl}${backdrop_path || poster_path}
                    alt=${title} 
                    title=${title}
                    onload=${loadImage}
                >
            </div>
        </div>`
    });
};

module.exports = renderContent;