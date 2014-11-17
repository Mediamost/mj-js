/* regform */
Drupal.behaviors.mahasz_js_regform = function ($){

    var set_magan = function (){
        var szemely = jQuery('#edit-field-regisztralo-szemelye-und');
        if(jQuery('#edit-field-jogi-csoport-und-dj').is(':checked')){
            szemely.val('magan').attr('disabled','disabled').trigger('change');
        }
        else{
            szemely.removeAttr('disabled');
        }
    }

    //cached vars
    djChbox = $('#edit-field-jogi-csoport-und-dj');
    djszovGroup = $('#user_user_form_group_djszovetseg');


    //mark errors on parents of checkboxes, radios
    $('input.error:checkbox').parent().css('color','#ff0000');
    $('input.error:radio').parent().css('color','#ff0000');

    //mark some fields as required (as they really are, but not by form api)
    $('#edit-field-cegnev').find('label').append('<span class="form-required" title="Szükséges mező.">*</span>');
    $('#edit-field-ceg-jogosult').find('label').append('<span class="form-required" title="Szükséges mező.">*</span>');
    $('#edit-field-adoszam').find('label').append('<span class="form-required" title="Szükséges mező.">*</span>');
    $('#edit-field-teljes-nev').find('label').append('<span class="form-required" title="Szükséges mező.">*</span>');
    $('#edit-field-anyja-neve').find('label').append('<span class="form-required" title="Szükséges mező.">*</span>');
//    $('#edit-field-szuletesi-ido').find('label').append('<span class="form-required" title="Szükséges mező.">*</span>');
    $('#edit-field-szuletesi-ido').find('.fieldset-legend').append('<span class="form-required" title="Szükséges mező.">*</span>');

    //hide unneeded labels
    $('#edit-field-megegyezik label').eq(0).addClass('hidden');
    $('#edit-field-kapcs-megegyezik label').eq(0).addClass('hidden');
    $('#user_user_form_group_djszovetseg label').eq(0).addClass('hidden');

    //disable reg-szemely (and change, and trigger its change) if DJ is checked already
    set_magan();
    //and when checked
    djChbox.change(function(){set_magan();});

    //create copy of reg-szemely to store its data even it is disabled (not send in form data)
    var mysrc = $('#edit-field-regisztralo-szemelye-und');
    if(mysrc.length>0){
        mysrc.parent().append('<input type="hidden" id="'+mysrc.attr('id')+'-copy'+'" \>');
        var mytgt = $('#'+mysrc.attr('id')+'-copy');
        mytgt.attr('name',mysrc.attr('name')).val(mysrc.val());

        //onchange, change the clone too
        mysrc.change(function(){
            mytgt.val(mysrc.val());
        });
    }
    //ha magan, rejtse a céges mezőket, mutassa a magán mezőket
    if( $('#edit-field-regisztralo-szemelye-und').val() === 'magan' ){
        $('#edit-field-cegnev').addClass('hidden');
        $('#edit-field-ceg-jogosult').addClass('hidden');
        $('#edit-field-adoszam').addClass('hidden');
//        $('#edit-field-bankszamla').addClass('hidden');
        $('#edit-field-penzugyi-kapcsolat-neve').addClass('hidden');
        $('#edit-field-penzugyi-kapcsolat-tel').addClass('hidden');
        $('#edit-field-penzugyi-kapcsolat-email').addClass('hidden');
        $('#edit-field-teljes-nev').removeClass('hidden');
        $('#edit-field-anyja-neve').removeClass('hidden');
        $('#edit-field-szuletesi-ido').removeClass('hidden');
        $('#edit-field-muvesznev').removeClass('hidden');
    }
    else{
        $('#edit-field-cegnev').removeClass('hidden');
        $('#edit-field-ceg-jogosult').removeClass('hidden');
        $('#edit-field-adoszam').removeClass('hidden');
//        $('#edit-field-bankszamla').removeClass('hidden');
        $('#edit-field-penzugyi-kapcsolat-neve').removeClass('hidden');
        $('#edit-field-penzugyi-kapcsolat-tel').removeClass('hidden');
        $('#edit-field-penzugyi-kapcsolat-email').removeClass('hidden');
        $('#edit-field-teljes-nev').addClass('hidden');
        $('#edit-field-anyja-neve').addClass('hidden');
        $('#edit-field-szuletesi-ido').addClass('hidden');
        $('#edit-field-muvesznev').addClass('hidden');
        $('#edit-field-bankszamla').find('label').append('<span class="form-required" id="szlareq" title="Szükséges mező.">*</span>');

    }
    //copy for now :(
    $('#edit-field-regisztralo-szemelye-und').change(function(){
        if($('#edit-field-regisztralo-szemelye-und').val() === 'magan'){
            $('#edit-field-cegnev').addClass('hidden');
            $('#edit-field-ceg-jogosult').addClass('hidden');
            $('#edit-field-adoszam').addClass('hidden');
//            $('#edit-field-bankszamla').addClass('hidden');
            $('#edit-field-penzugyi-kapcsolat-neve').addClass('hidden');
            $('#edit-field-penzugyi-kapcsolat-tel').addClass('hidden');
            $('#edit-field-penzugyi-kapcsolat-email').addClass('hidden');
            $('#edit-field-teljes-nev').removeClass('hidden');
            $('#edit-field-anyja-neve').removeClass('hidden');
            $('#edit-field-szuletesi-ido').removeClass('hidden');
            $('#edit-field-muvesznev').removeClass('hidden');
            $('#szlareq').remove();
        }
        else{
            $('#edit-field-cegnev').removeClass('hidden');
            $('#edit-field-ceg-jogosult').removeClass('hidden');
            $('#edit-field-adoszam').removeClass('hidden');
//            $('#edit-field-bankszamla').removeClass('hidden');
            $('#edit-field-penzugyi-kapcsolat-neve').removeClass('hidden');
            $('#edit-field-penzugyi-kapcsolat-tel').removeClass('hidden');
            $('#edit-field-penzugyi-kapcsolat-email').removeClass('hidden');
            $('#edit-field-teljes-nev').addClass('hidden');
            $('#edit-field-anyja-neve').addClass('hidden');
            $('#edit-field-szuletesi-ido').addClass('hidden');
            $('#edit-field-muvesznev').addClass('hidden');

            //nullázni kell a részleges dátumot, mert gondot okoz, ha közben cégre vált
            if( //részleges?
                $('#edit-field-szuletesi-ido-und-0-value-year').val().length==0 || 
                $('#edit-field-szuletesi-ido-und-0-value-month').val().length==0 || 
                $('#edit-field-szuletesi-ido-und-0-value-day').val().length==0){
                
                $('#edit-field-szuletesi-ido-und-0-value-year').val('');
                $('#edit-field-szuletesi-ido-und-0-value-year').val('');
                $('#edit-field-szuletesi-ido-und-0-value-year').val('');
            }
            $('#edit-field-bankszamla').find('label').append('<span class="form-required" id="szlareq" title="Szükséges mező.">*</span>');
        } 
    });



    //Kapcsolattartó megegyezik? Adatmásolás.
    kapcsChbox = $('#edit-field-kapcs-megegyezik-und-megegyezik-a-fentiekkel');
    kapcsChbox.change(function(){
        if($(this).is(':checked')){
            $('#edit-field-kapcsolattarto-neve-und-0-value').val(
                ($('#edit-field-regisztralo-szemelye-und').val() === 'magan')?
                    $('#edit-field-teljes-nev-und-0-value').val() :
                    $('#edit-field-cegnev-und-0-value').val()
            );
            $('#edit-field-kapcsolattart-telefon-und-0-value').val($('#edit-field-telefon-und-0-value').val());
            $('#edit-field-kapcsolattarto-email-und-0-value').val($('#edit-field-email-und-0-email').val());
            $('#edit-mail').val($('#edit-field-email-und-0-email').val());
        };
    });
    //change any of theese fields unchecks the copy checkbox
    $('#edit-field-teljes-nev-und-0-value').change(function(){kapcsChbox.attr('checked', false);});
    $('#edit-field-cegnev-und-0-value').change(function(){kapcsChbox.attr('checked', false);});
    $('#edit-field-telefon-und-0-value').change(function(){kapcsChbox.attr('checked', false);});
    $('#edit-field-email-und-0-email').change(function(){kapcsChbox.attr('checked', false);});
    $('#edit-field-kapcsolattarto-neve-und-0-value').change(function(){kapcsChbox.attr('checked', false);});
    $('#edit-field-kapcsolattart-telefon-und-0-value').change(function(){kapcsChbox.attr('checked', false);});
    $('#edit-field-kapcsolattarto-email-und-0-value').change(function(){kapcsChbox.attr('checked', false);});

    //Levelezési cím megegyezik? Adatmásolás.
    $('#edit-field-megegyezik-und-megegyezik-a-fenti-cmmel').change(function(){
        if($(this).is(':checked')){
            //csak az üres levelezési nevet töltjük fel névvel
            if( $('#edit-field-posta-nev-und-0-value').val() === '' ){
                $('#edit-field-posta-nev-und-0-value').val(
                    ($('#edit-field-regisztralo-szemelye-und').val() === 'magan')?
                        $('#edit-field-teljes-nev-und-0-value').val() :
                        $('#edit-field-cegnev-und-0-value').val()
                );
            }
            $('#edit-field-posta-orszag-und').val($('#edit-field-orszag-und').val());
            $('#edit-field-posta-iranyitoszam-und-0-value').val($('#edit-field-iranyitoszam-und-0-value').val());
            $('#edit-field-posta-varos-und-0-value').val($('#edit-field-varos-und-0-value').val());
            $('#edit-field-posta-utca-und-0-value').val($('#edit-field-utca-und-0-value').val());
        };
    });

    //change any of theese fields unchecks the copy checkbox
    $('#edit-field-orszag-und').change(function(){$('#edit-field-megegyezik-und-megegyezik-a-fenti-cmmel').attr('checked', false);});
    $('#edit-field-iranyitoszam-und-0-value').change(function(){$('#edit-field-megegyezik-und-megegyezik-a-fenti-cmmel').attr('checked', false);});
    $('#edit-field-varos-und-0-value').change(function(){$('#edit-field-megegyezik-und-megegyezik-a-fenti-cmmel').attr('checked', false);});
    $('#edit-field-utca-und-0-value').change(function(){$('#edit-field-megegyezik-und-megegyezik-a-fenti-cmmel').attr('checked', false);});
    $('#edit-field-posta-orszag-und').change(function(){$('#edit-field-megegyezik-und-megegyezik-a-fenti-cmmel').attr('checked', false);});
    $('#edit-field-posta-iranyitoszam-und-0-value').change(function(){$('#edit-field-megegyezik-und-megegyezik-a-fenti-cmmel').attr('checked', false);});
    $('#edit-field-posta-varos-und-0-value').change(function(){$('#edit-field-megegyezik-und-megegyezik-a-fenti-cmmel').attr('checked', false);});
    $('#edit-field-posta-utca-und-0-value').change(function(){$('#edit-field-megegyezik-und-megegyezik-a-fenti-cmmel').attr('checked', false);});


    //Hide duplicate error messages
    //these are set in php field_validations (ex.: <span class="error-msg-field-anyja-neve">„[field-name]” mezőt ki kell tölteni.</span>)
    if(regErr = $('.messages.error')){
        $('#edit-field-teljes-nev.hidden').length>0 && $('.error-msg-field-teljes-nev').parent().hide();
        $('#edit-field-cegnev.hidden').length>0 && $('.error-msg-field-cegnev').parent().hide();
        $('#edit-field-ceg-jogosult.hidden').length>0 && $('.error-msg-field-ceg-jogosult').parent().hide();
        $('#edit-field-anyja-neve.hidden').length>0 && $('.error-msg-field-anyja-neve').parent().hide();
        $('#edit-field-bankszamla.hidden').length>0 && $('.error-msg-field-bankszamla').parent().hide();
        $('#edit-field-adoszam.hidden').length>0 && $('.error-msg-field-adoszam').parent().hide();
        $('#edit-field-szuletesi-ido.hidden').length>0 && $('.error-msg-field-szuletesi-ido').parent().hide();
        $('#edit-field-bankszamla.hidden').length>0 && $('.error-msg-field-bankszamla').parent().hide();
    }

    
    //Lekérdezés a DJ szövetségtől
    
    //Ha nincs DJ-nek jelölve, rejtett az egész csoport
    if (!djChbox.is(':checked')) {
        djszovGroup.addClass('hidden');
    };
    djChbox.change(function(){
        if($(this).is(':checked')){
            djszovGroup.removeClass('hidden');
        }
        else{
            djszovGroup.addClass('hidden');
        }
    });

    //meglévő checkbox változást figyelni, a bejelölt érdekes csak
    djszov = $('#edit-field-dj-szovetseg');
    djszovChbox = djszov.find('.form-checkbox');
    djszovInfo  = $('<p>').addClass('djszov-info');
    $('#user_user_form_group_djszovetseg label').eq(0).parent().prepend(djszovInfo);
    editMail    = $('#edit-mail');
    djszovChbox.change(function(){
        if($(this).is(':checked')){
            djszovChbox.attr('checked', false);
            //nincs email? kérni, pipa ki.
            if( editMail.val().indexOf('@') < 1 ){
                djszovChbox.attr('checked', false);
                djszovInfo.css('color','red').html('Kérjük adja meg előbb az e-mail címét!');
                editMail.addClass('error');
            }
            else{
                editMail.removeClass('error');
                //karika animáció be
                djszovInfo.css('color','inherit').html('Tagság lekérdezése...');
                //lekérdezés indul
                $.getJSON("/misc/djsz.php?email=" + editMail.val(), function(json) {
                    //eredményt kiírni karika helyére, ... ?
                    if(json.tagsag === 'IGEN'){
                        /*lejárt tagság nem tagság
                        most = new Date();
                        tagsag = new Date(json.ervenyes);
                        if(most - tagsag > 0){  //lejárt
                            djszovInfo.css('color','orange').html('Tagsága lejárt (' + json.ervenyes +')');

                        }
                        else...*/
                        djszovChbox.attr('checked', 'checked');
                        djszovInfo.css({color:'green', fontWeight:'bold'}).html('Tagság rendben.');
                    }
                    else if(json.tagsag === 'NEM'){
                        djszovInfo.css('color','red').html('Érvényes tagságodat a rendszer nem tudta azonosítani. Kérjük, vedd fel a kapcsolatot a DJ Szövetséggel!');
                    }
                    else if(json.error){
                        djszovInfo.css('color','red').html('HIBA. ' + json.error);
                    }
                    else{
                        djszovInfo.css('color','red').html('A lekérdezés sikertelen. Kérjük próbálja meg később!');
                    }
                });
            }
        }
    });

};