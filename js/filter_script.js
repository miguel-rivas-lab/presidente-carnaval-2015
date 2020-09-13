var w_url = "home.html";

$(document).ready(function(){

	$("#entrar").on("click", function()
	{
		if( parseInt($("#edad").val()) > 17 )
		{
			window.location.href = w_url;
		}
	});

	$("#edad").focus();

});


$(document).keyup(function(e) {
	if( e.keyCode == 13 ) { 
		if( parseInt($("#edad").val()) > 17 )
		{
			window.location.href = w_url;
		}
	}
});