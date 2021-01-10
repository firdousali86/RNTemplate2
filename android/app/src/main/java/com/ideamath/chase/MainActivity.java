package com.ideamath.chase;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        SplashScreen.show(MainActivity.this);
        // Fabric.with(this, new Crashlytics());
    }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "app";
  }
}
