module.exports = function(deployTarget) {

  var ENV = {
    build: {
      environment: deployTarget
    }
  };

  return ENV;

};