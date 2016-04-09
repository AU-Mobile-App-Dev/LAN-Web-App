var apiDocErrors = [
    {code:200 , warning:"Success", desc:"Your request was successful" },
    {code:201 ,warning:"Success", desc:"The request has been fulfilled and resource has been updated." },
    {code: 204,warning:"No content found", desc: "Your request has successfully processed but no content could be found."},
    
     {code: 400, warning: "Bad Request", desc: "The resource you're trying to access does not support your request type. e.g. a GET request on a POST only resource."},
    {code: 401, warning: "Unauthenticated", desc:"You do not have access to the resource, this may be due to a banned or no longer active API key"},
    {code: 403, warning: "Unauthorized", desc:"The request was understood, but level of access is denied"},
    {code: 404, warning: "Resource Not Found", desc: "You may receive this error if trying to access a page that does not exist, most likely due to a syntax error. i.e. lan/aip/newsfeed should be lan/api/newsfeed"},
    {code: 429, warning:"Too Many Requests", desc: "When accessing our API, each API key has a limit of 150 requests per hour, you will receive this error until your request limit is reset."},
    {code: 500, warning: "Internal Server Error", desc: "Something broke on our end, please contact the team if the problem persists."},
    {code: 501, warning:"Missing Content", desc: "Your request was successfully understood by the server, but this feature has not been implemented yet."},
    {code: 503, warning:"Unavailable", desc:"Your request was understood by the server, but the service is currently unavailable."}
];

var apiCalls = [
    {name:"Newsfeed Post ID", type: "String", desc: "The ID created for the POST made by the user, if the newsfeed post ID and API Key are related, then the resource may be changed. Otherwise the request will be denied, this prevents users from deleting other users's posts", example: "ilgWX5" },
    {name: "City and State" , type:"String" , desc:"Full name of the city and the abbreviated name of state" , example:"Saint Charles, IL" },
    {name: "Zip Code" , type: "Number", desc:"Five digit zip code for the city and state." , example:"You request would have 60174, if searching for users in Saint Charles, IL" },
    {name:"Genre Type" , type:"String" , desc:"For some genres with abbreviated versions, you may need to use that instead. E.g. FPS instead of First person shooter." , example:"FPS, RPG, Strategy" }    
];

var apiDocumentation = [
    {content: "Want to implement LAN's REST API into your own app? Doing so is easy, once you have registered for a LAN account, you can click the \"Get an API Key\" link located on the login page. This will allow you to receive JSON formatted data of your newsfeed. After your username and password have been verified, an API Key will be generarated for you. You will need to provide the key at the end of each of your requests to the LAN API. Here is an example request to retrieve all of items from your newsfeed with an API Key appended to the end: http://lan/api/v1/newsfeed/API=ETYN4667CVCDF. To see examples for PUT and DELETE requests click ", link:"#/apiDocSamples"},
    {content: "When accessing our API, you may occasionaly run into errors. Our API will do its best to inform you of the nature of the problem so you may act accordingly. The problems can range from issues on our server or something simple like a syntax error in your API request. All errors will be returned in JSON formatting  with an appropriate error code and a short description of the nature of the problem. For a full listing of the error codes and their descriptions you can expect to encounter please see them ", link:"#/apiDocErrors"}
];

var sampleRequests = [
    {desc:"Making a GET request on the newsfeed resource", code: "$http({ method: 'GET', url: 'lan-social.heroku.com/api/newsfeed/apikey=exampleKey}).then(function successCallback(response) {console.log(response.data) });", example:"{id: lsjf3, timestamp: 2016-04-09T05:56:43.000, username:someUser, message: \"Here's my post\", likes: 0}"},
    {desc:"Making a POST request on the newsfeed resource to create a new resource", code: "$http({ method: 'POST', url: 'lan-social.heroku.com/api/newsfeed/add/apikey=exampleKey}, data:{message: \"Message goes here\"}).then(function successCallback(response) {console.log(response.data) });", example:"{201: The request has been fulfilled and resource has been updated.}"},
    {desc:"Making a DELETE request on the newsfeed resource to delete a resource by id", code: "$http({ method: 'DELETE', url: 'lan-social.heroku.com/api/newsfeed/delete/newsfeedPostID/apikey=exampleKey}.then(function successCallback(response) {console.log(response.data) });", example:"{201: The request has been fulfilled and resource has been updated.}"}
    
];