window.addEventListener("load",() => {
    fetch("/getSubjects",{
        headers:{
            auth:sessionStorage.getItem("attendance-auth")
        }
    })
    .then(req => req.json())
    .then(data => {
        if(data.Subjects) {
            output=""
            data.Subjects.forEach(subject => {
                output+=`<li class="list-group-item"><a href="Classes.html?subject=${subject.name}">${subject.name}</a></li>`
            });
            document.getElementById('subjects').innerHTML=output
        }else {
          alert("Failed to access database please login again!")
          location.href="login.html"

        }
    })
    .catch(error => {
        console.log(error)
        alert("Failed to access database please login again!")
        location.href="login.html"
    })
})