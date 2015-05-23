/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

 $(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('has a URL defined for each feed', function() {
            for (i = 0 ; i<allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        it('has a name defined for each feed', function() {
            for (i = 0 ; i<allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    describe('The menu', function(){
        it('is hidden',function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        it("shows when the hamburger is clicked", function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
        });
        it("hides when the hamburger is clicked again", function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function(){
        beforeEach(function(done) {
            loadFeed(0, function (){
                done();
            });
        });
        it('contains at least a single entry',function(){
            expect($('.feed').find('.entry').length).not.toBe(0);
        });
    });

    describe('New Feed Selection', function(){
        beforeEach(function(done) {
            loadFeed(0, function (){
                done();
            });
        });
        var oldContent = $('.feed').text();
        beforeEach(function(done) {
            loadFeed(1, function (){
                done();
            });
        });
        it('content actually changes',function(){
            expect($('.feed').text() === oldContent).toBe(false);
        });
    });
}());
