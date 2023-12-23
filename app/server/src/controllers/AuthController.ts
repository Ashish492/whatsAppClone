import { Controller } from '@models';

export default class AuthController {
  static loginSuccess: Controller = (req, res) => {
    res.status(200).json({
      message: 'user logged in successfully',
      user: req.user,
    });
  };

  static loginFailed: Controller = (req, res) => {
    res.json({
      message: 'unable to login try Again',
    });
  };
}
