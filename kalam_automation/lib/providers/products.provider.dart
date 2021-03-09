import 'package:flutter/foundation.dart';

import '../models/product.model.dart';

class Products with ChangeNotifier {
  List<Product> _items = [];

  List<Product> get items {
    return [..._items];
  }

  void setItems(List<Product> products) {
    _items = [...products];
  }
}
