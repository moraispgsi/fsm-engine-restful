let request = require('request');

/**
 * Enumeration of the data sources available
 */
let _dataSource = Object.freeze({INSTANCE: 0, DATA_PARAMETER: 1});

//Auxiliary functions
/**
 * Gets a value of the type specified, if the value if of the type it is returned if it is an action its is
 * executed and the return value is return if it is of the type specified
 * @param {*} value Value to be evaluated as an action or a fixed literal
 * @param {string} type The type of the value, its the type that will be returned
 * @param {object} instance The instance to be passed in case the value is an action
 * @param {*} data The data parameter to be passed in case the value is an action
 * @returns {*} Returns the value of the type specified
 */
function getValueOfType(value, type, instance, data){
    if (typeof value !== type && typeof value !== "function") {
        throw new Error("Property type must be "+type+" or a function that returns a "+type);
    }

    let result;
    switch (typeof value) {
        case type:
            result = value;
            break;
        case "function":
            result = value(instance, data);
            if (typeof result !== type) {
                throw new Error("Function must return a/an "+type);
            }
            break;
    }

    return result;
}
/**
 * Gets a value of any type. If the value is of type function it will be handled has a an action that returns a value.
 * @param {*} value A value of any type, if it is of type function it will be considered as an action
 * @param {object} instance The instance to be passed in case the value is an action
 * @param {*} data The data parameter to be passed in case the value is an action
 * @returns {*} Return either the value received or if the value is an action returns the output of the action
 */
function getValue(value, instance, data) {
    let result;
    switch (typeof value) {
        case "function":
            result = value(instance, data);
            break;
        default:
            result = value;
    }
    return result;
}
/**
 * Sets a value in a data source, if the data source is the data parameter the data must be of type object. If the
 * data source is instance, the properties will be in instance.property
 * @param {object} instance Instance in case it will be used
 * @param {*} data The data parameter in case it will be used
 * @param {string} propertyName Property name or path to the property example "prop.propOfProp.PropOfPropOfProp"
 * @param {*} value Value to be set to the property
 * @param {string} dataSource Data source (instance|data)
 */
function setValueToDataSource(instance, data, propertyName, value, dataSource) {
    //todo - test parameters types before executing

    let propertySequence = propertyName.split(/\W+/g);
    let obj;

    switch (dataSource) {
        case _dataSource.DATA_PARAMETER:
            if (typeof data !== "object") {
                throw new Error("Data must be an object");
            }
            obj = data;
            break;

        case _dataSource.INSTANCE:
            if (instance.properties === void 0) {
                instance.properties = {};
            }
            obj = instance.properties;
            break;
    }

    for (let i = 0; i < propertySequence.length - 1; i++) {

        let key = propertySequence[i];
        if (obj[key] === void 0) {
            obj[key] = {};
        }

        obj = obj[key];
    }

    let lastKey = propertySequence[propertySequence.length - 1];
    obj[lastKey] = value;

}
/**
 * Retrieves a property from a data source
 * @param {object} instance Instance in case it will be used
 * @param {*} data The data parameter in case it will be used
 * @param {string} propertyName Property name or path to the property example "prop.propOfProp.PropOfPropOfProp"
 * @param {string} dataSource Data source (instance|data)
 * @returns {*}
 */
function getValueFromDataSource(instance, data, propertyName, dataSource) {

    //todo - test parameters types before executing
    let propertySequence = propertyName.split(/\W+/g);
    let obj;

    switch (dataSource) {
        case _dataSource.DATA_PARAMETER:
            if (data === void 0) {
                throw new Error("Data must be an object");
            }

            obj = data;

            for (let key of propertySequence) {
                if (obj === void 0) {
                    throw new Error("Property does not exist.");
                }
                obj = obj[key];
            }

            return obj;
        case _dataSource.INSTANCE:
            if (instance.properties === void 0) {
                throw new Error("Property does not exist.");
            }

            obj = instance.properties;
            for (let key of propertySequence) {
                if (obj === void 0) {
                    throw new Error("Property does not exist.");
                }
                obj = obj[key];
            }

            return obj;

            return instance.properties[propertyName];
    }
}

