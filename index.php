<?php

require('AdsetController.php');

$path = explode('/', trim($_SERVER['PATH_INFO'],'/'));
if($path[0] == 'api') {
    $adset = new AdsetController();
    $adset->getTopLocations();
}

?>