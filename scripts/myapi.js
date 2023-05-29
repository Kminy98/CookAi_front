async function postImage() {
    const imgfile = document.getElementById('imgfile').files[0];
    const formdata = new FormData();
    formdata.append('imgfile', imgfile)
    let token = localStorage.getItem('access');
    const response = await fetch('http://127.0.0.1:8000/articles/cookai/', {
        method: 'POST',
        body: formdata
    }
    )
        .then((response) => response.json())
        .then((json) => console.log(json.COOKRCP01.row[0]))
        
    }

// async function postImage() {
//     const imgfile = document.getElementById('imgfile').files[0];
//     const formdata = new FormData();
//     formdata.append('imgfile', imgfile)
//     let token = localStorage.getItem('access');
//     const response = await fetch('http://127.0.0.1:8000/articles/cookai/', {
//         method: 'POST',
//         body: formdata
//     }
//     )
//         .then((response) => response.json())
//         .then((json) => console.log(json))
//         .then((json) => {
//             const recipes = document.getElementById("recipes");
//             const rows = json.COOKRCP01.row;

//             let html = "";
//             rows.forEach((row) => {
//                 html += `<p>${row.RCP_PARTS_DTLS}</p>`;
//             });

//             recipes.innerHTML = html;
//         })
//     // document.write("관련 레시피 추천: "+json)
//     // window.location.replace('search.html')
// }

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('preview').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        document.getElementById('preview').src = "";
    }
}