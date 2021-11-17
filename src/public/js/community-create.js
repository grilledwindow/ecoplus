$(document).ready(function() {
    if (sessionStorage.getItem("userID") == null) {
        window.location.href = "../index.html";
    }

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