import crypto = require('crypto');

const CONSTANT = 'AES';

export function encryptPwd(password: string, salt: string): string {
    return crypto
        .createHash('md5')
        .update(password + CONSTANT + salt)
        .digest('hex');
}
