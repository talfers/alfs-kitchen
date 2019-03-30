//ADD A PART
$('#add-part').click(function(){
  $('#parts-container').append(
      "<div class='part-div'>" +
        "<label for='part'>Part</label>" +
        "<input name='parts' type='text' class='part'>" + 
        "<span class='form-del'><i class='far fa-trash-alt'></i></span>" +
      "</div>"
  );
});

$('.add-ingred').click(function(){
  $(this).before(
    "<div class='ingred-div'>" +
      "<input name='ingred' placeholder='Ingredient' class='ingred' type='text'>" +
      "<span class='form-del'><i class='far fa-trash-alt'></i></span>" +
    "</div>"
    );
});

//REMEMBER IN JQUERY, IF YOU ADD EL AFTER LOAD, YOU MUST DO DOCUMENT.ON
$(document).on('click', '.form-del', function() {
  $(this).parent().remove();
});