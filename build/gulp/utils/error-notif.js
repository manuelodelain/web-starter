var notify = require('gulp-notify');

module.exports = notify.onError(function(error){
  console.log(error);

  return {
    title: 'Error',
    message:  '<%= error.message %>' 
  };
});