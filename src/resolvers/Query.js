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
    const where = args.filter ? { $text: { $search: `${args.filter}` } } : {};
    const { skip, first } = args;
    try {
      const count = await User.countDocuments();
      const res = await User.find(where).skip(skip).limit(first);
      return {
        count: count,
        users: res
      };
    } catch (e) { return e.message; }
  },

  school: async (root, args, context, info) => {
    try {
      const res = await Schools.findOne({ _id: args.id });
      return res;
    } catch (e) { return e.message; }
  },

  schools: async (root, args, context, info) => {
    const where = args.filter ? { $text: { $search: `${args.filter}` } } : {};
    const { skip, first } = args;
    try {
      const count = await Schools.countDocuments();
      const school = await Schools.find(where).skip(skip).limit(first);
      return { count: count, schools: school };
    } catch (e) { return e.message; }
  }
};
