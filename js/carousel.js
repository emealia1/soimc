(function soimcCarousel() {
	var nextVisible = 1,
		runCarousel,
		carouselVideo = document.getElementsByClassName('carousel_video')[0];

	function startCarousel() {
		runCarousel = setInterval(function() {
			moveCarousel(nextVisible);
		}, 5000);
	}

	function moveCarousel(currentlyVisible) {
		var carousel_items = document.getElementsByClassName('carousel_item');
		document.getElementsByClassName('visible')[0].classList.remove('visible');
		nextVisible++;
		carousel_items[currentlyVisible].classList.add('visible');
		if(currentlyVisible === carousel_items.length - 1) {
				nextVisible = 0;
		}
	}

	if(carouselVideo) {
		carouselVideo.addEventListener('play', function() {
			stopCarousel();
			carouselVideo.play();
		});

		carouselVideo.addEventListener('ended', function() {
			moveCarousel(nextVisible);
			startCarousel();
			carouselVideo.load();
		});
	}

	function stopCarousel() {
		clearInterval(runCarousel);
	}

	startCarousel();
}());