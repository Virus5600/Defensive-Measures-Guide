import Plyr from 'plyr';
window.Plyr = Plyr;

const PLYRS = document.querySelectorAll(`.plyr`);
const DEFAULT_CONTROLS = [
	'play-large', // The large play button in the center
	'restart', // Restart playback
	'rewind', // Rewind by the seek time (default 10 seconds)
	'play', // Play/pause playback
	'fast-forward', // Fast forward by the seek time (default 10 seconds)
	'progress', // The progress bar and scrubber for playback and buffering
	'current-time', // The current time of playback
	'duration', // The full duration of the media
	'mute', // Toggle mute
	'volume', // Volume control
	'captions', // Toggle captions
	'settings', // Settings menu
	'pip', // Picture-in-picture (currently Safari only)
	'airplay', // Airplay (currently Safari only)
	// 'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
	'fullscreen', // Toggle fullscreen
];

if (PLYRS.length >= 0) {
	PLYRS.forEach((plyr) => {
		plyr.plyrInstance = null;
		let controls =
			// Check `[data-control-list]` attribute for custom controls
			plyr.getAttribute(`data-control-list`) ?
				plyr.getAttribute(`data-control-list`)
					.replaceAll(/\s+/, '').split(`,`) : DEFAULT_CONTROLS;

		plyr.plyrInstance = Plyr.setup(plyr, {
			iconUrl: `../../storage/images/plyr/icons/plyr.svg`,
			controls: controls
		});
	});
}

