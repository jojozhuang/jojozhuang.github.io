$(document).ready(function(){
    // tab
    $(".nav-tabs a").click(function(){
        $(this).tab('show');
    });
    // tooltip - used by favorite
    $('[data-toggle="tooltip"]').tooltip();
    // popover - used by library
    // $('[data-toggle="popover"]').popover({html:true});
    // keep bootstrap popover alive while the popover is being hovered
    $(".pop").popover({ trigger: "manual" , html: true, animation:false})
        .on("mouseenter", function () {
            var _this = this;
            $(this).popover("show");
            $(".popover").on("mouseleave", function () {
                $(_this).popover('hide');
            });
        }).on("mouseleave", function () {
            var _this = this;
            setTimeout(function () {
                if (!$(".popover:hover").length) {
                    $(_this).popover("hide");
                }
            }, 300);
    });
});
