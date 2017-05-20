/** This is a sample code for your bot**/
function MessageHandler(context, event) {
    if (!context.simpledb.roomleveldata.lang || context.simpledb.roomleveldata.lang.length === 0) {
        if (event.message == "Spanish") {
            context.simpledb.roomleveldata.lang = "es";
        } else if (event.message == "French") {
            context.simpledb.roomleveldata.lang = "fr";
        } else if (event.message == "Chinese") {
            context.simpledb.roomleveldata.lang = "zh";
        }
        
        // TODO: begin the conversation.
    } else {
        parseStr(context, event, event.message);
        return;
    }
    
    
    
    if(event.message.toLowerCase() == "httptest") {
        context.simplehttp.makeGet("http://ip-api.com/json");
    }
    else if(event.message.toLowerCase() == "testdbget") {
        context.simpledb.doGet("putby")
    }
    else if(event.message.toLowerCase() == "testdbput") {
        context.simpledb.doPut("putby", event.sender);
    }
    else {
        context.sendResponse('No keyword found : '+event.message); 
    }
}
/** Functions declared below are required **/
function EventHandler(context, event) {
    context.simpledb.roomleveldata.lang = "";
    var langSelect = {
      "type": "survey",
      "question": "Welcome to Cognate, where you can learn a foreign language by talking to a bot!" + 
    " To begin, please select the language you would like to have a conversation in: ",
      "msgid": "langSelect",
      "options": ["Spanish", "French", "Chinese"]
    }
    context.sendResponse(JSON.stringify(langSelect));
}

function HttpResponseHandler(context, event) {
    // if(event.geturl === "http://ip-api.com/json")
    context.sendResponse(event.getresp);
}

function DbGetHandler(context, event) {
    context.sendResponse("testdbput keyword was last get by:" + event.dbval);
}

function DbPutHandler(context, event) {
    context.sendResponse("testdbput keyword was last put by:" + event.dbval);
}

function parseStr(context, event, str) {
    var regex = /\{([^\}]+)\}/g;
    var matches = str.match(regex);
    var resp = "";
    for (var i = 0; i < matches.length; i++) {
        var trans = matches[i].substring(1, matches[i].length - 1) + ": " + "[TRANSLATION]\n";
        resp += trans;
    }
    context.sendResponse(resp);
}
