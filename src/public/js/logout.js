document.getElementById("logout").addEventListener("click",() => {
    sessionStorage.removeItem("attendance-auth")
    sessionStorage.removeItem("attendance-categort")
    location.href="login.html"
})