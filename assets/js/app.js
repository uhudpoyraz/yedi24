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
        $blokId.append('<option value="0">Seçiniz</option>');
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
        $birimId.append('<option value="0">Seçiniz</option>');
        $.each(data.birimler, function(key, val){
          $birimId.append('<option value="' + val.id + '">' + val.isim +'</option>');
        })
      }
    });
    return false;
  });

  $('#confirmsignup').click(function(){

    var name= $('#registerName').val();
    var surname=$('#registerSurname').val();
    var email=$('#registerEmail').val();
    var password = $('#registerePassword').val();
    var reEnterPassword = $('#registereReEnterPassword').val();
    /* Ajax Baslasin */

    if(password!=reEnterPassword){

      alert("Şifreler Uyuşmamaktadır.");

      return false;
    }

    $.ajax({
      type:'POST',
      data:'name='+name+'&surname='+surname+'&email='+email+'&password='+password,
      dataType:'json',
      url:'/ajax/user/register/',
      success: function(data ) {

        if(data.succes==true){

          alert(data.message);
        }else {

          alert(data.message);
        }
      }
    });
    return false;
  });


  $('#signin').click(function(){


    var email=$('#signinEmail').val();
    var password = $('#passwordinput').val();

    $.ajax({
      type:'POST',
      data:'email='+email+'&password='+password,
      dataType:'json',
      url:'/ajax/dologin/',
      success: function(data ) {

        if(data.success==true){


          location.reload();
        }else {

          alert(data.message);

        }
      }
    });
    return false;
  });

 //Şikayet Ekleme
  $('#complainBinaId').change(function(){
    var binaId = $('#complainBinaId').val();
    var $blokId = $('#complainBlokId');
    /* Ajax Baslasin */
    $.ajax({
      type:'GET',
      data:'binaid='+binaId,
      dataType:'json',
      url:'/ajax/bloklist/',
      success: function(data ) {
        $('#complainBlokId').empty();
        $blokId.html('');
        $blokId.append('<option id="0">Seçiniz</option>');
        $.each(data.bloklar, function(key, val){
          $blokId.append('<option value="' + val.id + '">' + val.isim +'</option>');
        })
      }
    });
    return false;
  });

  $('#complainBlokId').change(function(){
    var blokId = $('#complainBlokId').val();
    var $birimId = $('#complainBirimId');
    /* Ajax Baslasin */
    $.ajax({
      type:'GET',
      data:'blokid='+blokId,
      dataType:'json',
      url:'/ajax/birimlist/',
      success: function(data ) {
        $('#complainBirimId').empty();
        $birimId.html('');
        $birimId.append('<option id="0">Seçiniz</option>');
        $.each(data.birimler, function(key, val){
          $birimId.append('<option value="' + val.id + '">' + val.isim +'</option>');
        })
      }
    });
    return false;
  });



  $('#complainSave').click(function(){

  /*  
    var $birimId = $('#complainBirimId').val();
    var $compainContent = $('#compainContent').val();

    $.ajax({
      type:'POST',
      data:'birimId='+$birimId+'&complainContent='+$compainContent,
      dataType:'json',
      url:'/ajax/sikayet/register/',
      success: function(data ) {

        if(data.success==true){


          location.reload();
        }else {

          alert(data.message);

        }
      }
    });
    return false;*/
    var formData = new FormData($('#sikayetEklemeFormu')[0]);
  
          $.ajax({
          url: '/ajax/sikayet/register/',
          type: 'POST',
          data: formData,
          async: false,
          cache: false,
          contentType: false,
          processData: false,
          success: function (returndata)
          {
            console.log(returndata);
            location.reload();
          }
          });
  });
});
