var spec = 

{
  "swagger": "2.0",
  "info": {
    "title": "News API for TZ3",
    "description": "API for TZ3 at [https://vk.com/maxpfrontend](https://vk.com/maxpfrontend).",
    "version": "0.0.2"
  },
  "host": "127.0.0.1:5000",
  "basePath": "/api/v1",
  "schemes": [
    "http",
    "https"
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "securityDefinitions": {
    "UserSecurity": {
      "type": "apiKey",
      "in": "header",
      "name": "x-access-token"
    }
  },
  "paths": {
    "/users": {
      "post": {
        "summary": "Sign up",
        "operationId": "signUp",
        "parameters": [
          {
            "name": "user",
            "in": "body",
            "description": "User object",
            "required": true,
            "schema": {
              "type": "object",
              "required": [
                "username",
                "password",
                "g-recaptcha-response"
              ],
              "properties": {
                "username": {
                  "type": "string"
                },
                "password": {
                  "type": "string"
                },
                "g-recaptcha-response": {
                  "type": "string"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/UserSignInSuccess"
            }
          },
          "400": {
            "description": "Sign up error",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          },
          "401": {
            "description": "Captcha is not passed",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          },
          "default": {
            "description": "Unexpected error",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          }
        }
      }
    },
    "/users/{id}": {
      "get": {
        "summary": "Get user info by ID",
        "security": [
          {
            "UserSecurity": []
          }
        ],
        "operationId": "getUser",
        "parameters": [
          {
            "name": "id",
            "description": "User ID",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "object",
              "required": [
                "user"
              ],
              "properties": {
                "user": {
                  "type": "object",
                  "required": [
                    "_id",
                    "username",
                    "displayName",
                    "__v",
                    "type"
                  ],
                  "properties": {
                    "_id": {
                      "type": "string"
                    },
                    "username": {
                      "type": "string"
                    },
                    "displayName": {
                      "type": "string"
                    },
                    "googleId": {
                      "type": "string"
                    },
                    "__v": {
                      "type": "string"
                    },
                    "type": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Not authenticated",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          },
          "403": {
            "description": "Not allowed to view requested profile",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          },
          "404": {
            "description": "User not found",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          },
          "default": {
            "description": "Unexpected error",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          }
        }
      }
    },
    "/auth": {
      "x-swagger-router-controller": "user",
      "post": {
        "summary": "Sign in",
        "operationId": "signIn",
        "parameters": [
          {
            "name": "user",
            "in": "body",
            "description": "User credentials",
            "required": true,
            "schema": {
              "type": "object",
              "required": [
                "username",
                "password"
              ],
              "properties": {
                "username": {
                  "type": "string"
                },
                "password": {
                  "type": "string"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/UserSignInSuccess"
            }
          },
          "401": {
            "description": "Bad credentials",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          },
          "default": {
            "description": "Unexpected error",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          }
        }
      }
    },
    "/auth/google": {
      "post": {
        "summary": "Sign up/sign in with Google authentication token",
        "consumes": [
          "application/x-www-form-urlencoded"
        ],
        "parameters": [
          {
            "name": "token",
            "in": "formData",
            "description": "Google auth token",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/UserSignInSuccess"
            }
          },
          "401": {
            "description": "Bad Google token",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          }
        }
      }
    },
    "/feeds": {
      "get": {
        "summary": "Get all news",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "object",
              "required": [
                "feeds"
              ],
              "properties": {
                "feeds": {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/NewsItemResponseBody"
                  }
                }
              }
            }
          },
          "default": {
            "description": "Unexpected error",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          }
        }
      },
      "post": {
        "summary": "Create a news item",
        "security": [
          {
            "UserSecurity": []
          }
        ],
        "parameters": [
          {
            "name": "item",
            "in": "body",
            "description": "News item",
            "required": true,
            "schema": {
              "$ref": "#/definitions/NewsItemRequest"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/NewsItemResponse"
            }
          },
          "400": {
            "description": "Empty title or content",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          },
          "401": {
            "description": "Not authenticated",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          },
          "default": {
            "description": "Unexpected error",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          }
        }
      }
    },
    "/feeds/{id}": {
      "get": {
        "summary": "Get a news item by ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "News item ID",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/NewsItemResponse"
            }
          },
          "400": {
            "description": "Bad ID",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          },
          "404": {
            "description": "News item not found",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          },
          "default": {
            "description": "Unexpected error",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          }
        }
      },
      "put": {
        "summary": "Update a news item",
        "security": [
          {
            "UserSecurity": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "News item ID",
            "required": true,
            "type": "string"
          },
          {
            "name": "feed",
            "in": "body",
            "description": "News item content",
            "required": true,
            "schema": {
              "$ref": "#/definitions/NewsItemRequest"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/NewsItemResponse"
            }
          },
          "400": {
            "description": "Empty title or content",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          },
          "401": {
            "description": "Not authenticated",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          },
          "403": {
            "description": "User ID doesn't match author ID",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          },
          "default": {
            "description": "Unexpected error",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          }
        }
      },
      "delete": {
        "summary": "Delete a news item",
        "security": [
          {
            "UserSecurity": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "News item ID",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "object",
              "required": [
                "_id"
              ],
              "properties": {
                "_id": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Not authenticated",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          },
          "403": {
            "description": "User ID doesn't match author ID",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          },
          "default": {
            "description": "Unexpected error",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          }
        }
      }
    },
    "/swagger": {
      "x-swagger-pipe": "swagger_raw"
    }
  },
  "definitions": {
    "ErrorResponse": {
      "properties": {
        "error": {
          "type": "string"
        }
      }
    },
    "NewsItemResponse": {
      "type": "object",
      "properties": {
        "feed": {
          "$ref": "#/definitions/NewsItemResponseBody"
        }
      }
    },
    "NewsItemResponseBody": {
      "type": "object",
      "properties": {
        "_id": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "content": {
          "type": "string"
        },
        "creator": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "displayName": {
              "type": "string"
            }
          }
        },
        "__v": {
          "type": "number"
        },
        "createDate": {
          "type": "string"
        }
      }
    },
    "NewsItemRequest": {
      "type": "object",
      "required": [
        "title",
        "content"
      ],
      "properties": {
        "title": {
          "type": "string"
        },
        "content": {
          "type": "string"
        }
      }
    },
    "UserSignInSuccess": {
      "properties": {
        "token": {
          "type": "string"
        }
      }
    }
  }
}