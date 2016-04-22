/**
 * Admin/AdminBlokController
 *
 * @description :: Server-side logic for managing admin/adminbloks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `Admin/AdminBlokController.add()`
   */
  add: function (req, res) {

    res.view('admin/blok/add', {layout: 'admin/layout'});

  },


  /**
   * `Admin/AdminBlokController.save()`
   */
  save: function (req, res) {
    return res.json({
      todo: 'save() is not implemented yet!'
    });
  },


  /**
   * `Admin/AdminBlokController.list()`
   */
  list: function (req, res) {

    res.view('admin/blok/list', {layout: 'admin/layout'});


  },


  /**
   * `Admin/AdminBlokController.edit()`
   */
  edit: function (req, res) {


    res.view('admin/blok/edit', {layout: 'admin/layout'});


  },


  /**
   * `Admin/AdminBlokController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },


  /**
   * `Admin/AdminBlokController.show()`
   */
  show: function (req, res) {
    return res.json({
      todo: 'show() is not implemented yet!'
    });
  }
};

