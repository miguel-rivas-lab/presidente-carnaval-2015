var k_gal = 0;
var gal_pic_max = 0;
var btn_select = $("#fil_d22.filter");

var scrl = $(window).scrollTop();
var del = 500;

var parts = {
	home : $("#home").offset().top,
	primer_carnaval : $("#primer_carnaval").offset().top,
	destinos : $("#destinos").offset().top,
	galeria : $("#galeria").offset().top
}

var idd = [
	"home",
	"primer_carnaval",
	"destinos",
	"galeria"
];

var destinys = {
	"stodgo" : {
		max : $("#stodgo").find(".slide_destino").length,
		counter : 1
	},
	"santiago" : {
		max : $("#santiago").find(".slide_destino").length,
		counter : 1
	},
	"vega" : {
		max : $("#vega").find(".slide_destino").length,
		counter : 1
	},
	"bonao" : {
		max : $("#bonao").find(".slide_destino").length,
		counter : 1
	}
}

var dest_sel = "";

function press_button(obj, cls)
{
	obj.siblings().removeClass(cls);
	obj.addClass(cls);
}

function reposicion( bpos, p2, th )
{
	var bpos2 = "right";
	if( bpos == "right"){ bpos2 = "left"; }

	var temp = "#" + th.parent().attr('id');
	th.parent().stop().animate( obj['center_' + bpos], del );
	$("." + bpos + "box").not(temp).stop().animate( obj[bpos + '_max'], del );
	$("." + bpos2 + "box").stop().animate( obj[p2], del );
}

function next_destn(name, num)
{
	$("#" + name).find(".slide_destino").stop().fadeOut(del);
	destinys[name].counter += num;
	destinys[name].counter = (destinys[name].counter < 1) ? destinys[name].max : destinys[name].counter;
	destinys[name].counter = (destinys[name].counter > destinys[name].max) ? 1 : destinys[name].counter;
	merg = "#" + name + " .slide" + destinys[name].counter;
	$(merg).stop().fadeIn(del);
}


function scroll_show(){
	scrl = $(window).scrollTop();

	if (scrl >= 280) { $("#menu_float").stop().fadeIn(del); }
	if (scrl < 280) { $("#menu_float").stop().fadeOut(del); }
	for (k = 0; k <= 4; k++)
	{
		if (scrl >= parts[ idd[k] ] )
		{
			press_button( $("#menu_float a[href='#" + idd[k] + "']"), "selected_2" );
		}
	}

	if (scrl < 1800)
	{
		dest_sel = "";
		$(".rightbox").stop().animate
		({
			width: "50%",
			height: "50%",
			right: "0%"
		}, del );
		$(".leftbox").stop().animate
		({
			width: "50%",
			height: "50%",
			left: "0%"
		}, del );

		$("#btn_descubre").fadeIn(del);
		$(".slide_show").fadeOut(del);
	}
}

$(window).resize(function()
{
	gsz();
	
	parts = {
		home : $("#home").offset().top,
		primer_carnaval : $("#primer_carnaval").offset().top,
		destinos : $("#destinos").offset().top,
		galeria : $("#galeria").offset().top
	}
});

var onImgLoad = function(selector, callback){
	$(selector).each(function()
	{
		if (this.complete || /*for IE 10-*/ $(this).height() > 0)
		{
			callback.apply(this);
		} else {
			$(this).on('load', function()
			{
				callback.apply(this);
			});
		}
	});
};


var cache = [];
var imgArray = new Array();
var prefix= "img/";
var suffix = ".jpg";

var k_destn = 0;


function load_page()
{
	
	$("#cover").fadeOut(1500);
}

$(window).load(function()
{
	load_page();
});


$(window).scroll(function()
{
	scroll_show();
});

$(document).ready(function()
{

	var m = '';
	m += '<a class="btn_volver btn_slide">';
	m += '<img src="img/bback.png">';
	m += '</a>';
	m += '<a class="btn_siguiente btn_slide">';
	m += '<img src="img/bprev.png">';
	m += '</a>';

	$("#destinos .sub_box4").find(".slide_show").append(m);

	gsz();
	
	scroll_show();

/* ------------------ Destinos ------------------ */

	obj = {
		center_right : {
			width: "60%",
			height: "100%",
			right: "20%"
		},
		center_left : {
			width: "60%",
			height: "100%",
			left: "20%"
		},
		l : {
			width: "20%",
			height: "50%",
			left: "0%"
		},
		r : {
			width: "20%",
			height: "50%",
			right: "0%"
		},
		left_max : {
			width: "20%",
			height: "100%",
			left: "0%"
		},
		right_max : {
			width: "20%",
			height: "100%",
			right: "0%"
		}
	};

	$("#destinos .bomba").on("click", function()
	{
		$("#btn_descubre").fadeOut(del);
		o_slide = $(this).parent().find(".slide_show");
		dest_sel = $(this).parent().attr("id");
		o_slide.fadeIn(del);
		$(".slide_show").not(o_slide).fadeOut(del);
		
	});

	$("#destinos .btn_volver").on("click", function()
	{
		next_destn( $(this).parent().parent().attr("id") , -1);
	});

	$("#destinos .btn_siguiente").on("click", function()
	{
		next_destn( $(this).parent().parent().attr("id") , 1);
	});

	$(".bomba").on("click", function()
	{
		ident = $(this).parent().attr('id');

	});

	$(".leftbox .bomba").on("click", function()
	{
		reposicion( "left", "r", $(this) );
	});

	$(".rightbox .bomba").on("click", function()
	{
		reposicion( "right", "l", $(this) );
	});

/* ------------------ Menu Flotante ------------------ */

	$("#menu_float .links a").on("click", function()
	{
		press_button( $(this), "selected_2" );
	});

/* ------------------ Colorbox ------------------ */

	$("#galeria").find(".content_2 a").colorbox
	({
		transition : "elastic",
		closeButton : false,
		previous : "<",
		next : ">",
		scrolling : false,
		fixed: true,
		rel : "gallery_carnaval",
		onLoad: function() {
			jQuery("#cboxContent #cboxSocials").remove();
		},
		onComplete: function() {
			var href = $('#cboxLoadedContent .cboxPhoto').attr( 'src' );

			var facebook = '<div class="cb_social_elem cb_fb"><div class="fb-like" data-href="'+href+'" data-send="false" data-layout="button_count" data-width="160" data-show-faces="true" data-font="arial"></div></div>';
			var twitter = '<div id="tweet" class="cb_social_elem"><a href="https://twitter.com/share" class="twitter-share-button" data-lang="de" data-count="horizontal"><div>t</div></a></div>';
			jQuery("#cboxContent").append('<div id="cboxSocials">'+facebook+twitter+'</div><div class="clear"></div>');
			FB.XFBML.parse(document.getElementById('cboxSocials'));
		}
	});

});

$(document).keyup(function(e) {
	if(dest_sel != "")
	{
		if( e.keyCode == 37 ) {
			next_destn( dest_sel , -1);
		}
		if( e.keyCode == 39 ) { 
			next_destn( dest_sel , 1);

		}
	}
});
