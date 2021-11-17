$(document).ready(function() {
    let parameters = new URLSearchParams(window.location.search)
    const id = parameters.get("id")
    let user_id = sessionStorage.getItem("userID")

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

        data.map(({users}) => {
            if (user_id == null) {
                $("#join-event").attr("disabled", true)
                $("#join-event").addClass("disabled")
                $("#joined-message").html("Please login to join this event")
            }

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

    if (user_id != undefined) {
        $("#event-comment-box").html(`
            <form class="flex" id="event-comment">
                <textarea id="event-user-comment" type="text" required class="border-4 border-gray-200 rounded-lg h-32 w-full p-4" placeholder="Post your comment"></textarea>
                <input type="submit" value="Post" class="w-24 h-20 grid place-items-center bg-primary hover:bg-black cursor-pointer rounded-lg ml-4 font-semibold text-white"/>
            </form>
        `)
    }

    $("#event-comment").on("submit", function(e) {
        e.preventDefault()
        
        let event_id = parameters.get("id")
        let post = $("#event-user-comment").val()

        fetch("/api/user-event-post", {
            method: "POST",
            body: JSON.stringify({
                event_id,
                user_id,
                post
            })
        })
        .then((res) => res.json())
        .then((data) => window.location.reload())
    })

    fetch("/api/event-posts", {
        method: "POST",
        body: JSON.stringify({
            id
        })
    })
    .then((res) => res.json())
    .then(({data}) => {
        data.map((data) => {
            $("#event-comments").append(`
            <div class="rounded-lg border-4 p-4 flex">
                <div class="rounded-full bg-gray-200 h-12 w-12"></div>
                <div class="ml-4 flow-col">
                    <p class="font-bold">${data.users.username}</p>
                    <p>${data.post}</p>
                </div>
            </div>
            `)
        })
    })
})