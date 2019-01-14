<?php

header('Content-Type: application/json');

/**
 * 
 */
class Api
{
    public function httpOkResponse($data)
    {
        echo json_encode($data);
    }
}