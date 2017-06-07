define({ "api": [
  {
    "type": "post",
    "url": "/API/instance/all",
    "title": "Gets every instance",
    "group": "Instance",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[\n  {\n      \"id\": 1,\n      \"versionId\": 1,\n      \"hasStarted\": false,\n      \"hasEnded\": false,\n      \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n      \"created_at\": \"2016-02-10T15:46:51.778Z\"\n  }, {\n      \"id\": 2,\n      \"versionId\": 1,\n      \"hasStarted\": false,\n      \"hasEnded\": false,\n      \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n      \"created_at\": \"2016-02-10T15:46:51.778Z\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/instanceAPI.js",
    "groupTitle": "Instance",
    "name": "PostApiInstanceAll"
  },
  {
    "type": "post",
    "url": "/API/instance/allRunning",
    "title": "Gets every instance that is currently running(has started and has not ended)",
    "group": "Instance",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[\n  {\n      \"id\": 1,\n      \"versionId\": 1,\n      \"hasStarted\": true,\n      \"hasEnded\": false,\n      \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n      \"created_at\": \"2016-02-10T15:46:51.778Z\"\n  }, {\n      \"id\": 2,\n      \"versionId\": 1,\n      \"hasStarted\": true,\n      \"hasEnded\": false,\n      \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n      \"created_at\": \"2016-02-10T15:46:51.778Z\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/instanceAPI.js",
    "groupTitle": "Instance",
    "name": "PostApiInstanceAllrunning"
  },
  {
    "type": "post",
    "url": "/API/instance/allStopped",
    "title": "Gets every instance that is currently stopped(has not started or has ended)",
    "group": "Instance",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[\n  {\n      \"id\": 1,\n      \"versionId\": 1,\n      \"hasStarted\": true,\n      \"hasEnded\": true,\n      \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n      \"created_at\": \"2016-02-10T15:46:51.778Z\"\n  }, {\n      \"id\": 2,\n      \"versionId\": 1,\n      \"hasStarted\": false,\n      \"hasEnded\": false,\n      \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n      \"created_at\": \"2016-02-10T15:46:51.778Z\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/instanceAPI.js",
    "groupTitle": "Instance",
    "name": "PostApiInstanceAllstopped"
  },
  {
    "type": "post",
    "url": "/API/instance/create",
    "title": "Creates an instance using the version id",
    "group": "Instance",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": "<p>The version id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"instanceId\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/instanceAPI.js",
    "groupTitle": "Instance",
    "name": "PostApiInstanceCreate"
  },
  {
    "type": "post",
    "url": "/API/instance/getById",
    "title": "Get an instance",
    "group": "Instance",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": "<p>The instance id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"versionId\": 1,\n  \"hasStarted\": false,\n  \"hasEnded\": false,\n  \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n  \"created_at\": \"2016-02-10T15:46:51.778Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/instanceAPI.js",
    "groupTitle": "Instance",
    "name": "PostApiInstanceGetbyid"
  },
  {
    "type": "post",
    "url": "/API/instance/getVersion",
    "title": "Gets the version of the instance",
    "group": "Instance",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": "<p>The version id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"versionID\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/instanceAPI.js",
    "groupTitle": "Instance",
    "name": "PostApiInstanceGetversion"
  },
  {
    "type": "post",
    "url": "/API/instance/revert",
    "title": "Reverts an instance to a previous snapshot",
    "group": "Instance",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": "<p>The instance id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.snapshotID",
            "description": "<p>The id of the snapshot</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/instanceAPI.js",
    "groupTitle": "Instance",
    "name": "PostApiInstanceRevert"
  },
  {
    "type": "post",
    "url": "/API/instance/sendEvent",
    "title": "Send an event to an instance",
    "group": "Instance",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": "<p>The instance id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.event",
            "description": "<p>The event to send</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.data",
            "description": "<p>The data to send along with the event</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/instanceAPI.js",
    "groupTitle": "Instance",
    "name": "PostApiInstanceSendevent"
  },
  {
    "type": "post",
    "url": "/API/instance/snapshot",
    "title": "Gets a snapshot of the instance",
    "group": "Instance",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": "<p>The instance id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n    \"id\": 2,\n    \"state\": \"running\",\n    \"datamodel\": {},\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/instanceAPI.js",
    "groupTitle": "Instance",
    "name": "PostApiInstanceSnapshot"
  },
  {
    "type": "post",
    "url": "/API/instance/start",
    "title": "Starts an instance",
    "group": "Instance",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": "<p>The instance id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"versionId\": 1,\n  \"hasStarted\": false,\n  \"hasEnded\": false,\n  \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n  \"created_at\": \"2016-02-10T15:46:51.778Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/instanceAPI.js",
    "groupTitle": "Instance",
    "name": "PostApiInstanceStart"
  },
  {
    "type": "post",
    "url": "/API/fsm/allVersions",
    "title": "Gets all the versions of the state machine",
    "group": "StateMachine",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": "<p>The id of the state machine</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[\n   {\n     \"id\": 2,\n     \"fsmID\": 1,\n     \"isSealed\": false,\n     \"scxml\": \"<scxml></scxml>\",\n     \"parentVersionID\": 1,\n     \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n     \"created_at\": \"2016-02-10T15:46:51.778Z\"\n   }, {\n     \"id\": 3,\n     \"fsmID\": 1,\n     \"isSealed\": false,\n     \"scxml\": \"<scxml></scxml>\",\n     \"parentVersionID\": 2,\n     \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n     \"created_at\": \"2016-02-10T15:46:51.778Z\"\n   }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/fsmAPI.js",
    "groupTitle": "StateMachine",
    "name": "PostApiFsmAllversions"
  },
  {
    "type": "post",
    "url": "/API/fsm/create",
    "title": "Creates a new state machine",
    "group": "StateMachine",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.name",
            "description": "<p>The name of the state machine</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"fsmID\": 1,\n  \"versionID\": 1,\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/fsmAPI.js",
    "groupTitle": "StateMachine",
    "name": "PostApiFsmCreate"
  },
  {
    "type": "post",
    "url": "/API/fsm/getById",
    "title": "Gets a state machine by its id",
    "group": "StateMachine",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>The name of the state machine</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"name\": \"myfsm\",\n  \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n  \"created_at\": \"2016-02-10T15:46:51.778Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/fsmAPI.js",
    "groupTitle": "StateMachine",
    "name": "PostApiFsmGetbyid"
  },
  {
    "type": "post",
    "url": "/API/fsm/getByName",
    "title": "Gets a state machine by its name",
    "group": "StateMachine",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>The name of the state machine</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"name\": \"myfsm\",\n  \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n  \"created_at\": \"2016-02-10T15:46:51.778Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/fsmAPI.js",
    "groupTitle": "StateMachine",
    "name": "PostApiFsmGetbyname"
  },
  {
    "type": "post",
    "url": "/API/fsm/latestSealedVersion",
    "title": "Gets the latest sealed version of the state machine",
    "group": "StateMachine",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": "<p>The id of the state machine</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 2,\n  \"fsmID\": 1,\n  \"isSealed\": true,\n  \"scxml\": \"<scxml></scxml>\",\n  \"parentVersionID\": 1,\n  \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n  \"created_at\": \"2016-02-10T15:46:51.778Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/fsmAPI.js",
    "groupTitle": "StateMachine",
    "name": "PostApiFsmLatestsealedversion"
  },
  {
    "type": "post",
    "url": "/API/fsm/latestVersion",
    "title": "Gets the latest version of the state machine",
    "group": "StateMachine",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": "<p>The id of the state machine</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 2,\n  \"fsmID\": 1,\n  \"isSealed\": false,\n  \"scxml\": \"<scxml></scxml>\",\n  \"parentVersionID\": 1,\n  \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n  \"created_at\": \"2016-02-10T15:46:51.778Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/fsmAPI.js",
    "groupTitle": "StateMachine",
    "name": "PostApiFsmLatestversion"
  },
  {
    "type": "post",
    "url": "/API/fsm/newVersion",
    "title": "Creates a new version of the finite state machine if the latest version is sealed",
    "group": "StateMachine",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": "<p>The id of the state machine</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"versionID\": 1,\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/fsmAPI.js",
    "groupTitle": "StateMachine",
    "name": "PostApiFsmNewversion"
  },
  {
    "type": "post",
    "url": "/API/version/all",
    "title": "Gets all existing versions",
    "group": "Version",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[\n  {\n     \"id\": 1,\n     \"fsmID\": 1,\n     \"parentVersionID\": 1,\n     \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n     \"created_at\": \"2016-02-10T15:46:51.778Z\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/versionAPI.js",
    "groupTitle": "Version",
    "name": "PostApiVersionAll"
  },
  {
    "type": "post",
    "url": "/API/version/allInstances",
    "title": "Gets all the instances of a version of a state machine",
    "group": "Version",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": "<p>The id of the version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[\n  {\n      \"id\": 1,\n      \"versionID\": 1,\n      \"hasStarted\": false,\n      \"hasEnded\": false,\n      \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n      \"created_at\": \"2016-02-10T15:46:51.778Z\"\n  }, {\n      \"id\": 2,\n      \"versionID\": 1,\n      \"hasStarted\": true,\n      \"hasEnded\": false,\n      \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n      \"created_at\": \"2016-02-10T15:46:51.778Z\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/versionAPI.js",
    "groupTitle": "Version",
    "name": "PostApiVersionAllinstances"
  },
  {
    "type": "post",
    "url": "/API/version/allRunningInstances",
    "title": "Gets all the running instances of a version of a state machine",
    "group": "Version",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": "<p>The id of the version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[\n  {\n      \"id\": 1,\n      \"versionID\": 1,\n      \"hasStarted\": true,\n      \"hasEnded\": false,\n      \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n      \"created_at\": \"2016-02-10T15:46:51.778Z\"\n  }, {\n      \"id\": 2,\n      \"versionID\": 1,\n      \"hasStarted\": true,\n      \"hasEnded\": false,\n      \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n      \"created_at\": \"2016-02-10T15:46:51.778Z\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/versionAPI.js",
    "groupTitle": "Version",
    "name": "PostApiVersionAllrunninginstances"
  },
  {
    "type": "post",
    "url": "/API/version/getById",
    "title": "Gets a version by its id",
    "group": "Version",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[\n  {\n     \"id\": 1,\n     \"fsmID\": 1,\n     \"isSealed\": false,\n     \"scmxl\": \"<scxml></scxml>\",\n     \"parentVersionID\": 1,\n     \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n     \"created_at\": \"2016-02-10T15:46:51.778Z\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/versionAPI.js",
    "groupTitle": "Version",
    "name": "PostApiVersionGetbyid"
  },
  {
    "type": "post",
    "url": "/API/version/seal",
    "title": "Seals a version",
    "group": "Version",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": "<p>The id of the version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/versionAPI.js",
    "groupTitle": "Version",
    "name": "PostApiVersionSeal"
  },
  {
    "type": "post",
    "url": "/API/version/setSCXML",
    "title": "Set the SCXML of a version",
    "group": "Version",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.id",
            "description": "<p>The id of the version</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "data.scmxl",
            "description": "<p>The SCXML markup to set to the version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "API/versionAPI.js",
    "groupTitle": "Version",
    "name": "PostApiVersionSetscxml"
  }
] });
