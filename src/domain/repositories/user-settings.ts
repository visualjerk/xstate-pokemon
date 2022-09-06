import { IUserSettings } from '@domain/entities/user-settings'

export interface IUserSettingsRepository {
  get: () => Promise<IUserSettings>
  save: (settings: IUserSettings) => Promise<void>
}
