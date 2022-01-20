$(document).ready(function () {
    const imgInput = document.getElementById("profile-photo-input");

    imgInput.addEventListener("change", imgSelect);
    $("#modal-upload").click(imgUpload);

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

                        // HIde modal if open
                        $("#modal-bg").hide();
                        $("#modal-form").hide();
                    })
                    .catch(console.error);
            };

            reader.readAsBinaryString(img);
        }
    }

    function imgSelect() {
        const img = imgInput.files[0];
        console.log(img);
        document.getElementById("profile-photo-input-img").src = window.URL.createObjectURL(img);
    }
});