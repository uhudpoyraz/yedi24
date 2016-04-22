/**
 * Admin/AdminIletisimTipController
 *
 * @description :: Server-side logic for managing admin/adminiletisimtips
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `Admin/AdminIletisimTipController.add()`
   */
  add: function (req, res) {

    res.view('admin/iletisimtip/add', {layout: 'admin/layout'});


  },


  /**
   * `Admin/AdminIletisimTipController.save()`
   */
  save: function (req, res) {
    return res.json({
      todo: 'save() is not implemented yet!'
    });
  },


  /**
   * `Admin/AdminIletisimTipController.list()`
   */
  list: function (req, res) {

    res.view('admin/iletisimtip/list', {layout: 'admin/layout'});


  },


  /**
   * `Admin/AdminIletisimTipController.edit()`
   */
  edit: function (req, res) {

    res.view('admin/iletisimtip/edit', {layout: 'admin/layout'});


  },


  /**
   * `Admin/AdminIletisimTipController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },


  /**
   * `Admin/AdminIletisimTipController.show()`
   */
  show: function (req, res) {
    return res.json({
      todo: 'show() is not implemented yet!'
    });
  }
};

