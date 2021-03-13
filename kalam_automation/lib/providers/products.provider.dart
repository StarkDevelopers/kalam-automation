import 'package:flutter/foundation.dart';

import '../services/products.service.dart';
import '../models/product.model.dart';

class Products with ChangeNotifier {
  List<Product> _items = [];

  List<Product> get items {
    return [..._items];
  }

  void setItems(List<Product> products) {
    _items = [...products];
  }

  Future<List<Product>> getProducts() async {
    if (_items.length != 0) {
      return items;
    }

    List<Product> products = await ProductService.getProducts();
    setItems(products);
    return products;
  }
}
