import {body} from 'express-validator';


export const validateJob = [
  body('title').notEmpty().withMessage('Title is required').isString().withMessage('Title must be a string'),
  body('company').notEmpty().withMessage('Company is required').isString().withMessage('Company must be a string'),
  body('location').notEmpty().withMessage('Location is required').isString().withMessage('Location must be a string'),
  body('salary').notEmpty().withMessage('Salary is required').isNumeric().withMessage('Salary must be a number'),
  body('description').notEmpty().withMessage('Description is required').isString().withMessage('Description must be a string'),
  body('logo').optional().isString().withMessage('Logo must be a string if provided'),
  body('experience').notEmpty().withMessage('Experience is required').isString().withMessage('Experience must be a string'),
  body('currency').notEmpty().withMessage('Currency is required').isString().withMessage('Currency must be a string'),
  body('isBookMarked').optional().isBoolean().withMessage('isBookMarked must be a boolean'),
];



  export default validateJob
  