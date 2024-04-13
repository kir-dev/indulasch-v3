import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Kiosk } from '../schemas/kiosk.schema';
import { Auth0Profile, AuthSchProfile } from '../types/auth.types';
import { KioskRoles } from '../types/kiosk.types';
import { User, UserDocument } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Kiosk.name) private readonly kioskModel: Model<Kiosk>
  ) {}

  async createUserForAuthSchUser(authSchProfile: AuthSchProfile): Promise<UserDocument> {
    return this.userModel.create({
      authId: authSchProfile.internal_id,
      mail: authSchProfile.mail,
      displayName: authSchProfile.displayName,
      isAdmin: false,
      roles: [],
    });
  }

  async createUserForAuth0User(auth0Profile: Auth0Profile): Promise<UserDocument> {
    return this.userModel.create({
      authId: auth0Profile.sub,
      mail: auth0Profile.email,
      displayName: auth0Profile.name,
      isAdmin: false,
      roles: [],
    });
  }

  async getUsers(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async getUserById(userId: string): Promise<UserDocument | undefined> {
    return await this.userModel
      .findById(userId)
      .populate({
        path: 'roles.kioskId',
        foreignField: '_id',
        model: Kiosk.name,
        select: 'config.meta.name',
      })
      .exec();
  }

  async getUserByAuthId(authId: string): Promise<UserDocument | undefined> {
    return await this.userModel
      .findOne({ authId: authId })
      .populate({
        path: 'roles.kioskId',
        foreignField: '_id',
        model: Kiosk.name,
        select: 'config.meta.name',
      })
      .exec();
  }

  async getUsersForKiosk(kioskId: Types.ObjectId) {
    const users = await this.userModel.find({ 'roles.kioskId': kioskId });
    return users.map((usr) => ({
      _id: usr._id,
      mail: usr.mail,
      role: usr.roles.find((role) => role.kioskId.toString() === kioskId.toString())?.role,
    }));
  }

  async setKioskRole(mail: string, kioskId: Types.ObjectId, role: KioskRoles) {
    const user = await this.userModel.findOne({ mail: mail });
    if (!user) throw new NotFoundException();
    const kioskRoleIndex = user.roles.findIndex((k) => k.kioskId.toString() === kioskId.toString());
    if (kioskRoleIndex === -1) {
      user.roles.push({ kioskId, role });
    } else {
      user.roles[kioskRoleIndex].role = role;
    }
    await this.userModel.updateOne({ _id: user._id }, { $set: { roles: user.roles } });
    return user;
  }

  async removeKioskRole(userId: Types.ObjectId, kioskId: Types.ObjectId) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException();
    user.roles = user.roles.filter((role) => role.kioskId.toString() !== kioskId.toString());
    await this.userModel.updateOne({ _id: user._id }, { $set: { roles: user.roles } });
    return user;
  }
}
