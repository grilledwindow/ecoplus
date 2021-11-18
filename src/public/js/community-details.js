let parameters = new URLSearchParams(window.location.search)
const community_id = parameters.get("id")
const user_id = sessionStorage.getItem("userID")

function checkUserInCommunity() {
    fetch("/api/community-users", {
        method: "POST",
        body: JSON.stringify({
            community_id
        })
    })
    .then((res) => res.json())
    .then(({data}) => {
        data.map(({users}) => {
            if (user_id == null) {
                $("#join-community").attr("disabled", true)
                $("#join-community").addClass("disabled")
                $("#joined-message").html("Please login to join this community")
            }

            if (user_id == users.id) {
                $("#join-community").attr("disabled", true)
                $("#join-community").addClass("disabled")
                $("#joined-message").html("You have joined this community")
            }
            
            $("#community-users").html("")
            $("#community-users").append(`
                <tr>
                    <td class="px-6 py-3 whitespace-nowrap text-gray-500">${users.name}</td>
                </tr>
            `)

            $("#join-community").on("click", function() {
                fetch("/api/community-join", {
                    method: "POST",
                    body: JSON.stringify({
                        community_id,
                        user_id
                    })
                })
                .then((res) => res.json())
                .then((data) => {})
            })
        })
    })
}

$(document).ready(function() {
    fetch("/api/community-details", {
        method: "POST",
        body: JSON.stringify({
            community_id
        })
    })
    .then((res) => res.json())
    .then(({data}) => {
        data.map((community) => {
            $("#community-name").html(community.name)
            $("#community-description").html(community.description)
        })
    })

    checkUserInCommunity()

    fetch("/api/community-events", {
        method: "POST",
        body: JSON.stringify({
            community_id
        })
    })
    .then((res) => res.json())
    .then(({data}) => {
        if (data.length != 0) {
            $("#community-events").html("")
            data.map((event) => {
                $("#community-events").append(`
                    <div class="event-card">
                        <div class="h-48"></div>
                        <div class="bg-white p-4 w-96 min-w-full rounded-b-md">
                            <h2 class="text-xl font-bold">${event.name}</h2>
                            <p>${event.location}</p>
                            <p>${new Date(event.datetime).toLocaleDateString('en-SG', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit'})}</p>
                            <a class="btn-primary flex items-center justify-center mt-8" href="./event-details.html?id=${event.id}">
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

    $("#join-community").on("click", function() {
        fetch("/api/community-join", {
            method: "POST",
            body: JSON.stringify({
                community_id,
                user_id
            })
        })
        .then((res) => res.json())
        .then((data) => {
            checkUserInCommunity()
        })
    })

    if (user_id != undefined) {
        $("#community-comment-box").html(`
            <form class="flex" id="community-comment">
                <textarea id="community-user-comment" type="text" required class="border-4 border-gray-200 rounded-lg h-32 w-full p-4" placeholder="Post your comment"></textarea>
                <input type="submit" value="Post" class="w-24 h-20 grid place-items-center bg-primary hover:bg-black cursor-pointer rounded-lg ml-4 font-semibold text-white"/>
            </form>
        `)
    }

    $("#community-comment").on("submit", function(e) {
        e.preventDefault()
        
        let community_id = parameters.get("id")
        let post = $("#community-user-comment").val()

        fetch("/api/user-community-post", {
            method: "POST",
            body: JSON.stringify({
                community_id,
                user_id,
                post
            })
        })
        .then((res) => res.json())
        .then((data) => window.location.reload())
    })

    fetch("/api/community-posts", {
        method: "POST",
        body: JSON.stringify({
            community_id
        })
    })
    .then((res) => res.json())
    .then(({data}) => {
        data.map((data) => {
            $("#community-comments").append(`
            <div class="rounded-lg border-4 p-4 flex">
                <div class="rounded-full bg-gray-200 h-12 w-12"></div>
                <div class="ml-4 flow-col">
                    <p class="font-bold">${data.users.username}</p>
                    <p>${data.post}</p>
                </div>
            </div>
            `)
        })
    })
})