//@ts-check
/**
 * run from root folder as : node ./npm-tests/test-02.js
 *
 * Parse the response from the given REST end point and print out "hobbies" property in the following format: ITEM1, ITEM2, ...
 */
import https from "https";

https.get(
  "https://coderbyte.com/api/challenges/json/rest-get-simple",
  (resp) => {
    let data = "";

    // parse json and print "hobbies" property as ITEM1, ITEM2,...
    //another chunk of data has been received, so append it to `data`
    resp.on("data", function (chunk) {
      data += chunk;
    });

    //the whole response has been received, so we just print it out here
    resp.on("end", function () {
      console.log(
        ...JSON.parse(data)["hobbies"].join(", ").toUpperCase().split(" ")
      );
    });
  }
);
