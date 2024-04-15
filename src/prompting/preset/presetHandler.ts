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

    return presetPrompt;
  }
}
