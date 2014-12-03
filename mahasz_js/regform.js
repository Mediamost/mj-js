/* regform */
Drupal.behaviors.mahasz_js_regform = function ($) {



    /*
     *      Ha DJ-t bepipálja, reg. személy legyen magán és letiltva
     */
    var setMagan = function (){
        $djChbox = $djChbox || $('#edit-field-jogi-csoport-und-dj');
        $szemely = $szemely || $('#edit-field-regisztralo-szemelye-und');
        if($djChbox.length>0 && $djChbox.is(':checked')){
            $szemely.val('magan').attr('disabled','disabled').trigger('change');
        }
        else if($szemely.length>0){
            $szemely.removeAttr('disabled');
        }
    };


    /*
     *      Hide and reset a field
     */
     var hideAndReset = function (fields) {
        if (typeof fields !== 'object') {
            fields = Array(fields);
        }
        $.each(fields, function(index, $container) {
            $container.find('input').val('').closest(':checked').attr('checked', false);   //checkbox & radio needs attr change (note: not prop, this is jQ 1.4)
            $container.find('select').val('');
            $container.addClass('hidden');
        });
     };


    /*
     *      Show a field bulk
     */
     var showFields = function (fields) {
        if (typeof fields !== 'object') {
            fields = Array(fields);
        }
        $.each(fields, function(index, $container) {
            $container.removeClass('hidden');
        });
     };

  

    /*
     *      Adott HTML elem mögé kerüljön csillag (kötelező)
     */
    var addStar = function(elm, id) {
        var kotelezo = '<span class="form-required" '+(id ? 'id="'+id+'"' : '')+' title="Szükséges mező.">*</span>';
        elm.append(kotelezo);
    };


    /*
     *      Kötelező mezők
     */
    
    //mark some fields as required (as they really are, but not by form api)
    var $cegnev = $cegnev || $('#edit-field-cegnev');
    var $cegJogosult = $cegJogosult || $('#edit-field-ceg-jogosult');
    var $adoszam = $adoszam || $('#edit-field-adoszam');
    var $teljesNev = $teljesNev || $('#edit-field-teljes-nev');
    var $anyjaNeve = $anyjaNeve || $('#edit-field-anyja-neve');
    var $szuletesiIdo = $szuletesiIdo || $('#edit-field-szuletesi-ido');
    
    addStar($cegnev.find('label'));
    addStar($cegJogosult.find('label'));
    addStar($adoszam.find('label'));
    addStar($teljesNev.find('label'));
    addStar($anyjaNeve.find('label'));
    addStar($szuletesiIdo.find('.fieldset-legend'));


    
    /* 
     *      Visibility of errors, labels 
     */

    //mark errors on parents of checkboxes, radios
    $('input.error:checkbox').parent().css('color','#ff0000');
    $('input.error:radio').parent().css('color','#ff0000');


    //hide unneeded labels
    $('#edit-field-megegyezik label').eq(0).addClass('hidden');
    $('#edit-field-kapcs-megegyezik label').eq(0).addClass('hidden');
    var $djszovGroup = $djszovGroup || $('#user_user_form_group_djszovetseg');
    $djszovGroup.find('label').eq(0).addClass('hidden');


    //disable reg-szemely (and change, and trigger its change) if DJ is checked already
    setMagan();
    //and when checked
    var $djChbox = $djChbox || $('#edit-field-jogi-csoport-und-dj');
    $djChbox.change(function(){setMagan();});

    //create copy of reg-szemely to store its data even it is disabled (not send in form data)
    var $szemely = $szemely || $('#edit-field-regisztralo-szemelye-und');
    if($szemely.length>0) {
        szemelyCloneId = $szemely.attr('id')+'-copy';
        $szemely.parent().append('<input type="hidden" id="'+szemelyCloneId+'" />');
        var mytgt = $('#'+szemelyCloneId);
        mytgt.attr('name',$szemely.attr('name')).val($szemely.val());

        //onchange, change the clone too
        $szemely.change(function(){
            mytgt.val($szemely.val());
        });
    }

    //ha magan, rejtse a céges mezőket, mutassa a magán mezőket
    var $muvesznev = $muvesznev || $('#edit-field-muvesznev');
    var $bankszamla = $bankszamla || $('#edit-field-bankszamla');
    var $penzKapcsNev = $penzKapcsNev || $('#edit-field-penzugyi-kapcsolat-neve');
    var $penzKapcsTel = $penzKapcsTel || $('#edit-field-penzugyi-kapcsolat-tel');
    var $penzKapcsEmail = $penzKapcsEmail || $('#edit-field-penzugyi-kapcsolat-email');

    if( $szemely.val() === 'magan' || Drupal.settings.mahasz_js.user_fields.field_regisztralo_szemelye === 'magan'){
        hideAndReset(Array($cegnev, $cegJogosult, $adoszam, $penzKapcsNev, $penzKapcsTel, $penzKapcsEmail));
        showFields(Array($teljesNev, $anyjaNeve, $szuletesiIdo, $muvesznev));
    }
    else{
        hideAndReset(Array($teljesNev, $anyjaNeve, $szuletesiIdo, $muvesznev));
        showFields(Array($cegnev, $cegJogosult, $adoszam, $penzKapcsNev, $penzKapcsTel, $penzKapcsEmail));

        addStar($bankszamla.find('label'), 'szlareq');

    }
    //copy for now :(
    $szemely.change(function(){
        if($szemely.val() === 'magan'){
            hideAndReset(Array($cegnev, $cegJogosult, $adoszam, $penzKapcsNev, $penzKapcsTel, $penzKapcsEmail));
            showFields(Array($teljesNev, $anyjaNeve, $szuletesiIdo, $muvesznev));

            $('#szlareq').remove();
        }
        else{
            hideAndReset(Array($teljesNev, $anyjaNeve, $szuletesiIdo, $muvesznev));
            showFields(Array($cegnev, $cegJogosult, $adoszam, $penzKapcsNev, $penzKapcsTel, $penzKapcsEmail));

            /* hideAndReset megoldotta már
            //nullázni kell a részleges dátumot, mert gondot okoz, ha közben cégre vált
            if( //részleges?
                $('#edit-field-szuletesi-ido-und-0-value-year').val().length===0 || 
                $('#edit-field-szuletesi-ido-und-0-value-month').val().length===0 || 
                $('#edit-field-szuletesi-ido-und-0-value-day').val().length===0){
                
                $('#edit-field-szuletesi-ido-und-0-value-year').val('');
                $('#edit-field-szuletesi-ido-und-0-value-month').val('');
                $('#edit-field-szuletesi-ido-und-0-value-day').val('');
            } */
            addStar($bankszamla.find('label'), 'szlareq');
        } 
    });


    /*
     *      Név előszedése. Ha magán, akkor teljes név, egyébként céges.
     */
     var ultimateName = function () {
        $szemely = $szemely || $('#edit-field-regisztralo-szemelye-und');
        $teljesNevInput = $teljesNevInput || $('#edit-field-teljes-nev-und-0-value');
        $cegnevInput = $cegnevInput || $('#edit-field-cegnev-und-0-value');

        if($szemely.length>0) {
            return ($szemely.val() === 'magan') ? $teljesNevInput.val() : $cegnevInput.val();
        }
        else {
            return (Drupal.settings.mahasz_js.user_fields.field_regisztralo_szemelye === 'magan') ? Drupal.settings.mahasz_js.user_fields.field_teljes_nev.value : Drupal.settings.mahasz_js.user_fields.field_cegnev.value;
        }
     };

    //Kapcsolattartó megegyezik? Adatmásolás.
    var $kapcsChbox = $kapcsChbox || $('#edit-field-kapcs-megegyezik-und-megegyezik-a-fentiekkel');
    $kapcsChbox.change(function(){
        if($(this).is(':checked')){
            $('#edit-field-kapcsolattarto-neve-und-0-value').val(ultimateName());
            $('#edit-field-kapcsolattart-telefon-und-0-value').val($('#edit-field-telefon-und-0-value').val());
            $('#edit-field-kapcsolattarto-email-und-0-value').val($('#edit-field-email-und-0-email').val());
            $('#edit-mail').val($('#edit-field-email-und-0-email').val());
        }
    });

    //change any of theese fields unchecks the copy checkbox
    var $teljesNevInput = $teljesNevInput || $('#edit-field-teljes-nev-und-0-value');
    $teljesNevInput.change(function(){
        $kapcsChbox.attr('checked', false);
    });

    var $cegnevInput = $cegnevInput || $('#edit-field-cegnev-und-0-value');
    $cegnevInput.change(function(){$kapcsChbox.attr('checked', false);});
    $('#edit-field-telefon-und-0-value').change(function(){$kapcsChbox.attr('checked', false);});
    $('#edit-field-email-und-0-email').change(function(){$kapcsChbox.attr('checked', false);});
    $('#edit-field-kapcsolattarto-neve-und-0-value').change(function(){$kapcsChbox.attr('checked', false);});
    $('#edit-field-kapcsolattart-telefon-und-0-value').change(function(){$kapcsChbox.attr('checked', false);});
    $('#edit-field-kapcsolattarto-email-und-0-value').change(function(){$kapcsChbox.attr('checked', false);});

    //Levelezési cím megegyezik? Adatmásolás.
    var $egyezikFentiCim = $egyezikFentiCim || $('#edit-field-megegyezik-und-megegyezik-a-fenti-cmmel');
    $egyezikFentiCim.change(function(){
        if($(this).is(':checked')){
            //csak az üres levelezési nevet töltjük fel névvel (miért is?)
            //if( 1===1 || $('#edit-field-posta-nev-und-0-value').val() === '' ){     //utólag ez egy értelmetlen feltétel
            $('#edit-field-posta-nev-und-0-value').val( ultimateName );
            //}
            $('#edit-field-posta-orszag-und').val($('#edit-field-orszag-und').val());
            $('#edit-field-posta-iranyitoszam-und-0-value').val($('#edit-field-iranyitoszam-und-0-value').val());
            $('#edit-field-posta-varos-und-0-value').val($('#edit-field-varos-und-0-value').val());
            $('#edit-field-posta-utca-und-0-value').val($('#edit-field-utca-und-0-value').val());
        }
    });

    //change any of theese fields unchecks the copy checkbox
    $('#edit-field-orszag-und').change(function(){$egyezikFentiCim.attr('checked', false);});
    $('#edit-field-iranyitoszam-und-0-value').change(function(){$egyezikFentiCim.attr('checked', false);});
    $('#edit-field-varos-und-0-value').change(function(){$egyezikFentiCim.attr('checked', false);});
    $('#edit-field-utca-und-0-value').change(function(){$egyezikFentiCim.attr('checked', false);});
    $('#edit-field-posta-orszag-und').change(function(){$egyezikFentiCim.attr('checked', false);});
    $('#edit-field-posta-iranyitoszam-und-0-value').change(function(){$egyezikFentiCim.attr('checked', false);});
    $('#edit-field-posta-varos-und-0-value').change(function(){$egyezikFentiCim.attr('checked', false);});
    $('#edit-field-posta-utca-und-0-value').change(function(){$egyezikFentiCim.attr('checked', false);});


    //Hide duplicate error messages
    //these are set in php field_validations (ex.: <span class="error-msg-field-anyja-neve">„[field-name]” mezőt ki kell tölteni.</span>)
    regErr = $('.messages.error');
    if(regErr.length > 0){
        $teljesNev.filter('hidden').length>0 && $('.error-msg-field-teljes-nev').parent().hide();
        $cegnev.filter('hidden').length>0 && $('.error-msg-field-cegnev').parent().hide();
        $cegJogosult.filter('hidden').length>0 && $('.error-msg-field-ceg-jogosult').parent().hide();
        $anyjaNeve.filter('hidden').length>0 && $('.error-msg-field-anyja-neve').parent().hide();
        $('#edit-field-bankszamla.hidden').length>0 && $('.error-msg-field-bankszamla').parent().hide();
        $adoszam.filter('.hidden').length>0 && $('.error-msg-field-adoszam').parent().hide();
        $szuletesiIdo.filter('.hidden').length>0 && $('.error-msg-field-szuletesi-ido').parent().hide();
        $('#edit-field-bankszamla.hidden').length>0 && $('.error-msg-field-bankszamla').parent().hide();
    }

    
    //Lekérdezés a DJ szövetségtől
    
    //Ha nincs DJ-nek jelölve, rejtett az egész csoport
    if (!$djChbox.is(':checked')) {
        $djszovGroup.addClass('hidden');
    }
    $djChbox.change(function(){
        if($(this).is(':checked')){
            $djszovGroup.removeClass('hidden');
        }
        else{
            $djszovGroup.addClass('hidden');
        }
    });

    //meglévő checkbox változást figyelni, a bejelölt érdekes csak
    /* kikerült az űrlapról a DJ szövetség tagság mező (helyette jogosításonként pipálható)
    var $djszovInfo = $djszovInfo || $('<p>').addClass('djszov-info');
    $djszovGroup.find('label').eq(0).parent().prepend($djszovInfo);
    var $djszovChbox = $djszovChbox || $('#edit-field-dj-szovetseg').find('.form-checkbox');
    $djszovChbox.change(function(){
        if($(this).is(':checked')){
            $djszovChbox.attr('checked', false);
            //nincs email? kérni, pipa ki.
            var $editMail = $editMai || $('#edit-mail');
            if( $editMail.val().indexOf('@') < 1 ){
                $djszovChbox.attr('checked', false);
                $djszovInfo.css('color','red').html('Kérjük adja meg előbb az e-mail címét!');
                $editMail.addClass('error');
            }
            else{
                $editMail.removeClass('error');
                //karika animáció be
                $djszovInfo.css('color','inherit').html('Tagság lekérdezése...');
                //lekérdezés indul
                $.getJSON("/misc/djsz.php?email=" + $editMail.val(), function(json) {
                    //eredményt kiírni karika helyére, ... ?
                    if(json.tagsag === 'IGEN'){
                        //lejárt tagság nem tagság
                        //most = new Date();
                        //tagsag = new Date(json.ervenyes);
                        //if(most - tagsag > 0){  //lejárt
                        //    $djszovInfo.css('color','orange').html('Tagsága lejárt (' + json.ervenyes +')');
                        //}
                        //else...
                        $djszovChbox.attr('checked', 'checked');
                        $djszovInfo.css({color:'green', fontWeight:'bold'}).html('Tagság rendben.');
                    }
                    else if(json.tagsag === 'NEM'){
                        $djszovInfo.css('color','red').html('Érvényes tagságodat a rendszer nem tudta azonosítani. Kérjük, vedd fel a kapcsolatot a DJ Szövetséggel!');
                    }
                    else if(json.error){
                        $djszovInfo.css('color','red').html('HIBA. ' + json.error);
                    }
                    else{
                        $djszovInfo.css('color','red').html('A lekérdezés sikertelen. Kérjük próbálja meg később!');
                    }
                });
            }
        }
    });
    */



    /* 
     *   ZG tracklista csak többszörözési esetén 
     */
     var zgJogositasChange = function () {
        console.log('zgJogositasChange() called');
        if($('#edit-field-jogositas-2014-und').val() === 'tobbszoroz') {
            //...
        }
     }
     $('#edit-field-jogositas-2014-und').change(function () {
        zgJogositasChange();
     });

     //kezdo megjelenés (pl edit oldalon)
     zgJogositasChange();


};
