$(document).ready(function() {
    $("button.mobile-menu-button").on("click", function() {
        $(".mobile-menu").toggle("hidden")
    })

    let id = 1
    fetch("/api/event-details",  {
        method: "POST",
        body: JSON.stringify({
            id
        })
    })
    .then((res) => res.json())
    .then(({data}) => {
        console.log(data)
        $("#event-name").html(data.event[0].name)
        $("#event-description").html(data.event[0].description)
        $("#event-location").html(data.event[0].location)
        $("#event-details").html(data.event[0].details)
        $("#event-date").html(new Date(data.event[0].datetime).toLocaleDateString('en-SG', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit'}))
    
        $("#event-host").html(data.user[0].name)

        $("#event-community").html(data.community[0].name)
    })
})

