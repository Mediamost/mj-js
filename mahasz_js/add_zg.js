(function ($) {

    Drupal.behaviors.mahasz_js = {



        /* Custom features, all called on special case */
        
        hideFieldUjgep: function () {
            var ujgep = $('#edit-field-ujgep'),
                jogositas = $('#edit-field-jogositas-2014-und');

            //hide ujgep if type is not atalany
            if( jogositas.val() !== 'atalany-negyedev' && jogositas.val() !== 'atalany-ev' ) {
                ujgep.hide();
            }

            jogositas.change(function(evt){
                
                jogositas = this.value;
                
                if(jogositas == 'atalany-negyedev' || jogositas == 'atalany-ev') {
                    //show ujgep
                    ujgep.slideDown(300);
                }
                
                else {
                    // hide and clear ujgep
                    ujgep.find('input').removeAttr('checked');
                    ujgep.slideUp(200);
                }
            });
        },


        clearAcceptCheckbox: function (uid, currentUser) {
            //újra kell pipálni a feltételeket
            if(
                $('.preview').length === 0 && //ha nem előnézet oldalon van
                parseInt(uid) === parseInt(currentUser)  //saját tartalmát szerkeszti
            ) {
                $('#edit-field-feltetelek-und-elfogadom').removeAttr('checked');
            }
        },




        /* General cases when any function can called */
        nodeAdd: function (nodeType) {

            this.clearAcceptCheckbox(0,0);   //new node, the author is the current user, no check required

            /* by node types */

            //ZeneGép
            if(nodeType === 'jogositas-zenegep') {
                this.nodeAddZG();
            }
        },


        nodeAddZG: function () {
            this.hideFieldUjgep();
        },


        nodeEdit: function (formIds, nid, uid, currentUser, nodeType) {

            this.clearAcceptCheckbox(uid, currentUser); //újra kell pipálni a feltételeket


            /* by node types */

            //ZeneGép
            if (formIds.indexOf("jogositas_zenegep_node_form") !== -1) {
                this.nodeEditZG(nid, uid, currentUser);
            }

        },

        nodeEditZG: function (nid,uid,currentUser) {

        },

        attach: function (context, settings) {

            var mahasz = settings.mahasz_js;

            //login page
            if($.inArray('user_login', mahasz.formIds) !== -1) {
                Drupal.behaviors.mahasz_js_login_page($);
            }

            //regform
            if(
                mahasz.args &&
                mahasz.args.length > 1 &&
                mahasz.args[0] === 'user' &&
                mahasz.args[1] !== 'login' &&
                mahasz.args[1] !== 'password' &&
                mahasz.args[1] !== 'reset'
            ) {
                Drupal.behaviors.mahasz_js_regform($);
            }

            //node add page
            if(
                mahasz.args &&
                mahasz.args.length > 2 &&
                mahasz.args[0] === 'node' && 
                mahasz.args[1] === 'add'
            ) {    
                this.nodeAdd(mahasz.args[2]);
                Drupal.behaviors.mahasz_js_edit_node($);
            }

            //node edit page
            if(
                mahasz.args &&
                mahasz.args.length > 2 &&
                mahasz.args[0] === 'node' && 
                mahasz.args[2] === 'edit'
            ) {
                //all node edit pages
                this.nodeEdit(mahasz.formIds, mahasz.nid, mahasz.uid, mahasz.currentUser);
                Drupal.behaviors.mahasz_js_edit_node($);
                
                //tobbszorozesi_lista
                if($.inArray('tobbszorozesi_lista_node_form', mahasz.formIds) !== -1) {
                    Drupal.behaviors.mahasz_js_sablon_szovegek($);
                }
                    
            }

            //after reset password
            if(
                mahasz.args &&
                mahasz.args.length > 2 &&
                mahasz.args[0] === 'user' && 
                mahasz.args[1] === 'reset'
            ) {
                Drupal.behaviors.mahasz_js_password_reset($);
            }

            //adatszolgaltatasok
            if(
                mahasz.args &&
                mahasz.args.length > 0 &&
                mahasz.args[0] === 'adatszolgaltatasok'
            ) {
                Drupal.behaviors.mahasz_js_sablon_szovegek($);
            }

            //levélküldés
            if(
                mahasz.args &&
                mahasz.args.length > 0 &&
                mahasz.args[0] === 'levelkuldes'
            ) {
                Drupal.behaviors.mahasz_js_levelkuldes($);
            }



     
        }
    };
}(jQuery));
