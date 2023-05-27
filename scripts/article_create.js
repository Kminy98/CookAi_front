async function createArticle() {
    console.log("등록하기버튼눌림")
    const title = document.getElementById("title").value
    const image = document.getElementById("image").files[0]
    const context = document.getElementById("context").value


    // const error = document.getElementById("error")

    console.log(title, image, context)

    const response = await fetch('http://127.0.0.1:8000/articles/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "title": title,
            "image": image,
            "context": context,
        })
    })
    console.log(response)

    // // 에러메시지
    // const response_json = await response.json()
    // const err = response_json.message
    // console.log(err)


    if (response.status == 400) {
        alert(err)
    }
    else if (response.status == 201) {
        alert("작성완료!")
        window.location.replace('article_admin.html')
    }

}