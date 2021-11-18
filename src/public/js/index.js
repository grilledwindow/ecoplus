$(document).ready(function() {
    fetch("/api/view-events")
    .then((res) => res.json())
    .then(({data}) => {
        if (data.length != 0) {
            $("#event-mini-browse").html("")
            data.map((event) => {
                $("#event-mini-browse").append(`
                <div class="event-card bg-white">
                    <div class="h-48 bg-gray-200"></div>
                    <div class="p-4 w-96 min-w-full rounded-b-md">
                        <div class="h-28">
                            <h2 class="text-xl font-bold">${event.name}</h2>
                            <p>${event.location}</p>
                            <p>${new Date(event.datetime).toLocaleDateString('en-SG', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit'})}</p>
                        </div>
                        <a class="btn-primary flex justify-center mt-8" href="./event-details.html?id=${event.id}">
                            More Info
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                </div>
                `)
            })
        }
    })

    fetch("/api/view-communities")
    .then((res) => res.json())
    .then(({data}) => {
        if (data.length != 0) {
            $("#community-mini-browse").html("")
            data.map((community) => {
                $("#community-mini-browse").append(`
                <div class="community-card">
                    <div class="w-88 min-w-full">
                        <h2 class="text-xl font-bold">${community.name}</h2>
                        <a class="btn-primary flex items-center justify-center mt-8" href="./community-details.html?id=${community.id}">
                            More Info
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                </div>
                `)
            })
        }
    })
})