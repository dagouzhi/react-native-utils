import { NativeModules, Platform, Linking } from 'react-native';
const { Utils } = NativeModules;
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
                    Utils?.AddPinnedShortcut(query, (status) => {
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
        Utils?.exitApp();
    }
    /**
     * 重启
     */
    restart() {
        Utils?.restart();
    }
    /**
     * 设置屏幕常亮
     * @param disabled true: 启用 false: 不启用
     */
    setIdleTimerDisabled(disabled) {
        Utils?.setIdleTimerDisabled(disabled);
    }
}
export default new UtilsClass();
//# sourceMappingURL=index.js.map