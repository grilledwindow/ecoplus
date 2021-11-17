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
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - $(this).offset().left;
    const walk = (x - startX) * 2;
    $(this).scrollLeft(scrollLeft - walk);
}

function checkUserLogin() {
    if (sessionStorage.getItem("userID") != null) {
        $(".account").html(`
            <div class="flex items-center">
                <a href="./account.html" class="rounded-full object-cover h-8 w-8 bg-gray-400 mr-4"></a>
                <p>Hi 
                    <a href="./account.html" class="text-primary">${sessionStorage.getItem("username")}</a>
                !</p>
            </div>
        `)
    }
}

$(document).ready(function() {
    checkUserLogin()

    $("button.mobile-menu-button").on("click", function() {
        $(".mobile-menu").toggle("hidden")
    })
    
    $(".slide").on({
        "mousedown": handleDown,
        "mouseleave": handleLeave,
        "mouseup": handleUp,
        "mousemove": handleMove
    });
})