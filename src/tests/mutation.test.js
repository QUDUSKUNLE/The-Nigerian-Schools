const EasyGraphQLTester = require('easygraphql-tester');
const fs = require('fs');
const path = require('path');
const mockData = require('../__mock__/mockData');

const schema = fs.readFileSync(
  path.join(__dirname, '../schema/schema.graphql'), 'utf8'
);

const { data } = mockData;
describe('Test users and schools Mutation', () => {

  let tester
  beforeEach(() => { tester = new EasyGraphQLTester(schema); });

  describe('This test the user mutation schema', () => {
    describe('Should:', () => {
      it('throw an error if the variables are missing', () => {
        let error
        try {
          const mutation = `
            mutation signup {
              token
              user {
                id
                email
              }
            }
          `
          tester.mock(mutation)
        } catch (err) {
          error = err
        }
        expect(() => { tester.mock(mutation) }).toThrow();
      });

      it('allow a user signup successfully', () => {
        const mutation = `
          mutation Signup($Name: Name, $Email: Email, $Password: Password, $ConfirmPassword: ConfirmPassword) {
            signup(name: $Name, email: $Email, password: $Password, confirmPassword: $ConfirmPassword) {
              token
              user {
                email
                name
                availability
              }
            }
          }
        `
        const test = tester.mock(mutation, data.signup)
        expect(test.data.signup.user.availability).not.toBeNaN()
        expect(test.data.signup instanceof Object).toBeTruthy()
      });

      it('allow a user to login successfully', () => {
        const mutation = `
          mutation Login($Email: Email, $Password: Password) {
            login(email: $Email, password: $Password) {
              token
              user {
                email
                name
                availability
              }
            }
          }
        `
        const test = tester.mock(mutation, data.login)
        expect(test.data.login.user.availability).not.toBeNaN()
        expect(test.data.login instanceof Object).toBeTruthy()
      });

      it('allow a user to update his profile', () => {
        const mutation = `
          mutation Put($ID: ID, $Name: Name, $Email: Email) {
            put(id: $ID, name: $Name, email: $Email) {
              message
              success
              user {
                email
                name
                availability
              }
            }
          }
        `
        const test = tester.mock(mutation, data.put);
        expect(test.data.put.user.availability).not.toBeNaN();
        expect(test.data.put instanceof Object).toBeTruthy();
      });

      it('allow a user to delete his profile', () => {
        const mutation = `
          mutation Delete($ID: ID) {
            delete(id: $ID) {
              message
              success
            }
          }
        `
        const test = tester.mock(mutation, data.delete);
        expect(test.data.delete.message).not.toBeNaN();
        expect(test.data.delete instanceof Object).toBeTruthy();
      });
    });
  });
  describe('This test the schools mutation schema', () => {
    describe('Should:', () => {
      it('throw an error if the variables are missing', () => {
        let error
        try {
          const mutation = `
            mutation Register {
              register {
                message
                school {
                  id
                }
              }
            }
          `
          tester.mock(mutation)
        } catch (err) {
          error = err
        }
        expect(() => { tester.mock(mutation) }).toThrow();
      });
      it('allow a registered user to register a school', () => {
        const mutation = `
          mutation Register($Input: ObjectInput) {
            register(input: $Input) {
              message
              school {
                id
                school_name
                school_address
              }
            }
          }
        `
        const test = tester.mock(mutation, data.register)
        expect(test.data.register.message).not.toBeNaN()
        expect(test.data.register instanceof Object).toBeTruthy()
      });
      it('allow a registered user to update a registered school details', () => {
        const mutation = `
          mutation UpdateSchool($ID: ID, $Input: UpdateSchool) {
            updateSchool(id: $ID, input: $Input) {
              message
              school {
                id
                school_name
                school_address
              }
            }
          }
        `
        const test = tester.mock(mutation, data.updateSchool)
        expect(test.data.updateSchool.message).not.toBeNaN()
        expect(test.data.updateSchool instanceof Object).toBeTruthy()
      });
    });
  });
});
