window.addEventListener("load",() => {
    const subjectName = decodeURIComponent(window.location.search.split("=")[1])
      if(localStorage.getItem("attendance-category")=="0") {
          location.href="dashboard.html"
      }
      fetch("/getStudents", {
          headers:{
              auth:sessionStorage.getItem("attendance-auth")
          }
      })
      .then(res =>res.json())
      .then(data =>  {
          if(data.students) {
            output=""
            data.students.forEach(student => {
                output+=`<option value="${student.studentID}">${student.name}</option>`
            })
            document.getElementById("students").innerHTML=output
          }else {
              alert("Failed to fetch from database")
              location.href="login.html"

          }
      })
      .catch(err => {
          console.log(err)
          alert("Failed to fetch, please login again")
          location.href="login.html"

      })

      document.getElementById("addclass").addEventListener("submit" , (e) => {
      var startTime = document.getElementById("startTime").value
      var endTime = document.getElementById("endTime").value
      var students = document.getElementById("students").options
      currentDate = new Date().getDate() + "-" + new Date().getMonth() + "-" + new Date().getUTCFullYear()
      startTime = new Date(currentDate + " " + startTime)
      endTime = new Date(currentDate + " " + endTime)
      var atnds=[]
      for(var i =0;i<students.length;i++) {
          if(students[i].selected) {
            atnds.push(students[i].value)
          }
      }
      fetch("/markAttendance",{
          method:"POST",
          headers:{
            'Content-Type': 'application/json',
            auth:sessionStorage.getItem("attendance-auth")
          },
          body:JSON.stringify({
              subject: subjectName,
              attendees:atnds,
              startTime:startTime,
              endTime:endTime
          })
      })
      .then(res=>res.json())
      .then(data =>  {
          if(data.message=="Success") {
              alert("Class added successfully")
          }else {
              alert("Failed to add class, please try again!")
          }
      })
      .catch(err => {
          console.log(err)
          alert("Failed to add class, please login to retry.")
      })
      e.preventDefault()
  })
  })