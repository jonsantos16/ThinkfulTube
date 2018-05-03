const URL = "https://www.googleapis.com/youtube/v3/search";

let query = {
        part: 'snippet',
        q: '',
        key: 'AIzaSyAYEZ75joUEkoj9Jo0RpVMEcFM55TtSE1k',
        maxResults: 10, 
        pageToken: '',
        nextPageToken: '',
        prevPageToken: '',
        type: 'video'
    };


const search = () => {
    $('.js-search-form').on('submit', event => {
        event.preventDefault();
        const queryTarget = $(event.target).find('.js-query')
        query.q = queryTarget.val(); 
        queryTarget.val('');
        getApiData(displayData);
    });
}

const getApiData = () => {
    $.getJSON(URL, query, (data) => {
        getTokens(data);
        displayData(data);
    });
}

const getTokens = data => {
    query.nextPageToken = data.nextPageToken;
    query.prevPageToken = data.prevPageToken;
    displayButtons(data);
}

const displayButtons = data => {
    $('.prev').toggle(data.prevPageToken !== undefined);
    $('.next').toggle(data.nextPageToken !== undefined);
}

const displayData = data => {
    console.log(data.items);
    const results = getGrid(data.items, 3);
    $('.results').html(results);
    $('.results').prop('hidden', false);
}

const getGrid = (items, num) => {
    let rows = '';
    let columns = '';
   
    items.forEach((item, i) => {
        columns += `<div class="col-${num} box">
            <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="blank">
                <img src="${item.snippet.thumbnails.medium.url}" alt="thumbnail of ${item.snippet.title} video">
            </a>
            <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="blank">
                <h3>${item.snippet.title}</h3>
            </a> 
            <a href="https://www.youtube.com/channel/${item.id.channelId}" target="blank">by ${item.snippet.channelTitle}</a>
        </div>`;

        if ((i+1) % num === 0 && i !== 0) {
            rows += `<div class="row">${columns}</div>`;
            columns = '';
        } else if (i === (items.length-1)) {
            rows += `<div class="row">${columns}</div>`;
            columns = '';
        } 
        
    })
    return rows
};

const navTo = () => {
    $('.nav-btn').on('click', e => {
        let arrayFromDom = Array.from(e.target.classList).includes('next') 
            ? query.pageToken = query.nextPageToken
            : query.pageToken = query.prevPageToken;
        getApiData(displayData);
        window.scrollTo(0,0);    
    });
}

const initApp = () => {
    search();
    navTo();
}

$(initApp);

