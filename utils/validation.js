const Joi = require( 'joi' );

// validating the task data using joi library
exports.validateTask = ( data ) => {
  const schema = Joi.object( {
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().valid( 'pending', 'in progress', 'completed' ).default( 'pending' ),
  } );

  return schema.validate( data );
};