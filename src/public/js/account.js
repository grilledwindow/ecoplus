$(document).ready(function () {
    let id = sessionStorage.getItem("userID")

    if (id == null) {
        window.location.href = "../index.html";
    }

    resizeImg();
    function resizeImg() {
        const imgw = $("#account-profile-photo").width();
        $("#account-profile-photo").css({ "height": imgw + "px" });
    }

    window.addEventListener('resize', resizeImg);

    const modalBg = $("#modal-bg");
    const modalUploadForm = $("#modal-form-upload");
    const modalDeleteForm = $("#modal-form-delete");
    
    function hideModal() {
        modalBg.hide();
        modalUploadForm.hide();
        modalDeleteForm.hide();
    }

    $("#account-change-photo").click(() => {
        modalBg.show();
        modalUploadForm.show();
    });

    $("#account-delete-photo").click(() => {
        modalBg.show();
        modalDeleteForm.show();
    });
    
    modalBg.click(hideModal);
    $(".modal-cancel").click(hideModal);

    $("#sign-out").on("click", function () {
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
    })

    fetch("/api/view-user", {
        method: "POST",
        body: JSON.stringify({
            id
        })
    })
        .then((res) => res.json())
        .then(({ data }) => {
            $("#account-name").html(data[0].name)
            $("#account-username").html(data[0].username)
            $("#account-date").html(new Date(data[0].created_at).toLocaleDateString('en-SG', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit' }))
        })

    fetch("/api/user-communities", {
        method: "POST",
        body: JSON.stringify({
            id
        })
    })
    .then((res) => res.json())
    .then(({data}) => {
        $("#account-communities-count").text(data.length)
        if (data.length > 0) {
            $("#account-communities").html("")
            data.map(({communities}) => {
                $("#account-communities").append(`
                <div class="community-card">
                    <div class="w-88 min-w-full">
                        <h2 class="text-xl font-bold">${communities.name}</h2>
                        <a class="btn-primary flex items-center justify-center mt-8" href="./community-details.html?id=${communities.id}">
                            More Info
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                </div>
                `)
            })
        }
    })
    
    fetch("/api/user-events", {
        method: "POST",
        body: JSON.stringify({
            id
        })
    })
    .then((res) => res.json())
    .then(({data}) => {
        $("#account-events-count").text(data.length)
        data.map(({events}) => {
            $("#account-events").append(`
            <div class="community-card">
                <div class="w-88 min-w-full">
                    <h2 class="text-xl font-bold">${events.name}</h2>
                    <a class="btn-primary flex items-center justify-center mt-8" href="./event-details.html?id=${events.id}">
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
    
    fetch("/api/owner-events", {
        method: "POST",
        body: JSON.stringify({
            id
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.length > 0) {
            $("#owner-events").html("")
            data.map((event) => {
                $("#owner-events").append(`
                    <div class="community-card">
                        <div class="w-88 min-w-full">   
                            <h2 class="text-xl font-bold">${event.name}</h2>
                            <a class="btn-primary flex items-center justify-center mt-8" href="./view-volunteer.html?id=${event.id}">
                                View Volunteers
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                `)
            })
        }
    })

    fetch("/api/owner-communities", {
        method: "POST",
        body: JSON.stringify({
            id
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.length > 0) {
            $("#owner-communities").html("")
            data.map((community) => {
                $("#owner-communities").append(`
                    <div class="community-card">
                        <div class="w-88 min-w-full">   
                            <h2 class="text-xl font-bold">${community.name}</h2>
                            <a class="btn-primary flex items-center justify-center mt-8" href="./community-details.html?id=${community.id}">
                                Community Details Info
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                `)
            })
        }
    })

    fetch("/api/user-events", {
        method: "POST",
        body: JSON.stringify({
            id
        })
    })
        .then((res) => res.json())
        .then(({ data }) => {
            $("#account-events-count").text(data.length)
        })
})