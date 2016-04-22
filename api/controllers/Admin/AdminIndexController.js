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


        res.view('admin/index/homepage', {layout: 'admin/layout',message: 'Login success!'});


  },
};

