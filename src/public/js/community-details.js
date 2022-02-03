// grab the community id from the url parameters
let parameters = new URLSearchParams(window.location.search)
const community_id = parameters.get("id")

// grab the user id from session storage
const user_id = sessionStorage.getItem("userID")

// variable to store data to view
let community

// check if the user is within the community
function checkUserInCommunity() {
    fetch("/api/community-users", {
        method: "POST",
        body: JSON.stringify({
            community_id
        })
    })
        .then((res) => res.json())
        .then(({ data }) => {
            $("#community-users").html("")
            if (data != null) {
                data.map(({ users }) => {
                    // if user is not logged in
                    if (user_id == null) {
                        $("#join-community").attr("disabled", true)
                        $("#join-community").addClass("disabled")
                        $("#joined-message").html("Please login to join this community")
                    }

                    if (user_id == users.id) {
                        $("#join-community").attr("disabled", true)
                        $("#join-community").addClass("disabled")
                        $("#joined-message").html("You have joined this community")
                        $("#leave-community").show()
                    }

                    $("#community-users").append(`
                    <tr>
                        <td class="px-6 py-3 whitespace-nowrap text-gray-500">${users.name}</td>
                    </tr>
                `)
                })
            }
        })
}

function hideAllDetailViews() {
    $("#community-settings-view").hide()
    $("#community-events-view").hide()
    $("#community-members-view").hide()
    $("#community-comments-view").hide()
}

function setAllDetailViewButtonAsBlank() {
    $("#community-settings-button").removeClass("btn-primary")
    $("#community-events-button").removeClass("btn-primary")
    $("#community-members-button").removeClass("btn-primary")
    $("#community-comments-button").removeClass("btn-primary")

    $("#community-settings-button").addClass("btn-blank")
    $("#community-events-button").addClass("btn-blank")
    $("#community-members-button").addClass("btn-blank")
    $("#community-comments-button").addClass("btn-blank")
}

function hideModal() {
    $(".modal-bg").hide()
    $("#delete-community-modal-form").hide()
    $("#leave-community-modal-form").hide()
    $("#change-profile-img-modal-form").hide()
    $("#change-cover-img-modal-form").hide()
}

function fetchComments(community_id) {
    $("#community-comments").html("")

    // fetch the comments of the community
    fetch("/api/community-posts", {
        method: "POST",
        body: JSON.stringify({
            community_id
        })
    })
        .then((res) => res.json())
        .then(({ posts }) => {
            if (!posts) {
                return;
            }
            fillComments("#community-comments", posts);
        });
}

