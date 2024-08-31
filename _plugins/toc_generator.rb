Jekyll::Hooks.register :pages, :post_render do |page|
    if page.extname == '.html'
      toc_data = []
      page.content.scan(/<h2 id="(.+?)">(.+?)<\/h2>/) do |id, content|
        toc_data << { 'id' => id, 'content' => content }
      end
  
      page.data['toc'] = toc_data
    end
  end
  