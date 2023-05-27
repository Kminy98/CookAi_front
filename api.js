window.onload = () => {
    // // 로그인 로그아웃에 따라 style 변화주기
    // console.log("실행")
    // let isLog = false;
    // const access_null = localStorage.getItem("access") !== null;
    // if (access_null) {
    //     isLog = true;
    //     console.log("access와 refresh가 로컬 저장소에 저장되어 있습니다.");
    //     document.getElementById('loginContainer').style.display = 'none';
    //     document.getElementById('loggedInContainer').style.display = 'block';
    // } else {
    //     isLog = false;
    //     console.log("access와 refresh가 로컬 저장소에 저장되어 있지않습니다.");
    //     document.getElementById('loginContainer').style.display = 'block';
    //     document.getElementById('loggedInContainer').style.display = 'none';
    // }
}
/*회원가입*/
async function handleSignup() {
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
        /*비밀번호 확인*/
        if (username == "" || email == "" || password == "") {
            alert("빈칸이 있습니다")
        }
        else if (password === password_check) {
            if (response.status == 201) {
                alert("회원가입이 완료되었습니다.")
                window.location.replace('main.html')
            }
        }
        else {
            alert("중복된 이메일,,,,,")
        }
    }


/*이메일인증*/
// async function sendMail(){
//     const email = document.getElementById("email").value

//     /*비밀번호 확인*/
//     if (email === "") {
//         alert("이메일 입력은 필수 입니다.");
//         return;
//     }

//     const response = await fetch('http://127.0.0.1:8000/users/sendemail/', {
//         headers:{
//             'content-type':'application/json',
//         },
//         method:'POST',
//         body: JSON.stringify({
//             "email":email,
//         })
//     })
//     console.log(response)

//     if (response.status == 200) {
//         alert("메일 발송 완료. 메일을 열어 인증을 완료하세요.")
//     }
// }

// function validateEmail(email) {
//     var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return regex.test(email);
//   }



// if (!validateEmail(email)) {
//     alert("유효한 이메일 주소를 입력해주세요.");
// }





/*로그인*/
async function handleLogin() {
    console.log("눌림")
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

        localStorage.setItem("payload", jsonPayload);
        alert("환영합니다.")
        window.location.replace('main.html')
        // window.location.replace(`${frontend_base_url}/`)
    } else {
        alert("회원정보가 일치하지 않습니다.")
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
        handleSignup();
    }
}

async function fetchRecipes() {
    const response = await fetch("해당 API URL", {
        headers: {
            'content-type': 'application/json',
            // 필요한 경우 인증 헤더 추가. 예: 'Authorization': `Bearer ${access_token}`
        },
        method: 'GET',
    });
    
    if (response.ok) {
        const recipes = await response.json();
        console.log(recipes);
        // 이후 필요한 작업 수행
    } else {
        console.error("Failed to fetch recipes.");
    }
}

// fetchRecipes 함수 호출 예시
// fetchRecipes();