//Load news using BingNews Search API for the article section
$(document).ready(function() {
    let query = "Climate Change"
    const URL = `https://bing-news-search1.p.rapidapi.com/news/search?q=${query}&originalImg=true&safeSearch=Off&textFormat=Raw&freshness=Day`
    
    fetch(URL, {
        "method": "GET",
        "headers": {
            "x-bingapis-sdk": "true",
            "x-rapidapi-key": "eb4f325022mshe38c5a9eff5fdb4p106008jsnfaa797dff6ec",
            "x-rapidapi-host": "bing-news-search1.p.rapidapi.com"
        }
    })
    .then(res => res.json())
    .then(function(data) {
        if (data.value.length > 0) {
            var articles = data.value;
            articles.map((a) => {
                $("#articles").append(`
                    <div class="max-w-sm border-4 border-gray-200 rounded-xl mr-4 bg-white">
                        <img class="h-48 rounded-t-lg w-full object-cover" src="${a.image.contentUrl}" alt="${a.name}">
                        <div class="w-64 h-52 min-w-full px-6 py-4">
                            <p class="font-bold text-lg pb-2 max-h-14 overflow-ellipsis overflow-hidden">${a.name}</p>
                            <p class="text-gray-700 max-h-24 font-semibold text-base overflow-ellipsis overflow-hidden">${a.description}</p>
                        </div>
                        <div class="px-6 pt-4 pb-2">
                            <a class="inline-block bg-green-100 hover:bg-green-600 rounded-full px-3 py-1 text-sm font-semibold text-green-600 hover:text-green-100 mr-2 mb-2" href="${a.url}" target="blank">View Article</a>
                        </div>
                    </div>
                `)
            })
        }
    })
})
