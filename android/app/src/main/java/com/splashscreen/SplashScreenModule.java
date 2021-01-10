package com.splashscreen;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by shukarullah on 5/12/17.
 */

public class SplashScreenModule extends ReactContextBaseJavaModule {
    public SplashScreenModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SplashScreen";
    }
    
    @Override    
  public boolean canOverrideExistingModule() {        
    return true;    
  }   

    @ReactMethod
    public void show() {
        SplashScreen.show(getCurrentActivity());
    }


    @ReactMethod
    public void hide() {
        SplashScreen.hide(getCurrentActivity());
    }
}
