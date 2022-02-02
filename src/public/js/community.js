$(document).ready(function() {
    // fetch the list of communities
    fetch("/api/view-communities")
    .then((res) => res.json())
    .then(({data}) => {
        data.map((community) => {
            var htmlString = `
                <div class="text-lg bg-gray-200 border-4 border-gray-200 rounded-lg">
                    <div class="h-48">`
                    
            if (community.has_cover_img) {
                htmlString += `<img class="object-cover rounded-lg h-full w-full" src="https://stolploftqaslfirbfsf.supabase.in/storage/v1/object/public/public/communities/cover_img/${community.id}.jpg"/>`
            }

            if (community.has_profile_img) {
                htmlString += `<img class="object-cover mx-auto -mt-40 rounded-full h-32 w-32 bg-gray-400" src="https://stolploftqaslfirbfsf.supabase.in/storage/v1/object/public/public/communities/profile_img/${community.id}.jpg"/>`
            }

            htmlString += ` </div>
                    <div class="h-auto bg-white p-4 w-auto min-w-full rounded-b-md">
                        <h2 class="font-bold truncate">${community.name}</h2>
                        <a class="btn-primary flex items-center justify-center mt-8" href="./community-details.html?id=${community.id}">
                            More Info
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            `

            $("#community-browse").append(htmlString)
        })
    })

    $("#search-community").keypress((e) => {
        var key = e.which;
        if (key == 13) { // the enter key code
            let searchText = $("#search-community").val()
            searchCommunities(searchText)
            return false;  
        }
    })

    $("#search-community-button").on("click", () => {
        let searchText = $("#search-community").val()
        searchCommunities(searchText)
    })
})

function searchCommunities(searchText) {
    $("#community-browse").html("")

    // fetch the list of searched communities
    fetch("/api/community-search", {
        method: "POST",
        body: JSON.stringify({
            name: searchText
        })
    })
    .then((res) => res.json())
    .then(({data}) => {
        data.map((community) => {
            var htmlString = `
                <div class="text-lg bg-gray-200 border-4 border-gray-200 rounded-lg">
                    <div class="h-48">`
                    
            if (community.has_cover_img) {
                htmlString += `<img class="object-cover rounded-lg h-full w-full" src="https://stolploftqaslfirbfsf.supabase.in/storage/v1/object/public/public/communities/cover_img/${community.id}.jpg"/>`
            }

            if (community.has_profile_img) {
                htmlString += `<img class="object-cover mx-auto -mt-40 rounded-full h-32 w-32 bg-gray-400" src="https://stolploftqaslfirbfsf.supabase.in/storage/v1/object/public/public/communities/profile_img/${community.id}.jpg"/>`
            }

            htmlString += ` </div>
                    <div class="h-auto bg-white p-4 w-auto min-w-full rounded-b-md">
                        <h2 class="font-bold truncate">${community.name}</h2>
                        <a class="btn-primary flex items-center justify-center mt-8" href="./community-details.html?id=${community.id}">
                            More Info
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            `

            $("#community-browse").append(htmlString)
        })
    })
}