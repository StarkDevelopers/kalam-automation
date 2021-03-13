import 'package:flutter/foundation.dart';

class User {
  final String id;
  final String token;
  final String name;

  const User({
    @required this.id,
    @required this.token,
    @required this.name,
  });

  factory User.fromJson(dynamic user, String token) {
    return User(
      id: user['_id'],
      token: token,
      name: user['name'],
    );
  }

  factory User.clone(User user) {
    return User(
      id: user.id,
      name: user.name,
      token: user.token,
    );
  }
}
