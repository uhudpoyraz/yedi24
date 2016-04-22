/**
 * Admin/birimController
 *
 * @description :: Server-side logic for managing admin/birims
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `Admin/birimController.add()`
   */
  add: function (req, res) {


    res.view('admin/birim/add', {layout: 'admin/layout'});

  },


  /**
   * `Admin/birimController.save()`
   */
  save: function (req, res) {
    return res.json({
      todo: 'save() is not implemented yet!'
    });
  },


  /**
   * `Admin/birimController.list()`
   */
  list: function (req, res) {

    res.view('admin/birim/list',{layout:'admin/layout'});

  },


  /**
   * `Admin/birimController.edit()`
   */
  edit: function (req, res) {

    res.view('admin/birim/edit',{layout:'admin/layout'});

  },

  /**
   * `Admin/birimController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },


  /**
   * `Admin/birimController.show()`
   */
  show: function (req, res) {
    return res.json({
      todo: 'show() is not implemented yet!'
    });
  }
};

