"use strict";

module.exports = function (app) {

    var engine = app.engine;
    var debug = require("debug")("machine-api");
    var co = require("co");

    /**
     * @api {get} /machine/ Get all the machines names
     * @apiGroup Machine
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *          "machinesNames": [
     *              "machineName1",
     *              "machineName2",
     *              "machineName3"
     *          ]
     *    }
     *
     * @apiErrorExample {json}
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "message": "error message"
     *    }
     */
    app.get('/machine', app.auth.authenticate(), function (req, res) {

        debug("GET: /machine");
        co(regeneratorRuntime.mark(function _callee() {
            var machinesNames;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return engine.getMachinesNames();

                        case 2:
                            machinesNames = _context.sent;

                            res.json({
                                machinesNames: machinesNames
                            });

                        case 4:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        })).catch(function (err) {
            debug("Error: " + err);
            var message = err.message;
            res.status(500).send({ message: message });
        });
    });

    /**
     * @api {post} /machine/ Add a new machine
     * @apiGroup Machine
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.name The name of the new machine
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     * @apiErrorExample {json}
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "message": "error message"
     *    }
     */
    app.post('/machine', app.auth.authenticate(), function (req, res) {
        debug("POST: /machine");
        co(regeneratorRuntime.mark(function _callee2() {
            var message;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            if (req.body.name) {
                                _context2.next = 5;
                                break;
                            }

                            message = "Name property is missing.";

                            debug("Error: " + message);
                            res.status(500).send({ message: message });
                            return _context2.abrupt("return");

                        case 5:
                            _context2.next = 7;
                            return engine.addMachine(req.body.name);

                        case 7:
                            res.sendStatus(200);

                        case 8:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        })).catch(function (err) {
            debug("Error: " + err);
            var message = err.message;
            res.status(500).send({ message: message });
        });
    });

    /**
     * @api {delete} /machine/:name Remove a machine
     * @apiGroup Machine
     * @apiParam {String} name The name of the machine
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.name The name of the machine
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     * @apiErrorExample {json}
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "message": "error message"
     *    }
     */
    app.delete('/machine/:name', app.auth.authenticate(), function (req, res) {
        debug("DELETE: /machine/:name");
        co(regeneratorRuntime.mark(function _callee3() {
            var message;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            if (req.params.name) {
                                _context3.next = 5;
                                break;
                            }

                            message = "Name property is missing.";

                            debug("Error: " + message);
                            res.status(500).send({ message: message });
                            return _context3.abrupt("return");

                        case 5:
                            _context3.next = 7;
                            return engine.removeMachine(req.params.name);

                        case 7:
                            res.sendStatus(200);

                        case 8:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        })).catch(function (err) {
            debug("Error: " + err);
            var message = err.message;
            res.status(500).send({ message: message });
        });
    });

    /**
     * @api {get} /machine/:name/version/keys Get all the versions keys of a machine
     * @apiGroup Version
     * @apiParam {String} name The name of the machine
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.name The name of the machine
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *   {
     *       "versionsKeys": [
     *          "version1",
     *          "version2",
     *          "version3"
     *      ]
     *  }
     * @apiErrorExample {json}
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "message": "error message"
     *    }
     */
    app.get('/machine/:name/version/keys', app.auth.authenticate(), function (req, res) {
        debug("POST: '/machine/:name/version/keys");
        co(regeneratorRuntime.mark(function _callee4() {
            var message, versionsKeys;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            if (req.params.name) {
                                _context4.next = 5;
                                break;
                            }

                            message = "name property is missing.";

                            debug("Error: " + message);
                            res.status(500).send({ message: message });
                            return _context4.abrupt("return");

                        case 5:
                            _context4.next = 7;
                            return engine.getVersionsKeys(req.params.name);

                        case 7:
                            versionsKeys = _context4.sent;

                            res.json({
                                versionsKeys: versionsKeys
                            });

                        case 9:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        })).catch(function (err) {
            debug("Error: " + err);
            var message = err.message;
            res.status(500).send({ message: message });
        });
    });

    /**
     * @api {post} /machine/:name/version Add a new version to a machine
     * @apiDescription Add a new version to a machine (the last version of the machine must already be sealed)
     * @apiGroup Version
     * @apiParam {String} name The name of the machine
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.name The name of the machine
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *   {
     *       "versionsKeys": [
     *          "version1",
     *          "version2",
     *          "version3"
     *      ]
     *  }
     * @apiErrorExample {json}
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "message": "error message"
     *    }
     */
    app.post('/machine/:name/version', app.auth.authenticate(), function (req, res) {
        debug("POST: '/machine/:name/version");
        co(regeneratorRuntime.mark(function _callee5() {
            var message, versionKey;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            if (req.params.name) {
                                _context5.next = 5;
                                break;
                            }

                            message = "name property is missing.";

                            debug("Error: " + message);
                            res.status(500).send({ message: message });
                            return _context5.abrupt("return");

                        case 5:
                            _context5.next = 7;
                            return engine.addVersion(req.params.name);

                        case 7:
                            versionKey = _context5.sent;

                            res.json({
                                versionKey: versionKey
                            });

                        case 9:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        })).catch(function (err) {
            debug("Error: " + err);
            var message = err.message;
            res.status(500).send({ message: message });
        });
    });

    /**
     * @api {get} /machine/:name/version/:version/info Get the version information
     * @apiGroup Version
     * @apiParam {String} name The name of the machine
     * @apiParam {String} version The version key
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *   {
     *      "isSealed": true
     *  }
     * @apiErrorExample {json}
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "message": "error message"
     *    }
     */
    app.get('/machine/:name/version/:version/info', app.auth.authenticate(), function (req, res) {
        debug("GET: '/machine/:name/version/info");
        co(regeneratorRuntime.mark(function _callee6() {
            var message, info;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            if (req.params.name) {
                                _context6.next = 5;
                                break;
                            }

                            message = "name property is missing.";

                            debug("Error: " + message);
                            res.status(500).send({ message: message });
                            return _context6.abrupt("return");

                        case 5:
                            _context6.next = 7;
                            return engine.getVersionInfo(req.params.name, req.params.version);

                        case 7:
                            info = _context6.sent;

                            res.json(info);

                        case 9:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        })).catch(function (err) {
            debug("Error: " + err);
            var message = err.message;
            res.status(500).send({ message: message });
        });
    });

    /**
     * @api {get} /machine/:name/version/:version/model Get the version SCXML model
     * @apiGroup Version
     * @apiParam {String} name The name of the machine
     * @apiParam {String} version The version key
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     *  {
     *      "model": "<scxml></scxml>"
     *  }
     * @apiErrorExample {json}
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "message": "error message"
     *    }
     */
    app.get('/machine/:name/version/:version/model', app.auth.authenticate(), function (req, res) {
        debug("GET: '/machine/:name/version/model");
        co(regeneratorRuntime.mark(function _callee7() {
            var message, model;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            if (req.params.name) {
                                _context7.next = 5;
                                break;
                            }

                            message = "name property is missing.";

                            debug("Error: " + message);
                            res.status(500).send({ message: message });
                            return _context7.abrupt("return");

                        case 5:
                            model = engine.getVersionSCXML(req.params.name, req.params.version);

                            res.json({ model: model });

                        case 7:
                        case "end":
                            return _context7.stop();
                    }
                }
            }, _callee7, this);
        })).catch(function (err) {
            debug("Error: " + err);
            var message = err.message;
            res.status(500).send({ message: message });
        });
    });

    /**
     * @api {put} /machine/:name/version/:version/model Set the version's SCXML model
     * @apiGroup Version
     * @apiParam {String} name The name of the machine
     * @apiParam {String} version The version key
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.model The SCXML model
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     * @apiErrorExample {json}
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "message": "error message"
     *    }
     */
    app.put('/machine/:name/version/:version/model', app.auth.authenticate(), function (req, res) {
        debug("PUT: '/machine/:name/version/model");
        co(regeneratorRuntime.mark(function _callee8() {
            var message;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            if (req.params.name) {
                                _context8.next = 5;
                                break;
                            }

                            message = "name property is missing.";

                            debug("Error: " + message);
                            res.status(500).send({ message: message });
                            return _context8.abrupt("return");

                        case 5:
                            _context8.next = 7;
                            return engine.setVersionSCXML(req.params.name, req.params.version, req.body.model);

                        case 7:
                            res.sendStatus(200);

                        case 8:
                        case "end":
                            return _context8.stop();
                    }
                }
            }, _callee8, this);
        })).catch(function (err) {
            debug("Error: " + err);
            var message = err.message;
            res.status(500).send({ message: message });
        });
    });

    /**
     * @api {get} /machine/:name/version/:version/instance/keys Get all the instance keys
     * @apiGroup Instance
     * @apiParam {String} name The name of the machine
     * @apiParam {String} version The version key
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *        "instancesKeys": [
     *              "instance1",
     *              "instance2",
     *              "instance3",
     *        ]
     *    }
     * @apiErrorExample {json}
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "message": "error message"
     *    }
     */
    app.get('/machine/:name/version/:version/instance/keys', app.auth.authenticate(), function (req, res) {
        debug("GET: '/machine/:name/version/instance/keys");
        co(regeneratorRuntime.mark(function _callee9() {
            var message, instancesKeys;
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            if (req.params.name) {
                                _context9.next = 5;
                                break;
                            }

                            message = "name property is missing.";

                            debug("Error: " + message);
                            res.status(500).send({ message: message });
                            return _context9.abrupt("return");

                        case 5:
                            instancesKeys = engine.getInstancesKeys(req.params.name, req.params.version);

                            res.json({
                                instancesKeys: instancesKeys
                            });

                        case 7:
                        case "end":
                            return _context9.stop();
                    }
                }
            }, _callee9, this);
        })).catch(function (err) {
            debug("Error: " + err);
            var message = err.message;
            res.status(500).send({ message: message });
        });
    });

    /**
     * @api {post} /machine/:name/version/:version/instance Add a new instance to a version
     * @apiGroup Instance
     * @apiParam {String} name The name of the machine
     * @apiParam {String} version The version key
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     * @apiErrorExample {json}
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "message": "error message"
     *    }
     */
    app.post('/machine/:name/version/:version/instance', app.auth.authenticate(), function (req, res) {
        debug("POST: '/machine/:name/version/instance");
        co(regeneratorRuntime.mark(function _callee10() {
            var message, instance;
            return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            if (req.params.name) {
                                _context10.next = 5;
                                break;
                            }

                            message = "name property is missing.";

                            debug("Error: " + message);
                            res.status(500).send({ message: message });
                            return _context10.abrupt("return");

                        case 5:
                            _context10.next = 7;
                            return engine.addInstance(req.params.name, req.params.version);

                        case 7:
                            instance = _context10.sent;

                            res.json({
                                instanceKey: instance.instanceKey
                            });

                        case 9:
                        case "end":
                            return _context10.stop();
                    }
                }
            }, _callee10, this);
        })).catch(function (err) {
            debug("Error: " + err);
            var message = err.message;
            res.status(500).send({ message: message });
        });
    });

    /**
     * @api {put} /machine/:name/version/:version/seal Seals a version
     * @apiGroup Version
     * @apiParam {String} name The name of the machine
     * @apiParam {String} version The version key
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     * @apiErrorExample {json}
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "message": "error message"
     *    }
     */
    app.put('/machine/:name/version/:version/seal', app.auth.authenticate(), function (req, res) {
        debug("PUT: '/machine/:name/version/seal");
        co(regeneratorRuntime.mark(function _callee11() {
            var message, _message;

            return regeneratorRuntime.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            if (req.params.name) {
                                _context11.next = 5;
                                break;
                            }

                            message = "name property is missing.";

                            debug("Error: " + message);
                            res.status(500).send({ message: message });
                            return _context11.abrupt("return");

                        case 5:
                            if (req.params.version) {
                                _context11.next = 10;
                                break;
                            }

                            _message = "version property is missing.";

                            debug("Error: " + _message);
                            res.status(500).send({ message: _message });
                            return _context11.abrupt("return");

                        case 10:
                            _context11.next = 12;
                            return engine.sealVersion(req.params.name, req.params.version);

                        case 12:
                            res.sendStatus(200);

                        case 13:
                        case "end":
                            return _context11.stop();
                    }
                }
            }, _callee11, this);
        })).catch(function (err) {
            debug("Error: " + err);
            var message = err.message;
            res.status(500).send({ message: message });
        });
    });

    /**
     * @api {put} /machine/:name/version/:version/instance/:instance/start Starts the instance
     * @apiGroup Instance
     * @apiParam {String} name The name of the machine
     * @apiParam {String} version The version key
     * @apiParam {String} instance The instance key
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     * @apiErrorExample {json}
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "message": "error message"
     *    }
     */
    app.put('/machine/:name/version/:version/instance/:instance/start', app.auth.authenticate(), function (req, res) {
        debug("PUT: '/machine/:name/version/instance/:instance/start");
        co(regeneratorRuntime.mark(function _callee12() {
            var message, instance;
            return regeneratorRuntime.wrap(function _callee12$(_context12) {
                while (1) {
                    switch (_context12.prev = _context12.next) {
                        case 0:
                            if (req.params.name) {
                                _context12.next = 5;
                                break;
                            }

                            message = "name property is missing.";

                            debug("Error: " + message);
                            res.status(500).send({ message: message });
                            return _context12.abrupt("return");

                        case 5:
                            instance = engine.getInstance(req.params.name, req.params.version, req.params.instance);
                            _context12.next = 8;
                            return instance.start();

                        case 8:
                            res.sendStatus(200);

                        case 9:
                        case "end":
                            return _context12.stop();
                    }
                }
            }, _callee12, this);
        })).catch(function (err) {
            debug("Error: " + err);
            var message = err.message;
            res.status(500).send({ message: message });
        });
    });

    /**
     * @api {put} /machine/:name/version/:version/instance/:instance/stop Stops the instance
     * @apiGroup Instance
     * @apiParam {String} name The name of the machine
     * @apiParam {String} version The version key
     * @apiParam {String} instance The instance key
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     * @apiErrorExample {json}
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "message": "error message"
     *    }
     */
    app.put('/machine/:name/version/:version/instance/:instance/stop', app.auth.authenticate(), function (req, res) {
        debug("PUT: '/machine/:name/version/instance/:instance/stop");
        co(regeneratorRuntime.mark(function _callee13() {
            var message, _message2, _message3, instance;

            return regeneratorRuntime.wrap(function _callee13$(_context13) {
                while (1) {
                    switch (_context13.prev = _context13.next) {
                        case 0:
                            if (req.params.name) {
                                _context13.next = 5;
                                break;
                            }

                            message = "name property is missing.";

                            debug("Error: " + message);
                            res.status(500).send({ message: message });
                            return _context13.abrupt("return");

                        case 5:
                            if (req.params.version) {
                                _context13.next = 10;
                                break;
                            }

                            _message2 = "version property is missing.";

                            debug("Error: " + _message2);
                            res.status(500).send({ message: _message2 });
                            return _context13.abrupt("return");

                        case 10:
                            if (req.params.instance) {
                                _context13.next = 15;
                                break;
                            }

                            _message3 = "instance property is missing.";

                            debug("Error: " + _message3);
                            res.status(500).send({ message: _message3 });
                            return _context13.abrupt("return");

                        case 15:
                            instance = engine.getInstance(req.params.name, req.params.version, req.params.instance);

                            instance.stop();
                            res.sendStatus(200);

                        case 18:
                        case "end":
                            return _context13.stop();
                    }
                }
            }, _callee13, this);
        })).catch(function (err) {
            debug("Error: " + err);
            var message = err.message;
            res.status(500).send({ message: message });
        });
    });

    /**
     * @api {post} /machine/:name/version/:version/instance/:instance/event Send an event to an instance
     * @apiGroup Instance
     * @apiParam {String} name The name of the machine
     * @apiParam {String} version The version key
     * @apiParam {String} instance The instance key
     * @apiSuccess {Object} data
     * @apiSuccess {String} data.event The name of the event
     * @apiSuccess {Object} data.data The data that goes along with the event
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *         "event": "foo",
     *         "data": {
     *              "bar": 5
     *         }
     *    }
     * @apiErrorExample {json}
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "message": "error message"
     *    }
     */
    app.post('/machine/:name/version/:version/instance/:instance/event', app.auth.authenticate(), function (req, res) {
        debug("POST: '/machine/:name/version/instance/:instance/event");
        co(regeneratorRuntime.mark(function _callee14() {
            var message, _message4, _message5, _message6, instance;

            return regeneratorRuntime.wrap(function _callee14$(_context14) {
                while (1) {
                    switch (_context14.prev = _context14.next) {
                        case 0:
                            if (req.params.name) {
                                _context14.next = 5;
                                break;
                            }

                            message = "name property is missing.";

                            debug("Error: " + message);
                            res.status(500).send({ message: message });
                            return _context14.abrupt("return");

                        case 5:
                            if (req.params.version) {
                                _context14.next = 10;
                                break;
                            }

                            _message4 = "version property is missing.";

                            debug("Error: " + _message4);
                            res.status(500).send({ message: _message4 });
                            return _context14.abrupt("return");

                        case 10:
                            if (req.params.instance) {
                                _context14.next = 15;
                                break;
                            }

                            _message5 = "instance property is missing.";

                            debug("Error: " + _message5);
                            res.status(500).send({ message: _message5 });
                            return _context14.abrupt("return");

                        case 15:
                            if (req.body.event) {
                                _context14.next = 20;
                                break;
                            }

                            _message6 = "event is missing.";

                            debug("Error: " + _message6);
                            res.status(500).send({ message: _message6 });
                            return _context14.abrupt("return");

                        case 20:
                            instance = engine.getInstance(req.params.name, req.params.version, req.params.instance);
                            _context14.next = 23;
                            return instance.sendEvent(req.body.event, req.body.data);

                        case 23:
                            res.sendStatus(200);

                        case 24:
                        case "end":
                            return _context14.stop();
                    }
                }
            }, _callee14, this);
        })).catch(function (err) {
            debug("Error: " + err);
            var message = err.message;
            res.status(500).send({ message: message });
        });
    });

    /**
     * @api {put} /machine/:name/version/:version/instance/:instance/revert Revert an instance to a previous snapshot
     * @apiGroup Instance
     * @apiParam {String} name The name of the machine
     * @apiParam {String} version The version key
     * @apiParam {String} instance The instance key
     * @apiSuccess {Object} data
     * @apiSuccess {String} data.snapshotKey The key of the snapshot
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     * @apiErrorExample {json}
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "message": "error message"
     *    }
     */
    app.put('/machine/:name/version/:version/instance/:instance/revert', app.auth.authenticate(), function (req, res) {
        debug("PUT: '/machine/:name/version/instance/:instance/revert");
        co(regeneratorRuntime.mark(function _callee15() {
            var message, _message7, _message8, _message9, instance, snapshot;

            return regeneratorRuntime.wrap(function _callee15$(_context15) {
                while (1) {
                    switch (_context15.prev = _context15.next) {
                        case 0:
                            if (req.params.name) {
                                _context15.next = 5;
                                break;
                            }

                            message = "name property is missing.";

                            debug("Error: " + message);
                            res.status(500).send({ message: message });
                            return _context15.abrupt("return");

                        case 5:
                            if (req.params.version) {
                                _context15.next = 10;
                                break;
                            }

                            _message7 = "version property is missing.";

                            debug("Error: " + _message7);
                            res.status(500).send({ message: _message7 });
                            return _context15.abrupt("return");

                        case 10:
                            if (req.params.instance) {
                                _context15.next = 15;
                                break;
                            }

                            _message8 = "instance property is missing.";

                            debug("Error: " + _message8);
                            res.status(500).send({ message: _message8 });
                            return _context15.abrupt("return");

                        case 15:
                            if (req.body.snapshotKey) {
                                _context15.next = 20;
                                break;
                            }

                            _message9 = "snapshotKey is missing.";

                            debug("Error: " + _message9);
                            res.status(500).send({ message: _message9 });
                            return _context15.abrupt("return");

                        case 20:
                            instance = engine.getInstance(req.params.name, req.params.version, req.params.instance);
                            snapshot = engine.getSnapshotInfo(req.params.name, req.params.version, req.params.instance, req.body.snapshotKey);
                            _context15.next = 24;
                            return engine.revert(snapshot);

                        case 24:
                            res.sendStatus(200);

                        case 25:
                        case "end":
                            return _context15.stop();
                    }
                }
            }, _callee15, this);
        })).catch(function (err) {
            debug("Error: " + err);
            var message = err.message;
            res.status(500).send({ message: message });
        });
    });

    /**
     * @api {get} /machine/:name/version/:version/instance/:instance/snapshot/keys Get the snapshots keys
     * @apiGroup Snapshot
     * @apiParam {String} name The name of the machine
     * @apiParam {String} version The version key
     * @apiParam {String} instance The instance key
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *       "snapshotKeys": [
     *          "snapshot1",
     *          "snapshot2"
     *       ]
     *
     *    }
     * @apiErrorExample {json}
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "message": "error message"
     *    }
     */
    app.get('/machine/:name/version/:version/instance/:instance/snapshot/keys', app.auth.authenticate(), function (req, res) {
        debug("GET: '/machine/:name/version/instance/:instance/snapshot/keys");
        co(regeneratorRuntime.mark(function _callee16() {
            var message, _message10, _message11, snapshotsKeys;

            return regeneratorRuntime.wrap(function _callee16$(_context16) {
                while (1) {
                    switch (_context16.prev = _context16.next) {
                        case 0:
                            if (req.params.name) {
                                _context16.next = 5;
                                break;
                            }

                            message = "name property is missing.";

                            debug("Error: " + message);
                            res.status(500).send({ message: message });
                            return _context16.abrupt("return");

                        case 5:
                            if (req.params.version) {
                                _context16.next = 10;
                                break;
                            }

                            _message10 = "version property is missing.";

                            debug("Error: " + _message10);
                            res.status(500).send({ message: _message10 });
                            return _context16.abrupt("return");

                        case 10:
                            if (req.params.instance) {
                                _context16.next = 15;
                                break;
                            }

                            _message11 = "instance property is missing.";

                            debug("Error: " + _message11);
                            res.status(500).send({ message: _message11 });
                            return _context16.abrupt("return");

                        case 15:
                            snapshotsKeys = engine.getSnapshotsKeys(req.params.name, req.params.version, req.params.instance);

                            res.json({
                                snapshotsKeys: snapshotsKeys
                            });

                        case 17:
                        case "end":
                            return _context16.stop();
                    }
                }
            }, _callee16, this);
        })).catch(function (err) {
            debug("Error: " + err);
            var message = err.message;
            res.status(500).send({ message: message });
        });
    });

    /**
     * @api {get} /machine/:name/version/:version/instance/:instance/snapshot/:snapshot Get a snapshot by it's key
     * @apiGroup Snapshot
     * @apiParam {String} name The name of the machine
     * @apiParam {String} version The version key
     * @apiParam {String} instance The instance key
     * @apiParam {String} snapshot The snapshot key
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *    }
     * @apiErrorExample {json}
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "message": "error message"
     *    }
     */
    app.get('/machine/:name/version/:version/instance/:instance/snapshot/:snapshot', app.auth.authenticate(), function (req, res) {
        debug("GET: '/machine/:name/version/instance/:instance/snapshot/:snapshot");
        co(regeneratorRuntime.mark(function _callee17() {
            var message, _message12, _message13, _message14, snapshot;

            return regeneratorRuntime.wrap(function _callee17$(_context17) {
                while (1) {
                    switch (_context17.prev = _context17.next) {
                        case 0:
                            if (req.params.name) {
                                _context17.next = 5;
                                break;
                            }

                            message = "name property is missing.";

                            debug("Error: " + message);
                            res.status(500).send({ message: message });
                            return _context17.abrupt("return");

                        case 5:
                            if (req.params.version) {
                                _context17.next = 10;
                                break;
                            }

                            _message12 = "version property is missing.";

                            debug("Error: " + _message12);
                            res.status(500).send({ message: _message12 });
                            return _context17.abrupt("return");

                        case 10:
                            if (req.params.instance) {
                                _context17.next = 15;
                                break;
                            }

                            _message13 = "instance property is missing.";

                            debug("Error: " + _message13);
                            res.status(500).send({ message: _message13 });
                            return _context17.abrupt("return");

                        case 15:
                            if (req.params.snapshot) {
                                _context17.next = 20;
                                break;
                            }

                            _message14 = "snapshot is missing.";

                            debug("Error: " + _message14);
                            res.status(500).send({ message: _message14 });
                            return _context17.abrupt("return");

                        case 20:
                            snapshot = engine.getSnapshotInfo(req.params.name, req.params.version, req.params.instance, req.params.snapshot);

                            res.json(snapshot);

                        case 22:
                        case "end":
                            return _context17.stop();
                    }
                }
            }, _callee17, this);
        })).catch(function (err) {
            debug("Error: " + err);
            var message = err.message;
            res.status(500).send({ message: message });
        });
    });

    /**
     * @api {get} /machine/:name/version/:version/instance/:instance/snapshot Take a snapshot
     * @apiGroup Snapshot
     * @apiParam {String} name The name of the machine
     * @apiParam {String} version The version key
     * @apiParam {String} instance The instance key
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *    }
     * @apiErrorExample {json}
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "message": "error message"
     *    }
     */
    app.get('/machine/:name/version/:version/instance/:instance/snapshot', app.auth.authenticate(), function (req, res) {
        debug("GET: '/machine/:name/version/instance/:instance/snapshot");
        co(regeneratorRuntime.mark(function _callee18() {
            var message, _message15, _message16, instance, snapshot;

            return regeneratorRuntime.wrap(function _callee18$(_context18) {
                while (1) {
                    switch (_context18.prev = _context18.next) {
                        case 0:
                            if (req.params.name) {
                                _context18.next = 5;
                                break;
                            }

                            message = "name property is missing.";

                            debug("Error: " + message);
                            res.status(500).send({ message: message });
                            return _context18.abrupt("return");

                        case 5:
                            if (req.params.version) {
                                _context18.next = 10;
                                break;
                            }

                            _message15 = "version property is missing.";

                            debug("Error: " + _message15);
                            res.status(500).send({ message: _message15 });
                            return _context18.abrupt("return");

                        case 10:
                            if (req.params.instance) {
                                _context18.next = 15;
                                break;
                            }

                            _message16 = "instance property is missing.";

                            debug("Error: " + _message16);
                            res.status(500).send({ message: _message16 });
                            return _context18.abrupt("return");

                        case 15:
                            instance = engine.getInstance(req.params.name, req.params.version, req.params.instance);
                            _context18.next = 18;
                            return instance.getSnapshot();

                        case 18:
                            snapshot = _context18.sent;

                            res.json({
                                snapshot: snapshot
                            });

                        case 20:
                        case "end":
                            return _context18.stop();
                    }
                }
            }, _callee18, this);
        })).catch(function (err) {
            debug("Error: " + err);
            var message = err.message;
            res.status(500).send({ message: message });
        });
    });
};