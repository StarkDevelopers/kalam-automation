import 'package:flutter/foundation.dart';

class User {
  final String id;
  final String token;
  final String name;
  final int number;
  final int number2;
  final String address;
  final String email;
  final String aadharCardNumber;
  final String panCardNumber;
  final String technicianName;
  final String password;

  const User({
    @required this.id,
    @required this.token,
    @required this.name,
    this.number,
    this.number2,
    this.address,
    this.email,
    this.aadharCardNumber,
    this.panCardNumber,
    this.technicianName,
    this.password,
  });

  factory User.fromJson(dynamic user, String token) {
    return User(
      id: user['_id'],
      token: token,
      name: user['name'],
      number: user['number'],
      number2: user['number2'],
      address: user['address'],
      email: user['email'],
      aadharCardNumber: user['aadharCardNumber'],
      panCardNumber: user['panCardNumber'],
      technicianName: user['technicianName'],
      password: user['password'],
    );
  }

  factory User.clone(User user, {Map<String, String> updateFields = const {}}) {
    return User(
      id: user.id,
      name: user.name,
      token: user.token,
      number: user.number,
      number2: updateFields['number2'] != null
          ? int.parse(updateFields['number2'])
          : user.number2,
      address: updateFields['address'] ?? user.address,
      email: updateFields['email'] ?? user.email,
      aadharCardNumber:
          updateFields['aadharCardNumber'] ?? user.aadharCardNumber,
      panCardNumber: updateFields['panCardNumber'] ?? user.panCardNumber,
      technicianName: updateFields['technicianName'] ?? user.technicianName,
      password: updateFields['password'] ?? user.password,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name,
      'password': password,
      'number': number,
      'number2': number2,
      'email': email,
      'address': address,
      'aadharCardNumber': aadharCardNumber,
      'panCardNumber': panCardNumber,
      'technicianName': technicianName,
    };
  }
}
