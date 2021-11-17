$(document).ready(function() {
    let id = sessionStorage.getItem("userID")

    if (id == null) {
        window.location.href = "../index.html";
    }
    
    $("#sign-out").on("click", function() {
        sessionStorage.clear()
        window.location.reload();
    })

    fetch("/api/view-user", {
        method: "POST",
        body: JSON.stringify({
            id
        })
    })
    .then((res) => res.json())
    .then(({data}) => {
        $("#account-name").html(data[0].name)
        $("#account-username").html(data[0].username)
        $("#account-date").html(new Date(data[0].created_at).toLocaleDateString('en-SG', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit'}))
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
    })
    
    fetch("/api/owner-communities", {
        method: "POST",
        body: JSON.stringify({
            id
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        $("#owner-communities-count").text(data.length)
        console.log(data.length)
        for (const community of data) {
            $("#owner-communities").append(`
            <div class="community-card">
                <div class="w-88 min-w-full">   
                    <h2 class="text-xl font-bold">${community.name}</h2>
                    <a class="btn-primary flex items-center justify-center mt-8" href="./view-volunteer.html?id=${community.id}">
                        More Info
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </div>
            `)
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
    })
})