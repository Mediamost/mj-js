/* 
 *  JS for node add + node edit pages 
 */


Drupal.behaviors.mahasz_js_edit_node = function ($){


    /*
     *  ZG típus váltás 
     */
     var zgJogositasChange = function () {
        console.log('zgJogositasChange() called');
        if($('#edit-field-jogositas-2014-und').val() === 'tobbszoroz') {
            //...
        }
     };

     //bind
     $('#edit-field-jogositas-2014-und').change(function () {
        zgJogositasChange();
     });

     //kezdo megjelenés (pl edit oldalon)
     zgJogositasChange();





    //szövegek
    var kotelezo = '<span class="form-required" title="Szükséges mező.">*</span>';

    //feltétel mindnél van
    $('#edit-field-feltetelek').find('label').eq(0).append(kotelezo);

    //számlázási név és postai cím mezők letiltása
    $('#edit-field-szamla-nev-und-0-value').attr('disabled','disabled');
    $('#edit-field-szamla-helyiseg-und-0-value').attr('disabled','disabled');
    $('#edit-field-szamla-iranyitoszam-und-0-value').attr('disabled','disabled');
    $('#edit-field-szamla-utca-und-0-value').attr('disabled','disabled');
    $('#edit-field-posta-nev-und-0-value').attr('disabled','disabled');
    $('#edit-field-posta-varos-und-0-value').attr('disabled','disabled');
    $('#edit-field-posta-iranyitoszam-und-0-value').attr('disabled','disabled');
    $('#edit-field-posta-utca-und-0-value').attr('disabled','disabled');

    //Mezők engedélyezése
    $('#ena-szlamod').click(function(e){
        $('#edit-field-szamla-nev-und-0-value').removeAttr('disabled');
        $('#edit-field-szamla-helyiseg-und-0-value').removeAttr('disabled');
        $('#edit-field-szamla-iranyitoszam-und-0-value').removeAttr('disabled');
        $('#edit-field-szamla-utca-und-0-value').removeAttr('disabled');
        $('#edit-field-szamla-nev-und-0-value').focus().select();
        e.preventDefault();
        return false;
    });
   $('#ena-postamod').click(function(e){
        $('#edit-field-posta-nev-und-0-value').removeAttr('disabled');
        $('#edit-field-posta-varos-und-0-value').removeAttr('disabled');
        $('#edit-field-posta-iranyitoszam-und-0-value').removeAttr('disabled');
        $('#edit-field-posta-utca-und-0-value').removeAttr('disabled');
        $('#edit-field-posta-nev-und-0-value').focus().select();
        e.preventDefault();
        return false;
    });

    //mark errors on parents of checkboxes, radios
    $('input.error:checkbox').parent().css('color','#ff0000');
    $('input.error:radio').parent().css('color','#ff0000');


    //előnézetben űrlap rejtése
    var elonezetForm = $('.node-preview').eq(0).parents('#post-content').find('.node-form');
    var elonezetGroupDiv = elonezetForm.find(".field-group-div").hide();
    var elonezetGroupFieldset = elonezetForm.find("fieldset").hide();
    var elonezetGomb = elonezetForm.find("#edit-preview").hide();

    //kérésre megjelennek
    elonezetForm.find('.form-actions').prepend('<p class="form-hider-info">Amennyiben módosítani kívánja a ' +
        'jogosítással kapcsolatos adatokat, először <a href=# class="form-hider">kattintson ide</a>.<br />' +
        '<strong>A jogosítási kérelem leadásához kérem nyomja meg a MENTÉS gombot.</strong>');
    elonezetForm.find('.form-hider').click(function(e) {
        elonezetGroupDiv.fadeIn(200);
        elonezetGroupFieldset.fadeIn(200);
        elonezetGomb.fadeIn(200);
        $('.form-hider-info').remove();
        e.preventDefault();
        return false;
    });




    //zenegép raktár

    var raktarChkbox = $('#edit-field-raktarban-und-igen');
    if(raktarChkbox.size() > 0){  //jó helyen vagyunk, ez a zenegép-jogosítás űrlap

      var raktarFeltetelek = $('#edit-field-raktar-feltetelek'),
        raktarIdo = $('#edit-field-raktar-ido'),
            helyszin = $('#node_jogositas_zenegep_form_group_hely');
      
      //zenegep kötelező mező jelölések
      raktarIdo.find('legend').eq(0).append(kotelezo);
      raktarFeltetelek.find('label').eq(0).append(kotelezo);
        $('#edit-field-helyszin-nev').find('label').eq(0).append(kotelezo);
        $('#edit-field-iranyitoszam').find('label').eq(0).append(kotelezo);
        $('#edit-field-helyseg').find('label').eq(0).append(kotelezo);
        $('#edit-field-utca').find('label').eq(0).append(kotelezo);

      if(!raktarChkbox.is(':checked')){ //nincs raktár pipálva -> rejtések
        raktarFeltetelek.hide();
        raktarIdo.hide();
        }
        else{   //van raktár pipálva
            //raktár esetén nincs értelme helyszínnek
            helyszin.hide();
        }
      raktarChkbox.change(function(){
          if($(this).is(':checked')){
            //bejelöléskor továbbiak mutatása
          raktarFeltetelek.fadeIn(200);
          raktarIdo.fadeIn(200);

                //raktár esetén nincs értelme helyszínnek
                helyszin.fadeOut(200);

          }
          else {
            //lejelöléskor továbbiak elrejtése
          raktarFeltetelek.fadeOut(200);
          raktarIdo.fadeOut(200);

                //raktár esetén nincs értelme helyszínnek - vissza
                helyszin.fadeIn(200);
          }
        });



      //többszörözésenkénti + új esetén kötelező tracklista
      var jogdijTipus = $('#edit-field-jogositas-und'),
        ujgep = $('#edit-field-ujgep-und-uj'),
        tracklista = $('#edit-field-tobbszorozesi-lista');
      if( jogdijTipus.val() == 'tobbszoroz' && ujgep.is(':checked')){
        tracklista.find('label').eq(0).append(kotelezo);
      }
      ujgep.change(function(){
          if( !$(this).is(':checked')){ 
          tracklista.find('.form-required').remove();
          } 
          else if(jogdijTipus.val() == 'tobbszoroz'){
          tracklista.find('label').eq(0).append(kotelezo);
          }
        });
      jogdijTipus.change(function(){
          if( $(this).find('option:selected').val() != 'tobbszoroz'){ 
          tracklista.find('.form-required').remove();
          } 
          else if(ujgep.is(':checked')){
          tracklista.find('label').eq(0).append(kotelezo);
          }
        });

    }

    //alkalmankenti jogosításnál az adatszolgáltatas kötelező (HZ és DJ esetén ugyanaz a field)
     $('#edit-field-tobbszorozesi-lista-und-0-ajax-wrapper').find('label').eq(0).append(kotelezo);


////// ZENEGÉP  /////////

    //a 2014-es jogdíjtípus kötelező
     $('#edit-field-jogositas-2014').find('label').eq(0).append(kotelezo);

  //ha nem átalányról vált többszörözésenkénti Zenegépre, el kell rejteni a váltás elfogadót
  if( 
    //Eredetileg valamelyik átalány van beállítva
    Drupal.settings.mahasz_js.node_type === "zenegep" &&
    ( Drupal.settings.mahasz_js.node_fields.field_jogositas[0].value === "atalany-ev" || Drupal.settings.mahasz_js.node_fields.field_jogositas[0].value === "atalany-negyedev" )
  ) {
    //alap beállítás
    if($('#edit-field-jogositas-2014-und').val() !== "tobbszoroz") {
      $('#edit-field-atalany-valtas-feltetelei').hide(); //console.log('nem tobbszoroz, rejtve legyen alapból');
    }

    $('#edit-field-jogositas-2014-und').change(function(event){
      if($(this).val()==="tobbszoroz"){
        //feltétel mutatás
        $('#edit-field-atalany-valtas-feltetelei').fadeIn(200);
      }
      else {
        //feltétel újra elrejtés
        $('#edit-field-atalany-valtas-feltetelei:visible').fadeOut(200);
      }
    });
  }
  else {
      $('#edit-field-atalany-valtas-feltetelei').hide(); //console.log('nem átalányról jön, rejtve legyen');
  }

};