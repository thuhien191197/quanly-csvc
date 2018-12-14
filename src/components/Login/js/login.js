document.getElementById("loginbtn").addEventListener("click", function(){
	var user = document.getElementById("username").value
	var password = document.getElementById("password").value
	var formData = new FormData();

	formData.append("username", "Groucho");
	formData.append("accountnum", 123456); 
	console.log(formData)
	axios({
		  method: 'post',
		  url: 'http://localhost:5000/login',
			  data: {
			  	user: user,
			  	password: password
			  }
			})
			.then(function (response) {

		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
})