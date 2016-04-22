/**
 * BinaController
 *
 * @description :: Server-side logic for managing binas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `BinaController.add()`
   */
  add: function (req, res) {


    res.view('admin/bina/add', {layout: 'admin/layout',message: 'Login success!'});

  },


  /**
   * `BinaController.save()`
   */
  save: function (req, res) {
    return res.json({
      todo: 'save() is not implemented yet!'
    });
  },


  /**
   * `BinaController.list()`
   */
  list: function (req, res) {

    res.view('admin/bina/list',{layout:'admin/layout'});

  },


  /**
   * `BinaController.edit()`
   */
  edit: function (req, res) {

    res.view('admin/bina/edit',{layout:'admin/layout'});

  },


  /**
   * `BinaController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },


  /**
   * `BinaController.show()`
   */
  show: function (req, res) {
    return res.json({
      todo: 'show() is not implemented yet!'
    });
  }
};

