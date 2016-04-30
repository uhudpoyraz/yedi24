/**
 * Created by uhudpoyraz on 01.05.2016.
 */


$(function(){
  $('#binaId').change(function(){
    var binaId = $('#binaId').val();
    var $blokId = $('#blokId');
    /* Ajax Baslasin */
    $.ajax({
      type:'GET',
      data:'binaid='+binaId,
      dataType:'json',
      url:'/ajax/bloklist/',
      success: function(data ) {
        $('#blokId').empty();
        $blokId.html('');
        $blokId.append('<option id="0">Seçiniz</option>');
        $.each(data.bloklar, function(key, val){
          $blokId.append('<option value="' + val.id + '">' + val.isim +'</option>');
        })
      }
    });
    return false;
  });

  $('#blokId').change(function(){
    var blokId = $('#blokId').val();
    var $birimId = $('#birimId');
    /* Ajax Baslasin */
    $.ajax({
      type:'GET',
      data:'blokid='+blokId,
      dataType:'json',
      url:'/ajax/birimlist/',
      success: function(data ) {
        $('#birimId').empty();
        $birimId.html('');
        $birimId.append('<option id="0">Seçiniz</option>');
        $.each(data.birimler, function(key, val){
          $birimId.append('<option value="' + val.id + '">' + val.isim +'</option>');
        })
      }
    });
    return false;
  });

});
