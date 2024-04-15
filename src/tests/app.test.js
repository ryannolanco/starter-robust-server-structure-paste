const request = require("supertest");
const pastes = require("../../src/data/pastes-data");
const app = require("../../src/app");

describe("path /pastes", () => {
  // CLEAR OUT ALL ARRAYS FROM DATA JS BEFORE RUNNING TEST
  beforeEach(() => {
    pastes.splice(0, pastes.length);
  });

  describe("GET method", () => {
    it("returns an array of pastes", async () => {
      const expected = [
        {
          id: 1,
          user_id: 1,
          name: "Hello",
          syntax: "None",
          expiration: 10,
          exposure: "private",
          text: "Hello World!"
        },
        {
          id: 2,
          user_id: 1,
          name: "Hello World in Python",
          syntax: "Python",
          expiration: 24,
          exposure: "public",
          text: "print(Hello World!)"
        },
        {
          id: 3,
          user_id: 2,
          name: "String Reverse in JavaScript",
          syntax: "Javascript",
          expiration: 24,
          exposure: "public",
          text: "const stringReverse = str => str.split('').reverse().join('');"
        }
      ];

      pastes.push(...expected);

      const response = await request(app).get("/pastes");

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(expected);
    });
  });
});
/* Keep in mind that the callback function passed as a second argument to the test() 
method describes the steps for testing the API endpoint. First, an expected array is 
defined which contains a list of paste objects. Then, copies of the expected paste 
objects are added to the pastes array. Next, the test runs await 
request(app).get("/pastes") to send an API request to the GET /pastes endpoint, 
and the response of the asynchronous call is stored in a response variable. 
Finally, the test uses the expect() method in conjunction with the toBe() and 
toEqual() matchers to ensure that the response status code and response body, 
respectively, contain the expected results.*/

describe("POST method", () => {
  it("creates a new paste and assigns id", async () => {
    const newPaste = {
      name: "String Reverse in JavaScript",
      syntax: "Javascript",
      expiration: 24,
      exposure: "public",
      text: "const stringReverse = str => str.split('').reverse().join('');"
    };
    const response = await request(app)
      .post("/pastes")
      .set("Accept", "application/json")
      .send({ data: newPaste });

    expect(response.status).toBe(201);
    expect(response.body.data).toEqual({
      id: 5,
      ...newPaste,
    });
  });

  it("returns 400 if name is missing", async () => {
    const response = await request(app)
      .post("/pastes")
      .set("Accept", "application/json")
      .send({ data: { syntax: "Javascript",
        expiration: 24,
        exposure: "public",
        text: "const stringReverse = str => str.split('').reverse().join('');" 
      } });

    expect(response.status).toBe(400);
  });

  it("returns 400 if name is empty", async () => {
    const response = await request(app)
      .post("/pastes")
      .set("Accept", "application/json")
      .send({ data: { name: "",
        syntax: "Javascript",
        expiration: 24,
        exposure: "public",
        text: "const stringReverse = str => str.split('').reverse().join('');" 
      } });

    expect(response.status).toBe(400);
  });
});