import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import envs from '../../loadenv';
import User from '../models/User';
import Schools from '../models/Schools';
import authToken from '../Auth/token';
import updateSchool from '../helpers';


const SALT_WORK_FACTOR = 10;

export default {

/**
* signup a new user
*/
  signup: async (root, args, context, info) => {
    try {
      if (args.password !== args.confirmPassword) {
        return new Error('Passwords did not match');
      }
      const password = await bcrypt.hash(args.password, SALT_WORK_FACTOR);
      const { name, email} = args;
      const newUser = new User({ name, email, password });
      const user = await newUser.save();
      const token = authToken(user);
      return { token, user };
    } catch (e) { return e; }
  },

  /**
  * register a new school
  */
  register: async (root,  {
      name, address, school_class,
      school_convention, school_contacts,
      school_section, school_type
    }, context, info) => {
    try {
      const { authorization } = context.request.headers;
      if (!authorization) throw new Error('No valid token is provided');
      const token = authorization.replace('Bearer ', '');
      const userId = jwt.verify(token, envs.APP_SECRET);
      const user = await User.findById({ _id: userId.token })
      if (!user) throw new Error('User does not exist');
      const newSchool = new Schools({
        school_name: name,
        school_address: address,
        school_proprietor: { id: user._id, name: user.name },
        school_section,
        school_type,
        school_class,
        school_convention,
        school_contacts,
      });
      const school = await newSchool.save();
      return {
        school,
        message: 'School registered successfully' };
    } catch (e) { return e; }
  },

  /**
  * update a school
  */
  updateSchool: async (root, args, context, info ) => {
    try {
      debugger;
      if (!args.id) throw new Error('School id is required');
      const school = await Schools.findById({ _id: args.id });
      if (!school) throw new Error('School does not exist');
      const updatedSchool = await Schools.findByIdAndUpdate(
        { _id: args.id },
        { $set: updateSchool(args) },
        { new: true, useFindAndModify: false  },
      ).exec();
      return { message: 'Updated school successfully', school: updatedSchool };
    } catch (e) { return e }
  },

  /**
  * login a register user
  */
  login: async (root, { email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error('User not found');
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Email or password is incorrect');
      const token = authToken(user);
      return { token, user };
    } catch (e) {
      return e;
    }
  },

  /**
  * update a user profile
  */
  put: async (root, { id, name, email }) => {
    try {
      const Authorization = context.request.headers.authorization;
      if (!Authorization) {
        return new Error('No valid token is provided');
      }
      const token = Authorization.replace('Bearer ', '');
      const userId = jwt.verify(token, envs.APP_SECRET);
      if (userId.token !== id) {
        return new Error('Unauthorized to perform operation');
      }
      const users = await User.findById({ id })
      if (!users) {
        return new Error('User does not exist');
      } 
      const user = await User.findOneAndUpdate(
        { id }, { $set: { name, email } }, { new: true }).exec();
      return { message: 'Account updated successfully', success: true, user };
    } catch (e) { return e; }
  },

  /**
  * delete a user profile
  */
  delete: async (root, args, context, info) => {
    try {
      const Authorization = context.request.headers.authorization;
      if (!Authorization) {
        return new Error('No valid token is provided');
      }

      const token = Authorization.replace('Bearer ', '');
      const userId = jwt.verify(token, envs.APP_SECRET);
      if (userId.token !== args.id) {
        throw new Error('Unauthorized to perform operation');
      }
      const user  = await User.findById({ _id: args.id })
      if (!user) {
        throw new Error('User does not exist');
      } 
      const res = await User.findOneAndDelete({ _id: args.id });
      return { message: 'Account deleted successfully', success: true };
    } catch (e) { return e; }
  }
};
