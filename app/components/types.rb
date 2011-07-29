class Types < Netzke::Basepack::GridPanel
  
  # Ext.Panel's config option "title"
    js_property :title, "Parametres"
    

    config  :model => "TypeActivite",
    :columns => [:description],
    :title => Netzke::Core.session[:netzke_user_id],
    :view_config => {
        :force_fit => true # force the columns to occupy all the available width
      }
end