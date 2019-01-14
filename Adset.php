<?php

class Adset
{
    private $geo_locations_frequency;
    private $locations_map = [
        'city' => [],
        'region' => [],
        'zip' => [],
        'geo_market' => [],
    ];

    /**
     * gets top used geo locations
     * 
     * @param  integer $limit [description]
     * @return void
     */
    public function getTopLocations($limit)
    {
        $adset_data = $this->getAdsetData();
        $this->populateGeoLocationFrequency($adset_data);
        return $this->buildTopLocationsArray($limit);
    }

    /**
     * loop through top five most frequent locations
     * use the map to get the full data and return.
     * 
     * @return array
     */
    private function buildTopLocationsArray($limit)
    {
        $count = 1;
        foreach ($this->geo_locations_frequency as $key => $location) {
            if($count > $limit) {
                return $results;
            }
            $locations_key = explode('.', $key);
            $type = $locations_key[0];
            $map_key = $locations_key[1];
            if($type != 'country') {
                $results[]['geo_location'] = [
                    $type => $this->locations_map[$locations_key[0]][$locations_key[1]]
                ];
            } else {
                $results[]['geo_location'] = [
                    $type => $map_key
                ];
            }
            $count++;
        }
    }

    /**
     * get file contents of facebooks adset.
     * @return object
     */
    private function getAdsetData()
    {
        $adset_data = file_get_contents('https://app.wordstream.com/services/v1/wordstream/interview_data');
        return json_decode($adset_data);
    }

    /**
     * look through data set updating the location count and adding to the map
     * that maps the keys on the geo_locations_frequency to the actual
     * location data.
     * 
     * @param  oobject $adset_data]
     * @return void
     */
    private function populateGeoLocationFrequency($adset_data)
    {
        foreach($adset_data->data as $data) {
            if(!isset($data->targeting->geo_locations)) {
                continue;
            }
            $geo_locations = $data->targeting->geo_locations;
            if (isset($geo_locations->cities)) {
                foreach ($geo_locations->cities as $city) {
                    $this->addToGeoLocationsFrequency($city, 'city');
                    $this->addToLocationsMap($city, 'city');
                }
            } 
            if(isset($geo_locations->regions)) {
                foreach ($geo_locations->regions as $region) {
                    $this->addToGeoLocationsFrequency($region, 'region');
                    $this->addToLocationsMap($region, 'region');
                }
            }
            if(isset($geo_locations->zips)) {
                foreach ($geo_locations->zips as $zip) {
                    $this->addToGeoLocationsFrequency($zip, 'zip');
                    $this->addToLocationsMap($zip, 'zip');
                }
            }
            if(isset($geo_locations->countries)) {
                foreach ($geo_locations->countries as $country) {
                    $this->addToGeoLocationsFrequency($country, 'country');
                }
            }
            if(isset($geo_locations->geo_markets)) {
                foreach ($geo_locations->geo_markets as $geo_market) {
                    $this->addToGeoLocationsFrequency($geo_market, 'geo_market');
                    $this->addToLocationsMap($geo_market, 'geo_market');
                }
            }
        }
        arsort($this->geo_locations_frequency);
    }

    /**
     * Increment the value of the location to get a count of each
     *
     * @param object $location
     * @param string $type
     */
    private function addToGeoLocationsFrequency($location, $type)
    {
        if($type != 'country') {
            $this->geo_locations_frequency[$type . '.' . $location->key] = 
                    !isset($this->geo_locations_frequency[$type . '.' . $location->key]) ? 1 : $this->geo_locations_frequency[$type . '.' . $location->key] + 1;
        } else {
            $this->geo_locations_frequency[$type . '.' . $location] = 
                    !isset($this->geo_locations_frequency[$type . '.' . $location]) ? 1 : $this->geo_locations_frequency[$type . '.' . $location] + 1;
        }
    }

    /**
     * Add location to location map array
     * 
     * @param object $location
     * @param string $type
     */
    private function addToLocationsMap($location, $type)
    {
        $this->locations_map[$type][$location->key] = $location;
    }
}