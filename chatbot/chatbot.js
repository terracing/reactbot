'use strict'
const dialogflow = require('dialogflow');
const structjson = require('structjson');
const config = require('../config/keys');

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);

module.exports = {
    textQuery: async function (message, parameters = {}) {
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: message,
                    languageCode: config.dialogFlowSessionLanguageCode
                }
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },

    eventQuery: async function(event, parameters = {}) {
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters),
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            }
        };

        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;

    },

    handleAction: function (responses) {
        return responses;
    }
}