$(document).ready(function() {
    $("#sign-up").on("submit", function(e) {
        e.preventDefault()

        let name = $("#name").val()
        let username = $("#username").val()
        let email = $("#email").val()
        let password = $("#password").val()

        fetch("/api/sign-up", {
            method: "POST",
            body: JSON.stringify({
                name,
                username,
                email,
                password
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if (data.error != undefined) {
                $("#outcome-message").css("color", "#EF4444")
                $("#outcome-message").html(data.error)
                return
            }
            sessionStorage.setItem("userID", data.user.id)
            sessionStorage.setItem("username", username)
            localStorage.setItem("session", JSON.stringify(data.session))
            $("#outcome-message").css("color", "#10B981")
            $("#outcome-message").html("Signed up sucessfully")
            window.location.href = "../index.html";
        })
        .catch(err => {
            $("#outcome-message").css("color", "#EF4444")
            $("#outcome-message").html(err.message)
        })
    })
})