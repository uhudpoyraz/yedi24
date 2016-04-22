/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/



   '/': {
    view: 'index'
  },

  '/admin': {
    view: 'admin/index/admin',
    locals: {
      layout: 'adminlayout'
    }
  },

  'get /admin':'Admin/AdminIndexController.index',

  /*Bina*/
  'get /admin/bina/add':'Admin/AdminBinaController.add',
  'post /admin/bina/save':'Admin/AdminBinaController.save',
  'get /admin/bina':'Admin/AdminBinaController.list',
  'get /admin/bina/edit/:id':'Admin/AdminBinaController.edit',
  'post /admin/bina/update':'Admin/AdminBinaController.update',

  /*Blok*/
  'get /admin/blok/add':'Admin/AdminBlokController.add',
  'post /admin/blok/save':'Admin/AdminBlokController.save',
  'get /admin/blok':'Admin/AdminBlokController.list',
  'get /admin/blok/edit/:id':'Admin/AdminBlokController.edit',
  'post /admin/blok/update':'Admin/AdminBlokController.update',

  /*Birim*/
  'get /admin/birim/add':'Admin/AdminBirimController.add',
  'post /admin/birim/save':'Admin/AdminBirimController.save',
  'get /admin/birim':'Admin/AdminBirimController.list',
  'get /admin/birim/edit/:id':'Admin/AdminBirimController.edit',
  'post /admin/birim/update':'Admin/AdminBirimController.update',

  /*IletisimTip*/
  'get /admin/iletisimtip/add':'Admin/AdminIletisimTipController.add',
  'post /admin/iletisimtip/save':'Admin/AdminIletisimTipController.save',
  'get /admin/iletisimtip':'Admin/AdminIletisimTipController.list',
  'get /admin/iletisimtip/edit/:id':'Admin/AdminIletisimTipController.edit',
  'post /admin/iletisimtip/update':'Admin/AdminIletisimTipController.update',

  /*SiteAyar*/
  'get /admin/ayar/add':'Admin/AdminSiteAyarController.add',
  'post /admin/ayar/save':'Admin/AdminSiteAyarController.save',
  'get /admin/ayar':'Admin/AdminSiteAyarController.list',
  'get /admin/ayar/edit/:id':'Admin/AdminSiteAyarController.edit',
  'post /admin/ayar/update':'Admin/AdminSiteAyarController.update',

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