$(document).ready(function () {
    $("#community-settings-button").on("click", (e) => {
        hideAllDetailViews()
        setAllDetailViewButtonAsBlank()
        $("#community-settings-view").show()
        $("#community-settings-button").removeClass("btn-blank")
        $("#community-settings-button").addClass("btn-primary")
    })

    $("#community-events-button").on("click", (e) => {
        hideAllDetailViews()
        setAllDetailViewButtonAsBlank()
        $("#community-events-view").show()
        $("#community-events-button").removeClass("btn-blank")
        $("#community-events-button").addClass("btn-primary")
    })

    $("#community-members-button").on("click", (e) => {
        hideAllDetailViews()
        setAllDetailViewButtonAsBlank()
        $("#community-members-view").show()
        $("#community-members-button").removeClass("btn-blank")
        $("#community-members-button").addClass("btn-primary")
    })

    $("#community-comments-button").on("click", (e) => {
        hideAllDetailViews()
        setAllDetailViewButtonAsBlank()
        $("#community-comments-view").show()
        $("#community-comments-button").removeClass("btn-blank")
        $("#community-comments-button").addClass("btn-primary")
    })

    // fetch community details by passing the community id
    fetch("/api/community-details", {
        method: "POST",
        body: JSON.stringify({
            community_id
        })
    })
        .then((res) => res.json())
        .then(({ data }) => {
            if (data != null) {
                community = data[0]

                if (community.has_profile_img) {
                    let url = `https://stolploftqaslfirbfsf.supabase.in/storage/v1/object/public/public/communities/profile_img/${community.id}.jpg`
                    $(".profile-community-img").attr('src', url)
                }

                if (community.has_cover_img) {
                    let url = `https://stolploftqaslfirbfsf.supabase.in/storage/v1/object/public/public/communities/cover_img/${community.id}.jpg`
                    $(".cover-community-img").attr('src', url)
                }

                $("#community-name").html(community.name)
                $("#community-description").html(community.description)

                if (community.owner_id == user_id) {
                    $("#edit-community-button").html(`
                    <a class="mt-8 btn-primary flex items-center max-w-min cursor-pointer" href="../community-edit.html?id=${community.id}">
                        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        <span>Edit Community</span>
                    </a>
                `)

                    $("#change-profile-img").html(`
                    <button id="change-profile-img-button" class="mt-8 btn-primary flex items-center max-w-min cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Change Profile Image</span>
                    </button>
                `)

                    $("#change-profile-img-button").on("click", () => {
                        $(".modal-bg").show()
                        $("#change-profile-img-modal-form").show()
                    })

                    $("#change-cover-img").html(`
                    <button id="change-cover-img-button" class="mt-8 btn-primary flex items-center max-w-min cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Change Cover Image</span>
                    </button>
                `)

                    $("#change-cover-img-button").on("click", () => {
                        $(".modal-bg").show()
                        $("#change-cover-img-modal-form").show()
                    })

                    $(".modal-bg").click(hideModal)
                    $(".modal-cancel").click(hideModal)

                    $("#modal-change-profile-img").on("click", () => {
                        $("#profile-img-error-message").html("")
                        const imgInput = document.getElementById("change-profile-community-input");
                        const img = imgInput.files[0];
                        const session = JSON.parse(localStorage.getItem("session"));

                        if (img) {
                            const reader = new FileReader();

                            reader.onload = function (re) {
                                const binaryString = re.target.result;
                                // encode as base64 because Netlify doesn't support img uploads properly
                                const base64string = btoa(binaryString);

                                fetch('/api/community-profile-picture', {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        session,
                                        community_id,
                                        img: base64string
                                    })
                                })
                                    .then(res => res.json())
                                    .then(data => {

                                        // Update session
                                        localStorage.setItem("session", JSON.stringify(data.session));

                                        // Refresh so changes can be seen automatically
                                        location.reload();
                                    })
                                    .catch(console.error);
                            };

                            reader.readAsBinaryString(img);
                        }
                        else $("#profile-img-error-message").html("Please locate a image to be set")
                    })

                    $("#modal-change-cover-img").on("click", () => {
                        $("#cover-img-error-message").html("")
                        const imgInput = document.getElementById("change-cover-community-input");
                        const img = imgInput.files[0];
                        const session = JSON.parse(localStorage.getItem("session"));

                        if (img) {
                            const reader = new FileReader();

                            reader.onload = function (re) {
                                const binaryString = re.target.result;
                                // encode as base64 because Netlify doesn't support img uploads properly
                                const base64string = btoa(binaryString);

                                fetch('/api/community-cover-picture', {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        session,
                                        community_id,
                                        img: base64string
                                    })
                                })
                                    .then(res => res.json())
                                    .then(data => {

                                        // Update session
                                        localStorage.setItem("session", JSON.stringify(data.session));

                                        // Refresh so changes can be seen automatically
                                        location.reload();
                                    })
                                    .catch(console.error);
                            };

                            reader.readAsBinaryString(img);
                        }
                        else $("#cover-img-error-message").html("Please locate a image to be set")
                    })

                    $("#leave-community-button").attr("disabled", true)
                    $("#leave-community-button").addClass("disabled")
                    $("#leave-community-message").html("You are the owner of this community")

                    $("#delete-community").show()
                }
            }
        })

    // check if the user is logged in and change the join button accordingly
    checkUserInCommunity()

    // fetch the community-related events
    fetch("/api/community-events", {
        method: "POST",
        body: JSON.stringify({
            community_id
        })
    })
        .then((res) => res.json())
        .then(({ data }) => {
            if (data != null && data.length != 0) {
                $("#community-events").html("")
                data.map((event) => {
                    $("#community-events").append(`
                    <div class="event-card">
                        <div class="h-48"></div>
                        <div class="bg-white p-4 w-96 min-w-full rounded-b-md">
                            <h2 class="text-xl font-bold">${event.name}</h2>
                            <p>${event.location}</p>
                            <p>${new Date(event.datetime).toLocaleDateString('en-SG', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit' })}</p>
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

    // if the user clicks on the button, create a record for joining and then check if user is in community again
    $("#join-community").on("click", function () {
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

    // if user is logged in
    if (user_id != undefined) {
        $("#community-comment-box").html(`
            <div class="flex" id="community-comment">
                <textarea id="community-user-comment" type="text" required class="border-4 border-gray-200 rounded-lg h-32 w-full p-4" placeholder="Post your comment"></textarea>
                <button id="community-comment-button" class="bg-primary hover:bg-black text-white font-semibold ml-4 h-16 px-6 rounded-lg">Post</button>
            </div>
        `)

    // fetch the comments of the community
    fetch("/api/community-posts", {
        method: "POST",
        body: JSON.stringify({
            community_id
        })
    })
        .then((res) => res.json())
        .then(({ posts }) => fillComments("#community-comments", posts));

        fetchComments(community_id)

        // if user posts a comment
        $("#community-comment-button").on("click", function (e) {
            $("#comment-outcome-message").html("")

            let post = $("#community-user-comment").val()

            if (post != "") {
                fetch("/api/user-community-post", {
                    method: "POST",
                    body: JSON.stringify({
                        community_id: community.id,
                        user_id,
                        post
                    })
                })
                .then((res) => res.json())
                .then((data) => {
                    fetchComments(community_id)
                })
            }

            else $("#comment-outcome-message").html("Please write a comment before posting")
        })
    }

    $("#leave-community-button").on("click", () => {
        $(".modal-bg").show()
        $("#leave-community-modal-form").show()
    })

    $("#delete-community-button").on("click", () => {
        $(".modal-bg").show()
        $("#delete-community-modal-form").show()
    })

    $(".modal-bg").click(hideModal)
    $("#modal-cancel").click(hideModal)

    $("#modal-leave").on("click", () => {
        fetch("/api/community-delete-user", {
            method: "POST",
            body: JSON.stringify({
                community_id,
                user_id
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
                $("#outcome-message").html("The user has left the community")
                window.location.href = `../community-details.html?id=${community_id}`;
            })
    })

    $("#modal-delete").on("click", () => {
        $("#error-message").html("")
        if (community.name == $("#delete-community-input").val()) {
            fetch("/api/community-delete", {
                method: "POST",
                body: JSON.stringify({
                    community_id
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    window.location.href = "../account.html";
                })
        }

        else $("#error-message").html("You didn't enter the community name correctly")
    })
})