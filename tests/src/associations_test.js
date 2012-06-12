module('Associations test', {
    setup: function() {
        window.Foo = Ember.Namespace.create();
        Foo.Phone = Syrah.Model.define({
            type: String,
            number: String
        });
        Foo.Contact = Syrah.Model.define({
            name: String,
            phones: {
                type: Syrah.HasMany,
                itemType: Foo.Phone
            }
        });
        Foo.Author = Syrah.Model.define({
            name: String
        });
        Foo.Blog = Syrah.Model.define({
            title: String,
            author: Foo.Author
        });
    }
});

test("A model has a getAssociations() method that list the defined associations", function() {
    var c = Foo.Contact.create();
    deepEqual(Ember.keys(c.getAssociations()), ['phones']);
});

test("HasMany association definition", function() {
    var c = Foo.Contact.create();
    ok(c.get('phones') instanceof Syrah.HasManyCollection, "A collection property has been set");
});

test("HasMany association usage", function() {
    var contact = Foo.Contact.create({ id: 1234, firstname: 'John', lastname: 'Doe' });
    var phone = Foo.Phone.create({ type: 'mobile', number: '+123456' });
    ok(contact.get('phones').get('parentObject') !== undefined, "A HasMany collection should maintain a link to its parent object");
    equal(contact.get('phones').get('parentObject').get('firstname'), 'John', "A HasMany collection should maintain a link to its parent object");

    contact.get('phones').pushObject(phone);
    equal(contact.get('phones').objectAt(0).getDbRef('contact_id'), 1234, "An object in a HasMany collection should maintain a DbRef to its parent object");
});

test("BelongsTo association usage", function() {
    var blog = Foo.Blog.create({ title: 'Ember & JS' });
    var author = Foo.Author.create({ id: 5678, name: 'John Doe' });
    equal(blog.get('author'), null);

    blog.set('author', author);

    equal(blog.getDbRef('author_id'), 5678, "An object should maintain a FK to the object it belongs to");
    equal(blog.get('author').get('name'), 'John Doe', "The object it belongs to can be retrieved");
});