$(document).ready(function() {
    $("#sign-in").on("submit", function(e) {
        e.preventDefault()

        let email = $("#email").val()
        let password = $("#password").val()

        fetch("/api/sign-in", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
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
            $("#outcome-message").html(`Logged in sucessfully`)
            sessionStorage.setItem("userID", data.user.id)
            window.location.href = "../index.html";
        })
    })
})