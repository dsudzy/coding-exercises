<?php

require('Api.php');
require('Adset.php');

/**
 * 
 */
class AdsetController extends Api
{
    public function getTopLocations()
    {
        $adset = new Adset();
        $results = $adset->getTopLocations(5);
        $this->httpOkResponse($results);
    }
}