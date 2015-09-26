import { TextEncoder } from 'text-encoding';

export default class ID3Frame {
  constructor(id, data) {
    this.id = id || null;
    this.size = data && data.byteLength || 0;
    this.flags = 0;
    this.data = data || null;
  }

  serialize() {
    var buffer = new ArrayBuffer(10 + this.data.byteLength);
    var uint8View = new Uint8Array(buffer);
    var dataView = new DataView(buffer);
    var encoder = new TextEncoder('utf-8');
    uint8View.set(encoder.encode(this.id).slice(0, 4), 0);
    dataView.setUint32(4, this.size);
    dataView.setUint16(8, this.flags);
    uint8View.set(new Uint8Array(this.data), 10);
    return buffer;
  }
}
