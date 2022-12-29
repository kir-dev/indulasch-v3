import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './users.model';
import { compare, genSalt, hash } from 'bcrypt';
import { KioskRoles } from '../types/kiosk.types';
import { UserPatchDto } from '../types/dto.types';
import { Kiosk } from '../schemas/kiosk.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Kiosk.name) private readonly kioskModel: Model<Kiosk>
  ) {}

  async createUser(username: string, password: string): Promise<UserDocument> {
    const salt = await genSalt();
    const hashed = await hash(password, salt);
    return this.userModel.create({
      username,
      password: hashed,
      isAdmin: false,
      roles: [],
    });
  }

  async getUsers(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async getUser({ username, password }): Promise<UserDocument | undefined> {
    const user = await this.userModel.findOne({ username });
    if (!user) throw new UnauthorizedException();
    const isMatch = await compare(password, user.password);
    if (isMatch) return user;
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

  async patchUser(userId: string, patch: UserPatchDto): Promise<UserDocument | undefined> {
    const user = await this.userModel.findOne({ _id: userId });
    if (typeof patch.username !== 'undefined') {
      user.username = patch.username;
    }
    if (typeof patch.password !== 'undefined') {
      const salt = await genSalt();
      user.password = await hash(patch.password, salt);
    }
    if (typeof patch.isAdmin !== 'undefined') {
      user.isAdmin = patch.isAdmin;
    }
    if (typeof patch.roles !== 'undefined') {
      user.roles = patch.roles;
    }
    await user.save();
    return user;
  }

  async setKioskRole(userId: string, kioskId: Types.ObjectId, role: KioskRoles) {
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) throw 'No user';
    const kioskRoleIndex = user.roles.findIndex((k) => k.kioskId === kioskId);
    if (kioskRoleIndex !== -1) {
      user.roles[kioskRoleIndex].role = role;
    } else {
      user.roles.push({ kioskId, role });
    }
    await this.userModel.updateOne({ _id: userId }, { $set: { roles: user.roles } });
    return user;
  }

  async removeKioskRole(userId: string, kioskId: Types.ObjectId) {
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) throw 'No user';
    user.roles = user.roles.filter((role) => role.kioskId !== kioskId);
    await this.userModel.updateOne({ _id: userId }, { $set: { roles: user.roles } });
    return user;
  }
}
