module JqgridEdit
	private
	
	def grid_add_edit_del (model_class, grid_columns)
		error_message = ""
		model_params = {}	
		grid_columns.each {|c| model_params[c] = str_to_column_type(model_class, params[c], c) if params[c]}

	 	case params[:oper]
			when 'add'
				if params["id"] == "_empty"
		  			record = model_class.create(model_params)
				end
			when 'edit'
				record = model_class.find(params[:id])
				record.update_attributes(model_params)
				record_data = {}
				grid_columns.each {|c| record_data[c] = get_column_value(record, c).to_s}
	  		when 'del'
				model_class.destroy_all(:id => params[:id].split(","))
	  		else
				error_message = 'unknown action'
		end

 		if !record || record.errors.empty?
			render :json => [false, error_message, record_data] 
		else
			# 
			# record.errors.entries.each do |error|
			# 	error_message << "<strong>#{model_class.human_attribute_name(error[0])}</strong> : #{error[1]}<br/>"
			# end
			error_message << "<table>"
			record.errors.entries.each do |error|
				error_message << "<tr><td><strong>#{model_class.human_attribute_name(error[0])}</strong></td> <td>: #{error[1]}</td><td>"
			end
			error_message << "</table>"
			
			# 
			# record.errors.entries.each do |error|
			# 	error_message << "<strong>#{model_class.human_attribute_name(error[0])}</strong> : #{error[1]}<br/>"
			# end
			render :json =>[true, error_message, record_data]
		end
	end
end

class ActionController::Base
	include JqgridEdit
end