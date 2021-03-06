import 'package:http/http.dart' as http;
import 'dart:convert';

import '../config/api.dart';
import '../models/cart.model.dart';
import '../helpers/SharedPreferenceHelper.dart';
import '../models/order.model.dart';

class OrdersService {
  static Future<void> placeOrder(List<CartItem> cartItems) async {
    try {
      String token = await SharedPreferenceHelper.getPreference('token');

      final response = await http.post(
        API.PLACE_ORDER,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode(
          {'orderItems': cartItems.map((e) => e.toJson()).toList()},
        ),
      );

      if (response.statusCode >= 400) {
        throw Exception('Failed to place orders');
      }

      return;
    } catch (error) {
      print(error.toString());
      throw Exception('Something went wrong');
    }
  }

  static Future<List<Order>> listOrders() async {
    try {
      String token = await SharedPreferenceHelper.getPreference('token');

      final response = await http.get(
        API.LIST_ORDERS,
        headers: <String, String>{
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode >= 400) {
        throw Exception('Failed to fetch orders');
      }

      final responseData = jsonDecode(response.body) as Map<String, dynamic>;

      return responseData['data']
          .map<Order>((order) => Order.fromJson(order))
          .toList();
    } catch (error) {
      print(error.toString());
      throw Exception('Something went wrong');
    }
  }

  static Future<Order> fetchOrder(String id) async {
    try {
      String token = await SharedPreferenceHelper.getPreference('token');

      final response = await http.get(
        '${API.LIST_ORDERS}/$id',
        headers: <String, String>{
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode >= 400) {
        throw Exception('Failed to fetch order');
      }

      final responseData = jsonDecode(response.body) as Map<String, dynamic>;

      return Order.allFieldsFromJson(responseData['data']);
    } catch (error) {
      print(error.toString());
      throw Exception('Something went wrong');
    }
  }

  static Future<void> updateDetails(Order order) async {
    try {
      String token = await SharedPreferenceHelper.getPreference('token');

      final response = await http.patch(
        '${API.LIST_ORDERS}/${order.id}',
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode(
          order.toJson(),
        ),
      );

      if (response.statusCode >= 400) {
        throw Exception('Failed to place orders');
      }

      return;
    } catch (error) {
      print(error.toString());
      throw Exception('Something went wrong');
    }
  }
}
