import 'package:flutter/foundation.dart';

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
}
