class Settings < Netzke::Basepack::BorderLayoutPanel
  
  # Ext.Panel's config option "title"
    js_property :title, "Parametres"
    
  def configuration
    super.merge(
      :items => [{
        :region => :center
      },{
        :region => :west,
        :width => 240,
        :split => true
      }]
    )
  end
end