$(document).ready(function() {
  $.ajax({
    url: '/quizzes',
    type: 'GET',
    dataType: "json",
    success: function(q) {
      var quizzesTemplate = _.template('<% _.each(quizzes, function( q ) { %><tr data-quiz="<%= q.id %>"><td><h2><%- q.title %></h2></td></tr><% }); %>');
      $("#all-quizzes").find("tbody").append(quizzesTemplate({quizzes: q}));

      $("#all-quizzes").find("tr").on('click', function() {
        var quizID = $(this).data('quiz');
        $("#all-quizzes").hide()

        $.ajax({
          url: '/quizzes/'+quizID + '/questions',
          type: "GET",
          dataType: "json",
          success: function(q) {
            console.log(q);
            var questionTemplate = _.template($("#questionTemplate").html());
            $("#questionHolder").append(questionTemplate({q: q[0]}));
          }
        });
      });
      
    }
  });

});