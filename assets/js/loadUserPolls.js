$('document').ready(function(){
    
    var str1 = '<div class = "col-md-4" style="min-height:350px;"><div class = "panel"><div class ="panel-heading bg-info text-center"><div class = "panel-title" style = "font-family:Droid Serif;"><strong>'
    var str2 = '</strong></div></div><div class = "panel-body text-justify" style="font-family:Open Sans;"><h4>' 
    var str3 = '</h4><h1></h1><button type="button" class="btn btn-info pull-right" data-toggle="modal" data-target="#pollModal" data-poll="'
    var str4 = '">View &raquo;</button><button type="button" class="btn btn-danger removePoll pull-left" id="'
    var str5 = '">Delete</button><p style="margin:25px 75px;"><i class="fa fa-bar-chart"></i><span>'
    var str6 = '</span></p></div></div></div>'
    var str7 = '<div class = "col-md-4" ></div><div class = "col-md-4 bg-info text-center" style = "padding-top: 50px;">None Found</div><div class = "col-md-4"></div>'
    
    $.ajax({    url: "/polls/user",
                type:"GET",
                dataType:'json',
                success: createElements,
                error: function(){ alert("Error Occured! cant update! Try Again.")}
            });
            
    
    $(document).on("click", ".removePoll", function(event){
        
        var id = $(event.target).attr("id")
         $.ajax({
                url: "/poll/"+id,
                type:"DELETE",
                dataType: "json",
                success: function(data, status){
                                if (data.ok == "ok" ) {
                                    window.location.href = "/"
                                    }
                                else { $("#showMsg").html("An error Occured. Try Again") }
                            },
                error: function(){ $("#showMsg").html("An error Occured. Try Again") }

            });
        event.stopPropagation();
        event.preventDefault();
    });
            
            
    function createElements(polls, status){
    
        polls = JSON.parse(polls)
        var parent = $("#userPolls")
        
        if (polls.length == 0 ){
            
            parent.append(str7)
            
        }else {
            polls.forEach( function(poll,index){
                var current = str1 + poll.name + str2 + poll.desc + str3 + poll._id + str4 + poll._id + str5 + getVotes(poll) + str6 
                parent.append(current)
            })
        }
        
    }
    
     
    function getVotes(poll){
        var count = 0
        poll.options.forEach( function (option){ count += option.count })
        return count
        
    }
    
   
    
});

