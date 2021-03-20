import { NativeModules, Platform, Linking } from 'react-native';

const { Utils } = NativeModules;

export interface PinnedShortcutConfig {
  id: string;
  icon: string;
  label: string;
  link: string;
}

class UtilsClass {
  /**
   * 添加快捷方式
   * @param data 
   * @returns 
   */
  async AddPinnedShortcut(data: PinnedShortcutConfig):Promise<boolean> {
    const query = {
      id: data.id,
      icon: data.icon,
      label: data.label,
      link: data.link,
    };
    return new Promise((resolve, reject) => {
      try {
        const os = Platform.OS;
        if (os === 'android') {
          Utils.AddPinnedShortcut(query, (status: boolean) => {
            resolve(status);
          })
        }
        if (os === 'ios') {
          Linking.openURL(
            `https://oss.dagouzhi.com/assets/shortcut.html?appId=${query.id}&appName=${
              query?.label
            }&appIcon=${
              query?.icon ||
              `https://dummyimage.com/114x114/02adea&text=${query?.label}`
            }`,
          );
        }
      } catch (err) {
        reject(err);
      }
    })
    
  }
  /**
   * 关闭app
   */
  exitApp() {
    Utils?.exitApp();
  }
}

export default new UtilsClass();