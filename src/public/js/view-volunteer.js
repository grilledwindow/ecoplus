$(document).ready(function() {
    let parameters = new URLSearchParams(window.location.search)
    const id = parameters.get("id")

    fetch("/api/community-details", {
        method: "POST",
        body: JSON.stringify({
            id
        })
    })
    .then((res) => res.json())
    .then(({data}) => {
        console.log(data)
        data.map((community) => {
            $("#community-name").html(community.name)
            $("#community-description").html(community.description)
        })
    })

    fetch("/api/community-users", {
        method: "POST",
        body: JSON.stringify({
            id
        })
    })
    .then((res) => res.json())
    .then(({data}) => {
        data.map(({users}) => {
            let userID = sessionStorage.getItem("userID")

            if (userID == null) {
                $("#join-community").attr("disabled", true)
                $("#join-community").addClass("disabled")
                $("#joined-message").html("Please login to join this event")
            }

            if (userID == users.id) {
                $("#join-community").attr("disabled", true)
                $("#join-community").addClass("disabled")
                $("#joined-message").html("You have joined this community")
            }
            
            $("#community-users").append(`
                <tr>
                    <td class="px-6 py-3 whitespace-nowrap text-gray-500">${users.name}</td>
                </tr>
            `)

            $("#join-community").on("click", function() {
                let id = userID
                let community_id = parameters.get("id")

                fetch("/api/community-join", {
                    method: "POST",
                    body: JSON.stringify({
                        id,
                        community_id
                    })
                })
                .then((res) => res.json())
                .then((data) => window.location.reload())
            })
        })
    })
})

function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search-volunteer-name");
    filter = input.value.toUpperCase();
    table = document.getElementById("member-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }