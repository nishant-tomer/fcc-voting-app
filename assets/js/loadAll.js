$('document').ready(function(){
    
    var str1 = '<div class = "col-md-4" style="min-height:300px;"><div class = "panel"><div class ="panel-heading bg-info text-center"><div class = "panel-title" style = "font-family:Droid Serif;"><strong>'
    var str2 = '</strong></div></div><div class = "panel-body text-justify" style="font-family:Open Sans;"><h4>' 
    var str3 = '</h4><h1></h1><button type="button" class="btn btn-default pull-right" data-toggle="modal" data-target="#pollModal" data-poll="'
    var str4 = '">Vote &raquo;</button><p><i class="fa fa-bar-chart"></i><span> Votes '
    var str5 = '</span></p></div></div></div>'
    var str6 = '<div class = "col-md-4"></div><div class = "col-md-4 bg-info text-center" style = "padding-top: 50px;">None Found</div><div class = "col-md-4"></div>'

    
    $.ajax({    url: "/polls",
                type:"GET",
                dataType:'json',
                success: createElements,
                error: function(){ alert("Error Occured! cant update! Try Again.")}
            });
            
            
    function createElements(polls, status){
    
        polls = JSON.parse(polls)
        var parent = $("#polls")

        if (polls.length == 0){
            parent.append(str6)
        
        } else{
            polls.forEach( function(poll,index){
                var current = str1 + poll.name + str2 + poll.desc + str3 + poll._id + str4 + getVotes(poll) + str5 
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

