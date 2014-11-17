/* Többszörözési lista visszautasítás oka mezőhöz sablon szövegek beillesztése */
Drupal.behaviors.mahasz_js_sablon_szovegek = function ($){
	if( jQuery('.indoklas-sablon').length > 0 ){
	  jQuery(document).delegate('.indoklas-sablon li', 'click', function(){
	    jQuery('#edit-field-visszautasitas-indok-und-0-value').val(  jQuery(this).text()  );
	    jQuery('#edit-bundle-tobbszorozesi-lista-field-visszautasitas-indok-und-0-value').val(  jQuery(this).text()  );  //listaoldali művelethez
	  });
	}
};