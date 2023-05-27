console.log("확인용")

// 마이페이지에 이메일, 닉네임 가져와서 보여줌
window.onload = () => {
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    console.log(payload_parse)

    //id 찾기
    const my_email = document.getElementById("my_email")
    const my_username = document.getElementById("my_username")


    //payload 에서 가져온 정보를 html에 보이게하기(id 이용)
    my_email.innerText = payload_parse.email
    my_username.innerText = payload_parse.username
}

// //토큰 가져오기
// async function handleApi() {
//     console.log("api눌림")
//     const email = document.getElementById("email").value
//     const password = document.getElementById("password").value

//     const response = await fetch('http://127.0.0.1:8000/users/login/', {
//         headers: {
//             'Authorization':"Bearer"+localStorage.getItem("access"),
//         },
//         method: 'POST',
//         body: JSON.stringify({
//             "email": email,
//             "password": password
//         })
//     })
//     const response_json = await response.json()
//     // console.log(response)
//     console.log(response_json)
// }