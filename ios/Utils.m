// Utils.m

#import "Utils.h"


@implementation Utils

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(sampleMethod:(NSString *)stringArgument numberParameter:(nonnull NSNumber *)numberArgument callback:(RCTResponseSenderBlock)callback)
{
    // TODO: Implement some actually useful functionality
    callback(@[[NSString stringWithFormat: @"numberArgument: %@ stringArgument: %@", numberArgument, stringArgument]]);
}

RCT_EXPORT_METHOD(setIdleTimerDisabled:(BOOL)disabled) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [UIApplication sharedApplication].idleTimerDisabled = disabled;
    });
}

RCT_EXPORT_METHOD(exitApp)
{
    exit(0);
};

- (void)loadBundle
{
    RCTTriggerReloadCommandListeners(@"react-native-utils: restart");
}

RCT_EXPORT_METHOD(restart) {
    if ([NSThread isMainThread]) {
        [self loadBundle];
    } else {
        dispatch_sync(dispatch_get_main_queue(), ^{
            [self loadBundle];
        });
    }
    return;
}

@end
