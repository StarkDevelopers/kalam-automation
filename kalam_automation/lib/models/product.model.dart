import 'package:flutter/foundation.dart';

class Product {
  final String id;
  final String name;
  final String image;

  const Product({
    @required this.id,
    @required this.name,
    @required this.image,
  });

  factory Product.fromJson(dynamic product) {
    return Product(
      id: product['_id'],
      name: product['name'],
      image: product['image'],
    );
  }
}
