let parameters = new URLSearchParams(window.location.search)
const event_id = parameters.get("id")
const user_id = sessionStorage.getItem("userID")

$(document).ready(function() {
    
    if (sessionStorage.getItem("userID") == null) {
        window.location.href = "../index.html";
    }

    // Show images when user uploads them
    const eventImgInput = document.getElementById("event-img-input");
    const eventImg = document.getElementById("event-img");
    eventImgInput.addEventListener("change", () => {
        const img = eventImgInput.files[0];
        eventImg.src = window.URL.createObjectURL(img);
    });

    fetch("/api/event-details", {
        method: "POST",
        body: JSON.stringify({
            event_id
        })
    })
    .then((res) => res.json())
    .then(({data}) => {
        if (data.event[0].owner_id != user_id) {
            window.location.href = "../index.html"
        }

        data.event.map((event) => {
            $("#event-name").html(event.name)
            $("#event-description").html(event.description)
            $("#event-datetime").html(new Date(event.datetime).toLocaleDateString('en-SG', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit'}))
            
            let daysRemaining = Math.ceil((new Date(event.datetime) - new Date()) / (1000 * 60 * 60 * 24))
            
            if (daysRemaining < 0)
                $("#days-remaining").html("0")
            else
                $("#days-remaining").html(daysRemaining)


            if (event.has_img) {
                let url = `https://stolploftqaslfirbfsf.supabase.in/storage/v1/object/public/public/events/${event.id}.jpg`
                $(".event-img").attr('src', url)
            }

            $("#edit-event-button").html(`
                <a class="mt-8 btn-primary flex items-center max-w-min cursor-pointer" href="../event-edit.html?id=${event.id}">
                    <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    <span>Edit Event</span>
                </a>
            `)

            $("#delete-event").show()

            $("#delete-event-button").on("click", () => {
                $("#modal-bg").show()
                $("#delete-event-modal-form").show()
            })

            $("#change-event-img-button").on("click", () => {
                $("#modal-bg").show()
                $("#change-event-img-modal-form").show()
            })
        
            $("#modal-bg").click(hideModal)
            $(".modal-cancel").click(hideModal)
        
            $("#modal-delete").on("click", () => {
                $("#error-message").html("")
                if (event.name == $("#delete-event-input").val()) {
                    fetch("/api/event-delete", {
                        method: "POST",
                        body: JSON.stringify({
                            event_id
                        })
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        window.location.href = "../account.html";
                    })
                }
                
                else $("#error-message").html("You didn't enter the event name correctly")
            })

            $("#modal-change-img").on("click", () => {
                $("#event-img-error-message").html("")
                const img = eventImgInput.files[0];
                const session = JSON.parse(localStorage.getItem("session"));

                if (img) {
                    const reader = new FileReader();

                    reader.onload = function (re) {
                        const binaryString = re.target.result;
                        // encode as base64 because Netlify doesn't support img uploads properly
                        const base64string = btoa(binaryString);

                        fetch('/api/event-img', {
                            method: 'POST',
                            body: JSON.stringify({
                                session,
                                event_id,
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
                else $("#event-img-error-message").html("Please locate a image to be set")
            })
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

function hideModal() {
    $("#modal-bg").hide()
    $("#delete-event-modal-form").hide()
    $("#change-event-img-modal-form").hide()
}

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