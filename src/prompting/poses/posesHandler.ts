import { Poses } from './poses';
import * as path from 'path';
import * as fs from 'fs';

export class PosesHandler {
  private readonly rootPath: string;
  constructor(rootPath: string) {
    this.rootPath = rootPath;
  }
  getPoseImage(posePath: string) {
    switch (posePath) {
      case 'standing_straight':
        return this.getPoseImagePath(Poses.STANDING_STRAIGHT);
      case 'standing_arms_crossed':
        return this.getPoseImagePath(Poses.STANDING_ARMS_CROSSED);
      case 'standing_arms_on_sides':
        return this.getPoseImagePath(Poses.STANDING_ARMS_ON_SIDES);
      case 'standing_slightly_side':
        return this.getPoseImagePath(Poses.STANDING_SLIGHTLY_SIDE);
      case 't_pose':
        return this.getPoseImagePath(Poses.T_POSE);
      case 'face_close':
        return this.getPoseImagePath(Poses.FACE_CLOSE);
      default:
        throw new Error('Pose image not found');
    }
  }
  private getPoseImagePath(pose: Poses): string {
    const skeletonsFolderPath = 'C:\\TestProjects\\people-preset\\skeletons'; // Абсолютный путь к папке skeletons
    console.log('skeletonsFolderPath: ' + skeletonsFolderPath);
    const imagePath = path.join(skeletonsFolderPath, pose);
    console.log('imagePath: ' + imagePath);
    return imagePath;
  }
}
