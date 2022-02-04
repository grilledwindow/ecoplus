// grab the community id from the url parameters
let parameters = new URLSearchParams(window.location.search)
const event_id = parameters.get("id")

// grab the user id from session storage
const user_id = sessionStorage.getItem("userID")

$(document).ready(function() {
    $('#edit-buttons').append(`
        <a href="./view-volunteer.html?id=${event_id}" class="btn-secondary">Back</a>
        <input type="submit" class="btn-primary ml-4" value="Submit"/>
    `)
    
    if (sessionStorage.getItem("userID") == null) {
        window.location.href = "../sign-in.html";
    }

    // Retrieve and display community dropdown
    fetch("/api/view-communities")
    .then((res) => res.json())
    .then(({data}) => {
        data.map((community) => {
            $("#edit-event-communityid").append(`
            <option id=${community.id} value=${community.id}>${community.name}</option>
            `)
        })
    })

    fetch("/api/event-details",  {
        method: "POST",
        body: JSON.stringify({
            event_id
        })
    })
    .then((res) => res.json())
    .then(({data}) => {
            let event = data.event[0]
            $("#edit-event-name").val(`${event.name}`)
            $("#edit-event-description").html(event.description)
            $("#edit-event-details").html(event.details);
            $("#edit-event-location").val(`${event.location}`)
            $("#edit-event-date").val(`${new Date(event.datetime).toLocaleDateString('en-CA')}`)
            $("#edit-event-email").val(`${event.contact_email}`)
            $("#edit-event-contactno").val(`${event.contact_no}`)
            $(`#${event.community_id}`).prop('selected', true)
    
            $("#edit-event").on("submit", (e) => {
                e.preventDefault()

                let name = $("#edit-event-name").val()
                let description = $("#edit-event-description").val()
                let details = $("#edit-event-details").val()
                let location = $("#edit-event-location").val()
                let date = $("#edit-event-date").val()
                let contact_email = $("#edit-event-email").val()
                let contact_no = $("#edit-event-contactno").val()
                let community_id = $('#edit-event-communityid').val()
        
                fetch("/api/event-edit", {
                    method: "POST",
                    body: JSON.stringify({
                        event_id,
                        name, 
                        date, 
                        location,
                        details,
                        description,
                        contact_email, 
                        contact_no, 
                        community_id
                    })
                })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error != undefined) {
                        $("#outcome-message").css("color", "#EF4444")
                        $("#outcome-message").html(`${data.error}.`)
                        console.log(data.error)
                        return
                    }
                    $("#outcome-message").css("color", "#10B981")
                    $("#outcome-message").html(`Event details has successfully been updated.`)
                })
            })
    })
})