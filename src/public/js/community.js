$(document).ready(function() {
    // fetch the list of communities
    fetch("/api/view-communities")
    .then((res) => res.json())
    .then(({data}) => {
        data.map((community) => {
            $("#community-browse").append(`
                <div class="text-lg bg-gray-200 border-4 border-gray-200 rounded-lg">
                    <div class="h-48"></div>
                    <div class="bg-white p-4 w-auto min-w-full rounded-b-md">
                        <h2 class="font-bold">${community.name}</h2>
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
    })
})