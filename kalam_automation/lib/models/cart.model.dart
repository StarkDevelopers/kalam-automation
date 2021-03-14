import 'package:flutter/foundation.dart';

class CartItem {
  final String id;
  int quantity;

  CartItem({
    @required this.id,
    @required this.quantity,
  });

  Map<String, dynamic> toJson() {
    return {
      'productId': id,
      'quantity': quantity,
    };
  }
}
