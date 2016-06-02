/**
 * Admin/kullanicilarController
 *
 * @description :: Server-side logic for managing admin/kullanicilars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  _config: {
    actions: true,
    shortcuts: true,
    rest: true
  },



  index: function (req,res) {

  	var TumSikayetler = 0;
    var KayitliKullanici = 0;
    var MisafirKullanici = 0;
    var DosyaSayısı = 0;

    Sikayetler.count().exec(function countCB(err, found) {
      if(err){
        console.log(err);
      }else{
      	//console.log(found);
        TumSikayetler = found;
        Sikayetler.count({kullaniciId:-1}).exec(function countCB(err, found) {
	      if(err){
	        console.log(err);
	      }else{
	      	//console.log(found);
	        MisafirKullanici = found;
	        Kullanicilar.count().exec(function countCB(err, found) {
  		      if(err){
  		        console.log(err);
  		      }else{
  		      	//console.log(found);
  		        KayitliKullanici = found;
		          Eklentiler.count().exec(function countCB(err, found) {
                if(err){
                  console.log(err);
                }else{
                  //console.log(found);
                  DosyaSayısı = found;
                  return res.view('admin/index/homepage', {layout: 'admin/layout',message: 'Login success!', TumSikayetler:TumSikayetler, MisafirKullanici:MisafirKullanici, KayitliKullanici:KayitliKullanici, DosyaSayısı:DosyaSayısı});
                }
              });
  		      }
		      });
	      }
	    });
      }
    });
  },
};

