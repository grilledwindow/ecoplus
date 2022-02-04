$(document).ready(function() {
    fetchEvents()
    fetchCommunities()
})

function fetchEvents() {
    let eventRow = $("#event-mini-browse")
    eventRow.html("")

    // fetch list of events
    fetch("/api/view-events")
    .then((res) => res.json())
    .then(({data}) => {
        var htmlString = ""

        if (data.length != 0) {
            data.map((event) => {
                htmlString += `<div class="event-card bg-white">
                <div class="h-48 bg-gray-200">`

                if (event.has_img) {
                    htmlString += `<img class="object-cover rounded-lg h-full w-full" src="https://stolploftqaslfirbfsf.supabase.in/storage/v1/object/public/public/events/${event.id}.jpg"/>`
                }

                htmlString += `</div>
                    <div class="p-4 w-96 min-w-full rounded-b-md">
                        <div class="h-28">
                            <h2 class="text-xl font-bold truncate">${event.name}</h2>
                            <p class="truncate">${event.location}</p>
                            <p>${new Date(event.datetime).toLocaleDateString('en-SG', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit'})}</p>
                        </div>
                        <a class="btn-primary flex justify-center mt-8" href="./event-details.html?id=${event.id}">
                            More Info
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                </div>`
            })
        }
        
        eventRow.html(htmlString)
    })
}

function fetchCommunities() {
    let communityRow = $("#community-mini-browse")
    communityRow.html("")

    // fetch list of communities
    fetch("/api/view-communities")
    .then((res) => res.json())
    .then(({data}) => {
        var htmlString = ""

        if (data.length != 0) {
            data.map((community) => {
                htmlString += `
                    <div class="event-card bg-white">
                        <div class="h-48 bg-gray-200">`
                    
                if (community.has_cover_img) {
                    htmlString += `<img class="object-cover rounded-lg h-full w-full" src="https://stolploftqaslfirbfsf.supabase.in/storage/v1/object/public/public/communities/cover_img/${community.id}.jpg"/>`
                }

                if (community.has_profile_img) {
                    htmlString += `<img class="object-cover mx-auto -mt-40 rounded-full h-32 w-32 bg-gray-400" src="https://stolploftqaslfirbfsf.supabase.in/storage/v1/object/public/public/communities/profile_img/${community.id}.jpg"/>`
                }

                htmlString += `
                        </div>
                        <div class="p-4 w-96 min-w-full rounded-b-md">
                            <h2 class="text-xl font-bold truncate">${community.name}</h2>
                            <a class="btn-primary flex items-center justify-center mt-8" href="./community-details.html?id=${community.id}">
                                More Info
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </div>`
            })
        }

        communityRow.html(htmlString)
    })
}