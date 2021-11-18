let parameters = new URLSearchParams(window.location.search)
const event_id = parameters.get("id")
const user_id = sessionStorage.getItem("userID")

function searchFunction() {
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
            } 
            
            else {
                tr[i].style.display = "none";
            }
        }
    }
}

$(document).ready(function() {
    fetch("/api/event-details", {
        method: "POST",
        body: JSON.stringify({
            event_id
        })
    })
    .then((res) => res.json())
    .then(({data}) => {
        data.event.map((event) => {
            $("#event-name").html(event.name)
            $("#event-description").html(event.description)
            $("#event-datetime").html(new Date(event.datetime).toLocaleDateString('en-SG', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit'}))
            
            let daysRemaining = Math.ceil((new Date(event.datetime) - new Date()) / (1000 * 60 * 60 * 24))
            
            if (daysRemaining < 0)
                $("#days-remaining").html("0")
            else
                $("#days-remaining").html(daysRemaining)
        })
    })

    fetch("/api/event-users", {
        method: "POST",
        body: JSON.stringify({
            event_id
        })
    })
    .then((res) => res.json())
    .then(({data}) => {
        data.map(({users}) => {
            $("#event-users").append(`
                <tr>
                    <td class="px-6 py-3 whitespace-nowrap text-gray-500">${users.name}</td>
                </tr>
            `)
        })
    })
})