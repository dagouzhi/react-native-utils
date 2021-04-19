import { NativeModules, Platform, Linking } from 'react-native';
const { HtyUtils } = NativeModules;
class UtilsClass {
    /**
     * 添加快捷方式
     * @param data
     * @returns
     */
    async AddPinnedShortcut(data) {
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
                    HtyUtils?.AddPinnedShortcut(query, (status) => {
                        resolve(status);
                    });
                }
                if (os === 'ios') {
                    Linking.openURL(`https://oss.dagouzhi.com/assets/shortcut.html?appId=${query.id}&appName=${query?.label}&appIcon=${query?.icon ||
                        `https://dummyimage.com/114x114/02adea&text=${query?.label}`}`);
                }
            }
            catch (err) {
                reject(err);
            }
        });
    }
    /**
     * 关闭app
     */
    exitApp() {
        HtyUtils?.exitApp();
    }
    /**
     * 重启
     */
    restart() {
        HtyUtils?.restart();
    }
    /**
     * 设置屏幕常亮
     * @param disabled true: 启用 false: 不启用
     */
    setIdleTimerDisabled(disabled) {
        HtyUtils?.setIdleTimerDisabled(disabled);
    }
}
export default new UtilsClass();
//# sourceMappingURL=index.js.map