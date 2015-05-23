/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

 $(function() {
    /*
    * This first suite of tests is on the RSS Feeds.  They ensure
    * that there exists at least one feed, that each feed has a
    * URL defined that is not empty, and that each feed has a name
    * defined that is not empty..
    */
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
    /*
    * This suite of tests is on the menu.  The menu starts hidden
    * when the page is loaded.  When the menu icon is first clicked,
    * the menu should appear.  When it is clicked again, the menu
    * should disappear.
    */
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
    /*
    * This suite of tests is on the initial entries populated for the
    * first feed.  It ensures that there is at least a single entry after
    * the async request, loadFeed().  beforeEach and done() are used to
    * ensure jasmine waits for the request to complete before continuing.
    */
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
    /*
    * This suite of tests is to ensure that selecting a new feed changes
    * the displayed feed.  It first loads the initial feed at index 0,
    * using loadFeed.  The resulting feed text displayed to the user
    * is stored in oldContent.  The feed is then changed to the feed at
    * index 1, again using loadFeed.  The new feed text displayed to the
    * user is then compared to the oldContent.  beforeEach and done()
    * are used to ensure jasmine waits for the loadFeed request completes
    * before continuing.
    */
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
