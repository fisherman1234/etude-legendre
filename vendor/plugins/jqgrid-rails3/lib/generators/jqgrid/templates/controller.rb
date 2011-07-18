class <%= class_name.pluralize %>Controller < ApplicationController
	respond_to :html,:json
  
	# Don't forget to edit routes if you're using RESTful routing
	# 
	#resources :<%=plural_name%>,:only => [:index] do
	#	collection do
	#	  post "post_data"
<%=details.map {|detail| "\t#     post \"#{detail.model.downcase}_post_data\""}.join("\n")%>
<%=details.map {|detail| "\t#     get \"#{detail.model.downcase}_details\""}.join("\n")%>
	#	end
	# end

	GRID_COLUMNS = %w{<%= columns.map {|x| "#{x}"}.join(' ') %>}
	
	def post_data
		grid_add_edit_del(<%=class_name%>, GRID_COLUMNS)
	end
	
	def index
		respond_with() do |format|
			format.json { render :json => filter_on_params(<%=class_name%>, GRID_COLUMNS)}  
		end
	end
	
	<% details.each do |detail| %>
	<%=detail.model.upcase%>_GRID_COLUMNS = %w{<%= detail.columns.map {|x| "#{x}"}.join(' ') %>}

	def <%=detail.model.downcase%>_post_data
		grid_add_edit_del(<%=detail.model%>, <%=detail.model.upcase%>_GRID_COLUMNS)
	end

	def <%=detail.model.downcase%>_details
		respond_with() do |format|
			format.json { render :json => filter_details(<%=class_name%>, '<%=detail.foreign_key%>', <%=detail.model%>, <%=detail.model.upcase%>_GRID_COLUMNS)}  
		end
	end
	
	
	<% end %>
end
