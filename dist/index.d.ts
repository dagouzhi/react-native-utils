export interface PinnedShortcutConfig {
    id: string;
    icon: string;
    label: string;
    link: string;
}
declare class UtilsClass {
    /**
     * 添加快捷方式
     * @param data
     * @returns
     */
    AddPinnedShortcut(data: PinnedShortcutConfig): Promise<boolean>;
    /**
     * 关闭app
     */
    exitApp(): void;
    /**
     * 重启
     */
    restart(): void;
    /**
     * 设置屏幕常亮
     * @param disabled true: 启用 false: 不启用
     */
    setIdleTimerDisabled(disabled: boolean): void;
}
declare const _default: UtilsClass;
export default _default;
