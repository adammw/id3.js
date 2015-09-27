import ID3TextFrame from '../lib/text_frame';
import expect from 'expect.js';

describe('ID3TextFrame', () => {
  var frame;
  beforeEach(() => {
    frame = new ID3TextFrame('TIT2', 'My Epic Song');
  });

  describe('constructor()', () => {
    it('accepts id and data parameters', () => {
      expect(frame.id).to.be('TIT2');
      expect(frame.data).to.be('My Epic Song');
    });
  });

  describe('serialize()', () => {
    it('serializes the frame header and UTF-16 data', () => {
      var buffer = frame.serialize();
      var data = Array.from(new Uint8Array(buffer));
      expect(buffer).to.be.an(ArrayBuffer);
      expect(data).to.eql([
        0x54, 0x49, 0x54, 0x32, // TIT2
        0x00, 0x00, 0x00, 0x1d, // Frame size
        0x00, 0x00,             // No flags
        0x01,                   // UTF-16 Text encoding
        0xFE, 0xFF,             // UTF-16 (BE) Byte Order Mark
        0x00, 0x4D, 0x00, 0x79,
        0x00, 0x20, 0x00, 0x45,
        0x00, 0x70, 0x00, 0x69,
        0x00, 0x63, 0x00, 0x20,
        0x00, 0x53, 0x00, 0x6F,
        0x00, 0x6E, 0x00, 0x67,
        0x00, 0x00              // UTF-16 NULL terminator
      ]);
    });
  });
});
