import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { ApiKey } from '../schemas/api-key.schema';
import { Kiosk } from '../schemas/kiosk.schema';
import { CreateApiKeyDto } from '../types/dto.types';
import { KioskRoles } from '../types/kiosk.types';
import { User } from '../users/users.model';

@Injectable()
export class ApiKeyService {
  constructor(@InjectModel(ApiKey.name) private readonly apiKeyModel: Model<ApiKey>) {}

  createApiKey(kioskId: string, createApiKeyDto: CreateApiKeyDto) {
    return this.apiKeyModel.create({
      kioskId,
      role: Math.min(createApiKeyDto.role ?? 0, 2),
      name: createApiKeyDto.name ?? '',
      key: uuid(),
    });
  }

  async setApiKeyRole(keyId: string, role: KioskRoles) {
    const key = await this.apiKeyModel.findById(keyId);
    if (key) {
      key.role = role;
      return key.save();
    }
  }

  async getApiKeyAsUser(key: string): Promise<User> {
    const apiKey = await this.apiKeyModel
      .findOne({ key })
      .populate({
        path: 'kioskId',
        foreignField: '_id',
        model: Kiosk.name,
        select: 'config.meta.name',
      })
      .exec();

    if (apiKey) {
      return {
        displayName: `ApiKey-${apiKey.name.replace(' ', '')}`,
        mail: '',
        authId: '',
        isAdmin: false,
        roles: [{ kioskId: apiKey.kioskId, role: apiKey.role }],
      };
    }
    return null;
  }

  getApiKeysForKioskId(kioskId: string) {
    return this.apiKeyModel.find({ kioskId });
  }

  deleteApiKey(keyId: string) {
    return this.apiKeyModel.deleteOne({ _id: keyId });
  }
}
