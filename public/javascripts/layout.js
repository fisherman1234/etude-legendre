var previous_page = "";
var current_page = "";
var next_page = "";
var current_communication = "";
tinyMCE.init({
	editor_selector : 'mceEditor0',
	language : 'fr',
	theme : 'simple'
});

function primary_formatting(){
	autocomplete_institution(".contact",'');
	autocomplete_institution(".dossier", "?type=1");
	autocomplete_contact ("juge_mission", "?type=1");
	autocomplete_contact ("juge_controlleur", "?type=1");
	autocomplete_contact ("contact", "");
	autocomplete_dossier("dossier","");

	
	$('#expense_item_id').change(function() {

    $.ajax({
      url: "/items/"+$('#expense_item_id').val()+'.js',
      dataType: 'json',

      success: function(data){
        $("#expense_prix_unitaire").val(data.item.prix_unitaire);
        $("#expense_taux_tva_id").val(data.item.taux_tva_id);
		$("#expense_unite_id").val(data.item.unite_id)
      }
    });

  });

  	$('#expense_quantite').change(function() {
      $("#total").val( parseFloat($("#expense_prix_unitaire").val())*parseFloat($("#expense_quantite").val()) )

  });

	$('#expense_prix_unitaire').change(function() {
      $("#total").val( parseFloat($("#expense_prix_unitaire").val())*parseFloat($("#expense_quantite").val()) )

  });
	
	// $(document).bind('keydown', 'ctrl+s',function (evt){
	//     $.each($('form.dirty-form'), function(key, value) { 
	// 	  	submit_form($(value));
	// 	});
	//     return false;
	// });
	// $(":input:not(.savable)").bind('keydown', 'meta+s',function (evt){
	// 	$.each($('form.active-form'), function(key, value) { 
	// 	  	submit_form($(value));
	// 	});
	//     return false;
	// });
	// $("input:not(.savable)").addClass('savable');
	// 
	// $(document).bind('keydown', 'meta+s',function (evt){
	// 	$.each($('form.dirty-form'), function(key, value) { 
	// 	  	submit_form($(value));
	// 	});
	//     return false;
	// });
	// $(":input:not(.savable)").bind('keydown', 'meta+s',function (evt){
	// 	$.each($('form.active-form'), function(key, value) { 
	// 	  	submit_form($(value));
	// 	});
	//     return false;
	// });
	// $("input:not(.savable)").addClass('savable');
	
	$("input").addClass("ui-widget-content ui-corner-all");
	$("input:not(.minuscule)").change(function(){
		$(this).val($(this).val().toUpperCase());
	});
	$("input.clickable:not(.dblclickable)").bind("dblclick", function(){
		sous_jacent = $(this).attr('id').replace('_label','')+'_id';
			if ($('#'+sous_jacent).val()!=''){
					edit_contact_detail($('#'+sous_jacent).val());
			};
	});
	$("input.clickable:not(.dblclickable)").addClass("dblclickable");
	$("#contact_type_intervenant_id").change(function(){
		load_adress_line();
	});
	$("#contact_civilite").change(function(){
		load_adress_line();
	});
	$("form").submit(function(event) {
		event.preventDefault();
	});
	

	$(':input').change(function(){
		$('.active-form').removeClass('active-form')
		$(this).parents('form:first').addClass('dirty-form active-form')
		$(this).addClass('dirty-input')
		$("#save").addClass("ui-state-active");
		}
	);
	
	$(':input').change(function(){
		$(this).parents('form:first').addClass('dirty-form')
		$(this).addClass('dirty-input')
		$("#save").addClass("ui-state-active");
		}
	);
	
	$('.code_postal').change(function(){
		autocomplete_ville('#'+this.form.id+ ' .ville', this.value);	
	});
	$("textarea").addClass("ui-widget-content ui-corner-all");
	$( ".datepicker" ).datepicker();
	$( "#add_institution" ).button({ icons: {primary:'ui-icon-plusthick'}});
	$( ".add_juge" ).button({ icons: {primary:'ui-icon-plusthick'}});
	$( ".button" ).button({ icons: {primary:'ui-icon-plusthick'}});
	$( ".button-save" ).button({ icons: {primary:'ui-icon-disk'}});
	$( ".edit-record" ).button({
          icons: {
              primary: "ui-icon-pencil"
          },
          text: false})
	$( ".has-expenses" ).button({
          icons: {
              primary: "ui-icon-calculator"
          },
          text: false})
	$( ".has-documents" ).button({
          icons: {
              primary: "ui-icon-document"
          },
          text: false})

	$( "#tabs" ).tabs();
	$( ".accordion" ).accordion({
				collapsible: true, 
				autoHeight: false 
			});
	
	$(".phone").mask("+99.9.99.99.99.99");
	$("#acteur_type_acteur_id").change(function () {
		load_add_acteur_contact($("#acteur_type_acteur_id").val());
	});
	
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
			"sSearch": "Recherche",
			"sInfoFiltered": "(sur _MAX_ enregistrements au total)"
		}
		
	});
	
	//Creation des datatables
	$("#repertoire-contact tbody tr").click(function(event) {
		window.location.href = '/contacts/'+$(this).attr('id')+'/edit';
	});
	
	formattage_datatable("#repertoire-contact");
	
	$("#liste-dossiers tbody tr").click(function(event) {
		window.location.href = '/dossiers/'+$(this).attr('id')+'/edit';
	});
	formattage_datatable("#liste-dossiers");
	
	$("#liste-entreprises tbody tr").click(function(event) {
		navigate_page('/institutions/'+$(this).attr('id')+'/edit');
	});
	formattage_datatable("#liste-entreprises");
	
	
	formattage_datatable_datasouce("#data-table-documents", '/dossiers/'+$("#dossier_id").val()+"/documents.js", 4, edit_document);
	formattage_datatable_datasouce("#data-table-activites", '/dossiers/'+$("#dossier_id").val()+"/activites.js", 5, edit_activite);
	
	formattage_datatable_datasouce("#data-table-frais", '/dossiers/'+$("#dossier_id").val()+"/frais.js", 9, edit_frais);
	formattage_datatable_datasouce("#data-table-consignations", '/dossiers/'+$("#dossier_id").val()+"/consignations.js", 6, edit_consignation);
	
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
			"sSearch": "Recherche",
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
	
	
	if (window.tinyMCE){
		tinyMCE.triggerSave();
		while (tinymce.editors.length!=0)
		  {
			tinyMCE.execCommand('mceRemoveControl',false, tinymce.editors[0].id);
		  }
		};
	
	
	$.each($(".mceEditor"), function(index, value) { 
	  tinyMCE.execCommand('mceAddControl', false, value.id);
	});
}

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

