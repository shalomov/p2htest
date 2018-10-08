$( document ).ready(function(){
    // $('.btn-to_top').click(function(){
    //     $("html, body").animate({ scrollTop: 0 }, 600);
    //     return false;
    // });
    $(".btn-to_top").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
      });
});