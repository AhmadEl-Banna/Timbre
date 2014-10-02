define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var PageView = require('views/PageView');
    var MenuView = require('views/MenuView');
    var StripData = require('data/StripData');

    var GenericSync     = require('famous/inputs/GenericSync');
    var MouseSync       = require('famous/inputs/MouseSync');
    var TouchSync       = require('famous/inputs/TouchSync');
    GenericSync.register({'mouse': MouseSync, 'touch': TouchSync});

    function AppView() {
        View.apply(this, arguments);

        this.menuToggle = false;
        this.pageViewPos = 0;

        _createPageView.call(this);
        _createMenuView.call(this);

        _setListeners.call(this);
        _handleSwipe.call(this);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
        openPosition: 276,
        transition: {
            duration: 300,
            curve: 'easeOut'
        }
    };

    AppView.prototype.toggleMenu = function() {
        if(this.menuToggle) {
            this.slideLeft();
        } else {
            this.slideRight();
        }
        this.menuToggle = !this.menuToggle;
    };

    AppView.prototype.slideLeft = function() {
        this.pageModifier.setTransform(Transform.translate(0, 0, 0), this.options.transition);
    };

    AppView.prototype.slideRight = function() {
        this.pageModifier.setTransform(Transform.translate(this.options.openPosition, 0, 0), this.options.transition);
    };

    function _createPageView() {
        this.pageView = new PageView();
        this.pageModifier = new StateModifier();

        this.add(this.pageModifier).add(this.pageView);
    }

    function _createMenuView() {
        this.menuView = new MenuView({ stripData: StripData });

        var menuModifier = new StateModifier({
            transform: Transform.behind
        });

        this.add(menuModifier).add(this.menuView);
    }

    function _setListeners() {
        this.pageView.on('menuToggle', this.toggleMenu.bind(this));
    }

    function _handleSwipe() {
        var sync = new GenericSync(
            ['mouse', 'touch'],
            {direction : GenericSync.DIRECTION_X}
        );

        this.pageView.pipe(sync);

        sync.on('update', function(data) {
            this.pageViewPos += data.delta;
            this.pageModifier.setTransform(Transform.translate(this.pageViewPos, 0, 0));
        }.bind(this));
    }
    module.exports = AppView;
});
