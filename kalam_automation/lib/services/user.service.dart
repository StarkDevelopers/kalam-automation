import 'package:http/http.dart' as http;
import 'dart:convert';

import '../models/user.model.dart';
import '../config/api.dart';
import '../helpers/SharedPreferenceHelper.dart';

class UserService {
  static Future<User> login(String number, String password) async {
    try {
      final response = await http.post(
        API.LOGIN,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(
          {
            "number": number,
            "password": password,
          },
        ),
      );

      if (response.statusCode >= 400) {
        throw Exception('Failed to login');
      }

      final responseData = jsonDecode(response.body) as Map<String, dynamic>;

      String token = responseData['token'];

      User user = User.fromJson(responseData['data'], token);

      return user;
    } catch (error) {
      print(error.toString());
      throw Exception('Something went wrong');
    }
  }

  static Future<User> getUser() async {
    try {
      String token = await SharedPreferenceHelper.getPreference('token');

      final response = await http.get(
        API.GET_USER,
        headers: <String, String>{
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode >= 400) {
        throw Exception('Failed to login');
      }

      final responseData = jsonDecode(response.body) as Map<String, dynamic>;

      User user = User.fromJson(responseData['data'], token);

      return user;
    } catch (error) {
      print(error.toString());
      throw Exception('Something went wrong');
    }
  }
}
