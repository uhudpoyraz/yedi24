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

  	var TümSikayetler = 0;
    var KayitliKullanici = 0;
    var MisafirKullanici = 0;
    Sikayetler.count().exec(function countCB(err, found) {
      if(err){
        console.log(err);
      }else{
      	console.log(found);
        TümSikayetler = found;
        Sikayetler.count({kullaniciId:-1}).exec(function countCB(err, found) {
	      if(err){
	        console.log(err);
	      }else{
	      	console.log(found);
	        MisafirKullanici = found;
	        Kullanicilar.count().exec(function countCB(err, found) {
		      if(err){
		        console.log(err);
		      }else{
		      	console.log(found);
		        KayitliKullanici = found;
		          return res.view('admin/index/homepage', {layout: 'admin/layout',message: 'Login success!', TümSikayetler:TümSikayetler, MisafirKullanici:MisafirKullanici, KayitliKullanici:KayitliKullanici});
		      }
		    });
	      }
	    });
      }
    });
  },
};

