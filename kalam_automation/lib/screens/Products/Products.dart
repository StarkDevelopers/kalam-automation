import 'package:flutter/material.dart';
import 'package:kalam_automation/screens/Products/widgets/ProductList.dart';

import '../../widgets/Drawer.dart';
import '../../widgets/AppBar.dart';

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
