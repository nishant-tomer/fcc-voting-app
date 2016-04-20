$('document').ready(function(){
    
    var ctx = $("#myChart")
    var chartData = {
                	labels: [],
                	datasets: [{
                		data: [],
                		backgroundColor: [],
                		hoverBackgroundColor: []
                	}]
                };
                
    var defaultChartData = {
                	labels: ["Votes","No Votes"],
                	datasets: [{
                		data: [0,1],
                		backgroundColor: ["#AAAFFF","#FFFAAA"],
                		hoverBackgroundColor: ["#FAFAFA","#AFAFAF"]
                	}]
                };
                        
    
    var str1 = '<div class = "col-md-4"><div class = "panel"><div class ="panel-heading bg-info text-center"><div class = "panel-title" style = "font-family:Droid Serif;"><strong>'
    var str2 = '</strong></div></div><div class = "panel-body text-justify" style="font-family:Open Sans;"><h4>' 
    var str3 = '</h4><h1></h1><button type="button" class="btn btn-default pull-right" data-toggle="modal" data-target="#pollModal" data-poll="'
    var str4 = '">Vote &raquo;</button><p><i class="fa fa-bar-chart"></i><span> Votes '
    var str5 = '</span></p></div></div></div>'
    var str6 = '<div class="radio"><label><input type="radio" name="optionsRadios" id="'
    var str7 = '">'
    var str8 = '</label></div>'
    var strm = 'Total Votes<span class = "bg-primary" style = "border-radius:2px; display:inline-block; margin: 0 3px; padding:2px 4px;">'
    var strmend = '</span>'
    
    $.ajax({    url: "/polls",
                type:"GET",
                dataType:'json',
                success: createElements,
                error: function(){ alert("cant update!")}
            });
    
    
    $('#pollModal').on('show.bs.modal', function (event) {
        
        var button = $(event.relatedTarget) 
        var id = button.data('poll') 
        var modal = $(this)
        var votes = 0
        
        $.ajax({    url: "/poll/"+ id,
                    type:"GET",
                    dataType:'json',
                    success: populate,
                    error: function(){ alert("cant update!")}
            });
        
      
        function populate(data,status){
       
            data = JSON.parse(data)
            modal.find('#pollName').attr( "_id", data[0]._id ).html( data[0].name )
            modal.find('#desc').text(data[0].desc)
            var opts = modal.find('#options')
            opts.html("")

            
            data[0].options.forEach(function(option, index){
                chartData.datasets[0].data.push( option.count )
                chartData.datasets[0].backgroundColor.push( rand() )
                chartData.datasets[0].hoverBackgroundColor.push( rand() )
                chartData.labels.push( option.name )
                votes += option.count
                opts.append( str6 + option._id + str7 + option.name + str8 )
            })
            
            opts.children(":first").find("input").prop("checked", true);
            
            var voteshtml =strm + votes + strmend
            modal.find("#votes").html(voteshtml)
          
            if ( votes > 0 ){
                var myDoughnutChart = new Chart(ctx, {
                                                	type:'doughnut',
                                                	data: chartData
                                                	});
                
            } else {
                var myDoughnutChart = new Chart(ctx, {
                                                	type:'doughnut',
                                                	data: defaultChartData
                                                	});
         

            }
            
        }
    })
    
    
    $(document).on("click", "#sendVote", function(event){
        
        var id = $('input[type=radio]:checked').attr("id")
         $.ajax({
                url: "/option/"+id,
                type:"GET",
                dataType: "json",
                success: function(data, status){
                                if (data.ok == "ok" ) {
                                    window.location.href = "/"
                                    }
                            }
            });
        event.stopPropagation();
        event.preventDefault();
    });
    
   function rand() {
       var a = Math.floor(Math.random() * 255)
       var b = Math.floor(Math.random() * 255)
       var c = Math.floor(Math.random() * 255)
       var color = 'rgb(' + a + ',' + b + ',' + c + ')'
       alert(color)
       return color

  
    }
 
    
    function createElements(polls, status){
    
        polls = JSON.parse(polls)
        var parent = $("#polls")
        
        polls.forEach( function(poll,index){
            var current = str1 + poll.name + str2 + poll.desc + str3 + poll._id + str4 + getVotes(poll) + str5 
            parent.append(current)
        })
        
    }
    
    
    function getVotes(poll){
        var count = 0
        poll.options.forEach( function (option){ count += option.count })
        return count
        
    }
    
});

