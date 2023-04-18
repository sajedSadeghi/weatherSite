<?php
require __DIR__ . '/vendor/autoload.php'; // Path to Composer autoloader

$dotenv = Dotenv\Dotenv::createUnsafeImmutable(__DIR__);
$dotenv->load();

$headers = [
    "content-type" => "application/json; charset=UTF-8"
];
$client = new GuzzleHttp\Client();

$apiKey = getenv('API_KEY');
$city = $_POST["city"];

try {
    $response = $client->get("https://api.weatherapi.com/v1/current.json?key={$apiKey}&q={$city}&aqi=no", [
        "headers" => $headers
    ]);

    // Check the response status code
    if ($response->getStatusCode() === 404) {
        throw new Exception("City not found");
    }

    $data = json_encode(json_decode($response->getBody()), JSON_PRETTY_PRINT);

    header('Content-Type: application/json');

    echo $data;
}
// Display an error message to the user

catch (GuzzleHttp\Exception\ConnectException $e) {

    echo "Sorry, we are unable to connect to the weather API at the moment. Please try again later.";

} catch (GuzzleHttp\Exception\RequestException $e) {

    echo "Sorry, we are unable to retrieve the weather data at the moment. Please try again later.";

} catch (Exception $e) {

    // Check the error message
    if ($e->getMessage() === "City not found") {

        echo "Sorry, the city you entered could not be found. Please try again with a different city.";
    } else {

        echo "Sorry, there was an error processing your request. Please try again later.";
    }
    
}
