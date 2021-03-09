import 'package:http/http.dart' as http;
import 'dart:convert';

import '../models/product.model.dart';
import '../config/api.dart';

class ProductService {
  static Future<List<Product>> getProducts() async {
    try {
      final response = await http.get(API.GET_PRODUCT);

      final responseData = jsonDecode(response.body) as Map<String, dynamic>;

      return responseData['data']
          .map<Product>((product) => Product.fromJson(product))
          .toList();
    } catch (error) {
      print(error.toString());
      throw Exception('Failed to fetch products');
    }
  }
}
