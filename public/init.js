$(document).ready(function(){

	$('#phone').on('keyup',function(){

		var k = $(this).val();
		if(k.length == 0)
		{
			$('#check').html('');
			$('#check').css({'border':''});
		}
		else{
			$.ajax({
				type: "POST",
				url: "/check",
				data: {phoneNumber: k},
				success: function(data)
				{
					if(data == "available"){
							$('#check').html('<font color="red">Already Registered</font>');
							$('#check').css({'border':'2px solid red','border-radius':'5px'});

							//$('#btn').attr('disabled','disabled');
							$('#submitUserData').attr('action','');
					}

				},
				error: function(data)
				{
					console.log("App not functioning properly!");
				}
			});	
		}

	});

/*
	$('#submitUserData').submit(function(e){
		e.preventDefault();
		var fname=$('#fname').val();
		var lname=$('#lname').val();	
		var dateofbirth=$('#dob').val();
		var add=$('#address').val();
		var userBio=$('#bio').val();
		var phone=$('#phone').val();
		var userID=$('#userID').val();


			$.ajax({
				type: "POST",
				url: "/create",
				data: {firstName: fname,lastName:lname,DOB:dateofbirth,address:add,phoneNumber:phone,userName:userID},
				success: function()
				{
					console.log(data);
					if(data){
						console.log("user successfully added to the DB");


					}
					else{
						$('#result').html('<div class="alert alert-danger" role="alert">Some error Occured !</div>');
					}
				},
				error: function(data)
				{
					console.log('Request Failed!');				
				}
			});


	});

*/
});