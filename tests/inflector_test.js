module('Inflector tests', {
	setup: function() {
		window.Foo = Ember.Namespace.create();
		Foo.BarTest = Ember.Object.extend();
	}
});

test("Inflector has a getTypeName() method to get a type's name in underscored lowercase", function() {
	equal(Syrah.Inflector.getTypeName(Foo.BarTest), 'bar_test');
});

test("Store has a getCollectionName() method to get a pluralized type's name", function() {
	equal(Syrah.Inflector.getCollectionName(Foo.BarTest), 'bar_tests');
});