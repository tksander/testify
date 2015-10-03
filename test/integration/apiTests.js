
describe('API integration', function(){
  var server, setupStub, JSONresponse;

  beforeEach(function() {
    JSONresponse = {
        "todos": [
          {
            "name": "Finish unit tests",
            "done": true
          },
          {
            "name": "Finish integration tests",
            "done": false
          },
          {
            "name": "Finish end-to-end tests",
            "done": false
          }
        ]
      };
    server = sinon.fakeServer.create();
    server.respondWith("GET", "http://localhost:3000/todos",
                       [200, { "Content-Type": "application/json" },
                        JSON.stringify(JSONresponse)]);
    setupStub = sinon.stub(todo, 'setup');
  });

  afterEach(function() {
    server.restore();
    setupStub.restore();
  });

  it('todo.setup receives an array of todos when todo.init is called', function () {
    todo.init();
    server.respond();
    expect(setupStub.calledWith(JSONresponse.todos)).to.be.true;
  });
});
