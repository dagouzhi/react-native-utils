# react-native-utils

## Getting started

`$ npm install @hongtangyun/react-native-utils --save`

### Mostly automatic installation

`$ react-native link @hongtangyun/react-native-utils`

## Usage
```javascript
import RnUtils from '@hongtangyun/react-native-utils';
// 添加桌面快捷方式
RnUtils.AddPinnedShortcut({
  id: '001',
  icon: 'https://dummyimage.com/114x114/02adea&text=icon',
  label: '测试',
  link: 'hongtangyun://platformapi/startapp?appId=test',
})
// 关闭app
RnUtils.exitApp()
// 刷新重启
RnUtils.restart()
// 屏幕常亮
RnUtils.setIdleTimerDisabled(true);
```
