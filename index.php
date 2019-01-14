<?php

require('AdsetApi.php');

$path = explode('/', trim($_SERVER['PATH_INFO'],'/'));
if($path[0] == 'api') {
    new AdsetApi();
}

?>