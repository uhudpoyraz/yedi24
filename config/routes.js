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
    view: 'admin/index/homepage',
    locals: {
      layout: 'admin/layout'
    }
  },

  'get /admin':'Admin/AdminIndexController.index',

  /*Bina*/
  'get /admin/bina/add':'Admin/AdminBinaController.add',
  'post /admin/bina/save':'Admin/AdminBinaController.save',
  'get /admin/bina':'Admin/AdminBinaController.list',
  'get /admin/bina/edit/:id':'Admin/AdminBinaController.edit',
  'post /admin/bina/update':'Admin/AdminBinaController.update',
  'get /admin/bina/delete/:id':'Admin/AdminBinaController.delete',


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
  'get /admin/iletisimtipi/add':'Admin/AdminIletisimTipiController.add',
  'post /admin/iletisimtipi/save':'Admin/AdminIletisimTipiController.save',
  'get /admin/iletisimtipi':'Admin/AdminIletisimTipiController.list',
  'get /admin/iletisimtipi/edit/:id':'Admin/AdminIletisimTipiController.edit',
  'post /admin/iletisimtipi/update':'Admin/AdminIletisimTipiController.update',
  'get /admin/iletisimtipi/delete/:id':'Admin/AdminIletisimTipiController.delete',

  /*SiteAyar*/
  'get /admin/ayar/add':'Admin/AdminSiteAyarController.add',
  'post /admin/ayar/save':'Admin/AdminSiteAyarController.save',
  'get /admin/ayar':'Admin/AdminSiteAyarController.list',
  'get /admin/ayar/edit/:id':'Admin/AdminSiteAyarController.edit',
  'post /admin/ayar/update':'Admin/AdminSiteAyarController.update',
  'get /admin/ayar/delete/:id':'Admin/AdminSiteAyarController.delete',

  /*SikayetDurumTipi*/
  'get /admin/sikayetdurumtipi/add':'Admin/AdminSikayetDurumTipiController.add',
  'post /admin/sikayetdurumtipi/save':'Admin/AdminSikayetDurumTipiController.save',
  'get /admin/sikayetdurumtipi':'Admin/AdminSikayetDurumTipiController.list',
  'get /admin/sikayetdurumtipi/edit/:id':'Admin/AdminSikayetDurumTipiController.edit',
  'post /admin/sikayetdurumtipi/update':'Admin/AdminSikayetDurumTipiController.update',
  'get /admin/sikayetdurumtipi/delete/:id':'Admin/AdminSikayetDurumTipiController.delete',

<<<<<<< HEAD
  /*Yetkilendirme*/
  'get /admin/yetkitipi/add':'Admin/AdminYetkiTipleriController.add',
  'post /admin/yetkitipi/save':'Admin/AdminYetkiTipleriController.save',
  'get /admin/yetkitipi':'Admin/AdminYetkiTipleriController.list',
  'get /admin/yetkitipi/edit/:id':'Admin/AdminYetkiTipleriController.edit',
  'post /admin/yetkitipi/update':'Admin/AdminYetkiTipleriController.update',
  'get /admin/yetkitipi/delete/:id':'Admin/AdminYetkiTipleriController.delete'

=======
  /*Karaliste*/
  'get /admin/karaliste/add':'Admin/AdminKaralisteController.add',
  'post /admin/karaliste/save':'Admin/AdminKaralisteController.save',
  'get /admin/karaliste':'Admin/AdminKaralisteController.list',
  'get /admin/karaliste/edit/:id':'Admin/AdminKaralisteController.edit',
  'post /admin/karaliste/update':'Admin/AdminKaralisteController.update',
  'get /admin/karaliste/delete/:id':'Admin/AdminKaralisteController.delete',
>>>>>>> d1618383106004a417cd5ed6a62aec1e82b35e15

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
