declare module 'bcryptjs'{
    export function hash(
        data: string | Buffer,
        saltOrRounds: string | number
    ): string;

    export function genSalt(
        rounds: number,
        callback: (err:Error, salt:string) => void
    ): void;

    export function compare(
        data: string | Buffer,
        hash: string,
        //callback: (err:Error, isMatch:Boolean) => void
    ): void;

    export function compareSync(
        data: string | Buffer,
        hash: string
    ): Boolean;
}