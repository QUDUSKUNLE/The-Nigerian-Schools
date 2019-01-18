import User from '../models/User';
import Schools from '../models/Schools';

export default {
  user: async (root, args, context, info) => {
    try {
      const res = await User.findOne({ _id: args.id });
      return res;
    } catch (e) { return e.message; }
  },

  users: async (root, args, context, info) => {
    try {
      const res = await User.find({}).populate();
      return res;
    } catch (e) { return e.message; }
  },

  school: async (root, args, context, info) => {
    try {
      const res = await Schools.findOne({ _id: args.id });
      return res;
    } catch (e) { return e.message; }
  },

  schools: async (root, args, context, info) => {
    try {
      const schools = await Schools.find({}).populate();
      return schools;
    } catch (e) { return e.message; }
  }
};
