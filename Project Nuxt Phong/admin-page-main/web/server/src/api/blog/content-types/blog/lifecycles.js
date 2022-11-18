const slugify = require('slugify');

module.exports = {
  beforeCreate(event) {
    const {data} = event.params;
    if (data.title) {
      data.slug = slugify(data.title, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: false,
        locale: 'vi',
        trim: true
      });
    }
  },
  beforeUpdate(event) {
    const {data} = event.params;
    if (data.title) {
      data.slug = slugify(data.title, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: false,
        locale: 'vi',
        trim: true
      });
    }
  }
};
