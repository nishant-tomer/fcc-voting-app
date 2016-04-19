$('document').ready(function(){

    $('#createOption').on('click', function(event){
        event.stopPropagation();
        event.preventDefault();
        var el = '<div class="form-group"><label for="options" class="col-sm-2 control-label">Option</label><div class="col-sm-7"><input type="text" class="form-control option" placeholder="Your option here", maxlength = 40, required><small class="text-muted pull-left"> max 40 Chars.</small></div><button class="btn btn-danger col-sm-2 removeOption">Remove</button></div>'
        $('#pollForm').append(el);
    })
    $(document).on("click", ".removeOption", function(event){
        event.stopPropagation();
        event.preventDefault();
        event.target.closest(".form-group").remove();
    });
    $(document).on("click", "#createPoll", function(event){
        var send = true;
        event.stopPropagation();
        event.preventDefault();
        var modal = $("#newPoll")
        var name = modal.find('#name').val()
        var desc = modal.find('#desc').val()
        var options = {}
        $(".option").each(function(index){
            option = $( this ).val()
            options[index] = option
            if( option.length === 0){ send = false; modal.find("#msg").append("Empty Option Value at option : "+(Number(index)+1)+" <br/>") }
        })

        if(name.length === 0){ modal.find("#msg").append("Please give your poll a Name<br/>")}
        else if(desc.length < 10){ modal.find("#msg").append("Please give your poll a bit long Description. Min is 20 characters.<br/>")}
        else if(options.length < 2){ modal.find("#msg").append("Please give your poll atleast two options<br/>")}
        else if( send ) {

            modal.find("#msg").html("")
            $.ajax({
                url: "/profile/poll",
                type:"POST",
                data: { name : name, desc : desc, options : options },
                dataType: "json",
                success: function(data, status){
                                if (data.ok == "ok" ) {
                                    window.location.href = "/profile"
                                    }
                            }
            });
        }
    });
});
