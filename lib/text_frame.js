import { TextEncoder } from 'text-encoding';
import ID3Frame from './frame';

export default class ID3TextFrame {
  constructor(id, data) {
    this.id = id;
    this.data = data;
  }

  serialize() {
    var encoder = new TextEncoder('utf-16be');
    var encodedString = encoder.encode(this.data);
    var dataBuffer = new ArrayBuffer(5 + encodedString.byteLength);
    var uint8View = new Uint8Array(dataBuffer);
    uint8View[0] = 0x01; // Unicode (UTF-16) encoding
    uint8View[1] = 0xFE; // BOM (BE)
    uint8View[2] = 0xFF; // BOM (BE)
    uint8View.set(encodedString, 3);
    
    var frame = new ID3Frame(this.id, dataBuffer);
    return frame.serialize();
  }
}
