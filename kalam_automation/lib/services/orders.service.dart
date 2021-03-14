import 'package:http/http.dart' as http;
import 'dart:convert';

import '../config/api.dart';
import '../models/cart.model.dart';

class OrdersService {
  static Future<void> placeOrder(List<CartItem> cartItems) async {
    try {
      final response = await http.post(
        API.PLACE_ORDER,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(
          {'orderItems': cartItems.map((e) => e.toJson()).toList()},
        ),
      );

      if (response.statusCode >= 400) {
        throw Exception('Failed to fetch products');
      }

      return;
    } catch (error) {
      print(error.toString());
      throw Exception('Something went wrong');
    }
  }
}
