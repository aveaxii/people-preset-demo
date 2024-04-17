import { UserRequestPresetIdDto } from '../dto/userRequestPresetIdDto';
import { Preset } from './presets';
export class PresetHandler {
  static handlePreset(presetId: UserRequestPresetIdDto): string {
    let presetPrompt = '';

    switch (presetId.genderId) {
      case 'male':
        presetPrompt += Preset.MALE;
        break;
      case 'female':
        presetPrompt += Preset.FEMALE;
    }

    switch (presetId.heightId) {
      case 'short':
        presetPrompt += Preset.SHORT;
        break;
      case 'mid':
        presetPrompt += Preset.MID;
        break;
      case 'high':
        presetPrompt += Preset.HIGH;
        break;
    }

    switch (presetId.weightId) {
      case 'skinny':
        presetPrompt += Preset.SKINNY;
        break;
      case 'normal':
        presetPrompt += Preset.NORMAL;
        break;
      case 'big':
        presetPrompt += Preset.BIG;
        break;
    }

    switch (presetId.skinToneId) {
      case 'white':
        presetPrompt += Preset.WHITE_SKIN;
        break;
      case 'yellow':
        presetPrompt += Preset.YELLOW_SKIN;
        break;
      case 'brown':
        presetPrompt += Preset.BROWN_SKIN;
        break;
      case 'black':
        presetPrompt += Preset.BLACK_SKIN;
        break;
    }

    switch (presetId.hairLengthId) {
      case 'short':
        presetPrompt += Preset.SHORT_HAIR;
        break;
      case 'mid':
        presetPrompt += Preset.MEDIUM_HAIR;
        break;
      case 'long':
        presetPrompt += Preset.LONG_HAIR;
        break;
    }

    switch (presetId.hairColorId) {
      case 'white':
        presetPrompt += Preset.WHITE_HAIR;
        break;
      case 'yellow':
        presetPrompt += Preset.YELLOW_HAIR;
        break;
      case 'brown':
        presetPrompt += Preset.BROWN_HAIR;
        break;
      case 'black':
        presetPrompt += Preset.BLACK_HAIR;
        break;
      case 'blonde':
        presetPrompt += Preset.BLONDE_HAIR;
        break;
      case 'dark_brown':
        presetPrompt += Preset.DARK_BROWN_HAIR;
        break;
      case 'red':
        presetPrompt += Preset.RED_HAIR;
        break;
      case 'blue':
        presetPrompt += Preset.BLUE_HAIR;
        break;
      case 'pink':
        presetPrompt += Preset.PINK_HAIR;
        break;
      case 'green':
        presetPrompt += Preset.GREEN_HAIR;
        break;
    }

    switch (presetId.poseId) {
      case 'standing_straight':
        presetPrompt += Preset.STANDING_STRAIGHT;
        break;
      case 'standing_arms_together':
        presetPrompt += Preset.STANDING_ARMS_TOGETHER;
        break;
      case 'standing_arms_on_sides':
        presetPrompt += Preset.STANDING_ARMS_ON_SIDES;
        break;
      case 'standing_slightly_side':
        presetPrompt += Preset.STANDING_SLIGHTLY_SIDE;
        break;
      case 't_pose':
        presetPrompt += Preset.T_POSE;
        break;
      case 'face_close':
        presetPrompt += Preset.FACE_CLOSE;
        break;
    }
    return presetPrompt;
  }
}
