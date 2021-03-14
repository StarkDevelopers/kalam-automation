import 'package:flutter/foundation.dart';

import '../models/cart.model.dart';

class Cart with ChangeNotifier {
  List<CartItem> _items = [];

  List<CartItem> get items {
    return [..._items];
  }

  void addItem(String id) {
    var existingItemIndex = _items.indexWhere((element) => element.id == id);

    if (existingItemIndex != -1) {
      var existingItem = _items[existingItemIndex];
      existingItem.quantity = existingItem.quantity + 1;
    } else {
      _items.add(CartItem(id: id, quantity: 1));
    }

    notifyListeners();
  }

  void removeItem(String id) {
    var existingItemIndex = _items.indexWhere((element) => element.id == id);

    if (existingItemIndex != -1) {
      var existingItem = _items[existingItemIndex];
      existingItem.quantity = existingItem.quantity - 1;

      if (existingItem.quantity == 0) {
        _items.removeAt(existingItemIndex);
      }

      notifyListeners();
    }
  }

  void clear() {
    _items = [];
    notifyListeners();
  }
}
