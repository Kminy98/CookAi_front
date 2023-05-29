// // admin.html
// function savePost() {
//     const postId = 1; // 실제로는 URL에서 게시글 ID를 가져와야 합니다.
//     const title = document.getElementById("title").value;
//     const content = document.getElementById("content").value;

//     const data = { title: title, content: content };

//     fetch(`/update_post/${postId}`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     })
//         .then((response) => {
//             if (response.ok) {
//                 alert("게시글이 업데이트되었습니다.");
//                 window.location.href = `post_detail.html?id=${postId}`;
//             } else {
//                 alert("게시글 업데이트에 실패했습니다.");
//             }
//         })
//         .catch((error) => {
//             console.error("Error updating post:", error);
//         });
// }

// // detail.html
// function getArticleDetail() {
//     const postId = 1; // 실제로는 URL에서 게시글 ID를 가져와야 합니다.

//     fetch(`/get_post_detail/${postId}`)
//         .then((response) => response.json())
//         .then((postData) => {
//             // 서버에서 받아온 게시글 데이터를 화면에 표시하는 코드
//             // 예: const postElement = document.createElement(...) 등
//             // 사용자 화면 표시 적용 코드 작성
//         })
//         .catch((error) => {
//             console.error("Error fetching post detail:", error);
//         });
// }

// function getCommentList() {
//     const postId = 1; // 실제로는 URL에서 게시글 ID를 가져와야 합니다.

//     fetch(`/get_comments/${postId}`)
//         .then((response) => response.json())
//         .then((commentsData) => {
//             // 서버에서 받아온 댓글 데이터를 화면에 표시하는 코드
//             // 예: commentsData.forEach(...) 등
//             // 사용자 화면 표시 적용 코드 작성
//         })
//         .catch((error) => {
//             console.error("Error fetching comment list:", error);
//         });
// }

// // list.html
// function getPostList() {
//     fetch(`/get_post_list`)
//         .then((response) => response.json())
//         .then((postData) => {
//             // 서버에서 받아온 게시글 데이터를 화면에 표시하는 코드
//             const postsContainer = document.getElementById("posts");
//             postData.forEach((post) => {
//                 const postElement = document.createElement("div");
//                 postElement.className = "post-item";

//                 postElement.innerHTML = `
//                     <h2>${post.title}</h2>
//                     <p>${post.date}</p>
//                 `;

//                 postElement.addEventListener("click", () => {
//                     window.location.href = `post_detail.html?id=${post.id}`;
//                 });

//                 postsContainer.append(postElement);
//             });
//         })
//         .catch((error) => {
//             console.error("Error fetching post list:", error);
//         });
// }

// // my_list.html
// function getMyPosts() {
//     fetch(`/get_my_posts`)
//         .then((response) => response.json())
//         .then((postData) => {
//             // 서버에서 받아온 게시글 데이터를 화면에 표시하는 코드
//             const postsContainer = document.getElementById("posts");
//             postData.forEach((post) => {
//                 const postElement = document.createElement("div");
//                 postElement.className = "post-item";

//                 postElement.innerHTML = `
//                     <h2>${post.title}</h2>
//                     <p>${post.date}</p>
//                 `;

//                 postElement.addEventListener("click", () => {
//                     window.location.href = `post_detail.html?id=${post.id}`;
//                 });

//                 postsContainer.append(postElement);
//             });
//         })
//         .catch((error) => {
//             console.error("Error fetching my posts:", error);
//         });
// }

// function init() {
//     const bodyElement = document.querySelector("body");

//     if (bodyElement.id === "ArticleDetailPage") {
//       getArticleDetail();
//       getCommentList();
//     } else if (bodyElement.id === "ArticleListPage") {
//       getPostList();
//     } else if (bodyElement.id === "ArticleAdminPage") {
//       document.getElementById("save").addEventListener("click", savePost);
//     } else if (bodyElement.id === "ArticleMyListPage") {
//       getMyPosts();
//     }
//   }

//   document.addEventListener("DOMContentLoaded", init);



// list.html
// fetch('http://127.0.0.1:8000/articles')
//     .then(res => res.json())
//     .then(data => {
//         console.log(data[0].title)
//     })
    
//     .catch(error => {
//         console.log(error)
//     })
    
//admin.html
// const formArt = document.querySelector('.article-form')
// formArt.addEventListener('submit', event => {
//     event.preventDefault();

//     const formData = new FormData(formArt)
//     console.log(formData)
// })
// fetch('http://127.0.0.1:8000/articles', {
//     method: 'POST',
//     headers: {
//         'Content-Type':'application/json'
//     },
//     body: JSON.stringify(data),
// })
//     .then(res => {
//         if(!res.ok) {
//             console.log('Problem')
//             return
//         }
//         return res.json()
//     })

//     .then(data => {
//         console.log(data[0].title)
//     })
    
//     .catch(error => {
//         console.log(error)
//     })
    
async function postCreate() {
    console.log("등록하기 눌림")
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    const imgfile = document.getElementById("imgfile").files[0]
    console.log(title, content, imgfile)

    // const formdata = new FormData();
    // formdata.append("title", title)
    // formdata.append("content", content)
    // formdata.append("imgfile", imgfile)

    let token = localStorage.getItem("access")

    const response = await fetch('http://127.0.0.1:8000/articles/', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "title": title,
            "content": content,
            "imgfile": imgfile
        })
    })

    const response_json = await response.json()

    if (response.status == 201) {
        alert("글 작성 완료")
        window.location.replace('article_list.html')
    } else {
        alert(response.statusText)
    }
}