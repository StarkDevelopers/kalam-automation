import 'package:flutter/material.dart';

import '../../widgets/Drawer.dart';
import '../../widgets/AppBar.dart';
import '../../screens/Products/widgets/ProductList.dart';

class ProductsScreen extends StatelessWidget {
  static const String routeName = '/products';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: KalamAppBar(),
      body: ProductList(),
      drawer: KalamDrawer(),
    );
  }
}
