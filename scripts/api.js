window.onload = () => {

}
/*회원가입*/
/*정보저장*/
async function saveMail() {
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    // const check_email = document.getElementById("check_email").value
    const password = document.getElementById("password").value
    const password_check = document.getElementById("password_check").value


    const error = document.getElementById("error")

    console.log(username, email, password)

    const response = await fetch('http://127.0.0.1:8000/users/signup/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "email": email,
            "password": password,
        })
    })
    console.log(response)

    // 에러메시지
    const response_json = await response.json()
    const err = response_json.message
    console.log(err)


    if (response.status == 400) {
        alert(err)
    }
    else {
        /*비밀번호 확인*/
        if (username == "" || email == "" || password == "") {
            alert("빈칸이 있습니다")
        }

        // 중복도아니고 빈칸도 없고 비번도 맞으면
        else if (password === password_check) {
            // 이메일 인증 되어있는지 확인
            if (response.status == 201) {
                alert("email 발송! email 확인하여 인증 성공 시 가입 완료")
                handleLogout()
                window.location.replace('login.html')
            }

        } 
    } 
} 





// /*인증확인*/
// async function handleSignup() {
//     // 입력된 이메일 가져와
//     const email = document.getElementById("email").value

//     const response = await fetch('http://127.0.0.1:8000/users/signup/', {
//         headers:{
//             'content-type':'application/json',
//         },
//         method:'POST',
//         body: JSON.stringify({
//             "email":email,
//         })
//     })

//         // 인증되어있는지 확인
//         localStorage.setItem("payload", jsonPayload);
//         const payload = localStorage.getItem("payload")
//         const is_active = JSON.parse(payload).is_active
//         console.log("is_active", is_active)
    
//         if (is_active) {
//             alert("가입이 완료되었습니다.")
//         }

//     if (user) {
//       const isActive = user.is_active;
//       console.log(isActive);  // 사용자의 is_active 값을 출력
//     }
// } //handleSignup()


// function validateEmail(email) {
//     var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return regex.test(email);
//   }



// if (!validateEmail(email)) {
//     alert("유효한 이메일 주소를 입력해주세요.");
// }






/*로그인*/
async function handleLogin() {
    console.log("handleLogin()")
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log(email, password)

    const response = await fetch('http://127.0.0.1:8000/users/login/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
    console.log(response)
    if (response.status == 200) {
        //response를 json화해서 access,refresh 가져옴
        const response_json = await response.json()
        console.log(response_json)

        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        // const get_access = localStorage.getItem('access');
        // console.log(get_access);

        // 인증되어있는지 확인
        localStorage.setItem("payload", jsonPayload);
        const payload = localStorage.getItem("payload")
        const is_active = JSON.parse(payload).is_active
        console.log("is_active", is_active)
        if (is_active) {
            alert("환영합니다.")
            window.location.replace('main.html')
        }
        // window.location.replace(`${frontend_base_url}/`)
    } else {
        alert("인증이 완료되지않았거나 가입되지않은 이메일입니다.")
    }
}

// 로그인,로그아웃 시 버튼 바꾸기
document.addEventListener('DOMContentLoaded', function () {
    const get_access = localStorage.getItem('access');
    console.log(get_access);
    if (get_access) {
        document.getElementById('loginContainer').style.display = 'none';
    } else {
        document.getElementById('loggedInContainer').style.display = 'none';
    }
});


// 로그아웃
function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    location.reload();
}

// 로그인 엔터키
async function EnterLogin() {
    if (window.event.keyCode == 13) {
        handleLogin();
    }
}

// 회원가입 엔터키
async function EnterSignup() {
    if (window.event.keyCode == 13) {
        saveMail();
    }
}