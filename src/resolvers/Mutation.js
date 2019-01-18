import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import envs from '../../loadenv';
import User from '../models/User';
import Schools from '../models/Schools';
import token from '../Auth/token';


export default {

/**
* signup a new user
*/
  signup: async (root, { name, email, password, confirmPassword }) => {
    try {
      if (password !== confirmPassword) {
        return new Error('Passwords did not match');
      }
      const newUser = new User({ name, email, password });
      const user = await newUser.save();
      const tokn = token(user);
      return { token: tokn, user };
    } catch (e) { return e; }
  },

  /**
  * register a new school
  */
  register: async (root, args, context, info) => {
    try {
      const Authorization = context.request.headers.authorization;
      if (!Authorization) return new Error('No valid token is provided');
      const token = Authorization.replace('Bearer ', '');
      const userId = jwt.verify(token, envs.APP_SECRET);
      const user = await User.findById({ _id: userId.token })
      if (!user) return new Error('User does not exist');
      const {
        name, address, school_class,
        school_convention, school_contacts,
        school_section, school_type
      } = args.input;
      const newSchool = new Schools({
        school_name: name,
        school_address: address,
        school_proprietor: { id: user._id, name: user.name },
        school_section: school_section,
        school_type: school_type,
        school_class: school_class,
        school_convention: school_convention,
        school_contacts: school_contacts,
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
      return { message: 'Here' }
    } catch (e) { return e.message }
  },

  /**
  * login a register user
  */
  login: async (root, args) => {
    try {
      const user = await User.findOne({ email: args.email });
      if (!user) return new Error('User not found');
      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) return new Error('Email or password is incorrect');
      const tokn = token(user);
      return { token: tokn, user };
    } catch (e) {
      return e; }
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
      if (userId.token !== args.id) {
        return new Error('Unauthorized to perform operation');
      }
      const users = await User.findById({ _id: args.id })
      if (!users) {
        return new Error('User does not exist');
      } 
      const user = await User.findOneAndUpdate({ _id: id }, { $set: { name, email } }).exec();
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
        return new Error('Unauthorized to perform operation');
      }
      const user  = await User.findById({ _id: args.id })
      if (!user) {
        return new Error('User does not exist');
      } 
      const res = await User.findOneAndDelete({ _id: args.id });
      return { message: 'Account deleted successfully', success: true };
    } catch (e) { return e; }
  }
};
