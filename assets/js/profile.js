$('document').ready(function(){

    $('#createOption').on('click', function(event){
        event.stopPropagation();
        event.preventDefault();
        var el = '<div class="form-group"><label for="options" class="col-sm-2 control-label">Option</label><div class="col-sm-7"><input type="text" class="form-control option" placeholder="Your option here"></div><button class="btn btn-danger col-sm-2 removeOption">Remove</button></div>'
        $('#pollForm').append(el);
    })
    $(document).on("click", ".removeOption", function(event){
        event.stopPropagation();
        event.preventDefault();
        event.target.closest(".form-group").remove();
    });
});
