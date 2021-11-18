$(document).ready(function() {
    if (sessionStorage.getItem("userID") == null) {
        window.location.href = "../sign-in.html";
    }
    
    $("#create-event").on("submit", function(e) {
        e.preventDefault()
        let name = $("#create-event-name").val()
        let description = $("#create-event-description").val()
        let details = $("#create-event-details").val()
        let location = $("#create-event-location").val()
        let date = $("#create-event-date").val()
        let contact_email = $("#create-event-email").val()
        let contact_no = $("#create-event-contactno").val()
        let community_id = $('#create-event-communityid').val()
        let owner_id = sessionStorage.getItem("userID")
        
        fetch("/api/event-create", {
            method: "POST",
            body: JSON.stringify({
                name, 
                date, 
                location,
                details,
                description,
                contact_email, 
                contact_no, 
                community_id,
                owner_id
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.error != undefined) {
                $("#outcome-message").css("color", "#EF4444")
                $("#outcome-message").html(`${data.error}.`)
                return
            }
            
            $("#outcome-message").css("color", "#10B981")
            $("#outcome-message").html(`${name} event has successfully been created.`)
        })
    })
})