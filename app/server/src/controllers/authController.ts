import { Controller } from '@models';
export const loginSuccess: Controller = (req, res) => {
  res.status(400).json({
    message: 'user logged in successfully',
    user: req.user,
  });
};
export const loginFailed: Controller = (req, res) => {
  res.json({
    message: 'unable to login try Again',
  });
};
