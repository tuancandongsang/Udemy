'use strict';

/**
 * apply-for-work service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::apply-for-work.apply-for-work');
