
jQuery(document).ready(function() {

	$("#submitBtn").click(function(){
		login();
    });
	document.onkeydown = function(e){ 
	    var ev = document.all ? window.event : e;
	    if(ev.keyCode==13) {
	    	login();
	     }
	}
	
	function login(){
		 var username = $("#fm").find('.username').val();
	        var password = $("#fm").find('.password').val();
	        if(username == '') {
	            $("#fm").find('.error').fadeOut('fast', function(){
	                $(this).css('top', '27px');
	            });
	            $("#fm").find('.error').fadeIn('fast', function(){
	                $(this).parent().find('.username').focus();
	            });
	            return false;
	        }
	        if(password == '') {
	            $("#fm").find('.error').fadeOut('fast', function(){
	                $(this).css('top', '96px');
	            });
	            $("#fm").find('.error').fadeIn('fast', function(){
	                $(this).parent().find('.password').focus();
	            });
	            return false;
	        }
	        
	        $.ajax({
				type:"POST",
			   	url: "loginCheck",
			   	data:"userName="+username+"&userPwd="+password,
			   	success: function(msg){
			   		var msgObj = JSON.parse(msg);
			   		if(msgObj.type=="ERROR"){
			   			alert(msgObj.reason);
			   			return false;
			   		}
			   		if(msgObj.type=="SUCCESS"){
			   			$.cookie("LOGINKEY", msgObj.reason);
			   			window.location.href="manager/index";
			   		}
			   }
			});
	}
    $('.page-container form .username, .page-container form .password').keyup(function(){
        $(this).parent().find('.error').fadeOut('fast');
    });

});
