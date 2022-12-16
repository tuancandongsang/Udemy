'use strict';

/**
 * customer-story service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::customer-story.customer-story');
