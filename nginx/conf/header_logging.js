function kvHeaders(headers, parent) {
    var kvpairs = "";
    for (var h in headers) {
        kvpairs += " " + parent + "." + h + "=";
        if ( headers[h].indexOf(" ") == -1 ) {
		kvpairs += headers[h];
        } else {
            kvpairs += "'" + headers[h] + "'";
        }
    }
    return kvpairs;
}

function kvAccessLog(r) {
    var log = r.variables.time_iso8601;    // NGINX JavaScript can access all variables
    log += " clientXXXX=" + r.remoteAddress;   // Property of request object
    log += " method=" + r.method;          // "
    log += " uri=" + r.uri;                // "
    log += " status=" + r.status;          // Property of response object
    log += kvHeaders(r.headersIn, "in");  // Send request headers object to function
    log += kvHeaders(r.headersOut, "out"); // Send response headers object to function
    return log;
}
