import { TextEncoder } from 'text-encoding';

export default class ID3Header {
  constructor(frames) {
    this.id = 'ID3';
    this.version = 3; // ID3 v2.3.0
    this.revision = 0;
    this.flags = 0;
    this.frames = frames || [];
  }

  serialize() {
    var serializedFrames = this.frames.map(function(frame) {
      return frame.serialize();
    });
    var byteLength = serializedFrames.reduce(function(sum, buf) {
      return sum + buf.byteLength;
    }, 0);
    var buffer = new ArrayBuffer(10 + byteLength);
    var uint8View = new Uint8Array(buffer);
    var encoder = new TextEncoder('utf-8');
    uint8View.set(encoder.encode(this.id).slice(0, 3), 0);
    var offset = 3;
    uint8View[offset++] = this.version;
    uint8View[offset++] = this.revision;
    uint8View[offset++] = this.flags;
    uint8View[offset++] = (byteLength >> (7 * 3)) & 0x7f;
    uint8View[offset++] = (byteLength >> (7 * 2)) & 0x7f;
    uint8View[offset++] = (byteLength >> (7 * 1)) & 0x7f;
    uint8View[offset++] = (byteLength >> (7 * 0)) & 0x7f;
    serializedFrames.reduce(function(offset, buf) {
      uint8View.set(new Uint8Array(buf), offset);
      return offset + buf.byteLength;
    }, offset);
    return buffer;
  }
}
