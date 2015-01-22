<?php
error_reporting(E_ALL);


$email = str_replace(' ', '+', $_GET['email']);
if($email == "mthatvan+tesztelek@gmail.com") $email = "jeszenszkyzsolt@djszovetseg.hu"; //teszt miatt


//email checker from http://hu1.php.net/filter_var#112880
function validate_email($email, $strict = true) {
    $dot_string = $strict ?
        '(?:[A-Za-z0-9!#$%&*+=?^_`{|}~\'\\/-]|(?<!\\.|\\A)\\.(?!\\.|@))' :
        '(?:[A-Za-z0-9!#$%&*+=?^_`{|}~\'\\/.-])'
    ;
    $quoted_string = '(?:\\\\\\\\|\\\\"|\\\\?[A-Za-z0-9!#$%&*+=?^_`{|}~()<>[\\]:;@,. \'\\/-])';
    $ipv4_part = '(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])';
    $ipv6_part = '(?:[A-fa-f0-9]{1,4})';
    $fqdn_part = '(?:[A-Za-z](?:[A-Za-z0-9-]{0,61}?[A-Za-z0-9])?)';
    $ipv4 = "(?:(?:{$ipv4_part}\\.){3}{$ipv4_part})";
    $ipv6 = '(?:' .
        "(?:(?:{$ipv6_part}:){7}(?:{$ipv6_part}|:))" . '|' .
        "(?:(?:{$ipv6_part}:){6}(?::{$ipv6_part}|:{$ipv4}|:))" . '|' .
        "(?:(?:{$ipv6_part}:){5}(?:(?::{$ipv6_part}){1,2}|:{$ipv4}|:))" . '|' .
        "(?:(?:{$ipv6_part}:){4}(?:(?::{$ipv6_part}){1,3}|(?::{$ipv6_part})?:{$ipv4}|:))" . '|' .
        "(?:(?:{$ipv6_part}:){3}(?:(?::{$ipv6_part}){1,4}|(?::{$ipv6_part}){0,2}:{$ipv4}|:))" . '|' .
        "(?:(?:{$ipv6_part}:){2}(?:(?::{$ipv6_part}){1,5}|(?::{$ipv6_part}){0,3}:{$ipv4}|:))" . '|' .
        "(?:(?:{$ipv6_part}:){1}(?:(?::{$ipv6_part}){1,6}|(?::{$ipv6_part}){0,4}:{$ipv4}|:))" . '|' .
        "(?::(?:(?::{$ipv6_part}){1,7}|(?::{$ipv6_part}){0,5}:{$ipv4}|:))" . 
    ')';
    $fqdn = "(?:(?:{$fqdn_part}\\.)+?{$fqdn_part})";
    $local = "({$dot_string}++|(\"){$quoted_string}++\")";
    $domain = "({$fqdn}|\\[{$ipv4}]|\\[{$ipv6}]|\\[{$fqdn}])";
    $pattern = "/\\A{$local}@{$domain}\\z/";
    return preg_match($pattern, $email, $matches) &&
        (
            !empty($matches[2]) && !isset($matches[1][66]) && !isset($matches[0][256]) ||
            !isset($matches[1][64]) && !isset($matches[0][254])
        )
    ;
}



function err($s){
    $array['error'] = $s;
    echo json_encode($array);
    exit();
}

header('Content-type: application/json');
//header('Content-Type: text/javascript; charset=utf8');
header('Access-Control-Allow-Origin: http://mahaszjogdij.hu/');
header('Access-Control-Max-Age: 3628800');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');


if(!isset($email)) err('Nincs e-amil cím.');

elseif(!validate_email($email)) err('Nem megfelelő e-mail cím formátum.' . $email);

else{
    //$url = 'http://djszovetseg.hu/dj-szovetseg-tag-lekerdezes.php?email=';
    $url = 'http://munka.djszovetseg.hu/mahasz/dj-szovetseg-tag-lekerdezes.php?email=';
    $content = file_get_contents($url . $email);

    $array = array();
    $vars = explode('&', $content);
    foreach( $vars as $var){
        $var = explode('=', $var);
        $array[trim($var[0])] = trim($var[1]);
    }


    echo json_encode($array);
}

?>
