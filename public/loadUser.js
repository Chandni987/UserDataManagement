

$(document).ready(function(){


	$.ajax({
		type: "POST",
		url: "/getUser",

		success: function(data)
		{

			var table= $('#userTable');

			console.log(data);

			n=data.length;

			console.log(n);

			for(var i=0;i<n;i++)
			{
				/*
				var row=table.insertRow(1);

				  var fname = row.insertCell(0);
				  var lname = row.insertCell(1);
				  var email = row.insertCell(2);
				  var phone = row.insertCell(3);
				  var dob = row.insertCell(4);
				  var created = row.insertCell(5);

				  fname.html(data[i].firstName);
				  lname.html(data[i].lastName);
				  email.html(data[i].Email);
				  phone.html(data[i].phoneNumber);
				  dob.html(data[i].DOB);
				  created.html(data[i].created);
*/
				  table.append("<tr name='"+data[i]._id+"'><td>"+data[i].firstName+"<input type='button' class='editRow' value='edit' name='"+data[i]._id+"' title='firstName'></td><td>"+data[i].lastName+"<input type='button' class='editRow' value='edit'  name='"+data[i]._id+"' title='lastName'></td><td>"+data[i].Email+"<input type='button' class='editRow' value='edit' name='"+data[i]._id+"' title='Email'></td><td>"+data[i].phoneNumber+"</td><td>"+data[i].DOB+"<input type='button' class='editRow' value='edit'  name='"+data[i]._id+"' title='DOB'></td><td>"+data[i].created+"</td><td><input type='button' value='Delete' name='"+data[i]._id+"' class='delrow' /></td>"+"</tr>");

			}

		},
		error: function(data)
		{
				console.log("App not functioning properly!");
		}
	});	



	$("#userTable").on('click', '.delrow', function () {

		var k=$('.delrow').attr('name');



		$.ajax({
			type: "POST",
			url: "/deleteUser",
			data: {_id:k},
			success: function(data)
			{
				alert('Row Deleted');
				console.log("ROw Deleted");
			},
			error: function(data)
			{
					console.log("App not functioning properly!");
			}
		});	


	    $(this).closest('tr').remove();

	});



	$("#userTable").on('click', '.editRow', function () {

		

		var k=$(this).attr('name');

		var x=$(this).attr('title');

		var y = prompt("Please enter Data to be Updated:", "");

		console.log(x,y,k);



		$.ajax({
			type: "POST",
			url: "/updateUser",
			data: {field:x, updateData:y,id:k},
			success: function(data)
			{
				console.log("Collection Updated");
				alert("Record Updated")
				location.reload();
			},
			error: function(data)
			{
					console.log("App not functioning properly!");
			}
		});	






	});



});

