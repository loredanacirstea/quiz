import React, { Component } from 'react';
import { render } from 'react-dom'
import { renderRoutes } from '../imports/startup/client/routes.jsx';

Meteor.startup(function() {
  render(renderRoutes(), document.getElementById('SQapp'));
});