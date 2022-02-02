$(document).ready(function() {
    $("#search-event").on("submit", function(e) {
        e.preventDefault()
        
        let name = $("#search-event-name").val()

        fetch("/api/volunteer-search", {
            method: "POST",
            body: JSON.stringify({
                name
            })
        })
        .then((res) => res.json())
        .then(({data}) => {
            loadEvents(data)
        })
    })

    // Retrieve and display events
    fetch("/api/view-events")
    .then((res) => res.json())
    .then(({data}) => {
        loadEvents(data)
    })
})

function loadEvents(data) {
    let eventList = $("#event-browse")

    var htmlString = ""

    data.map((event) => {
        htmlString += `<div class="text-lg bg-white border-4 border-gray-200 rounded-lg">
            <div class="h-48 bg-gray-200">`
        
        if (event.has_img) {
            htmlString += `<img class="object-cover rounded-lg h-full w-full" src="https://stolploftqaslfirbfsf.supabase.in/storage/v1/object/public/public/events/${event.id}.jpg"/>`
        }

        htmlString += `</div>
            <div class="p-4 w-auto min-w-full rounded-b-md">
                <div class="h-28">
                    <h2 class="font-bold truncate">${event.name}</h2>
                    <p>${event.location}</p>
                    <p>${new Date(event.datetime).toLocaleDateString('en-SG', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit'})}</p>
                </div>
                <a class="btn-primary flex items-center justify-center mt-8" href="./event-details.html?id=${event.id}">
                    More Info
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </div>
        </div>`
    })

    eventList.html(htmlString)
}