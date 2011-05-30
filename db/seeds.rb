# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)
CodePostalVille.delete_all
open("http://dl.dropbox.com/u/8806/insee.csv") do |vehicles|  
  vehicles.read.each_line do |ville|  
    ville, cp, dpt, insee = ville.chomp.split(";")  
    CodePostalVille.create!(:code_postal => cp, :ville => ville)  
  end
end