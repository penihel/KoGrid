﻿(function() {
    'use strict';
    /*global QUnit,kg*/

    QUnit.module("DomUtility Tests");

    QUnit.test("Measure Container Max Dimensions", function(assert) {

        var $container = $('<div style="max-height: 100px; max-width: 100px;"></div>').appendTo($('body'));

        var dims = kg.domUtility.measureElementMaxDims($container);

        assert.equals(dims.maxWidth, 100, 'Max Width is correct');
        assert.equals(dims.maxHeight, 100, 'Max Height is correct');

        $container.remove();
    });

    QUnit.test("Measure ScrollBars Occurred", function(assert) {

        var scrollH = kg.domUtility.scrollH;
        var scrollW = kg.domUtility.scrollW;

        assert.ok(scrollH, 'Scroll Height is ' + scrollH);
        assert.ok(scrollW, 'Scroll Width is ' + scrollW);
        assert.ok(scrollH < 100, 'ScrollH is less than 100');
        assert.ok(scrollW < 100, 'ScrollW is less than 100');
    });

    QUnit.test("Measure Container Min Dimensions", function(assert) {
        var $wrapper = $('<div style="height: 0px; width: 0px;"></div>').appendTo($('body'));
        var $container = $('<div style="min-height: 100px; min-width: 100px;"></div>').appendTo($wrapper);

        var dims = kg.domUtility.measureElementMinDims($container);

        assert.equals(dims.minWidth, 100, 'Min Width is correct');
        assert.equals(dims.minHeight, 100, 'Min Height is correct');

        $container.remove();
        $wrapper.remove();
    });

    QUnit.test("No Visibility - Measure Container Max Dimensions", function(assert) {
        var $wrapper = $('<div style="height: 200px; width: 200px; display: none;"></div>').appendTo($('body'));
        var $container = $('<div style="max-height: 100px; max-width: 100px;"></div>').appendTo($wrapper);

        var dims = kg.domUtility.measureElementMaxDims($container);

        assert.equals(dims.maxWidth, 100, 'Max Width is correct');
        assert.equals(dims.maxHeight, 100, 'Max Height is correct');

        $container.remove();
        $wrapper.remove();
    });

    QUnit.test("No Visibility - Measure Container Min Dimensions", function(assert) {
        var $wrapper = $('<div style="height: 0px; width: 0px; display: none;"></div>').appendTo($('body'));
        var $container = $('<div style="min-height: 100px; min-width: 100px;"></div>').appendTo($wrapper);

        var dims = kg.domUtility.measureElementMinDims($container);

        assert.equals(dims.minWidth, 100, 'Min Width is correct');
        assert.equals(dims.minHeight, 100, 'Min Height is correct');

        $container.remove();
        $wrapper.remove();
    });

    QUnit.test("Measure percentage-based dimensions - Maximum", function(assert) {
        var $wrapper = $('<div style="height: 200px; width: 200px;"></div>').appendTo($('body'));
        var $container = $('<div style="height: 70%; width: 70%;"></div>').appendTo($wrapper);

        var dims = kg.domUtility.measureElementMaxDims($container);

        assert.equals(dims.maxWidth, 140, 'Width is correct');
        assert.equals(dims.maxHeight, 140, 'Height is correct');

        $container.remove();
        $wrapper.remove();
    });

    QUnit.test("Measure percentage-based dimensions - Minimum", function(assert) {
        var $wrapper = $('<div style="height: 200px; width: 200px;"></div>').appendTo($('body'));
        var $container = $('<div style="height: 70%; width: 70%;"></div>').appendTo($wrapper);

        var dims = kg.domUtility.measureElementMinDims($container);

        assert.equals(dims.minWidth, 140, 'Width is correct');
        assert.equals(dims.minHeight, 140, 'Height is correct');

        $container.remove();
        $wrapper.remove();
    });

    QUnit.test('Measure Full Grid Test', function(assert) {

        var $wrapper = $('<div style="height: 0px; width: 0px;"></div>').appendTo($('body'));
        var $container = $('<div style="min-height: 99px; min-width: 98px; max-height: 201px; max-width: 202px;"></div>').appendTo($wrapper);

        var fakeGrid = {
            config: {
                headerRowHeight: 2,
                rowHeight: 2,
                footerRowHeight: 4
            },
            elementDims: {
                rootMaxH: 0,
                rootMinH: 0,
                rootMaxW: 0,
                rootMinW: 0
            }
        };

        kg.domUtility.measureGrid($container, fakeGrid, true);

        assert.equals(fakeGrid.elementDims.rootMaxH, 201, 'MaxHeight before change is correct');
        //equals(fakeGrid.elementDims.rootMaxW, 202, 'MaxWidth before change is correct');

        assert.equals(fakeGrid.elementDims.rootMinH, 99, 'MinHeight before change is correct');
        assert.equals(fakeGrid.elementDims.rootMinW, 98, 'MinWidth before change is correct');

        //now append a few things to the container, so we can check that the assertions still work after the container has children
        $container.append("<div style='height: 2000px; width: 2000px;'></div>");
        $wrapper.width(300);
        $wrapper.height(300);

        assert.equals(fakeGrid.elementDims.rootMaxH, 201, 'Max Height after change is correct');
        //equals(fakeGrid.elementDims.rootMaxW, 202, 'Max Width after change is correct');

        assert.equals(fakeGrid.elementDims.rootMinH, 99, 'Min Height after change is correct');
        assert.equals(fakeGrid.elementDims.rootMinW, 98, 'Min Width after change is correct');

        $container.remove();
        $wrapper.remove();
    });
})();
