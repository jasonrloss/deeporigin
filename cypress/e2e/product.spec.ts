let productId: string;
describe('product API Tests', () => {
    it('should be able to create a new product', () => {
        cy.request({
            method: 'POST',
            url: 'add',
            body: {
                title: 'BMW Pencil'
            },
        }).then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body.length > 0);
            expect(response.body.title = 'BMW Pencil');
            productId = response.body.id;
        });
    });

    it('should be able to retrieve a product', () => {
        expect(productId).to.not.be.undefined;
        cy.request(`/${productId}`).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.length > 0);
        });
    });

    it('should be able to update a product', () => {
        cy.request({
            method: 'PUT',
            url: `/${productId}`,
            body: {
                title: 'Volvo Pencil'
            },
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.length > 0);
            expect(response.body.title = 'Volvo Pencil');
        });
    });

    it('should be able to delete a product', () => {
        cy.request({
            method: 'DELETE',
            url: '/',
        }).then((response) => {
            expect(response.status).to.equal(204);
        });
    });

    it('should be able to retrieve all products', () => {
        cy.request(`/`).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.length > 0);
        });
    });

    it('should be able to search for products', () => {
        cy.request(`/search?q=phone`).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.length > 0);
            expect( response.body.name.to.contain("iphone"));
        });
    });

    it('should be able to retrieve a product category', () => {
        cy.request(`/category/smartphones`).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.length > 0);
            expect(response.body.category.to.contain("smartphones"));
        });
    });

    it('should be able to limit and skip products', () => {
        cy.request(`/?limit=10&skip=10&select=title,price`).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.length > 0);
            expect(response.body.skip.to.equal(10));
            expect(response.body.limit.to.equal(10));
            expect(response.body.title.length > 0);
            expect(response.body.price.length > 0);
        });
    });

});
