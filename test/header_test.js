import ID3Frame from '../lib/frame';
import ID3Header from '../lib/header';
import expect from 'expect.js';

describe('ID3Header', () => {
  describe('with no frames', () => {
    it('serializes correctly', () => {
      var header = new ID3Header();
      var buffer = header.serialize();
      var data = Array.from(new Uint8Array(buffer));
      expect(buffer).to.be.an(ArrayBuffer);
      expect(data).to.eql([
        0x49, 0x44, 0x33,       // "ID3"
        0x03, 0x00,             // V2.3.0
        0x00,                   // No flags
        0x00, 0x00, 0x00, 0x00  // 0 byte data size
      ]);
    });
  });

  describe('with a single frame', () => {
    it('serializes correctly', () => {
      var frameData = new Uint8Array([0x00, 0x00, 0x00, 0x02]).buffer;
      var frame = new ID3Frame('PCNT', frameData);
      var header = new ID3Header([ frame ]);
      var buffer = header.serialize();
      var data = Array.from(new Uint8Array(buffer));
      expect(buffer).to.be.an(ArrayBuffer);
      expect(data).to.eql([
        0x49, 0x44, 0x33,       // "ID3"
        0x03, 0x00,             // V2.3.0
        0x00,                   // No flags
        0x00, 0x00, 0x00, 0x0e, // 14 byte data size
        0x50, 0x43, 0x4E, 0x54, // PCNT Frame ID
        0x00, 0x00, 0x00, 0x04, // 4 byte frame
        0x00, 0x00,             // No flags
        0x00, 0x00, 0x00, 0x02  // 2 play count
      ]);
    });
  });
});
