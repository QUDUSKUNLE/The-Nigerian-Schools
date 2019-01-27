const EasyGraphQLTester = require('easygraphql-tester');
const fs = require('fs');
const path = require('path');

const schema = fs.readFileSync(
  path.join(__dirname, '../schema/schema.graphql'), 'utf8'
);


describe('Test users and schools Query Schema: ', () => {

  let tester
  beforeEach(() => { tester = new EasyGraphQLTester(schema) });

  describe('This test the user and users query schema', () => {
    describe('Should', () => {
      it('not pass with invalid query user with Int as id', () => {
        const invalidQuery = `
          {
            user(id: 2) {
              id
              email
              name
              availability
            }
          }
        `
        tester.test(false, invalidQuery)
      });

      it('pass if the query id is a valid String', () => {
        const validQuery = `
          {
            user(id: "12345678hjqd") {
              email
              id
              name
              availability
            }
          }
        `
        tester.test(true, validQuery)
      });

      it('not pass with no query id', async () => {
        const invalidQuery = `
          {
            user() {
              email
              id
              name
              availability
            }
          }
        `
        tester.test(false, invalidQuery)
      });
    });

    describe('Should', () => {
      it('pass with valid query in users with a filter', () => {
        const validQuery = `
          {
            users(filter: 2) {
              count
              users {
                id
                name
              }
            }
          }
        `
        tester.test(true, validQuery);
      });

      it('pass with no query filter', () => {
        const validQuery = `
          {
            users(filter: "Gere") {
              count
              users {
                email
                id
                name
                availability
              }
            }
          }
        `
        tester.test(true, validQuery)
      });

      it('pass with query filter as a string, skip and first are Int', () => {
        const validQuery = `
          {
            users (filter: "kemi", skip: 1, first: 4) {
              count
              users {
                email
                id
                name
                availability
              }
            }
          }
        `
        tester.test(true, validQuery)
      });
    });
  });

  describe('This test the school and schools query schema', () => {
    describe('Should', () => {
      it('not pass with invalid query school with Int as id', () => {
        const invalidQuery = `
          {
            school(id: 2) {
              id
              school_name
              school_address
            }
          }
        `
        tester.test(false, invalidQuery)
      });
      it('pass if the query id is a valid String', () => {
        const validQuery = `
          {
            school(id: "12345678hjqd") {
              id
              school_name
              school_address
            }
          }
        `
        tester.test(true, validQuery)
      });

      it('not pass with no query id', async () => {
        const invalidQuery = `
          {
            school() {
              id
              school_name
              school_address
            }
          }
        `
        tester.test(false, invalidQuery)
      })
    });

    describe('Should', () => {
      it('pass with valid query in users with a filter', () => {
        const validQuery = `
          {
            schools(filter: 2) {
              count
              schools {
                id
                school_name
                school_address
              }
            }
          }
        `
        tester.test(true, validQuery);
      });

      it('pass with query filter', () => {
        const validQuery = `
          {
            schools(filter: "Gere") {
              count
              schools {
                id
                school_name
                school_address
              }
            }
          }
        `
        tester.test(true, validQuery)
      });

      it('pass with query filter as a string, skip and first are Int', () => {
        const validQuery = `
          {
            schools (filter: "kemi", skip: 1, first: 4) {
              count
              schools {
                id
                school_name
                school_address
              }
            }
          }
        `
        tester.test(true, validQuery)
      });
    });
  });
});
