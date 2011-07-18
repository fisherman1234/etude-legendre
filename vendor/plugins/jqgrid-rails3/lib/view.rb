module JqgridView

	private
	
	class Javascript
		def initialize (code)
			@code = code
		end

		def to_s
			@code
		end
		
		def to_json
			@code
		end
	end

  	def jqgrid_stylesheets(theme="default")
      stylesheet_link_tag "jqgrid/themes/#{theme}/jquery-ui-1.8.custom.css", 
        'jqgrid/ui.jqgrid.css', 
        :cache => "jqgrid-#{theme}-css"
    end

    def jqgrid_javascripts
      locale = I18n.locale rescue :en
      javascript_include_tag 'jqgrid/jquery-ui-1.8.custom.min.js',
        "jqgrid/i18n/grid.locale-#{locale}.js",
        'jqgrid/jquery.jqGrid.min.js',
        # Don't know if we need it, if smth not working, just uncomment it
        #'jqgrid/grid.tbltogrid',
        :cache => 'jqgrid-js'
    end

	@@app_grid_options = {}
	def self.jqgrid_app_grid_options (options)
		@@app_grid_options = options
	end

	@@app_pager_options = {}
	def self.jqgrid_app_pager_options (options)
		@@app_pager_options = options
	end
	
	# http://www.trirand.com/jqgridwiki/doku.php?id=wiki:options 
	def jqgrid (caption, id, url, columns = [], options = {})
 		@id = id

     	default_options = 
        { 
          	# Can be nil or false to disregard all errors, :default to show the errors or a
		  	# string holding the js error handler name you want to use (its code is part of the view).
			:error_handler       => :default,  
			
   
			# No searching via the filterbar is done if this is nil or false, otherwise it takes a hash of the filter options.
			# http://www.trirand.net/documentation/php/_2v70waupp.htm
         	:search				 => {:searchOnEnter => false},

			:url				 => "#{url}?q=1",
			:caption			 => caption,
			:datatype			 => :json,

			# Can be :inline to allow inline editing in the table or :form to pop up a form to do the editing in.
			# If it is nil or false then no editing can be done.
			:edit_method		 => :inline,
			
			# http://www.trirand.com/jqgridwiki/doku.php?id=wiki:navigator
			:add                 => false,
			:delete              => false,
			:view                => false,          
			:edit_options 		=> {:closeOnEscape => true, :modal => true, :recreateForm => true, :width => 300, :closeAfterEdit => true,
										:afterSubmit => Javascript.new("function(r,data) {return ERROR_HANDLER_NAME(r,data,'edit')}")},

			:add_options 		=> {:closeOnEscape => true, :modal => true, :recreateForm => true, :width => 300, :closeAfterAdd => true,
										:afterSubmit => Javascript.new("function(r,data) {return ERROR_HANDLER_NAME(r,data,'add')}")},

			:delete_options 	=> {:closeOnEscape => true, :modal => true},


			:height				=> 500,
			:resizable			=> true,
			
			# :width				=> 600,
			:viewrecords		=> true,			# doesn't update correctly when not paging??
			:recordtext			=> '{2} records',		# 'Posts {0} - {1} of {2}',
		   	:rowNum				=> 10,
			:rowTotal			=> 2000,


			:rowlist             => [10,25,50,100],				# not the jqgrid default ???
			:context_menu        => false,
        }.merge(options)

		# Combine all options with default having the lowest priority, then any app level options and finally view specific
		# options.
 		@grid_options = default_options.merge(@@app_grid_options).merge(options)
  		@grid_methods = []
		@grid_events = {}
		
    	# Take out the higher level options and convert to options and jqgrid methods.		
		
		grid_loaded_options (:grid_loaded)
		context_menu_options(:context_menu)
		selection_options(:selection, :selection_handler)
		error_handler_options (:error_handler)
		pager_options(:pager)	
		inline_edit
 		master_details
		navigator_options
 		search_options(:search)
		resizable
		
		# Generate columns data
		gen_columns(columns)

		@grid_options.delete(:edit_method)
		
    	# Generate required Javascript & html to create the jqgrid
		"<script type = 'text/javascript'>
			var lastsel, lastedit;
			jQuery(document).ready(function()
			{
				jQuery('##{@id}').jqGrid({
					#{grid_options}
				})				

				#{grid_methods}
			})
		</script>

		<div id='flash_alert' style='display:none;padding:0.7em;' class='ui-state-highlight ui-corner-all'></div>
		<table id='#{@id}' class='scroll' cellpadding='0' cellspacing='0'></table>
		<div id='#{@id}_pager' class='scroll' style='text-align:center;'></div>
		"    
    end

    private
 
	# Returns an array of js properties from a hash, i.e. each hash entry is converted to key: value_as_js_type
	def js_properties (hsh)
		hsh ? hsh.map {|key, value|  "#{key}: #{value.to_json}"} : []
	end
	
	# Convert the grid options to js properties.
	def grid_options
		grid_events
		js_properties(@grid_options).join(",\n")
	end
	
	def grid_methods
		@grid_methods.join("\n")
	end

	# We may add more than one function to be triggered on an event.
	def add_event (event, function)
		if @grid_events[event]
			@grid_events[event] << function
		else
			@grid_events[event] = [function]
		end
	end
	
	# Convert any grid events into grid options once any proxy functions have been introduced to cope with multiple
	# handlers for the same event.
	def grid_events
		@grid_events.each do |event, functions|
			if functions.length == 1
				@grid_options[event] = functions[0]
			else
				# Extract the declaration so we know how to call the converted functions and how we are going to be called.
				declaration = functions[0].to_s[/(.*?)\{/, 1]
				arguments = declaration[/(\(.*?\))/, 1]
				proxy_function = declaration + "{\n"
				functions.each_with_index do |f, i|
					# Convert the anonymous functions into real functions.
					@grid_methods << f.to_s.sub(/function/, "function #{event}_#{i}")

					# Add to the proxy function
					proxy_function << "\t#{event}_#{i}#{arguments}\n"
				end
				@grid_options[event] = Javascript.new(proxy_function += "}")
			end
		end
	end
	
	# Enable filtering (by default)
	def search_options (options)
		options = @grid_options.delete(options)
		if options
			@grid_methods << 
			%Q^jQuery("##{@id}").navButtonAdd("##{@id}_pager", {caption: "", title: $.jgrid.nav.searchtitle, buttonicon :'ui-icon-search', onClickButton:function(){ jQuery("##{@id}")[0].toggleToolbar() } })^
			@grid_methods << %Q^jQuery("##{@id}").filterToolbar({#{js_properties(options).join(', ')}}); jQuery("##{@id}")[0].toggleToolbar()^
		end
    end

	# When  options[:error_handler] == nil 		then use the null error handler (it does nothing so ignores any errors)
	# When  options[:error_handler] == :default then use the default error handler and displays the errors.
	# When  options[:error_handler] == a string then the string holds the name of the error handler to use.  The code is provided
	#  									as part of the view.
	def error_handler_options (handler)
	   	handler = @grid_options.delete(handler)

		case handler
			when nil
				# Null error handler - just ignore all errors.
				@error_handler_name = 'null_error_handler'
				 @grid_methods << 
					%Q^function null_error_handler (r, data, action) 
					{
						return true
					}^
			when :default
			    # Construct default error handler code to display the error
				@error_handler_name = 'default_error_handler'
		        @grid_methods <<
		 			%Q^function default_error_handler (r, data, action) 
					{
			       		var resText = JSON.parse (r.responseText)
			          	if (resText[0])
					  	{
			            	$('#flash_alert').html('<div id="error_explanation">' + resText[1] + '</div>')
			            	$('#flash_alert').slideDown()
			            	window.setTimeout(function() {$('#flash_alert').slideUp()}, 3000)
			              	return false
			         	}
						else
						{
			        		return true
			        	}
					}^			    
			else
				# Custom error handler
				@error_handler_name = handler
		end
	end		
				
	# Enable inline editing with a double click.  After the edit (assuming no errors) the row is reloaded from
	# the results of the save operation so any changes to the formatting of the saved data or virtual attributes
	# are made visible.  Note if the edit changes the sorting order or filtered selection then this will not be 
	# shown - this could be fixed by reloading the grid, but this then looses the row highlight and it is problematic
	# to re-establish it again as the row may not be visible if the sort order changed or the row is filtered out.
	def inline_edit
		if @grid_options[:edit_method] == :inline
			# The code is passed in as a option so must not be converted into a quoted string when
			# converted to json.  After the edit is completed the row is selected again.
			add_event :ondblClickRow, Javascript.new(
			%Q^function(id){
	        	if (id && id !== lastedit)
				{
	            	jQuery('##{@id}').restoreRow(lastsel)
				}
            	lastedit = id
            	jQuery('##{@id}').editRow(id, true, null, #{@error_handler_name}, null, null, 
					function(id, resp) {
						var response = JSON.parse (resp.responseText)
						jQuery('##{@id}').setRowData(lastedit, response[2])
					}) 
	        }^)
	
			# If we are in the middle of an inline edit and the user selects another row then abandon the edit.
			add_event :onSelectRow, Javascript.new(
			%Q^function(id){
	        	if (id && id !== lastsel && id != lastedit)
				{
	            	jQuery('##{@id}').restoreRow(lastsel)
	            	lastsel = id
					lastedit = null
	          	} 
	        }^)
			
		end
	end

		# The options hash key is now :master_details and the value for this key is either a hash (for a single detail) 
		# or an array of hashes (for multiple details).  A detail hash has the following keys	
		#     :grid_id		the id of the grid to use to display the detail view
		#     :url			the url string to a access the detail attributes
		#     :caption		caption string
		def master_details
		if details = @grid_options.delete(:master_details)
			details = [details] if details.kind_of? Hash
			details.each do |detail|
				add_event :onSelectRow, Javascript.new(
					%Q^function(ids) { 
						if (ids == null) 
						{ 
							ids = 0; 
							if (jQuery ("##{detail[:grid_id]}").getGridParam('records') > 0) 
							{ 
								jQuery ("##{detail[:grid_id]}").setGridParam({url:"#{detail[:url]}?q=1&id="+ids,page:1})
								.setCaption ("#{detail[:caption]}: "+ids)
								.trigger('reloadGrid'); 
							} 
						} 
						else 
						{ 
							jQuery("##{detail[:grid_id]}").setGridParam({url:"#{detail[:url]}?q=1&id="+ids,page:1})
								.setCaption("#{detail[:caption]} : "+ ids)
								.trigger('reloadGrid'); 
						}
					}^
				)
			end

		end
	end
	
	# Enable grid_loaded callback
    # When data are loaded into the grid, call the Javascript function options[:grid_loaded] (defined by the user)
	def grid_loaded_options (callback)
		if callback = @grid_options.delete(callback)
			@grid_methods << %Q^	loadComplete: function(){#{callback}();}^
		end
	end

	# Context menu
	# See http://www.trendskitchens.co.nz/jquery/contextmenu/
	# http://www.hard-bit.net/files/jqGrid-3.5/ContextMenu.html
	# http://www.hard-bit.net/blog/?p=171
	# set to {:menu_bindings => xx, :menu_id => yy}, as needed.
	def context_menu_options (option)
		if cm = @grid_options.delete(option)
			@grid_methos <<
			%Q^
				afterInsertRow: function(rowid, rowdata, rowelem){
					$('#' + rowid).contextMenu('#{cm[:menu_id]}', #{cm[:menu_bindings]});
			}^
		end
	end

	def selection_options (mode, handler)
		mode = @grid_options.delete(:selection)
		@selection_handler = @grid_options.delete(:selection_handler)
		case mode
			when nil
			when :multi_selection				# checkboxes
				@grid_options[:multiselect] = true
				@grid_methos <<
				%Q^
		          jQuery("##{@id}_select_button").click(function() { 
		            var s; s = jQuery("##{id}").getGridParam('selarrrow'); 
		            #{handler}(s); 
		            return false;
		          });^

			when :direct_selection
				# Enable direct selection (when a row in the table is clicked)
			    # The javascript function created by the user (options[:selection_handler]) will be called with the selected row id as a parameter
			    @grid_methods <<
			  	%Q^onSelectRow: function(id){ 
			       if(id){ 
			            #{handler}(id); 
			       } 
			    }^
				
			when :button
		      # Enable selection link, button
		      # The javascript function created by the user (options[:selection_handler]) will be called with the selected row id as a parameter
			    @grid_methods <<
		        %Q^
		        jQuery("##{@id}_select_button").click( function(){ 
		          var id = jQuery("##{@id}").getGridParam('selrow'); 
		          if (id) { 
		            #{handler}(id); 
		          } else { 
		            alert("Please select a row");
		          }
		          return false; 
		        });^
			else
				raise "Unknown value for jqGrid option[:selection]: #{mode}"
		end
	end	
	
	# http://www.trirand.com/jqgridwiki/doku.php?id=wiki:pager
	def pager_options (pager)
		# pager = @@app_grid_options.merge(@grid_options.delete(pager))
		# return if pager.empty?
		
		pager_name = "##{@id}_pager"

		# Add in the pager specific options
		@grid_options[:pager] = pager_name
		# rowList
		# viewRecords
	end
	
	# http://www.trirand.com/jqgridwiki/doku.php?id=wiki:navigator
	def navigator_options
		edit 		 = @grid_options[:edit_method] == :form
    	add          = @grid_options.delete(:add)
		delete       = @grid_options.delete(:delete)
		view         = @grid_options.delete(:view)

		edit_options 	= @grid_options.delete(:edit_options)
		add_options 	= @grid_options.delete(:add_options)
		delete_options 	= @grid_options.delete(:delete_options)

		edit_options 	= {} if !edit
		add_options 	= {} if !add
		delete_options 	= {} if !delete

	    js = %Q^jQuery("##{@id}").navGrid('##{@id}_pager',
			{edit: #{edit}, add: #{add}, del: #{delete}, view: #{view}, search: false, refresh: true},
				{#{js_properties(edit_options).join(", ")}},
				{#{js_properties(add_options).join(", ")}},
				{#{js_properties(delete_options).join(", ")}}
		)
		^

		@grid_methods << js.gsub(/ERROR_HANDLER_NAME/, "#{@error_handler_name}") 
	end
	
    # Recalculate width of grid based on parent container.
    # ref: http://www.trirand.com/blog/?page_id=393/feature-request/Resizable%20grid/
	def resizable
		return if !@grid_options.delete(:resizable)
		@grid_methods <<
		%Q^
		function _recalc_width(){
          if (grids = jQuery('"#{@id}".ui-jqgrid-btable:visible')) {
            grids.each(function(index) {
              gridId = jQuery(this).attr('id');
              gridParentWidth = jQuery('#gbox_' + gridId).parent().width();
              jQuery('#' + gridId).setGridWidth(gridParentWidth);
            });
          }
        };

        jQuery(window).bind('resize', _recalc_width);
    	^
	end
	
	def gen_columns (columns)
		# Add in the missing property.
		columns.each {|c| c[:index] = c[:name]}
		
		# Convert each column into the required form.  It is wrapped in a Javascript object to prevent
		# it from being converted to json again.
	 	cols = columns.map {|c| "{" + js_properties(c).join(", ") + "}"}
		@grid_options[:colModel] = Javascript.new("[#{cols.join(', ')}]")		
	end
end

class ActionView::Base
	include JqgridView
end