//Factory
let factory = {

    makeAction: {
        /**
         * Returns an action that gets a property of the instance
         * @param {string|function} property String or action that returns a String that represent
         * the name of the property or the path to the property of the instance
         * @returns {function} Returns an action that returns the value of the property stored
         */
        getInstanceProperty: function (property) {
            if (typeof property !== "string" && typeof property !== "function") {
                throw new Error("Property must either be a string or an action that returns a string");
            }
            return function (instance, data) {
                let propertyResult = getValueOfType(property, "string", instance, data);
                return getValueFromDataSource(instance, data, propertyResult, _dataSource.INSTANCE);
            }
        },
        /**
         * Returns an action that gets a property of the data parameter
         * @param {string|function} property String or action that returns a String that represent
         * the name of the property or the path to the property of the data parameter
         * @returns {function} Returns an action that returns the value of the property stored
         */
        getDataProperty: function (property) {
            if (typeof property !== "string" && typeof property !== "function") {
                throw new Error("Property must either be a string or an action that returns a string");
            }
            return function (instance, data) {
                let propertyResult = getValueOfType(property, "string", instance, data);
                return getValueFromDataSource(instance, data, propertyResult, _dataSource.DATA_PARAMETER);
            }
        },
        /**
         * Returns an action that gets the data parameter
         * @returns {function} Return an action that returns the data parameter received
         */
        getData: function(){
            return function(instance, data){
                return data;
            }
        },
        /**
         * Returns an action that sets a property on the instance
         * @param {string|function} property String or action that returns a String that
         * represent the name of the property or the path to the property of the instance
         * @param {*} value the value for the property, if the type is function it will be evaluated as an action
         * @returns {Function} Returns an action that returns the data parameter received
         */
        setInstanceProperty: function (property, value) {
            if (typeof property !== "string" && typeof property !== "function") {
                throw new Error("Property must either be a string or an action that returns a string");
            }
            return function (instance, data) {
                let propertyResult = getValueOfType(property, "string", instance, data);
                let valueResult = getValue(value, instance, data);
                setValueToDataSource(instance, data, propertyResult, valueResult, _dataSource.INSTANCE);
                return data;
            };
        },
        /**
         * Returns an action that sets a property on the data parameter if the data parameter is an object
         * @param {string|function} property String or action that returns a String that
         * represent the name of the property or the path to the property of the data parameter
         * @param {*} value the value for the property, if the type is function it will be evaluated as an action
         * @returns {function} Returns an action that return the data parameter object
         */
        setDataProperty: function (property, value) {
            if (typeof property !== "string" && typeof property !== "function") {
                throw new Error("Property must either be a string or an action that returns a string");
            }
            return function (instance, data) {
                let propertyResult = getValueOfType(property, "string", instance, data);
                let valueResult = getValue(value, instance, data);
                setValueToDataSource(instance, data, propertyResult, valueResult, _dataSource.DATA_PARAMETER);
                return data;
            };
        },
        /**
         * Returns an action that gets the property of a data source
         * @param {string|function} property String or action that returns a String that represent the
         * name of the property or the path to the property of the data parameter
         * @param {string|function} dataSource String or action that return a String that represent the
         * data source. The data source can be either "instance" or "data"
         * @returns {Function} Returns an action that gets the property of a data source
         */
        getDataSourceProperty: function (property, dataSource) {
            if (typeof property !== "string" && typeof property !== "function") {
                throw new Error("Property must either be a string or an action that returns a string");
            }
            if (typeof dataSource !== "string" && typeof dataSource !== "function") {
                throw new Error("DataSource must either be a string or an action that returns a string");
            }

            return function (instance, data) {
                let dataSourceResult = getValueOfType(dataSource, "string", instance, data);
                switch (dataSourceResult.toLowerCase()) {
                    case "instance":
                        return factory.makeAction.getInstanceProperty(property)(instance, data);
                    case "data":
                        return factory.makeAction.getDataProperty(property)(instance, data);
                    default:
                        throw new Error("Data source does not exist");
                }
            }
        },
        /**
         * Returns an action which returns a fixed literal value passed by parameter
         * @param {*} value Value to be returned
         * @returns {function} Returns an action that return the fixed value passed in the creation of the action
         */
        getFixed: function (value) {
            return function () {
                return value;
            }
        },
        /**
         * Returns an action which creates a context based on a value provided and executes an action passing
         * in the value as the data parameter of the action
         * @param value Context to be passed as the data parameter
         * @param action Action to be executed with the newly created context
         * @returns {Function} Returns an Action that executes an action passing the context as the data parameter
         */
        context: function (value, action) {
            if(typeof action !== "function") {
                throw new Error("Action must be of type function");
            }
            return function (instance, data) {
                let result = getValue(value, instance, data);
                return action(instance, result);
            }
        },
        /**
         * Returns an action that executes a series of actions in sequence and returns the data received
         * @param {...function} actions - Actions to be executed in sequence
         * @returns {function} Returns an action that executes a series of actions in sequence
         * and returns the data received
         */
        actionSequence: function (actions) {
            for (let action of arguments) {
                if (typeof action !== "function") {
                    throw new Error("Action must be a function");
                }
            }

            let actionsArray = arguments;
            return function (instance, data) {
                for (let action of actionsArray) {
                    action(instance, data);
                }
                return data;
            }
        },
        /**
         * Returns an action that try an action and catches errors
         * @param tryAction Action that will be tried
         * @param catchAction Action that will run when an error is occurs, the data parameter
         * passed will be the error received
         * @returns {Function} Returns an action that either returns the output of the tryAction
         * or the output of the catchAction in case of error
         */
        try: function (tryAction, catchAction) {

            if(typeof tryAction !== "function"){
                throw new Error("tryAction must be a function");
            }

            if(typeof catchAction !== "function"){
                throw new Error("catchAction must be a function");
            }

            return function(instance, data) {
                try {
                    return tryAction(instance, data);
                } catch (error) {
                    return catchAction(instance, error);
                }
            }
        },
        /**
         * Returns an action that creates a timer that will execute an action after a certain amount of time
         * @param delay A number or an action that returns a number that represents the amount of time to wait
         * to execute the action
         * @param callbackAction An action that will execute when the timer overflows
         * @returns {Function} Returns an action that generates a timeout that will execute an action after
         * a certain amount of time
         */
        timeout: (delay, callbackAction) => {
            if(typeof delay !== 'number' && typeof delay !== 'function') {
               throw new Error("Delay must be either a number or an action that returns a number");
            }
            return function (instance, data) {

                let delay = getValueOfType(delay, "number", instance, data);

                if (instance.timeouts === void 0) {
                    instance.timeouts = {};
                }

                if(instance.timeouts.nextID === void 0){
                    instance.timeouts.nextID = 0;
                    instance.timeouts.references = {};
                }
                let id = instance.timeouts.nextID ++;

                instance.timeouts[id] = setTimeout(() => {
                    callbackAction(instance)
                }, delay);

                return id;
            }
        },
        /**
         * Returns an action that creates a timeout that will execute on a certain date and time
         * @param {string} dateTime An ISO string representing the date and time when the action will execute
         * @param {function} callbackAction The action that will execute when the timer overflows
         * @returns {function} Returns an action that creates a timeout that will execute on a certain data and time.
         * The action also returns the ID of the timeout that can be used to cancel it with a cancelTimeout action
         */
        timeoutDateTime: (dateTime, callbackAction) => {
            //todo take care of the Date type, now it only allows for strings as dateTime
            return function (instance, data) {

                if (instance.timeouts === void 0) {
                    instance.timeouts = {};
                }

                if(instance.timeouts.nextID === void 0){
                    instance.timeouts.nextID = 0;
                    instance.timeouts.references = {};
                }
                let id = instance.timeouts.nextID ++;

                let dateTimeResult = getValueOfType(dateTime, "string", instance, data);

                (function loop() {
                    let now = new Date();
                    if (now.getTime() >= new Date(dateTimeResult).getTime()) {
                        if (callbackAction !== void 0) {
                            callbackAction(instance, data);
                        }
                        return;
                    }

                    let delay = 1000 - (now % 1000); // exact ms to next second interval
                    instance.timeouts.references[id] = setTimeout(loop, delay);
                })();

                return id;
            }
        },
        /**
         * Returns an action that cancels a timeout by its id
         * @param {number|function} timeoutID A number representing the id of the timeout or an action that return
         * a number
         * @returns {Function} Returns an action that cancels a timeout using the id or action received
         */
        cancelTimeout: (timeoutID) => {
            return function (instance, data) {
                let timeoutIDResult = getValueOfType(timeoutID, "number", instance, data);
                if(instance.timeouts === void 0 ||
                    instance.timeouts.references === void 0 ||
                        instance.timeouts.references[timeoutIDResult] === void 0) {
                    return;
                }
                clearTimeout(instance.timeouts.references[timeoutIDResult]);
            }
        },
        /**
         * Returns an action that logs a value
         * @param prefixTxt A string or an action that returns a string that represent the text that titles the log
         * @param value A value or a function that returns a value that will be logged
         * @returns {Function} Returns an action that logs a value
         */
        log: function (prefixTxt, value) {
            return function (instance, data) {
                let prefixTxtResult = getValueOfType(prefixTxt, "string", instance, data);
                let result = getValue(value, instance, data);
                console.log(prefixTxtResult, result);
            }
        },
        /**
         * Returns an action that transition a machina.js finite state machine instance to another state
         * @param state A string or an action that returns a string which represent the name of the state to change to
         * @returns {Function} Returns an action that transition a machina.js finite state machine instance
         * to another stateReturns an action that transition
         */
        transition: function (state) {
            return function (instance, data) {
                let stateResult = getValueOfType(state, "string", instance, data);
                instance.transition(stateResult);
            }
        },
        /**
         * Returns an action that generates an input that will be sent to the machina.js finite state machine instance
         * @param input
         * @param data
         * @returns {function(*)}
         */
        handle: (input, data) => {
            return (instance) => {
                instance.handle(input, data);
            }
        },
        /**
         * Returns an action that executes an HTTP request
         * @param host A string or an action that returns a string which represent the host to request
         * @param route A string or an action that returns a string which represent the route of the request call
         * @param dataToSend A value or an action that return a value which represent the data that will be sent in
         * the request
         * @param onSuccess An action that will execute when the request receives a success response
         * @param onError An action that will execute when the request receives an error response
         * @returns {Function} Returns an action that executes an HTTP request
         */
        httpRequest: function (host, route, dataToSend, onSuccess, onError) {

            if(typeof host !== "function" && typeof host !== "string"){
                throw new Error("Host must be either a string or an action that returns a string");
            }

            if(typeof route !== "function" && typeof route !== "string"){
                throw new Error("Route must be either a string or an action that returns a string");
            }

            return function (instance, data) {
                let hostResult = getValueOfType(host, "string", instance, data);
                let routeResult = getValueOfType(route, "string",  instance, data);
                let dataToSendResult = getValue(dataToSend, instance, data);
                request({
                    url: hostResult + routeResult,
                    method: "POST",
                    json: true,
                    body: dataToSendResult,
                }, function (error, response, body) {
                    if (error !== void 0) {
                        if (onError !== null) {
                            onError(instance, error);
                        }
                        return;
                    }
                    if (onSuccess !== void 0) {
                        onSuccess(instance, {
                            response: response,
                            body: body
                        })
                    }
                });
            }
        },
        /**
         * Returns an action that evaluates a condition and executes and action
         * if the condition evaluates to true and another if the condition evaluate to false
         * @param {boolean|function} bool The boolean value that will be evaluated or an action that
         * returns the boolean value
         * @param actionIf Action that will occur when the condition evaluates to true
         * @param actionElse Action that will occur when the condition evaluates to false
         * @returns {function} Returns an action that either returns the output of the actionIf
         * or the output of the actionElse
         */
        condition: function (bool, actionIf, actionElse) {
            if(typeof actionIf !== "function"){
                throw new Error("actionIf must be an action");
            }
            if(typeof actionElse !== "function"){
                throw new Error("actionElse must be an action");
            }
            return function (instance, data) {
                let result = getValueOfType(bool,"boolean", instance, data);
                if (result) {
                    return actionIf(instance, data);
                } else {
                    return actionElse(instance, data);
                }

            }
        },
   }
};
module.exports = factory;
/*
        // Open socket
        openSocket: function (propertySocket) {
            return function (instance, data) {
                let socket = io();
                setValueToDataSource(instance, data, propertyName, socket, _dataSource.INSTANCE);
            }
        },
        // Close socket
        openSocket: function (propertySocket) {
            return function (instance, data) {
                instance[propertySocket].close();
                //TODO: chamar a função para apagar o socket propertySocket da instance
            }
        },
        // Send dataToSend through the socket
        sendDataSocket: function (propertySocket, eventName, dataToSend) {
            return function (instance, data) {
                instance[propertySocket].emit(eventName, dataToSend);
            }
        }, // Listen for incoming data from the socket event eventName and handle with the dataHandler
        // dataHandler -> function that takes the data received as argument
        listenToSocketEvent: function (propertySocket, eventName, dataHandler) {
            return function (instance, data) {
                instance[propertySocket].on(eventName, dataHandler);
            }
        },
        // Stop listening for incoming data from the socket event eventName
        stoplisteningToSocketEvent: function (propertySocket, eventName) {
            return function (instance, data) {
                // UNTESTED!!! it's not on the API, but it's on stackoverflow as correct answer
                instance[propertySocket].removeAllListeners(eventName);
            }
        }

 */
