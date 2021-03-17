import 'dart:async';
import 'package:shared_preferences/shared_preferences.dart';

class SharedPreferenceHelper {
  static final Future<SharedPreferences> _sharedPreferences =
      SharedPreferences.getInstance();

  static Future<String> getPreference(String key) async {
    final SharedPreferences sharedPreferences = await _sharedPreferences;

    return sharedPreferences.getString(key);
  }

  static Future<void> setPreference(String key, String value) async {
    final SharedPreferences sharedPreferences = await _sharedPreferences;

    sharedPreferences.setString(key, value);
  }

  static Future<void> removePreference(String key) async {
    final SharedPreferences sharedPreferences = await _sharedPreferences;

    sharedPreferences.remove(key);
  }
}
