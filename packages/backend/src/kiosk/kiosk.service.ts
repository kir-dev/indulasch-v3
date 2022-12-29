import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Kiosk } from '../schemas/kiosk.schema';
import { getDefaultConfig } from '../utils/defaults';
import { KioskPatchDto } from '../types/dto.types';

@Injectable()
export class KioskService {
  constructor(
    @InjectModel(Kiosk.name) private readonly kioskModel: Model<Kiosk>,
  ) {}

  async getKioskById(kioskId: string) {
    if (!Types.ObjectId.isValid(kioskId)) throw new NotFoundException();
    return this.kioskModel.findById(kioskId);
  }

  async createKiosk(name: string) {
    return await this.kioskModel.create({
      refreshNeeded: false,
      config: getDefaultConfig(name),
    });
  }

  async deleteKiosk(kioskId: string) {
    return this.kioskModel.deleteOne({
      _id: kioskId,
    });
  }

  async patchKiosk(kioskId: string, { widgets, style, meta }: KioskPatchDto) {
    const kiosk = await this.kioskModel.findById(kioskId);
    if (typeof widgets !== 'undefined') {
      kiosk.config.widgets = widgets;
    }
    if (typeof meta !== 'undefined') {
      kiosk.config.meta = meta;
    }
    if (typeof style !== 'undefined') {
      kiosk.config.style = style;
    }
    return this.kioskModel.updateOne(
      { _id: kioskId },
      {
        $set: {
          config: kiosk.config,
        },
      },
    );
  }

  async setRefreshNeeded(kioskId: string, newState: boolean) {
    const kiosk = await this.kioskModel.findById(kioskId);
    kiosk.refreshNeeded = newState;
    await kiosk.save();
  }

  async updateLastQueryTimestamp(kioskId: string) {
    const kiosk = await this.kioskModel.findById(kioskId);
    kiosk.lastClientQuery = new Date();
    await kiosk.save();
  }
}
