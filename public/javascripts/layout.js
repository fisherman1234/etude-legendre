function primary_formatting(){
	$("input").addClass("ui-widget-content ui-corner-all");
	$("textarea").addClass("ui-widget-content ui-corner-all");
	$( ".datepicker" ).datepicker();
	$( "#add_institution" ).button({ icons: {primary:'ui-icon-plusthick'}});
	$( ".add_juge" ).button({ icons: {primary:'ui-icon-plusthick'}});
	$( ".button" ).button({ icons: {primary:'ui-icon-plusthick'}});
	$( "#tabs" ).tabs();
	$("#acteur_type_acteur_id").change(function () {
		load_add_acteur_contact($("#acteur_type_acteur_id").val());
	});
	$('#menu1').ptMenu();
	$(".data-table-standard").css("width","100%");
	$(".data-table-standard").dataTable({
		"bJQueryUI": true,
		"bRetrieve": true,
		"sPaginationType": "full_numbers",
		"bProcessing": true,
		"oLanguage": {
			"sLengthMenu": "Afficher _MENU_ enregistrements par page",
			"sZeroRecords": "Aucun intervenant trouvé",
			"sInfo": "Enregistrements _START_ à _END_ sur _TOTAL_",
			"sInfoEmpty": "Aucun enregistrement",
			"sInfoFiltered": "(sur _MAX_ enregistrements au total)"
		},
	});
	$("#data-table-acteurs").dataTable({
		"bJQueryUI": true,
		"sPaginationType": "full_numbers",
		"bRetrieve": true,
		"bPaginate": false,
		"bProcessing": true,
		"sAjaxSource": '/dossiers/'+$("#dossier_id").val()+"/acteurs.js",
		"oLanguage": {
			"sLengthMenu": "Afficher _MENU_ enregistrements par page",
			"sZeroRecords": "Aucun intervenant trouvé",
			"sInfo": "Enregistrements _START_ à _END_ sur _TOTAL_",
			"sInfoEmpty": "Aucun enregistrement",
			"sInfoFiltered": "(sur _MAX_ enregistrements au total)"
		},

		"fnDrawCallback": function ( oSettings ) {
					if ( oSettings.aiDisplay.length == 0 )
					{
						return;
					}

					var nTrs = $('#data-table-acteurs tbody tr');
					var iColspan = nTrs[0].getElementsByTagName('td').length;
					var sLastGroup = "";
					for ( var i=0 ; i<nTrs.length ; i++ )
					{
						var iDisplayIndex = oSettings._iDisplayStart + i;
						var sGroup = oSettings.aoData[ oSettings.aiDisplay[iDisplayIndex] ]._aData[0];
						if ( sGroup != sLastGroup )
						{
							var nGroup = document.createElement( 'tr' );
							var nCell = document.createElement( 'td' );
							nCell.colSpan = iColspan;
							nCell.className = "group";
							nCell.innerHTML = sGroup;
							nGroup.appendChild( nCell );
							nTrs[i].parentNode.insertBefore( nGroup, nTrs[i] );
							sLastGroup = sGroup;
						}
					}
					$('#data-table-acteurs').css('width', '100%');
				},
		"aoColumnDefs": [
					{ "bVisible": false, "aTargets": [ 0 ], "bVisible": false, "aTargets": [ 4 ] }
				]
	});
}
primary_formatting();

function autocomplete_contact (nom, type) {
	$( "#"+nom+"_label" ).autocomplete({
	  source: "/contacts.js"+type,
	  minLength: 2,
	  change: function(event, ui){
		if (!ui.item){
			$("#"+nom+"_id").val('');
			$("#"+nom+"_label").val('');
		}
	  },
	  select: function( event, ui ) {
	  					$("#"+nom+"_id").val(ui.item.value);
	  					$("#"+nom+"_label").val(ui.item.label);
	  					return false;
				}

	});
}

autocomplete_contact ("juge_mission", "?type=1")
autocomplete_contact ("juge_controlleur", "?type=1")
autocomplete_contact ("contact", "")



