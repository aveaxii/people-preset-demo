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
        presetPrompt += Preset.WHITE;
        break;
      case 'yellow':
        presetPrompt += Preset.YELLOW;
        break;
      case 'brown':
        presetPrompt += Preset.BROWN;
        break;
      case 'black':
        presetPrompt += Preset.BLACK;
        break;
    }

    return presetPrompt;
  }
}
