import 'package:flutter/foundation.dart';

import '../helpers/SharedPreferenceHelper.dart';
import '../models/user.model.dart';

class Auth with ChangeNotifier {
  User _user;
  bool isLoggedIn = false;

  User get user {
    return User.clone(_user);
  }

  void login(User user) {
    isLoggedIn = true;
    _user = User.clone(user);
    notifyListeners();
  }

  Future<void> logout() async {
    isLoggedIn = false;
    _user = null;
    await SharedPreferenceHelper.removePreference('token');
    notifyListeners();
  }
}
