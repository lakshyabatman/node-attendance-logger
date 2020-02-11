const subjectName = decodeURIComponent(window.location.search.split("=")[1])

        window.addEventListener("load",() => {

        document.getElementById("add").addEventListener("click",()=>{
            location.href= `AddClass.html?subject=${subjectName}`
        })


        var route ="/viewClasses"
        TableHeading="<tr><th>Class Date</th><th>Starting Time</th><th>End Time</th>"
            
        if(sessionStorage.getItem("attendance-category")=="1") {
              TableHeading+="<th># of students</th></tr>"
        }else {
                TableHeading+="<th>Was Present</th></tr>"
                document.getElementById("add").style.display="none"
                route="/viewAttendance"
        }

        document.getElementById("tableHeading").innerHTML=TableHeading
        document.getElementById('head').innerHTML = subjectName
        fetch(route,{
              headers:{
                    auth:sessionStorage.getItem("attendance-auth"),
                    'Content-Type': 'application/json'
              },
              method:"POST",
              body:JSON.stringify({subject:subjectName})
        })
        .then(req => req.json())
        .then(data => {
              if(data.classes) {
                  output=""
                  data.classes.forEach(Class => {
                      var startTime = new Date(Class.startTime)
                      var endTime = new Date(Class.endTime)
                      var ClassDate = startTime.getDate() + "/" + startTime.getMonth() + "/" + startTime.getFullYear()
                      var startTime = startTime.getHours()+ ":" + startTime.getMinutes()
                      var endTime = endTime.getHours() + ":" + endTime.getMinutes()
                      OutputTemplate= sessionStorage.getItem("attendance-category")=="1" ? `<tr><td>${ClassDate}</td><td>${startTime}</td><td>${endTime}</td><td>${Class.numberOfStudents}</td></tr>` :`<tr><td>${ClassDate}</td><td>${startTime}</td><td>${endTime}</td><td>${Class.attended}</td></tr>` 
                      output+=OutputTemplate
                  });
                  document.getElementById('classes').innerHTML=output
              }else {
                  alert("Failed to recieve data, please login again")
                  location.href="login.html"

              }
          })
        .catch(error => {
              console.log(error)
              alert("Failed to access database please login again!")
              location.href="login.html"

          })
      })