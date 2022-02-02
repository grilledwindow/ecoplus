$(document).ready(function() {
    let id = sessionStorage.getItem("userID")

    if (id == null) {
        window.location.href = "../index.html";
    }

    let upcomingEventList = $("#upcoming-events")

    fetch("/api/user-events", {
        method: "POST",
        body: JSON.stringify({
            id
        })
    })
    .then((res) => res.json())
    .then(({data}) => {
        var htmlString = ""
        let today = new Date()
        data.map(({events}) => {
            if (new Date(events.datetime) >= today) {
                htmlString += `
                    <div class="bg-white m-8 p-4 rounded-lg w-full md:w-144">
                        <h2 class="truncate">${events.name}</h2>
                        <p class="font-semibold text-lg mt-2">${new Date(events.datetime).toLocaleDateString('en-SG', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit' })}</p>
                        <p class="mt-2 h-24 overflow-ellipsis overflow-hidden">${events.description}</p>
                        <a class="btn-primary flex justify-center mt-6" href="./event-details.html?id=${events.id}">View More</a>
                    </div>
                `
            }
        })
        
        if (htmlString != "") {
            upcomingEventList.html(htmlString)
        }
    })
})
