module ApplicationHelper
  # Format text for display.                                                                    
   def format(text)
     sanitize(markdown(text))
   end

   # Process text with Markdown.                                                                 
   def markdown(text)
     BlueCloth::new(text).to_html
   end
end
