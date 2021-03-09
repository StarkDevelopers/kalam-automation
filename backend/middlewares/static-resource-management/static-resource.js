const path = require('path')

const express = require('express')

function staticResourcesFromUtility(app, rootDirectory) {
  /**
   * Serving static files in Express from views/utils directory
   * Most of the requests for these kind of resources will be from EJS Templates
   */
  app.use('/static', express.static(path.join(rootDirectory, 'public')))
}

function frontendResources(app, rootDirectory) {
  /**
   * Serving static files in Express from client directory
   */
  app.use(express.static(path.join(rootDirectory, 'client')))

  /**
   * Serving Angular App for all other routes
   */
  app.get('*', function (req, res) {
    res.sendFile(path.join(rootDirectory, 'client', 'index.html'))
  })
}

module.exports = {
  frontendResources,
  staticResourcesFromUtility,
}
