$(document).ready(function() {
    $("#forgot-password").on("submit", function(e) {
        e.preventDefault()

        let email = $("#email").val()

        fetch("/api/forgot-password", {
            method: "POST",
            body: JSON.stringify({
                email
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.error != undefined) {
                $("#outcome-message").css("color", "#EF4444")
                $("#outcome-message").html(`${data.error.message}.`)
                return
            }
            
            $("#outcome-message").css("color", "#10B981")
            $("#outcome-message").html("Please check your email to recover password.")
        })
    })
})