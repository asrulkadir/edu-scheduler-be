import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class CryptoService {
  private config: ConfigService;
  private readonly algorithm = 'aes-256-ctr';
  private readonly secretKey: string;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    config: ConfigService,
  ) {
    this.config = config;
    this.secretKey = this.config.get<string>('CRYPTO_SECRET_KEY');
  }

  private readonly iv = crypto.randomBytes(16);

  private getSecretKey(key: string): Buffer {
    return crypto.createHash('sha256').update(key).digest(); // Ensure key length is 32 bytes
  }

  encrypt(text: string): string {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      this.getSecretKey(this.secretKey),
      this.iv,
    );
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return `${this.iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  decrypt(hash: string): string {
    const [iv, encryptedText] = hash.split(':');
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.getSecretKey(this.secretKey),
      Buffer.from(iv, 'hex'),
    );
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, 'hex')),
      decipher.final(),
    ]);

    this.logger.debug(`Decrypted: ${decrypted.toString()}`);
    return decrypted.toString();
  }

  hash(text: string): string {
    return crypto.createHash('sha256').update(text).digest('hex');
  }
}
