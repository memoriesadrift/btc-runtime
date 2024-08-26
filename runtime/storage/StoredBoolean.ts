import { u256 } from 'as-bignum/assembly';
import { Blockchain } from '../env';

@final
export class StoredBoolean {
    constructor(
        public pointer: u16,
        private defaultValue: bool,
    ) {}

    private _value: u256 = u256.Zero;

    @inline
    public get value(): bool {
        this.ensureValue();

        return this._value.toBool();
    }

    @inline
    public set value(value: bool) {
        this._value = value ? u256.One : u256.Zero;

        Blockchain.setStorageAt(this.pointer, u256.Zero, this._value);
    }

    @inline
    public set(value: u256): this {
        this._value = value;

        Blockchain.setStorageAt(this.pointer, u256.Zero, this._value);

        return this;
    }

    @inline
    public toUint8Array(): Uint8Array {
        return this._value.toUint8Array(true);
    }

    private ensureValue(): void {
        this._value = Blockchain.getStorageAt(
            this.pointer,
            u256.Zero,
            this.defaultValue ? u256.One : u256.Zero,
        );
    }
}