function autocomplete_institution(form, filtre) {
	$( form+"  #institution_label" ).autocomplete({
	  source: "/institutions.js"+filtre,
	  minLength: 2,
	  change: function(event, ui){
		if (!ui.item){
			$(form+" #institution_id").val('');
			$(form+" #institution_label").val('');
		}
	  },
	  select: function( event, ui ) {
	  					$(form+" #institution_id").val(ui.item.value);
	  					$(form+" #institution_label").val(ui.item.label);
	  					return false;
				}
	});
}

autocomplete_institution(".contact",'');
autocomplete_institution(".dossier", "?type=1");

function create_institution () {
	
    $('body').append("<div id='add-institution' style=''></div>");
	$('#add-institution').load('/institutions/new.html #new_institution');
    $( "#add-institution" ).dialog({
      			height: 500,
      			width: 800,
      			modal: true,
				title: 'Ajouter une institution',
				open: function(event, ui) { 
					setTimeout("primary_formatting();",500); },
				close: function(event, ui) {
					$( "#add-institution" ).remove(); },
      			buttons: {
            				"Créer l'institution": function() {
            				  $.post("/institutions", $("#new_institution").serialize());
            				  $( this ).dialog( "close" );
            				},
            				"Annuler": function() {
                    					$( this ).dialog( "close" );
                    				}
                    	}			
      });

}




function create_contact(){
	$('body').append("<div id='add-contact' style=''></div>");
	$('#add-contact').load('/contacts/new.html #new_contact');
     $( "#add-contact" ).dialog({
     			height: 500,
     			width: 850,
     			modal: true,
				title: 'Ajouter un contact',
				open: function(event, ui) { 
					setTimeout("primary_formatting();",500);
					setTimeout('autocomplete_institution(".contact", "");',500); 
				},
				close: function(event, ui) {
					$( "#add-contact" ).remove(); },
     			buttons: {
           				"Créer le contact": function() {
           				  $.post("/contacts", $("#new_contact").serialize());
           				  $( this ).dialog( "close" );           				  
           				},
           				"Annuler": function() {
                   					$( this ).dialog( "close" );
                   				}
                   	}			
     });
};



function ajouter_partie(){
	$.ajax({
	  type: 'POST',
	  url: "/acteurs.js",
	  dataType: "json",
	  data: {"acteur":{"type_acteur_id":2, "description":"Partie : "+$("#nouvelle_partie").val(), "dossier_id":$("#dossier_id").val()}},
	  success: function(data) {
	   load_add_acteur_contact(data.acteur.id);
	}
	});
	
}

function load_add_acteur_contact(id){
	$('#add-contact-partie').load('/contact_acteurs/new.html?acteur='+id+' #new_contact_acteur');
	setTimeout("primary_formatting();",500);
	setTimeout("autocomplete_contact ('contact', '');",500);
}

function ajouter_contact() {
	$('body').append("<div id='add-contact-partie' style=''></div>");
	$('#add-contact-partie').load('/dossiers/'+$("#dossier_id").val()+'/new_partie #new-actor');
     $( "#add-contact-partie" ).dialog({
     			height: 300,
     			width: 800,
     			modal: true,
				title: 'Ajouter un intervenant',
				open: function(event, ui) { 
					setTimeout("primary_formatting();",500);
					setTimeout('autocomplete_institution(".contact", "");',500);
					
				},
				close: function(event, ui) {
					$( "#add-contact-partie" ).remove(); 
					$("#data-table-acteurs").dataTable().fnReloadAjax();
					},
     			buttons: {
           				"Créer le contact": function() {
           				  $.post("/contact_acteurs", $("#new_contact_acteur").serialize());
           				  $( this ).dialog( "close" );           				  
           				},
           				"Annuler": function() {
                   					$( this ).dialog( "close" );
									$( "#add-contact-partie" ).remove(); 

                   				}
                   	}			
     });
}