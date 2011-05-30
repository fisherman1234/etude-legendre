function primary_formatting(){
	$('input').unbind("dblclick");
	
	$("input").addClass("ui-widget-content ui-corner-all");
	$("input:not(.minuscule)").change(function(){
		$(this).val($(this).val().toUpperCase());
	});
	$("input.clickable").dblclick(function(){
		sous_jacent = $(this).attr('id').replace('_label','')+'_id';
			if ($('#'+sous_jacent).val()!=''){
					edit_contact_detail($('#'+sous_jacent).val());
			};
	});
	$("#contact_type_intervenant_id").change(function(){
		load_adress_line();
	});
	$("#contact_civilite").change(function(){
		load_adress_line();
	});
	$("form").submit(function(event) {
		event.preventDefault();
	});
	
	$('#contact_code_postal').change(function(){
		autocomplete_ville($('#contact_code_postal').val());	
	});
	$("textarea").addClass("ui-widget-content ui-corner-all");
	$( ".datepicker" ).datepicker();
	$( "#add_institution" ).button({ icons: {primary:'ui-icon-plusthick'}});
	$( ".add_juge" ).button({ icons: {primary:'ui-icon-plusthick'}});
	$( ".button" ).button({ icons: {primary:'ui-icon-plusthick'}});
	$( ".button-save" ).button({ icons: {primary:'ui-icon-disk'}});

	$( "#tabs" ).tabs();
	$(".phone").mask("+99.9.99.99.99.99");
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
						var sGroup_id = oSettings.aoData[ oSettings.aiDisplay[iDisplayIndex] ]._aData[5];
						nTrs[i].id=sGroup_id;
						nTrs[i].className = nTrs[i].className+" acteur_contact_row";
						if ( sGroup != sLastGroup )
						{
							var nGroup = document.createElement( 'tr' );
							var nCell = document.createElement( 'td' );
							nCell.colSpan = iColspan;
							nCell.className = "group";
							nCell.id=sGroup_id;
							nCell.innerHTML = sGroup;
							nGroup.appendChild( nCell );
							nTrs[i].parentNode.insertBefore( nGroup, nTrs[i] );
							sLastGroup = sGroup;
						}
					}
					$('#data-table-acteurs').css('width', '100%');

					$("#data-table-acteurs tr.acteur_contact_row").click(function(event) {
							edit_acteur_detail($(this).attr('id'))
						});
					
				},
		"aoColumnDefs": [
					{ "bVisible": false, "aTargets": [ 0 ], "bVisible": false, "aTargets": [ 5 ] }
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

function autocomplete_ville(code_postal){
	$("#contact_ville").autocomplete({
	  source: "/code_postal_villes.js?code_postal="+code_postal,
		autoFocus: true
	});
}

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
				title: 'Ajouter une institutionon',
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
	$('#add-contact').load('/contacts/new.html #new_contact', function(){
		primary_formatting();
		autocomplete_institution(".contact", "");
	});
     $( "#add-contact" ).dialog({
     			height: 600,
     			width: 850,
     			modal: true,
				title: 'Ajouter un contact',
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
	$('#add-contact-partie').load('/dossiers/'+$("#dossier_id").val()+'/new_partie #new-actor', function(){
		primary_formatting();
		autocomplete_institution(".contact", "");
	});
     $( "#add-contact-partie" ).dialog({
     			height: 300,
     			width: 800,
     			modal: true,
				title: 'Ajouter un intervenant',
				close: function(event, ui) {
					$( "#add-contact-partie" ).remove(); 
					$("#data-table-acteurs").dataTable().fnReloadAjax();
					},
     			buttons: {
           				"Ajouter cet intervenant": function() {
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

function edit_acteur_detail(id){
		$('body').append("<div id='edit-contact-acteur-dialog' style=''></div>");
		$('#edit-contact-acteur-dialog').load('/contact_acteurs/'+id+'/edit .edit_contact_acteur', function(){
			primary_formatting();
			autocomplete_institution(".contact", "");
		});
	     $( "#edit-contact-acteur-dialog" ).dialog({
	     			height: 300,
	     			width: 800,
	     			modal: true,
					title: 'Editer une partie',
					close: function(event, ui) {
						$( "#edit-contact-acteur-dialog" ).remove(); 
						$("#data-table-acteurs").dataTable().fnReloadAjax();
						},
	     			buttons: {
	           				"Retirer cet inervenant": function() {
	           				  $.post('/contact_acteurs/'+id+'/destroy');
	           				  $( this ).dialog( "close" );        				  
	           				},
	           				"Enregistrer": function() {
								$.ajax({
								   type: "PUT",
								   url: '/contact_acteurs/'+id+'.json',
								   data: $(".edit_contact_acteur").serialize()
								 });
	                   		$( this ).dialog( "close" );
	                   		}
	                   	}			
	     });
	
}

function edit_contact_detail(id){
		$( "#edit-contact-dialog" ).remove(); 
		$('body').append("<div id='edit-contact-dialog' style=''></div>");
		$('#edit-contact-dialog').load('/contacts/'+id+'/edit .edit_contact', function() {
		  primary_formatting();
		  autocomplete_institution(".contact", "");
		});
	     $( "#edit-contact-dialog" ).dialog({
	     			height: 600,
	     			width: 800,
	     			modal: true,
					title: 'Editer un contact',
					close: function(event, ui) {
						$( "#edit-contact-dialog" ).remove(); 
						},
	     			buttons: {
	           				"Supprimer ce contact": function() {
	           				  $.post('/contacts/'+id+'/destroy');
	           				  $( this ).dialog( "close" );        				  
	           				},
	           				"Enregistrer": function() {
								$.ajax({
								   type: "PUT",
								   url: '/contacts/'+id+'.json',
								   data: $(".edit_contact").serialize()
								 });
	                   		$( this ).dialog( "close" );
	                   		}
	                   	}			
	     });
	
}


function load_adress_line(){
	$.ajax({
	  type: 'GET',
	  url: '/type_adresses.js?function='+$("#contact_type_intervenant_id").val()+"&civilite="+$("#contact_civilite").val(),
	  dataType: "json",
	  success: function(data) {
		$("#contact_genre_adresse").val(data[0].type_adresse.description_adresse);
		$("#contact_genre_lettre").val(data[0].type_adresse.description_courrier);
		}
	});
}