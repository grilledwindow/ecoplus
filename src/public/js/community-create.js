$(document).ready(function() {
    sessionStorage.setItem("userID", "5c83ff7a-12c1-4a8e-b953-b6c57528796b")

    if (sessionStorage.getItem("userID") == null) {
        window.location.href = "../index.html";
    }

    $("button.mobile-menu-button").on("click", function() {
        $(".mobile-menu").toggle("hidden")
    })

    $("#create-community").on("submit", function(e) {
        e.preventDefault()
        let name = $("#create-community-name").val()
        let description = $("#create-community-description").val()
        let owner_id = sessionStorage.getItem("userID")
        
        fetch("/api/community-create", {
            method: "POST",
            body: JSON.stringify({
                name,
                description,
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
            $("#outcome-message").html(`${name} community has successfully been created.`)
        })
    })
})