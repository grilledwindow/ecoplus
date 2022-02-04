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

// check if user is logged in and replace the sign-in/sign-up buttons with a profile name
function checkUserLogin() {
    let session = localStorage.getItem("session");
    if (!session) { return; }

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

function _checkUserLogin() {
    const username = sessionStorage.getItem("username");
    if (!username) { return; }
    $(".account").html(`
        <div class="flex items-center">
            <a href="./upcoming-events.html" class="rounded-full h-8 w-8 mr-4 bg-primary flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            </a>
            <a href="./account.html" class="h-8 w-8 mr-4">
                <img class="profile-photo rounded-full object-cover h-full w-full bg-gray-400" />
            </a>
            <p>Hi 
                <a href="./account.html" class="text-primary">${username}</a>
            !</p>
        </div>
    `);

    if (localStorage.getItem("imgUrl") != "undefined") {
        setPfpImgSrc(JSON.parse(localStorage.getItem("imgUrl")));
    }
}

function checkForPasswordRecovery() {
    let fragment = new URLSearchParams(window.location.hash)

    let type = fragment.get("type")
    if (type == "recovery") {
        window.location.href = `../reset-password?${window.location.hash}`
    }
}

$(document).ready(function () {
    _checkUserLogin();
    let session = localStorage.getItem("session");
    if (session) {
        session = JSON.parse(session);
        let interval = (session.expires_at - 1000) * 1000 - Date.now();
        setInterval(checkUserLogin, interval);
    }
    
    checkForPasswordRecovery();

    // for mobile view button
    $("button.mobile-menu-button").on("click", function () {
        $(".mobile-menu").toggle("hidden")
    })

    // if section has slide class, the user can drag to slide the section
    $(".slide").on({
        "mousedown": handleDown,
        "mouseleave": handleLeave,
        "mouseup": handleUp,
        "mousemove": handleMove
    });
})

function setPfpImgSrc(url) {
    const imges = $("img.profile-photo")
    if (!url) {
        imges.removeAttr("src");
    } else {
        imges.attr("src", url);
    }
}

function fillComments(elementCss, posts) {
    const commentsFragment = document.createDocumentFragment();

    // Underscored variables will be cloned later.

    // Main container
    const _commentContainer = document.createElement("div");
    _commentContainer.classList.add("rounded-lg", "border-4", "p-4", "flex");

    // To display user's profile picture (if they have one)
    const _pfpImg = document.createElement("img");
    _pfpImg.classList.add("rounded-full", "h-12", "w-12");

    // To display a grey circle (if user doesn't have profile picture)
    const _pfpDiv = document.createElement("div");
    _pfpDiv.classList.add("rounded-full", "bg-gray-200", "h-12", "w-12");

    // Comment container for _username and _comment
    const _commentContent = document.createElement("div");
    _commentContent.classList.add("ml-4", "flow-col");

    const _username = document.createElement("span");
    _username.classList.add("font-bold");

    const _datetime = document.createElement("span");
    _datetime.classList.add("font-light", "text-sm", "ml-2", "text-gray-300");
    _datetime.style.color = "rgb(156 163 175)";

    const _comment = document.createElement("p");

    for (const post of posts) {
        let commentContainer = _commentContainer.cloneNode(true);
        let pfp;
        let commentContent = _commentContent.cloneNode(true);
        let username = _username.cloneNode(true);
        let datetime = _datetime.cloneNode(true);
        let comment = _comment.cloneNode(true);

        commentContainer.setAttribute("data-datetime", post.created_at)
        if (post.has_img) {
            pfp = _pfpImg.cloneNode(true);
            pfp.setAttribute("src", post.imgUrl);
        } else {
            pfp = _pfpDiv.cloneNode(true);
        }
        username.insertAdjacentText("afterbegin", post.username);
        datetime.insertAdjacentText("afterbegin", datetimeFormat(post.created_at));
        comment.insertAdjacentText("afterbegin", post.post);

        commentContent.appendChild(username);
        commentContent.appendChild(datetime);
        commentContent.appendChild(comment);
        commentContainer.appendChild(pfp);
        commentContainer.appendChild(commentContent);
        commentsFragment.append(commentContainer);
    }
    $(elementCss).empty();
    $(elementCss).append(commentsFragment);
}

function datetimeFormat(datetime) {
    const d = new Date(datetime);
    const date = `${d.getDay()}/${d.getMonth() + 1}/${d.getFullYear() % 100}`;
    const time = ` ${d.getHours()}:${d.getMinutes()}`;
    return date + time;
}