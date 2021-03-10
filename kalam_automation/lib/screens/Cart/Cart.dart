import 'package:flutter/material.dart';

import '../../screens/Cart/widgets/CartItems.dart';
import '../../widgets/AppBar.dart';

class CartScreen extends StatelessWidget {
  static final String routeName = '/cart';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: KalamAppBar(),
      body: CartItems(),
    );
  }
}