function autocomplete_dossier (nom, type) {
	$( "#"+nom+"_label" ).autocomplete({
	  source: "/dossiers.js"+type,
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


function autocomplete_ville(ville_field, code_postal){
	$(ville_field).autocomplete({
	  source: "/code_postal_villes.js?code_postal="+code_postal,
		autoFocus: true, 
		minLength: 0, 
		select: function(event, ui) { 
			$('#'+this.form.id+' .pays').val('FRANCE');
			 }
	});
	$(ville_field).autocomplete( "search" , [''] )
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

function create_institution () {
	
    $('body').append("<div id='add-institution' style=''></div>");
	$('#add-institution').load('/institutions/new.html #new_institution');
	primary_formatting();
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

function create_document () {
	
    $('body').append("<div id='add-document' style=''></div>");
	$('#add-document').load('/documents/new.html #new_document');
	primary_formatting();
    $( "#add-document" ).dialog({
      			height: 200,
      			width: 800,
      			modal: true,
				title: 'Ajouter un document',
				open: function(event, ui) { 
					setTimeout("primary_formatting();",500); },
				close: function(event, ui) {
					$( "#add-document" ).remove(); },
      			buttons: {
            				"Créer le document": function() {
							  submit_form($("#new_document"));
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
					$( "#add-contact" ).remove();
					 },
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

function navigate_page(page){
	previous_page = current_page;
	current_page = page;
	$("#page-content").hide("slide", { direction: "left" }, 'slow', function(){ $("#page-content" ).html('') } );
	//$( "#page-content" ).fadeOut('fast', function(){ $("#page-content" ).html('') });
	$("#page-content").load(page+' #page-content', function() {
		primary_formatting();
		$("#page-content").show("slide", { direction: "right" }, 'slow', function(){ page_load_scripts(); } );
		//$( "#page-content" ).fadeIn('slow', function(){
	//		page_load_scripts();
	//	})
		
	});
}

function navigate_back(){
	next_page=current_page;
	navigate_page(previous_page);
}
function navigate_next(){
	navigate_page(next_page);
}
function delete_page(page){
	$.post(page);
	navigate_back();
}

function page_load_scripts(){
	var options = {minWidth: 120};  
	$('#menu1').menuB(options);
}

function submit_form(form){
	if (window.tinyMCE){tinyMCE.triggerSave();};	
	$("#progressbar").show();
	form.ajaxSubmit({
		success:function(){
			$("#save").removeClass("ui-state-active");
	       $.growlUI('', 'Modifications enregistrées !'); 
			$("#progressbar").fadeOut();
		}
		});
	
}






function action_performed(text, icon){
	div = '<div id="spinner" class="spinner">'+text+'<br/>';
	div +='<img id="img-spinner" src="/public/images/sharemyspot/ActivityIndicator.gif" alt="Loading" style="height:25px; margin-top: 10px;"/>';
	div +='</div>';
	$('body').append(div);
	$("#spinner").fadeIn('slow', function(){
		setTimeout($("#spinner").fadeOut('slow', function(){$("#spinner").remove()}), 1000);
		});	
}

function formattage_datatable(id_table){
	$(id_table).dataTable({
		"bJQueryUI": true,
		"sPaginationType": "full_numbers",
		"bRetrieve": true,
		"bPaginate": false,
		"bProcessing": true,
		"oLanguage": {
			"sLengthMenu": "Afficher _MENU_ enregistrements par page",
			"sZeroRecords": "Aucun intervenant trouvé",
			"sInfo": "Enregistrements _START_ à _END_ sur _TOTAL_",
			"sInfoEmpty": "Aucun enregistrement",
			"sSearch": "Recherche",
			"sInfoFiltered": "(sur _MAX_ enregistrements au total)"
		},
		"fnDrawCallback": function ( oSettings ) {
			$(id_table).css('width', '100%');
		}
	});
	
}

function formattage_datatable_datasouce(id_table, path, id_col_index, function_on_open){
	$(id_table).dataTable({
		"bJQueryUI": true,
		"sPaginationType": "full_numbers",
		"bRetrieve": true,
		"bPaginate": false,
		"bProcessing": true,
		"sAjaxSource": path,
		"oLanguage": {
			"sLengthMenu": "Afficher _MENU_ enregistrements par page",
			"sZeroRecords": "Aucun intervenant trouvé",
			"sInfo": "Enregistrements _START_ à _END_ sur _TOTAL_",
			"sInfoEmpty": "Aucun enregistrement",
			"sSearch": "Recherche",
			"sInfoFiltered": "(sur _MAX_ enregistrements au total)"
		},
		"fnDrawCallback": function ( oSettings ) {
			if ( oSettings.aiDisplay.length == 0 )
			{
				return;
			}

			var nTrs = $(id_table+' tbody tr');
			var iColspan = nTrs[0].getElementsByTagName('td').length;
			var sLastGroup = "";
			for ( var i=0 ; i<nTrs.length ; i++ )
			{
				var iDisplayIndex = oSettings._iDisplayStart + i;
				var sGroup = oSettings.aoData[ oSettings.aiDisplay[iDisplayIndex] ]._aData[0];
				var sGroup_id = oSettings.aoData[ oSettings.aiDisplay[iDisplayIndex] ]._aData[id_col_index];
				nTrs[i].id=sGroup_id;
				nTrs[i].className = nTrs[i].className+" acteur_contact_row";
			}
			$(id_table).css('width', '100%');

			$(id_table+" tbody tr").click(function(event) {
					//window[function_on_open]($(this).attr('id'));
					function_on_open.call(null,$(this).attr('id') )
					//edit_document($(this).attr('id'))
				});
			},
		"aoColumnDefs": [
					{ "bVisible": false, "aTargets": [ 0 ], "bVisible": false, "aTargets": [ id_col_index ] }
				]
	});
}

function saveDirtyForms () {
	$.each($('form.dirty-form'), function(key, value) { 
		if (value.id == "new_activite"){
				if (window.tinyMCE){tinyMCE.triggerSave();};	
				$("#progressbar").show();
				$(value).ajaxSubmit({
					success:function(data){
						$("#save").removeClass("ui-state-active");

						console.log(data.activite.activite.id);
						console.log(data.communication.communication.id);
						current_communication = data.communication.communication.id;
						$("#page-content" ).fadeOut('fast', function(){ $("#page-content" ).html('') });
						$("#page-content").load('/activites/'+data.activite.activite.id+'/edit'+' #page-content', function(){
								primary_formatting();
								page_load_scripts();
								action_performed("Modifications enregistrées", "");
								$("#progressbar").fadeOut();
								$("#page-content" ).fadeIn();

					    	}	
					   );
					}
					});
		}else{
			submit_form($(value));
		}
	  	
	});
}

function create_com_docs(id){
	$.blockUI({ message: '<h3>Génération des documents...</h3>' });
	$.blockUI
	
	if (window.tinyMCE){tinyMCE.triggerSave();};	
	$('.edit_activite').ajaxSubmit({
		success:function(){
			$('.edit_communication').ajaxSubmit({
				success:function(){
					$('#add-activite-window').load('/communications/'+id+'/generate_attachments_docs #review-docs', function(){
						primary_formatting();
						set_communication_send_buttons(id)
						$.unblockUI();						
	
						});
				}
			});
		}
		});

	
}

function deliverDocs(id){
	$.blockUI({ message: '<h1>Envoi en cours...</h1>' });
	$.blockUI;
	$.get('/communications/'+id+'/send_documents', function(){$.unblockUI})
	
}



function editCom(activite_id){
		//$("#add-activite-window" ).fadeOut('fast', function(){ $("#add-activite-window" ).html('') });
		$("#add-activite-window").load('/activites/'+activite_id+'/edit'+' #activite-page', function(){
				primary_formatting();
				page_load_scripts();
				set_activite_edit_buttons($('#communication_id').val())
				//action_performed("Modifications enregistrées", "");
				$("#progressbar").fadeOut();
				//$("#add-activite-window" ).fadeIn();

	    	}	
	   );
}

function edit_document (id_file) {
	
    $('body').append("<div id='edit-document' style=''></div>");
	$('#edit-document').load('/documents/'+id_file+'/edit .edit_document', function(){primary_formatting();});
	
    $( "#edit-document" ).dialog({
      			height: 200,
      			width: 800,
      			modal: true,
				title: 'Editer un document',
				open: function(event, ui) { 
					setTimeout("primary_formatting();",500); },
				close: function(event, ui) {
					$( "#edit-document" ).remove();
					$("#data-table-documents").dataTable().fnReloadAjax();

					 },
      			buttons: {
            				"Supprimer le document": function() {
							  $.post('/documents/'+id_file+'/destroy');
            				  $( this ).dialog( "close" );
            				},
							"Enregistrer": function() {
							  submit_form($(".edit_document"));
            				  $( this ).dialog( "close" );
            				},
            				"Annuler": function() {
                    					$( this ).dialog( "close" );
                    				}
                    	}			
      });

}

function ajouter_activité() {
	$('body').append("<div id='add-activite-window' style=''></div>");
	$('#add-activite-window').load('/activites/new?dossier='+$("#dossier_id").val()+' #activite-page', function(){
		primary_formatting();
	});
     $( "#add-activite-window" ).dialog({
     			height: 650,
     			width: 1100,
     			modal: true,
				title: 'Ajouter une activité',
				close: function(event, ui) {
					$( "#add-activite-window" ).remove(); 
					$("#data-table-activites").dataTable().fnReloadAjax();
					},
     			buttons: {
           				"Créer cette activité": function() {
							if (window.tinyMCE){tinyMCE.triggerSave();};	
							$("#progressbar").show();
							$("#new_activite").ajaxSubmit({
								success:function(data){
									$("#save").removeClass("ui-state-active");
									console.log(data.activite.activite.id);
									
									editCom( data.activite.activite.id);
								    set_activite_edit_buttons(data.communication.communication.id);

								}
								});       				  
           				},
           				"Annuler": function() {
                   					$( this ).dialog( "close" );
									$( "#add-activite-window" ).remove(); 

                   				}
                   	}			
     });
}

function set_activite_edit_buttons(communication_id){
	$( "#add-activite-window" ).dialog( "option", "buttons", [
	{
        text: "Supprimer",
        click: function() { 
			  $.post('/activites/'+$('#activite_id').val()+'/destroy');
			  $( this ).dialog( "close" ); }
    },
    {
        text: "Générer les documents pour envoi",
        click: function() { 
			create_com_docs(communication_id); }
    },
	    {
	        text: "Enregistrer les modifications",
	        click: function() { 
				saveDirtyForms();
				$(this).dialog("close"); 
				$( "#add-activite-window" ).remove(); }
	    },
		{
	        text: "Fermer",
	        click: function() { 
				$(this).dialog("close"); 
				$( "#add-activite-window" ).remove(); }
	    }
	] );
}


function set_communication_send_buttons(communication_id){
	$( "#add-activite-window" ).dialog( "option", "buttons", [
    {
        text: "Envoyer les documents",
        click: function() { 
			deliverDocs(communication_id) }
    },
	    {
	        text: "Modifier une information",
	        click: function() { 
				editCom($('#activite_id').val());}
	    },
		{
	        text: "Fermer",
	        click: function() { 
				$(this).dialog("close"); 
				$( "#add-activite-window" ).remove(); }
	    }
	] );
}


function edit_activite(id) {
	$('body').append("<div id='add-activite-window' style=''></div>");
	$('#add-activite-window').load('/activites/'+id+'/edit #activite-page', function(){
		primary_formatting();
		$( "#add-activite-window" ).dialog({
     			height: 650,
     			width: 1100,
     			modal: true,
				title: 'Editer une activité',
				open: function(event, ui) { 
					setTimeout("primary_formatting();",500); },
				close: function(event, ui) {
					$( "#add-activite-window" ).remove(); 
					$("#data-table-activites").dataTable().fnReloadAjax();
					},			
     });
		set_activite_edit_buttons($('#communication_id').val());
	});


}


function ajouter_frais(activite_id) {
	$('body').append("<div id='add-frais-window' style=''></div>");
	$('#add-frais-window').load('/expenses/new?dossier='+$("#dossier_id").val()+'&activite='+activite_id+'  #expense-page', function(){
		primary_formatting();
	});
     $( "#add-frais-window" ).dialog({
     			height: 550,
     			width: 1100,
     			modal: true,
				title: 'Ajouter des frais',
				close: function(event, ui) {
					$( "#add-frais-window" ).remove(); 
					$("#data-table-frais").dataTable().fnReloadAjax();
					update_expense_div();
					},
     			buttons: {
           				"Fermer": function() {
                   					$( this ).dialog( "close" );
									$( "#add-frais-window" ).remove(); 

                   				}
                   	}			
     });
}


primary_formatting();
page_load_scripts();

function enregistrer_frais(){
if ($('#expense-list').length){}else{$('#expense-list-container').html('<table border="0" class="dossier main-form" id="expense-list"><thead><tr><th>Activité</th><th>Type dépense</th><th>Date</th><th>Description</th><th>Prix unitaire</th><th>Quantité</th><th>Unite</th><th>TVA</th><th>Total</th></tr></thead><tbody></tbody></table>')}
formattage_datatable('#expense-list');

$('#new_expense').ajaxSubmit({
	success:function(data){
		$('#expense-list tbody').append(data)
		$('#expense-list').dataTable().fnAddData( [data.activite, data.type_depense, data.date_item, data.description_item, data.prix_unitaire, data.quantite,data.unite, data.tva, data.total   ] );
		$('#new_expense')[0].reset();
		}
	})

}

function edit_frais(id) {
	$('body').append("<div id='add-frais-window' style=''></div>");
	$('#add-frais-window').load('/expenses/'+id+'/edit #expense-page', function(){
		primary_formatting();
		$( "#add-frais-window" ).dialog({
     			height: 150,
     			width: 1100,
     			modal: true,
				title: "Edition d'une dépense",
				open: function(event, ui) { 
					setTimeout("primary_formatting();",500); },
				close: function(event, ui) {
					$( "#add-frais-window" ).remove(); 
					$("#data-table-frais").dataTable().fnReloadAjax();
					update_expense_div();
					
					},			
				buttons: {
					"Supprimer": function() {
              				$.post('/expenses/'+id+'/destroy');
							 $( this ).dialog( "close" );
							
              				},
					"Enregistrer": function() {
              					saveDirtyForms ();
              					$( this ).dialog( "close" );

								$( "#add-frais-window" ).remove(); 

              				},
	          				"Fermer": function() {
	                  					$( this ).dialog( "close" );
									$( "#add-frais-window" ).remove(); 

	                  				}
	                  	}
     });
	});
}

function update_expense_div(){
	if ($('#activite_id').length){
		$('#expense-div').load('/activites/'+$('#activite_id').val()+'/expenses', function(){
				$( ".button" ).button({ icons: {primary:'ui-icon-plusthick'}});
				$( ".edit-record" ).button({
			          icons: {
			              primary: "ui-icon-pencil"
			          },
			          text: false})
				});
		
		
	}
}

function ajouter_consignation(activite_id) {
	$('body').append("<div id='add-consignation-window' style=''></div>");
	$('#add-consignation-window').load('/consignations/new?dossier='+$("#dossier_id").val()+'  #consignation-page', function(){
		primary_formatting();
	});
     $( "#add-consignation-window" ).dialog({
     			height: 300,
     			width: 1100,
     			modal: true,
				title: 'Ajouter une consignation',
				close: function(event, ui) {
					$( "#add-consignation-window" ).remove(); 
					$("#data-table-consignations").dataTable().fnReloadAjax();
					},
     			buttons: {
					"Enregistrer": function() {
								saveDirtyForms();
               					$( this ).dialog( "close" );
								$( "#add-consignation-window" ).remove(); 

               				},
           				"Fermer": function() {
                   					$( this ).dialog( "close" );
									$( "#add-consignation-window" ).remove(); 

                   				}
                   	}			
     });
}

function edit_consignation(id) {
	$('body').append("<div id='add-consignation-window' style=''></div>");
	$('#add-consignation-window').load('/consignations/'+id+'/edit  #consignation-page', function(){
		primary_formatting();
	});
     $( "#add-consignation-window" ).dialog({
     			height: 300,
     			width: 1100,
     			modal: true,
				title: 'Editer une consignation',
				close: function(event, ui) {
					$( "#add-consignation-window" ).remove(); 
					$("#data-table-consignations").dataTable().fnReloadAjax();
					$('.recap-frais-consignation').load('/dossiers/'+$("#dossier_id").val()+'/encours_frais');
					
					},
     			buttons: {
					"Supprimer": function() {
          						$.post('/consignations/'+id+'/destroy');
               					$( this ).dialog( "close" );
								$( "#add-consignation-window" ).remove(); 

               				},
					"Enregistrer": function() {
								saveDirtyForms();
               					$( this ).dialog( "close" );
								$( "#add-consignation-window" ).remove(); 

               				},
           				"Fermer": function() {
                   					$( this ).dialog( "close" );
									$( "#add-consignation-window" ).remove(); 

                   				}
                   	}			
     });
}

function edit_parameter(nom_parametre){
}




