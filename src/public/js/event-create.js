$(document).ready(function() {
    sessionStorage.setItem("userID", "5c83ff7a-12c1-4a8e-b953-b6c57528796b")

    if (sessionStorage.getItem("userID") == null) {
        window.location.href = "../index.html";
    }

    $("button.mobile-menu-button").on("click", function() {
        $(".mobile-menu").toggle("hidden")
    })

    $("#create-event").on("submit", function(e) {
        e.preventDefault()
        let name = $("#create-event-name").val()
        let description = $("#create-event-description").val()
        let details = $("#create-event-details").val()
        let location = $("#create-event-location").val()
        let date = $("#create-event-date").val()
        let contact_email = $("#create-event-email").val()
        let contact_no = $("#create-event-contactno").val()
        let user_id = sessionStorage.getItem("userID")
        
        fetch("/api/event-create", {
            method: "POST",
            body: JSON.stringify({
                name, 
                description, 
                details, 
                location, 
                date, 
                contact_email, 
                contact_no, 
                user_id
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