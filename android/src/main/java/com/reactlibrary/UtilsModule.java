// UtilsModule.java

package com.reactlibrary;

import android.app.Application;
import android.os.Process;

import android.annotation.TargetApi;
import android.app.PendingIntent;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;

import androidx.core.content.pm.ShortcutInfoCompat;
import androidx.core.content.pm.ShortcutManagerCompat;
import androidx.core.graphics.drawable.IconCompat;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class UtilsModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public UtilsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "Utils";
    }

    @ReactMethod
    public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
        // TODO: Implement some actually useful functionality
        callback.invoke("Received numberArgument: " + numberArgument + " stringArgument: " + stringArgument);
    }

    @ReactMethod
    public void exitApp() {
        Process.killProcess(Process.myPid());
    }

    @ReactMethod
    public static Bitmap getBitmapFromURL(String src) {
        try {
            Log.d("vk21", src);
            //uncomment below line in image name have spaces.
            //src = src.replaceAll(" ", "%20");

            URL url = new URL(src);

            HttpURLConnection connection = (HttpURLConnection) url
                    .openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            Bitmap myBitmap = BitmapFactory.decodeStream(input);
            return myBitmap;
        } catch (Exception e) {
            Log.d("vk21", e.toString());
            Log.d("vk21", src);
            return null;
        }
    }

    @ReactMethod
    @TargetApi(25)
    private void AddPinnedShortcut(ReadableMap shortcut, final Callback onDone) {
        try {
            if (ShortcutManagerCompat.isRequestPinShortcutSupported(reactContext)) {
                String id = shortcut.getString("id");
                String label = shortcut.getString("label");
                String icon = shortcut.getString("icon");
                String link = shortcut.getString("link");
                ShortcutInfoCompat shortcut_ = new ShortcutInfoCompat.Builder(reactContext, link)
                        .setShortLabel(label)
                        .setIcon(IconCompat.createWithBitmap(getBitmapFromURL(icon)))
                        .setIntent(new Intent(Intent.ACTION_VIEW,
                                Uri.parse(link)))
                        .build();
                Intent pinnedShortcutCallbackIntent = ShortcutManagerCompat.createShortcutResultIntent(reactContext, shortcut_);
                PendingIntent successCallback = PendingIntent.getBroadcast(reactContext, /* request code */ 0,
                        pinnedShortcutCallbackIntent, /* flags */ 0);
                ShortcutManagerCompat.requestPinShortcut(reactContext, shortcut_, successCallback.getIntentSender());
                onDone.invoke(true, "成功");
            } else {
                onDone.invoke(false, "不支持");
            }
        } catch (Exception e) {
            Log.d("AddPinnedShortcut", e.toString());
            onDone.invoke(false, e.toString());
        } finally {
        }
    }
}
