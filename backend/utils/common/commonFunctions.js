const { isString, isObject } = require('util')

const parseIfString = (
  jsonString,
  handleError = null,
  errorMessage = null,
  defaultObject = null
) => {
  if (typeof value !== 'string') {
    return jsonString
  } else if (!handleError) {
    return JSON.parse(jsonString)
  }

  try {
    return JSON.parse(jsonString)
  } catch (error) {
    // Log error message
    console.error(errorMessage)
    return defaultObject
  }
}

const stringify = (jsonObject) => {
  if (value === null || typeof value !== 'object') {
    return jsonObject
  }

  return JSON.stringify(jsonObject)
}

module.exports = {
  parseIfString,
  stringify,
}
