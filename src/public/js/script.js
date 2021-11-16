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

$(document).ready(function() {
    $("button.mobile-menu-button").on("click", function() {
        $(".mobile-menu").toggle("hidden")
    })
    
    $(".slide").on({
        "mousedown": handleDown,
        "mouseleave": handleLeave,
        "mouseup": handleUp,
        "mousemove": handleMove
    });

    // TODO: Case: if there are no events

    fetch("/api/view-events")
    .then((res) => res.json())
    .then(({data}) => {
        data.map((event) => {
            $("#event-mini-browse").append(`
            <div class="event-card">
                <div class="h-48"></div>
                <div class="bg-white p-4 w-96 min-w-full rounded-b-md">
                    <h2 class="text-xl font-bold">${event.name}</h2>
                    <p>${event.location}</p>
                    <p>${new Date(event.datetime).toLocaleDateString('en-SG', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit'})}</p>
                    <a class="btn-primary flex items-center justify-center mt-8">
                        More Info
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </div>
            `)
        })
    })

    // TODO: Case: if there are no communities

    fetch("/api/view-communities")
    .then((res) => res.json())
    .then(({data}) => {
        data.map((community) => {
            $("#community-mini-browse").append(`
            <div class="community-card">
                <div class="w-88 min-w-full">
                    <h2 class="text-xl font-bold">${community.name}</h2>
                    <a class="btn-primary flex items-center justify-center mt-8" href="./community-details.html?id=${community.id}">
                        More Info
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </div>
            `)
        })
    })
})