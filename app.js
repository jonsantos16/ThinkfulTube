const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
// const key = "AIzaSyAYEZ75joUEkoj9Jo0RpVMEcFM55TtSE1k";
let pgTkn = '';

function watchSubmit() {
    $(".js-search-form").on('submit', event => {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('.js-query');
        const query = queryTarget.val();
        queryTarget.val("");
        console.log('queryTarget is' + queryTarget);
        console.log('query is' + query);
        getDataFromApi(query, displaySearchData);
    });
}

function getDataFromApi(searchTerm, callback) {
    const query = {
        part: 'snippet',
        key: "AIzaSyAYEZ75joUEkoj9Jo0RpVMEcFM55TtSE1k",
        q: `${searchTerm}`,
        pageToken: pgTkn
    };
    console.log($.getJSON(YOUTUBE_SEARCH_URL, query, callback));
}

function displaySearchData(data) {
    console.log(data);
    // console.log(data.items[0].snippet.thumbnails.medium.url);
    const results = data.items.map((item) => renderResult(item));
    pgTkn = data.nextPageToken;
    console.log(pgTkn);
    $(".js-search-results").html(results);
}

function renderResult(result) {
    console.log('displaying results')
    return  `
        <div>
            <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="blank">
            <img src="${result.snippet.thumbnails.medium.url}"></a>
            <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="blank">
            <h3>${result.snippet.title}</h3></a> 
            <a href="https://www.youtube.com/channel/${result.id.channelId}" target="blank">${result.snippet.channelTitle}</a>
        </div>
    `;
    watchButton();
}

// function watchButton() {
//     $("button").on('click', event => {
//         event.preventDefault();
//         getNextData();
//     });
// }

// function getNextData() {

// }


$(watchSubmit());