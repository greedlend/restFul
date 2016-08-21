$( document ).ready(function() {
	"use strict";
    var body = $('body'),
    	input_username = body.find("input:text:first").clone(),
    	input_email = body.find("input:text").last().clone();

    //first-in page render	 
    var page_first_in_render =(function(box){
    	box.find("table tr").find("button[name=editdone], button[name=editcancel]").hide().end();
    })(body);
	
	//Events-assigning
	body.find('table tr td button[name=edituser]')
			.on('click', function(){
				if($(this).parents("table:first").find("input:text").length >= 2){
					alert('edit only one item at a time.');
					return false;
				}
				else{
					editControl($(this));
				}
    		}).end()
		.find('table tr td button[name=editcancel]')
			.on('click', function(){
				$(this).parents('tr:first').find("button[name=editcancel], button[name=editdone]").hide().end()
					.find('button[name=edituser]').show().end()
					.find('input').remove().end()
					.find('span').show().end();
			}).end()
		.find('table tr td button[name=editdone]')
			.on('click', function(){
				var tr = $(this).parents('tr:first');
				var text_1 = tr.find(':text:first').val(),
					text_2 = tr.find(':text:last').val();
				if(text_1 === ""){
	    			alert('user name is empty.');return false;}
	    		else if(text_2 === ""){
	    			alert('email is empty.');return false;}
				else{
					var data ={};
					data.id = $(this).attr('data-id');
					data.username = text_1;
					data.email = text_2;
					$.ajax({
						url: "./edituser",//location.href+"./edituser",
						type: "POST",
						dataType: "json",
						data: data,
						success: function(data){
							if(data.status === 0){
								alert("modified successfully!("+data.status+")");
								tr	.find("span[name=username]").show().text(data.username).end()
									.find("span[name=email]").show().text(data.email).end()
									.find("input:text").remove().end()
									.find("button").hide().end()
									.find("button[name=edituser]").show().end();
							}else {
								alert("Update failed, please inform the administrator!");
								return false;
							}
						}
					});	
				}
			}).end()
    	.find('input:submit')
    		.on('click', function(){
	    		if($(this).parents('form').find('>:text:first').val() === ""){
	    			alert('user name is empty.');return false;}
	    		else if($(this).parents('form').find('>:text').last().val() === ""){
	    			alert('email is empty.');return false;}
    		}).end()
    ;

//span transform to input-field    
    function editControl(selector){
    	var tr = selector.parents("tr:first"),
    		text_1 = tr.find("td:first span").hide().text(),
    		text_2 = tr.find("td:eq(1) span").hide().text();
    	tr
    		.find("td:first").append(input_username.val(text_1))
    		.next("td").append(input_email.val(text_2)).end().end()
    		.find("button[name=editcancel], button[name=editdone]").show().end()
    		.find("button[name=edituser]").hide().end();
	}

});