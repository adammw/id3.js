import ID3Frame from '../lib/frame';
import expect from 'expect.js';

describe('ID3Frame', () => {
  var data, frame;
  beforeEach(() => {
    data = new Uint8Array([0x00, 0x00, 0x00, 0x02]).buffer;
    frame = new ID3Frame('PCNT', data);
  });

  describe('constructor()', () => {
    it('accepts id and data parameters', () => {
      expect(frame.id).to.be('PCNT');
      expect(frame.data).to.be(data);
    });
  });

  describe('serialize()', () => {
    it('serializes the frame header and data', () => {
      var buffer = frame.serialize();
      var data = Array.from(new Uint8Array(buffer));
      expect(buffer).to.be.an(ArrayBuffer);
      expect(data).to.eql([
        0x50, 0x43, 0x4E, 0x54, // PCNT Frame ID
        0x00, 0x00, 0x00, 0x04, // 4 byte frame
        0x00, 0x00,             // No flags
        0x00, 0x00, 0x00, 0x02  // 2 play count
      ]);
    });
  });
});
