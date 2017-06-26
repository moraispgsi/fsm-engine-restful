define({ "api": [
  {
    "type": "post",
    "url": "/api/engine/event",
    "title": "Send global event",
    "group": "Engine",
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
            "field": "data.event",
            "description": "<p>The name of the event</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.data",
            "description": "<p>The data that goes along with the event</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"event\": \"foo\",\n     \"data\": {\n          \"bar\": 5\n     }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webservice.js",
    "groupTitle": "Engine",
    "name": "PostApiEngineEvent"
  },
  {
    "type": "put",
    "url": "/api/engine/resume",
    "title": "Resumes the engine's execution",
    "group": "Engine",
    "success": {
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
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webservice.js",
    "groupTitle": "Engine",
    "name": "PutApiEngineResume"
  },
  {
    "type": "put",
    "url": "/api/engine/stop",
    "title": "Stops the engine",
    "group": "Engine",
    "success": {
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
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webservice.js",
    "groupTitle": "Engine",
    "name": "PutApiEngineStop"
  },
  {
    "type": "get",
    "url": "/api/machine/:name/version/:version/instance",
    "title": "Get all the instance keys",
    "group": "Instance",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the machine</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>The version key</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n    \"instancesKeys\": [\n          \"instance1\",\n          \"instance2\",\n          \"instance3\",\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webservice.js",
    "groupTitle": "Instance",
    "name": "GetApiMachineNameVersionVersionInstance"
  },
  {
    "type": "post",
    "url": "/api/machine/:name/version/:version/instance",
    "title": "Add a new instance to a version",
    "group": "Instance",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the machine</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>The version key</p>"
          }
        ]
      }
    },
    "success": {
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
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webservice.js",
    "groupTitle": "Instance",
    "name": "PostApiMachineNameVersionVersionInstance"
  },
  {
    "type": "post",
    "url": "/api/machine/:name/version/:version/instance/:instance/event",
    "title": "Send an event to an instance",
    "group": "Instance",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the machine</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>The version key</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instance",
            "description": "<p>The instance key</p>"
          }
        ]
      }
    },
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
            "field": "data.event",
            "description": "<p>The name of the event</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.data",
            "description": "<p>The data that goes along with the event</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"event\": \"foo\",\n     \"data\": {\n          \"bar\": 5\n     }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webservice.js",
    "groupTitle": "Instance",
    "name": "PostApiMachineNameVersionVersionInstanceInstanceEvent"
  },
  {
    "type": "put",
    "url": "/api/machine/:name/version/:version/instance/:instance/revert",
    "title": "Revert an instance to a previous snapshot",
    "group": "Instance",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the machine</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>The version key</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instance",
            "description": "<p>The instance key</p>"
          }
        ]
      }
    },
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
            "field": "data.snapshotKey",
            "description": "<p>The key of the snapshot</p>"
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
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webservice.js",
    "groupTitle": "Instance",
    "name": "PutApiMachineNameVersionVersionInstanceInstanceRevert"
  },
  {
    "type": "put",
    "url": "/api/machine/:name/version/:version/instance/:instance/start",
    "title": "Starts the instance",
    "group": "Instance",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the machine</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>The version key</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instance",
            "description": "<p>The instance key</p>"
          }
        ]
      }
    },
    "success": {
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
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webservice.js",
    "groupTitle": "Instance",
    "name": "PutApiMachineNameVersionVersionInstanceInstanceStart"
  },
  {
    "type": "put",
    "url": "/api/machine/:name/version/:version/instance/:instance/stop",
    "title": "Stops the instance",
    "group": "Instance",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the machine</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>The version key</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instance",
            "description": "<p>The instance key</p>"
          }
        ]
      }
    },
    "success": {
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
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webservice.js",
    "groupTitle": "Instance",
    "name": "PutApiMachineNameVersionVersionInstanceInstanceStop"
  },
  {
    "type": "delete",
    "url": "/api/machine/:name",
    "title": "Remove a machine",
    "group": "Machine",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the machine</p>"
          }
        ]
      }
    },
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
            "description": "<p>The name of the machine</p>"
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
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webservice.js",
    "groupTitle": "Machine",
    "name": "DeleteApiMachineName"
  },
  {
    "type": "get",
    "url": "/api/machine/",
    "title": "Get all the machines names",
    "group": "Machine",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n      \"machinesNames\": [\n          \"machineName1\",\n          \"machineName2\",\n          \"machineName3\"\n      ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webservice.js",
    "groupTitle": "Machine",
    "name": "GetApiMachine"
  },
  {
    "type": "post",
    "url": "/api/machine/",
    "title": "Add a new machine",
    "group": "Machine",
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
            "description": "<p>The name of the new machine</p>"
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
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webservice.js",
    "groupTitle": "Machine",
    "name": "PostApiMachine"
  },
  {
    "type": "get",
    "url": "/api/machine/:name/version/:version/instance/:instance/snapshot/:snapshot",
    "title": "Get a snapshot",
    "group": "Snapshot",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the machine</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>The version key</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instance",
            "description": "<p>The instance key</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "snapshot",
            "description": "<p>The snapshot key</p>"
          }
        ]
      }
    },
    "success": {
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
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webservice.js",
    "groupTitle": "Snapshot",
    "name": "GetApiMachineNameVersionVersionInstanceInstanceSnapshotSnapshot"
  },
  {
    "type": "get",
    "url": "/api/machine/:name/version",
    "title": "Get all the versions keys of a machine",
    "group": "Version",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the machine</p>"
          }
        ]
      }
    },
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
            "description": "<p>The name of the machine</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "  HTTP/1.1 200 OK\n {\n     \"versionsKeys\": [\n        \"version1\",\n        \"version2\",\n        \"version3\"\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webservice.js",
    "groupTitle": "Version",
    "name": "GetApiMachineNameVersion"
  },
  {
    "type": "get",
    "url": "/api/machine/:name/version/:version/info",
    "title": "Get the version information",
    "group": "Version",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the machine</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>The version key</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "  HTTP/1.1 200 OK\n {\n    \"isSealed\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webservice.js",
    "groupTitle": "Version",
    "name": "GetApiMachineNameVersionVersionInfo"
  },
  {
    "type": "get",
    "url": "/api/machine/:name/version/:version/model",
    "title": "Get the version SCXML model",
    "group": "Version",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the machine</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>The version key</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n    \"model\": \"<scxml></scxml>\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webservice.js",
    "groupTitle": "Version",
    "name": "GetApiMachineNameVersionVersionModel"
  },
  {
    "type": "post",
    "url": "/api/machine/:name/version",
    "title": "Add a new version to a machine",
    "description": "<p>Add a new version to a machine (the last version of the machine must already be sealed)</p>",
    "group": "Version",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the machine</p>"
          }
        ]
      }
    },
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
            "description": "<p>The name of the machine</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "  HTTP/1.1 200 OK\n {\n     \"versionsKeys\": [\n        \"version1\",\n        \"version2\",\n        \"version3\"\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webservice.js",
    "groupTitle": "Version",
    "name": "PostApiMachineNameVersion"
  },
  {
    "type": "put",
    "url": "/api/machine/:name/version/:version/model",
    "title": "Set the version's SCXML model",
    "group": "Version",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the machine</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>The version key</p>"
          }
        ]
      }
    },
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
            "field": "data.model",
            "description": "<p>The SCXML model</p>"
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
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webservice.js",
    "groupTitle": "Version",
    "name": "PutApiMachineNameVersionVersionModel"
  },
  {
    "type": "put",
    "url": "/api/machine/:name/version/:version/seal",
    "title": "Seals a version",
    "group": "Version",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the machine</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>The version key</p>"
          }
        ]
      }
    },
    "success": {
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
          "title": "HTTP/1.1 500 Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./webservice.js",
    "groupTitle": "Version",
    "name": "PutApiMachineNameVersionVersionSeal"
  }
] });
