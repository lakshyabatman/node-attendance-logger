document.getElementById("signup").addEventListener("submit", e => {
    let name = document.getElementById("email").value
    let password = document.getElementById("password").value
    let category = document.getElementById("category").value

    fetch("/signup", {
      method:"POST",
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({
        name:name,
        password:password,
        category:category
      })
    })
    .then((res) => res.json())
    .then((data)=> {
      if(data.auth) {
        sessionStorage.setItem("attendance-auth",data.auth)
        sessionStorage.setItem("attendance-category",data.category)
        location.href="/dashboard.html"
      }else {
        alert("Failed to signup")
        
      }
    })
    e.preventDefault()
  })