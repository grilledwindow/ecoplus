// grab the community id from the url parameters
let parameters = new URLSearchParams(window.location.search)
const community_id = parameters.get("id")

// grab the user id from session storage
const user_id = sessionStorage.getItem("userID")

// check if the user is within the community
function checkUserInCommunity() {
    fetch("/api/community-users", {
        method: "POST",
        body: JSON.stringify({
            community_id
        })
    })
    .then((res) => res.json())
    .then(({data}) => {
        $("#community-users").html("")
        data.map(({users}) => {

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
            }
            
            $("#community-users").append(`
                <tr>
                    <td class="px-6 py-3 whitespace-nowrap text-gray-500">${users.name}</td>
                </tr>
            `)
        })
    })
}

$(document).ready(() => {

    // check if the user is logged in and change the join button accordingly
    checkUserInCommunity()

    // fetch community details by passing the community id
    fetch("/api/community-details", {
        method: "POST",
        body: JSON.stringify({
            community_id
        })
    })
    .then((res) => res.json())
    .then(({data}) => {
        let community = data[0]
        $("#community-name").html(community.name)
        $("#edit-community-name").val(community.name)
        $("#edit-community-description").val(community.description)

        $("#edit-community-details").on("submit", (e) => {
            e.preventDefault()

            if (community != null) {
                let name = $("#edit-community-name").val()
                let description = $("#edit-community-description").val()
                
                fetch("/api/community-edit", {
                    method: "POST",
                    body: JSON.stringify({
                        community_id,
                        name,
                        description
                    })
                })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error != undefined) {
                        $("#outcome-message").css("color", "#EF4444")
                        $("#outcome-message").html(`${data.error}.`)
                        console.log(data.error)
                        return
                    }
                    $("#outcome-message").css("color", "#10B981")
                    $("#outcome-message").html(`${community.name} has successfully been updated.`)
                    window.location.href = `../community-details.html?id=${community_id}`;
                })
            }
        })
    })
})