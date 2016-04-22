/**
 * Admin/AdminSiteAyarController
 *
 * @description :: Server-side logic for managing admin/adminsiteayars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `Admin/AdminSiteAyarController.add()`
   */
  add: function (req, res) {

    res.view('admin/ayar/add', {layout: 'admin/layout'});


  },


  /**
   * `Admin/AdminSiteAyarController.save()`
   */
  save: function (req, res) {
    return res.json({
      todo: 'save() is not implemented yet!'
    });
  },


  /**
   * `Admin/AdminSiteAyarController.list()`
   */
  list: function (req, res) {

    res.view('admin/ayar/list', {layout: 'admin/layout'});


  },


  /**
   * `Admin/AdminSiteAyarController.edit()`
   */
  edit: function (req, res) {

    res.view('admin/ayar/edit', {layout: 'admin/layout'});


  },


  /**
   * `Admin/AdminSiteAyarController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },


  /**
   * `Admin/AdminSiteAyarController.show()`
   */
  show: function (req, res) {
    return res.json({
      todo: 'show() is not implemented yet!'
    });
  }
};

