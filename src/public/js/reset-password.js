$(document).ready(function() {
    const fragment = new URLSearchParams(window.location.hash);
    let access_token = fragment.get("#access_token")

    if (access_token != null) {
        $("#reset-password").on("submit", function(e) {
            e.preventDefault()

            let new_password = $("#password").val()

            fetch("/api/reset-password", {
                method: "POST",
                body: JSON.stringify({
                    access_token, new_password
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
                $("#outcome-message").html("Successful Password Reset")
                window.location.href = "../sign-in.html"
            })
        })
    }

    else window.location.href = "../index.html"
})