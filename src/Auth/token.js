import jwt from 'jsonwebtoken';

import envs from '../../loadenv';

/**
 * @description This function generates token
 * @param {Object} user request object
 * @return {string} Token
 */
export default (user) => {
  const token = jwt.sign(
    { token: user._id }, envs.APP_SECRET, { expiresIn: '24h' },
  );
  return token;
};
