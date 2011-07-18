# This generator will create the controller and view files to support jqrid tables.
# When master-detail tables are not used then the command line is 
#  rails generate jqgrid controller_name column_name_1 column_name_2 column_name_n
#  so for example 
#    rails generate jqgrid user id pseudo email firstname
#  will generate a table with columns id, pseudo, email and firstname with a controller called users_controller.rb and 
#  an index.erb in the views/users directory.


# When master-detail tables are  used first entries are the the master and entries starting with a + are for a (or next) detail, i.e.
#  rails generate jqgrid controller_name column_name_1 column_name_2 column_name_n +detail_1_name detail_1_foreign_key detail_1_column_name_1 detail_1_column_name_2  +detail_2_name detail_2_foreign_key detail_2_column_name_1 detail_2_column_name_2  
#  The + indicates the start of a new detail (and there can be any number of them).  The string after the + is the name of the detail model find entries in that correspond to the selected row in the master grid.  The column name in the master model that holds the foreign key is specified next and then the column names in the detail grid.
require 'pp'

Detail = Struct.new(:model, :foreign_key, :columns)

class JqgridGenerator < Rails::Generators::NamedBase

	argument :columns, :type => :array, :default => [], :banner => "column column"

	source_root File.expand_path('../templates', __FILE__)

	attr_reader	:details
	
	def create_controller_files
		# Split out any detail grids.
		grids = [[]]
		columns.each {|c| c =~ /^\+(.*)/ ? grids << [$1] : grids.last << c}

		@columns = grids.shift
		@details = grids.map {|detail|	Detail.new(detail[0].capitalize, detail[1], detail[2..-1])}

		template 'controller.rb', File.join('app/controllers', class_path, "#{plural_name}_controller.rb")  
		template 'index.html.erb', File.join('app/views', file_path.pluralize, "index.html.erb")  
	end
end
