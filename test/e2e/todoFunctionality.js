/* globals casper, document */
casper.test.begin('App is setup correctly', 2, function suite(test) {
  casper.start('http://localhost:3000/', function() {
    test.assertExists('.todo-list', 'List should exist');
    test.assertExists('.todo-form', 'Form should exist');
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin('App adds and removes todo items', 2, function suite(test) {
    casper.start('http://localhost:3000/', function() {
      //get count of todos
      var count = this.evaluate(function() {
        return __utils__.findAll('li.todo-item').length;
      });
      //add a todo
      this.fill('form.todo-form', {'todo': 'example to do'}, true);
      //test to see the todo was added
      test.assertElementCount('li.todo-item', count+1, 'should have 1 more todo item');
      //remove the last todo
      this.click('li.todo-item:last-child button.todo-remove');
      //test to make sure the last to do was removed
      test.assertElementCount('li.todo-item', count, 'should have 1 less todo items');
    });

    casper.run(function() {
      test.done();
    });
  });

casper.test.begin('App adds and removes multiple todo items', 2, function suite(test) {
    casper.start('http://localhost:3000/', function() {

      //get count of todos
      var count = this.evaluate(function() {
        return __utils__.findAll('li.todo-item').length;
      });

      //add multiple todos to the list
      var todos = ['todo1', 'todo2', 'todo3'];
      todos.forEach(function (todo) {
        this.fill('form.todo-form', {'todo': todo}, true);
      }.bind(this));

      //check to make sure the count increased by the amount added
      test.assertElementCount('li.todo-item', count+todos.length, 'should have added todo items');

      //remove the last todos which were added
      todos.forEach(function () {
        this.click('li.todo-item:last-child button.todo-remove');
      }.bind(this));

      //check to make sure the todos were successfully removed
      test.assertElementCount('li.todo-item', count, 'should have removed todo items');
    });

    casper.run(function() {
      test.done();
    });
  });

casper.test.begin('App marks todo items as done', 2, function suite(test) {
    casper.start('http://localhost:3000/', function() {
      //get count of all todos
      var countTotal = this.evaluate(function() {
        return __utils__.findAll('li.todo-item').length;
      });
      //get count of done todos
      var countDone = this.evaluate(function() {
        return __utils__.findAll('li.todo-item--done').length;
      });
      //add a new todo
      this.fill('form.todo-form', {'todo': 'example to mark done'}, true);
      //check to make sure count of done todos has not changed
      test.assertElementCount('li.todo-item--done', countDone, 'should not be marked done until clicked');
      //mark the last todo item as done
      this.click('li.todo-item:last-child button.todo-done');
      //test to make sure the count of done todos increased by 1
      test.assertElementCount('li.todo-item--done', countDone+1, 'should mark another todo item as done');
    });

    casper.run(function() {
      test.done();
    });
  });

casper.test.begin('User cannot add empty todos', 1, function suite(test) {
    casper.start('http://localhost:3000/', function() {

      //get count of todo items
      var count = this.evaluate(function() {
        return __utils__.findAll('li.todo-item').length;
      });

      //attempt to add a blank todo
      this.fill('form.todo-form', {'todo': ''}, true);

      //test to make sure it wasn't added
      test.assertElementCount('li.todo-item', count, 'should not add a blank todo');
    });

    casper.run(function() {
      test.done();
    });
  });

