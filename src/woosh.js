/**
 * WOOSH v0.2.4
 */

// do fancy shit
$.fn.wooshTo = function (offset, dimension) {
	var $woosh = this.find('.woosh');
	if ($woosh.hasClass('woosh-vertical')) {
		$woosh.css({
			top: offset,
			height: dimension
		});
	} else {
		$woosh.css({
			left: offset,
			width: dimension
		});
	}
}

// init woosh
$.fn.woosh = function (options) {
	var settings = $.extend({
		active: '.open',
		selector: 'a',
		vertical: false,
		// styles
		background: '#f00',
		offset: 0,
		transitionDuration: '0.5s',
		width: '2px'
	}, options);

	this.each(function () {
		// store parent container
		var $parent = $(this);

		// append the wooshy element
		if (settings.vertical) {
			$parent.append('<div class="woosh woosh-vertical"></div>');
		} else {
			$parent.append('<div class="woosh woosh-horizontal"></div>');
		}

		// create background
		if (settings.background.indexOf('url(') > -1) {
			settings.background += ' center / contain no-repeat';
		}

		// add styling
		$parent.css({
			position: 'relative'
		});
		$parent.find('.woosh').css({
			background: settings.background,
			content: '',
			display: 'block',
			position: 'absolute',
			transition: 'all ' + settings.transitionDuration
		});
		$parent.find('.woosh-horizontal').css({
			bottom: settings.offset,
			height: settings.width,
			width: 0
		});
		$parent.find('.woosh-vertical').css({
			top: 0,
			left: settings.offset,
			height: 0,
			width: settings.width
		});

		// initial position
		var wooshOffset = 0;
		var wooshDimension = 0;

		// find active links
		var $active = $parent.find(settings.active);

		// set initial values based on the link
		if ($active.length) {
			if (settings.vertical) {
				wooshOffset = $active.offset().top - $parent.offset().top;
				wooshDimension = $active.height();
			} else {
				wooshOffset = $active.offset().left - $parent.offset().left;
				wooshDimension = $active.width();
			}
			$parent.wooshTo(wooshOffset, wooshDimension);
		}

		// hover
		$parent.find(settings.selector).mouseenter(function () {
			if (settings.vertical) {
				$parent.wooshTo($(this).offset().top - $parent.offset().top, $(this).height());
			} else {
				$parent.wooshTo($(this).offset().left - $parent.offset().left, $(this).width());
			}
		});

		// don't reset until the mouse leaves the parent container to avoid
		// "flickering" when moving from one item to the next.
		$parent.mouseleave(function () {
			$parent.wooshTo(wooshOffset, wooshDimension);
		});
	});
}
