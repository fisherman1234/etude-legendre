function initialize() {
 	var url = document.location.href;
	function getValues(url) {
	    var result = ["null","null"];
	    $.ajax({
	        url: url,
	        type: 'get',
	        dataType: 'xml',
	        async: false,
	        success: function(data) {
	             $(data).find("buy").each(function () {
					result[0]=$(this).find("lat").text();
					result[1]=$(this).find("lng").text();
				});
	        }
	    });
	    return result;
	};
	
	results = getValues(url);
	lat = results[0];
	lng = results[1];
	var myLatlng = new google.maps.LatLng(lat, lng);
	var myOptions = {
		zoom: 17,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	var marker = new google.maps.Marker({
		position: myLatlng,
		title:"Position actuelle"
      
	  });
	  // To add the marker to the map, call setMap();
	 marker.setMap(map);
}

function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.google.com/maps/api/js?sensor=false&callback=initialize";
  document.body.appendChild(script);
}

window.onload = loadScript;

$(document).ready(function(){
 	
	$("button.accept").click(
		function() {
	    var url = document.location.href;
	    $.ajax({
	        data 			: {buy : {status : 2}},
	        type            : 'put',
			dataType		: 'xml',
	        url                 : url
	    });
	    return false;
	  }
	);

	
	$("button.toggle").toggle(
				function() {
					$( "#target_informations" ).toggle("blind")
					$( "#accept_decline_buttons" ).toggle("blind")
					$( "#transaction_informations" ).toggle("blind")
				},
				function() {
					$( "#target_informations" ).toggle("blind")
					$( "#accept_decline_buttons" ).toggle("blind")
					$( "#transaction_informations" ).toggle("blind")
				}
			);
	
	$("button.more").click(
		function() {
	    $containing_div = ".accept_decline_buttons";
	    var url = document.location.href;
	    $.ajax({
	        
	        success         : xmlParser,
	        type            : 'get',
			dataType		: 'xml',
	        url                 : "http://127.0.0.1:3000/buys/1.xml"
	    });
	    return false;
	  }
	);
	
	function xmlParser(xml) {
	    $('#load').fadeOut();

	    $(xml).find("buy").each(function () {
	        $(".main").append('<div class="book"><div class="title">' + $(this).find("lat").text() + '</div></div>');
	        $(".book").fadeIn(1000);

		    });

		}	
});