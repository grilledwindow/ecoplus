$(document).ready(function () {
    const imgInput = document.getElementById("profile-photo-input");

    imgInput.addEventListener("change", imgSelect);
    $("#modal-upload").click(imgUpload);
    $("#modal-delete").click(imgDelete);

    function imgDelete(event) {
        event.preventDefault();
        const session = JSON.parse(localStorage.getItem("session"));
        fetch('/api/user-profile-picture-delete', {
            method: 'POST',
            body: JSON.stringify({ session })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                // Update session
                localStorage.setItem("session", JSON.stringify(data.session));
                localStorage.removeItem("imgUrl");

                // Remove profile photo in relevant places by not specifying parameter
                // function src: ./script.js
                setPfpImgSrc();

                // Refresh so changes can be seen automatically
                location.reload();
            })
            .catch(console.error);
    }
    function imgUpload(event) {
        event.preventDefault();
        const img = imgInput.files[0];
        const session = JSON.parse(localStorage.getItem("session"));
        if (img) {
            const reader = new FileReader();

            reader.onload = function (re) {
                const binaryString = re.target.result;
                // encode as base64 because Netlify doesn't support img uploads properly :(
                const base64string = btoa(binaryString);
                fetch('/api/user-profile-picture', {
                    method: 'POST',
                    body: JSON.stringify({ session, img: base64string })
                })
                    .then(res => res.json())
                    .then(data => {
                        // Update profile photo in relevant places
                        // function src: ./script.js
                        setPfpImgSrc(data.imgUrl);

                        // Update session
                        localStorage.setItem("session", JSON.stringify(data.session));
                        localStorage.setItem("imgUrl", JSON.stringify(data.imgUrl));

                        // Refresh so changes can be seen automatically
                        location.reload();
                    })
                    .catch(console.error);
            };

            reader.readAsBinaryString(img);
        }
    }

    function imgSelect() {
        const img = imgInput.files[0];
        document.getElementById("profile-photo-input-img").src = window.URL.createObjectURL(img);
    }
});