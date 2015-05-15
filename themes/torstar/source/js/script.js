    var list = $('#sidebar ul');

    $("article header .title").each(function() {
        $(this).prepend('<a name="' + $(this).text().trim() + '"></a>');
        $(list).append('<li><a href="#' + $(this).text().trim().toLowerCase().replace(/\s+/g, '-')  + '">' +  $(this).text().trim() + '</a></li>');
    });

// Cache selectors
var lastId,
    sidebar = $("#sidebar"),
    sidebarHeight = sidebar.outerHeight()+0,
    // All list items
    menuItems = sidebar.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-50;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 500);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+sidebarHeight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   }                   
});

