let isDown = false, startX, scrollLeft;

function handleDown(e) {
    isDown = true;
    $(this).addClass("active");
    startX = e.pageX - $(this).offset().left;
    scrollLeft = $(this).scrollLeft();
}

function handleLeave() {
    isDown = false;
    $(this).removeClass("active");
}

function handleUp() {
    isDown = false;
    $(this).removeClass("active");
}

function handleMove(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - $(this).offset().left;
    const walk = (x - startX) * 2;
    $(this).scrollLeft(scrollLeft - walk);
}

function checkUserLogin() {
    let session = localStorage.getItem("session");
    if (session) {
        session = JSON.parse(session);
        fetch("/api/refresh-token", {
            method: "POST",
            body: JSON.stringify({
                session: JSON.parse(localStorage.getItem("session"))
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error != undefined) {
                    localStorage.clear();
                    sessionStorage.removeItem("userID");
                    sessionStorage.removeItem("username");

                    console.error(data.error.message);
                    window.alert("Session expired. Please login again.")
                    window.location.href = "../sign-in.html";

                    return;
                }
                localStorage.setItem("session", JSON.stringify(data.session));
                localStorage.setItem("imgUrl", JSON.stringify(data.imgUrl));
                sessionStorage.setItem("userID", data.session.user.id);
                sessionStorage.setItem("username", data.username);
                _checkUserLogin();
            });
    }
}

function _checkUserLogin() {
    $(".account").html(`
        <div class="flex items-center">
            <a href="./account.html" class="h-8 w-8 mr-4">
                <img class="profile-photo rounded-full object-cover h-full w-full bg-gray-400" />
            </a>
            <p>Hi 
                <a href="./account.html" class="text-primary">${sessionStorage.getItem("username")}</a>
            !</p>
        </div>
    `);
    setPfpImgSrc(JSON.parse(localStorage.getItem("imgUrl")));
}

$(document).ready(function () {
    _checkUserLogin();
    let session = localStorage.getItem("session");
    if (session) {
        session = JSON.parse(session);
        let interval = (session.expires_at - 1000) * 1000 - Date.now();
        console.log(interval);
        setInterval(checkUserLogin, interval);
    }

    $("button.mobile-menu-button").on("click", function () {
        $(".mobile-menu").toggle("hidden")
    })

    $(".slide").on({
        "mousedown": handleDown,
        "mouseleave": handleLeave,
        "mouseup": handleUp,
        "mousemove": handleMove
    });
})

function setPfpImgSrc(url) {
    if (!url) { return; }
    for (const img of document.querySelectorAll("img.profile-photo")) {
        img.src = url;
    }
}