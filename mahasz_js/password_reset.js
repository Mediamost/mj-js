/* Jelszó reset aktiváló link után jut ide * preprocess JS esetén nem működik */
Drupal.behaviors.mahasz_js_password_reset = function ($){
    //adding urlhash to the reset pass button's action url, to jump directly to the password
    var action = $('form#user-pass-reset').attr('action');
    $('form#user-pass-reset').attr( 'action', action + '#user_user_form_group_alap' );
};