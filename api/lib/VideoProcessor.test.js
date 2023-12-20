const VideoProcessor = require('./videoProcessor.js');

describe('VideoProcessor', () => {
    describe('getVideoId', () => {
        it('should return a string', () => {
            const videoProcessor = new VideoProcessor('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
            const videoId = videoProcessor.getVideoId();
            expect(typeof videoId).toBe('string');
        });
    });
});