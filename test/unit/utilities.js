var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

describe('the todo.App', function() {

  describe('the todo object', function(){

    it('should have all the necessary methods', function(){
      expect(todo.util.trimTodoName).to.be.a('function');
      assert.isFunction(todo.util.isValidTodoName);
      assert.typeOf(todo.util.getUniqueId, 'function');
      expect(todo.util).to.have.property('trimTodoName');
    });
  });
});

describe('the todo.util methods', function() {

  describe('trimTodoName', function() {
    it('should only remove leading and trailing whitespace', function() {
      var dirty = '  clean the whitespace  ';
      var clean = todo.util.trimTodoName(dirty);
      clean.should.equal('clean the whitespace');
    });

    it('should return empty string if only input whitespace', function() {
      var dirty = '      ';
      var clean = todo.util.trimTodoName(dirty);
      assert.equal(clean, '');
      expect(clean).to.have.length(0);
    });

    it('should be unchanged if no leading/trailing whitespace', function() {
      var dirty = 'actually         clean';
      var clean = todo.util.trimTodoName(dirty);
      assert.equal(clean, dirty);
    });
  });

  describe('isValidTodoName', function () {

    it('should be false when todo name is less than 2 non-space characters', function() {
      todo.util.isValidTodoName('d').should.be.false;
      expect(todo.util.isValidTodoName('')).to.equal(false);
      expect(todo.util.isValidTodoName('   h   ')).to.not.be.true;
      assert.notOk(todo.util.isValidTodoName('x'));


    });

    it('should be true when todo name is at least 2 non-space characters', function() {
      expect(todo.util.isValidTodoName('clean up')).to.not.equal(false);
      expect(todo.util.isValidTodoName('do the dishes')).to.equal(true);
      todo.util.isValidTodoName('na').should.equal(true);
      assert.isTrue(todo.util.isValidTodoName('hello'));

    });
  });

  describe('getUniqueId', function () {


    it('should have a getUniqueId function', function() {
      expect(todo.util.getUniqueId()).to.equal(1);
      todo.util.getUniqueId().should.not.equal(1);
      expect(todo.util.getUniqueId()).to.equal(3);
      assert.notStrictEqual(todo.util.getUniqueId(), '4');
      expect(todo.util.getUniqueId()).to.equal(5);
    });
  });
});
