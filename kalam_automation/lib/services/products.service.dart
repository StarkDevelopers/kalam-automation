import 'package:http/http.dart' as http;
import 'dart:convert';

import '../models/product.model.dart';
import '../config/api.dart';
import '../helpers/SharedPreferenceHelper.dart';

class ProductService {
  static Future<List<Product>> getProducts() async {
    try {
      String token = await SharedPreferenceHelper.getPreference('token');

      final response = await http.get(
        API.GET_PRODUCT,
        headers: <String, String>{
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode >= 400) {
        throw Exception('Failed to fetch products');
      }

      final responseData = jsonDecode(response.body) as Map<String, dynamic>;

      return responseData['data']
          .map<Product>((product) => Product.fromJson(product))
          .toList();
    } catch (error) {
      print(error.toString());
      throw Exception('Something went wrong');
    }
  }
}
