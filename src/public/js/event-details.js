$(document).ready(function() {
    let parameters = new URLSearchParams(window.location.search)
    const id = parameters.get("id")

    fetch("/api/event-details",  {
        method: "POST",
        body: JSON.stringify({
            id
        })
    })
    .then((res) => res.json())
    .then(({data}) => {
        $("#event-name").html(data.event[0].name)
        $("#event-description").html(data.event[0].description)
        $("#event-location").html(data.event[0].location)
        $("#event-details").html(data.event[0].details)
        $("#event-date").html(new Date(data.event[0].datetime).toLocaleDateString('en-SG', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit'}))
        $("#event-host").html(data.user[0].name)

        if (data.community != undefined) $("#event-community").html(data.community[0].name)
    })
})

