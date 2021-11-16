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

    fetch("/api/event-users",  {
        method: "POST",
        body: JSON.stringify({
            id
        })
    })
    .then((res) => res.json())
    .then(({data}) => {
        let user_id = sessionStorage.getItem("userID")

        data.map(({users}) => {
            if (users.id == user_id) {
                $("#join-event").attr("disabled", true)
                $("#join-event").addClass("disabled")
                $("#joined-message").html("You have joined this event")
            }

            $("#join-event").on("click", function() {
                let id = parameters.get("id")

                fetch("/api/event-join", {
                    method: "POST",
                    body: JSON.stringify({
                        id,
                        user_id
                    })
                })
                .then((res) => res.json())
                .then((data) => window.location.reload())
            })
        })
    })
})

